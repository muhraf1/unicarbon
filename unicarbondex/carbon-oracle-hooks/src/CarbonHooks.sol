// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import {BaseHook} from "v4-periphery/src/utils/BaseHook.sol";
import {IPoolManager} from "v4-core/interfaces/IPoolManager.sol";
import {Hooks} from "v4-core/libraries/Hooks.sol";
import {PoolKey} from "v4-core/types/PoolKey.sol";
import {BalanceDelta} from "v4-core/types/BalanceDelta.sol";
import {LPFeeLibrary} from "v4-core/libraries/LPFeeLibrary.sol";
import {BeforeSwapDelta, BeforeSwapDeltaLibrary} from "v4-core/types/BeforeSwapDelta.sol";
import {SwapParams} from "v4-core/types/PoolOperation.sol";

interface IOracleAdapter {
    function getHealthScore() external view returns (uint256);
    function getCarbonPrice() external view returns (uint256);
    function getHealthScorePercentage() external view returns (uint256);
    function getCarbonPriceUSD() external view returns (uint256);
    function isDataFresh() external view returns (bool healthFresh, bool carbonFresh);
    function getAllData() external view returns (
        uint256 healthScore,
        uint256 carbonPrice,
        uint256 healthTimestamp,
        uint256 carbonTimestamp
    );
}

contract CarbonHealthHook is BaseHook {
    using LPFeeLibrary for uint24;

    IOracleAdapter public immutable oracleAdapter;
    
    uint128 public movingAverageGasPrice;
    uint104 public movingAverageGasPriceCount;

    uint24 public constant BASE_FEE = 5000;
    uint24 public constant MAX_HEALTH_FEE = 20000;
    uint24 public constant MIN_FEE = 1000;
    
    uint256 public constant HEALTH_THRESHOLD = 50;
    uint256 public constant CRITICAL_HEALTH = 10;
    
    uint256 public constant HEALTHY_MULTIPLIER = 100;
    uint256 public constant MODERATE_PENALTY = 150;
    uint256 public constant HIGH_PENALTY = 200;
    uint256 public constant CRITICAL_PENALTY = 400;

    event HealthScoreUpdated(uint256 indexed healthScore, uint24 indexed newFee);
    event FeeCalculated(uint256 gasPrice, uint256 healthScore, uint24 finalFee);
    
    error MustUseDynamicFee();
    error OracleDataStale();

    constructor(IPoolManager _poolManager, address _oracleAdapter) BaseHook(_poolManager) {
        oracleAdapter = IOracleAdapter(_oracleAdapter);
        updateMovingAverage();
    }

    function getHookPermissions()
        public
        pure
        override
        returns (Hooks.Permissions memory)
    {
        return
            Hooks.Permissions({
                beforeInitialize: true,
                afterInitialize: false,
                beforeAddLiquidity: false,
                beforeRemoveLiquidity: false,
                afterAddLiquidity: false,
                afterRemoveLiquidity: false,
                beforeSwap: true,
                afterSwap: true,
                beforeDonate: false,
                afterDonate: false,
                beforeSwapReturnDelta: false,
                afterSwapReturnDelta: false,
                afterAddLiquidityReturnDelta: false,
                afterRemoveLiquidityReturnDelta: false
            });
    }

    function _beforeInitialize(
        address,
        PoolKey calldata key,
        uint160
    ) internal pure override returns (bytes4) {
        if (!key.fee.isDynamicFee()) revert MustUseDynamicFee();
        return this.beforeInitialize.selector;
    }

    function _beforeSwap(
        address,
        PoolKey calldata key,
        SwapParams calldata,
        bytes calldata
    ) internal view override returns (bytes4, BeforeSwapDelta, uint24) {
        (bool healthFresh, bool carbonFresh) = oracleAdapter.isDataFresh();
        if (!healthFresh) revert OracleDataStale();
        
        uint24 fee = getFee();
        uint24 feeWithFlag = fee | LPFeeLibrary.OVERRIDE_FEE_FLAG;
        
        return (
            this.beforeSwap.selector,
            BeforeSwapDeltaLibrary.ZERO_DELTA,
            feeWithFlag
        );
    }

    function _afterSwap(
        address,
        PoolKey calldata,
        SwapParams calldata,
        BalanceDelta,
        bytes calldata
    ) internal override returns (bytes4, int128) {
        updateMovingAverage();
        
        return (this.afterSwap.selector, 0);
    }

    function getFee() internal view returns (uint24) {
        uint128 gasPrice = uint128(tx.gasprice);
        uint256 healthScore = oracleAdapter.getHealthScorePercentage();
        
        uint24 gasFee = calculateGasFee(gasPrice);
        uint24 healthPenaltyFee = calculateHealthPenaltyFee(gasFee, healthScore);
        
        uint24 finalFee = healthPenaltyFee > MAX_HEALTH_FEE ? MAX_HEALTH_FEE : healthPenaltyFee;
        finalFee = finalFee < MIN_FEE ? MIN_FEE : finalFee;

        return finalFee;
    }
    
    function calculateGasFee(uint128 gasPrice) internal view returns (uint24) {
        if (gasPrice > (movingAverageGasPrice * 11) / 10) {
            return BASE_FEE / 2;
        }
        if (gasPrice < (movingAverageGasPrice * 9) / 10) {
            return BASE_FEE * 2;
        }
        return BASE_FEE;
    }
    
    function calculateHealthPenaltyFee(uint24 baseFee, uint256 healthScore) internal pure returns (uint24) {
        if (healthScore >= HEALTH_THRESHOLD) {
            return baseFee;
        }
        
        uint256 multiplier;
        
        if (healthScore <= CRITICAL_HEALTH) {
            multiplier = CRITICAL_PENALTY;
        }
        else if (healthScore <= 25) {
            multiplier = HIGH_PENALTY;
        }
        else if (healthScore <= 40) {
            multiplier = MODERATE_PENALTY;
        }
        else {
            multiplier = 100 + ((HEALTH_THRESHOLD - healthScore) * 50) / 9;
        }
        
        return uint24((uint256(baseFee) * multiplier) / 100);
    }

    function getCurrentHealthScore() external view returns (uint256) {
        return oracleAdapter.getHealthScorePercentage();
    }
    
    function getCurrentCarbonPrice() external view returns (uint256) {
        return oracleAdapter.getCarbonPriceUSD();
    }
    
    function getFeeBreakdown() external view returns (
        uint24 gasFee,
        uint24 healthPenaltyFee,
        uint24 finalFee,
        uint256 healthScore,
        uint256 carbonPrice
    ) {
        uint128 gasPrice = uint128(tx.gasprice);
        healthScore = oracleAdapter.getHealthScorePercentage();
        carbonPrice = oracleAdapter.getCarbonPriceUSD();
        
        gasFee = calculateGasFee(gasPrice);
        healthPenaltyFee = calculateHealthPenaltyFee(gasFee, healthScore);
        finalFee = healthPenaltyFee > MAX_HEALTH_FEE ? MAX_HEALTH_FEE : healthPenaltyFee;
        finalFee = finalFee < MIN_FEE ? MIN_FEE : finalFee;
    }
    
    function simulateFee(uint256 mockHealthScore) external view returns (uint24) {
        uint128 gasPrice = uint128(tx.gasprice);
        uint24 gasFee = calculateGasFee(gasPrice);
        uint24 healthPenaltyFee = calculateHealthPenaltyFee(gasFee, mockHealthScore);
        
        uint24 finalFee = healthPenaltyFee > MAX_HEALTH_FEE ? MAX_HEALTH_FEE : healthPenaltyFee;
        return finalFee < MIN_FEE ? MIN_FEE : finalFee;
    }

    function updateMovingAverage() internal {
        uint128 gasPrice = uint128(tx.gasprice);
        movingAverageGasPrice =
            ((movingAverageGasPrice * movingAverageGasPriceCount) + gasPrice) /
            (movingAverageGasPriceCount + 1);
        movingAverageGasPriceCount++;
    }
}
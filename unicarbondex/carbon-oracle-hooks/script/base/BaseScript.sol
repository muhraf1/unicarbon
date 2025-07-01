// SPDX-License-Identifier: MIT
pragma solidity ^0.8.26;

import {Script} from "forge-std/Script.sol";
import {IERC20} from "forge-std/interfaces/IERC20.sol";
import {IHooks} from "@uniswap/v4-core/src/interfaces/IHooks.sol";
import {Currency} from "@uniswap/v4-core/src/types/Currency.sol";
import {IPoolManager} from "@uniswap/v4-core/src/interfaces/IPoolManager.sol";
import {IPositionManager} from "v4-periphery/src/interfaces/IPositionManager.sol";
import {IPermit2} from "permit2/src/interfaces/IPermit2.sol";
import {IUniswapV4Router04} from "hookmate/interfaces/router/IUniswapV4Router04.sol";
import {AddressConstants} from "hookmate/constants/AddressConstants.sol";


/// @notice Shared configuration between scripts

contract BaseScript is Script {
    IPermit2 immutable permit2 = IPermit2(0x00B036B58a818B1BC34d502D3fE730Db729e62AC); //unichain sepolia  permit2
    IPoolManager immutable poolManager ; //unichain sepolia poolmanager
    IPositionManager immutable positionManager; //unichain sepolia positionmanager
    IUniswapV4Router04 immutable swapRouter; //unichain sepolia router
    address immutable deployerAddress;

    /////////////////////////////////////
    // --- Configure These ---
    /////////////////////////////////////
    IERC20 internal constant token0 = IERC20(0xC529C82d5e42958883b3D097C815ad4f4Ae90684); //$CAR carbon token
    IERC20 internal constant token1 = IERC20(0x30a8b15a0B969589E78bb3E83Bbbf0926D226e03); //$USDCAR carbon stablecoins unichain sepolia
    IHooks constant hookContract = IHooks(0x2C98229f23109647221C0DfC6EE9cDE23313E0C0); // Unicarbon Contract 
    /////////////////////////////////////

    Currency immutable currency0;
    Currency immutable currency1;

    constructor() {
        poolManager = IPoolManager(AddressConstants.getPoolManagerAddress(1301));
        positionManager = IPositionManager(payable(AddressConstants.getPositionManagerAddress(1301)));
        swapRouter = IUniswapV4Router04(payable(AddressConstants.getV4SwapRouterAddress(1301)));

        deployerAddress = getDeployer();

        (currency0, currency1) = getCurrencies();

        vm.label(address(token0), "Token0");
        vm.label(address(token1), "Token1");

        vm.label(address(deployerAddress), "Deployer");
        vm.label(address(poolManager), "PoolManager");
        vm.label(address(positionManager), "PositionManager");
        vm.label(address(swapRouter), "SwapRouter");
        vm.label(address(hookContract), "HookContract");
    }

    function getCurrencies() public pure returns (Currency, Currency) {
        require(address(token0) != address(token1));

        if (token0 < token1) {
            return (Currency.wrap(address(token0)), Currency.wrap(address(token1)));
        } else {
            return (Currency.wrap(address(token1)), Currency.wrap(address(token0)));
        }
    }


    function getDeployer() public returns (address) {
        address[] memory wallets = vm.getWallets();

        require(wallets.length > 0, "No wallets found");

        return wallets[0];
    }
}
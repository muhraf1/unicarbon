// SPDX-License-Identifier: MIT
pragma solidity ^0.8.26;

import {Script} from "forge-std/Script.sol";
import {console} from "forge-std/console.sol";
import {Hooks} from "@uniswap/v4-core/src/libraries/Hooks.sol";
import {HookMiner} from "v4-periphery/src/utils/HookMiner.sol";
import {IPoolManager} from "@uniswap/v4-core/src/interfaces/IPoolManager.sol";
import {CarbonHealthHook} from "../src/CarbonHooks.sol";
import {OracleAdapter} from "../src/OracleAdapter.sol";
import {CustomOracleSource} from "../src/CustomOracleSource.sol";

// BaseScript.sol (minimal version for this script)
abstract contract BaseScript is Script {
    // Replace with actual Uniswap V4 PoolManager address or a mock
    address public constant poolManager = 0x00B036B58a818B1BC34d502D3fE730Db729e62AC; // PoolManager address Unichain sepolia
    // CREATE2 factory address (standard deterministic deployer)
  
}


/// @notice Mines the address and deploys the CarbonHealthHook.sol Hook contract
contract DeployHookScript is BaseScript {
    function run() external {
        vm.startBroadcast();

        // Deploy CustomOracleSource
        CustomOracleSource oracleSource = new CustomOracleSource();
        console.log("CustomOracleSource deployed to:", address(oracleSource));

        // Deploy OracleAdapter
        OracleAdapter oracleAdapter = new OracleAdapter(address(oracleSource));
        console.log("OracleAdapter deployed to:", address(oracleAdapter));

        // Hook contracts must have specific flags encoded in the address
        uint160 flags = uint160(
            Hooks.BEFORE_INITIALIZE_FLAG | Hooks.BEFORE_SWAP_FLAG | Hooks.AFTER_SWAP_FLAG
        );

        // Encode constructor arguments for CarbonHealthHook
        bytes memory constructorArgs = abi.encode(poolManager, address(oracleAdapter));

        // Mine a salt that produces a hook address with the correct flags
        (address hookAddress, bytes32 salt) = HookMiner.find(
            CREATE2_FACTORY,
            flags,
            type(CarbonHealthHook).creationCode,
            constructorArgs
        );

        // Deploy the hook using CREATE2
        CarbonHealthHook carbonHealthHook = new CarbonHealthHook{salt: salt}(
            IPoolManager(poolManager),
            address(oracleAdapter)
        );

        console.log("CarbonHealthHook deployed to:", address(carbonHealthHook));

        // Verify the deployed address matches the mined address
        require(address(carbonHealthHook) == hookAddress, "DeployHookScript: Hook Address Mismatch");

        vm.stopBroadcast();
    }
}
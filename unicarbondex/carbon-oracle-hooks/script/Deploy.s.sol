// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import {Script} from "forge-std/Script.sol";
import {OracleAdapter} from "../src/OracleAdapter.sol";
import {CarbonHealthHook} from "../src/CarbonHealthHook.sol";

contract Deploy is Script {
    function run() external {
        vm.startBroadcast();

        // Deploy OracleAdapter (replace with actual IOracleSource address)
        OracleAdapter oracleAdapter = new OracleAdapter();
        // Deploy CarbonHealthHook (replace with actual IPoolManager address)
        CarbonHealthHook carbonHealthHook = new CarbonHealthHook(
            IPoolManager(0xYourPoolManagerAddress),
            address(oracleAdapter)
        );

        vm.stopBroadcast();
    }
}
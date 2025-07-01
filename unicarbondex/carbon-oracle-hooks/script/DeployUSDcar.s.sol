// SPDX-License-Identifier: MIT
pragma solidity ^0.8.26;

import {Script} from "forge-std/Script.sol";
import {console} from "forge-std/console.sol";
import {USDcar} from "../src/USDcar.sol";

contract DeployUSDcar is Script {
    function run() external {
        bytes32 deployerPrivateKey = vm.envBytes32("PRIVATE_KEY");
        address deployerAddress = vm.addr(uint256(deployerPrivateKey));

        vm.startBroadcast(uint256(deployerPrivateKey));

        USDcar uscarToken = new USDcar(deployerAddress); // Deploy with deployer as initial owner

        console.log("USDcar deployed to:", address(uscarToken));

        vm.stopBroadcast();
    }
}
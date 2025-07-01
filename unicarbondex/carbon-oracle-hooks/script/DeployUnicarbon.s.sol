// SPDX-License-Identifier: MIT
pragma solidity ^0.8.26;

import {Script} from "forge-std/Script.sol";
import {Unicarbon} from "../src/Car.sol";
import {console} from "forge-std/console.sol"; // Add this import

contract DeployUnicarbon is Script {
    function run() external {
        // Retrieve the private key from environment variables
        uint256 deployerPrivateKey = vm.envUint("PRIVATE_KEY");
        address deployerAddress = vm.addr(deployerPrivateKey);

        // Start broadcasting transactions
        vm.startBroadcast(deployerPrivateKey);

        // Deploy the Unicarbon contract, passing the deployer as the initial owner
        Unicarbon unicarbon = new Unicarbon(deployerAddress);

        // Log the deployed contract address
        console.log("Unicarbon deployed to:", address(unicarbon));

        // Stop broadcasting
        vm.stopBroadcast();
    }
}
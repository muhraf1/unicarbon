// SPDX-License-Identifier: MIT
pragma solidity ^0.8.26;

import {Script} from "forge-std/Script.sol";
import {console} from "forge-std/console.sol";
import {USDcar} from "../src/USDcar.sol";

contract MintUSDcar is Script {
    function run() external {
        // Retrieve the private key from environment variables
        bytes32 deployerPrivateKey = vm.envBytes32("PRIVATE_KEY");
        address deployerAddress = vm.addr(uint256(deployerPrivateKey));

        // Address of the deployed USDcar contract
        address usdcarAddress = 0x30a8b15a0B969589E78bb3E83Bbbf0926D226e03;

        // Load the USDcar contract
        USDcar usdcar = USDcar(usdcarAddress);

        // Amount to mint: 900,000 tokens (with 18 decimals)
        uint256 amount = 900_000 * 10 ** usdcar.decimals();

        // Start broadcasting transactions
        vm.startBroadcast(uint256(deployerPrivateKey));

        // Mint tokens to the deployer address
        usdcar.mint(deployerAddress, amount);

        // Log the minting event
        console.log("Minted 900,000 USDcar tokens to:", deployerAddress);
        console.log("New balance:", usdcar.balanceOf(deployerAddress));

        // Stop broadcasting
        vm.stopBroadcast();
    }
}
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.26;

import {ERC20} from "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";

contract USDcar is ERC20, Ownable {
    constructor(address initialOwner) ERC20("Unicarbon Stablecoin", "USDcar") Ownable(initialOwner) {
        // Initialize with no initial supply; minting will be done by the owner as needed
    }

    // Mint new tokens, restricted to the owner
    function mint(address to, uint256 amount) external onlyOwner {
        _mint(to, amount);
    }

    // Burn tokens from the caller's balance, restricted to the owner
    function burn(uint256 amount) external onlyOwner {
        _burn(msg.sender, amount);
    }

    // Optional: Allow burning from a specific account if approved, restricted to the owner
    function burnFrom(address account, uint256 amount) external onlyOwner {
        uint256 currentAllowance = allowance(account, msg.sender);
        require(currentAllowance >= amount, "USDcar: burn amount exceeds allowance");
        _approve(account, msg.sender, currentAllowance - amount);
        _burn(account, amount);
    }

    // Override decimals to ensure 18 decimals for precision, standard for stablecoins
    function decimals() public pure override returns (uint8) {
        return 18;
    }
}
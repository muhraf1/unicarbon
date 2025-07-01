// SPDX-License-Identifier: MIT
pragma solidity ^0.8.26;

import {ERC20} from "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";

contract Unicarbon is ERC20, Ownable {
    constructor(address initialOwner) 
        ERC20("Unicarbon", "$Car")
        Ownable(initialOwner)
    {
        _mint(initialOwner, 1000000 * 10 ** decimals());
    }
}
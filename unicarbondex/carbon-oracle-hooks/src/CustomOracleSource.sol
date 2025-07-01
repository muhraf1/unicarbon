// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import {IOracleSource} from "./OracleAdapter.sol";

contract CustomOracleSource is IOracleSource {
    address public owner;
    uint256 public constant CACHE_DURATION = 300; // 5 minutes
    uint256 public healthScore; // Scaled to 10^18
    uint256 public carbonPrice; // Scaled to 10^18
    uint256 public healthTimestamp;
    uint256 public carbonTimestamp;

    constructor() {
        owner = msg.sender;
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "Not authorized");
        _;
    }

    function updateData(uint256 _healthScore, uint256 _carbonPrice) external onlyOwner {
        healthScore = _healthScore * 10**18; // Scale to 10^18
        carbonPrice = _carbonPrice * 10**18; // Scale to 10^18
        healthTimestamp = block.timestamp;
        carbonTimestamp = block.timestamp;
    }

    function getHealthScoreData() external view override returns (uint256, uint256) {
        return (healthScore, healthTimestamp);
    }

    function getCarbonPriceData() external view override returns (uint256, uint256) {
        return (carbonPrice, carbonTimestamp);
    }

    function getHealthScorePercentage() external view override returns (uint256) {
        return healthScore / 10**18; // Return as percentage (0-100)
    }

    function getCarbonPriceUSD() external view override returns (uint256) {
        return carbonPrice / 10**18; // Return in USD
    }

    function isDataFresh() external view override returns (bool, bool) {
        return (
            block.timestamp - healthTimestamp < CACHE_DURATION,
            block.timestamp - carbonTimestamp < CACHE_DURATION
        );
    }

    function getAllData() external view override returns (uint256, uint256, uint256, uint256) {
        return (healthScore, carbonPrice, healthTimestamp, carbonTimestamp);
    }
}
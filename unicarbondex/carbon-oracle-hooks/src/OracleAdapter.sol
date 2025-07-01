    // SPDX-License-Identifier: MIT
    pragma solidity ^0.8.0;

    interface IOracleSource {
        function getHealthScoreData() external view returns (uint256, uint256);
        function getCarbonPriceData() external view returns (uint256, uint256);
        function getHealthScorePercentage() external view returns (uint256);
        function getCarbonPriceUSD() external view returns (uint256);
        function isDataFresh() external view returns (bool, bool);
        function getAllData() external view returns (uint256, uint256, uint256, uint256);
    }

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

    contract OracleAdapter is IOracleAdapter {
        IOracleSource public immutable oracle;
        address public owner;
        
        uint256 public constant CACHE_DURATION = 300;
        uint256 private lastHealthScoreUpdate;
        uint256 private lastCarbonPriceUpdate;
        uint256 private cachedHealthScore;
        uint256 private cachedCarbonPrice;
        
        event OracleUpdated(address indexed newOracle);
        event DataCached(uint256 healthScore, uint256 carbonPrice, uint256 timestamp);
        
        modifier onlyOwner() {
            require(msg.sender == owner, "Not authorized");
            _;
        }
        
        constructor(address _oracle) {
            oracle = IOracleSource(_oracle);
            owner = msg.sender;
        }
        
        function getHealthScore() external view override returns (uint256) {
            if (block.timestamp - lastHealthScoreUpdate > CACHE_DURATION) {
                (uint256 healthScore,) = oracle.getHealthScoreData();
                return healthScore;
            }
            return cachedHealthScore;
        }
        
        function getCarbonPrice() external view override returns (uint256) {
            if (block.timestamp - lastCarbonPriceUpdate > CACHE_DURATION) {
                (uint256 carbonPrice,) = oracle.getCarbonPriceData();
                return carbonPrice;
            }
            return cachedCarbonPrice;
        }
        
        function getHealthScorePercentage() external view override returns (uint256) {
            uint256 healthScore = this.getHealthScore();
            return healthScore / 10**18;
        }
        
        function getCarbonPriceUSD() external view override returns (uint256) {
            uint256 carbonPrice = this.getCarbonPrice();
            return carbonPrice / 10**18;
        }
        
        function isDataFresh() external view override returns (bool healthFresh, bool carbonFresh) {
            return oracle.isDataFresh();
        }
        
        function getAllData() external view override returns (
            uint256 healthScore,
            uint256 carbonPrice,
            uint256 healthTimestamp,
            uint256 carbonTimestamp
        ) {
            return oracle.getAllData();
        }
        
        function updateCache() external {
            (uint256 healthScore, uint256 healthTimestamp) = oracle.getHealthScoreData();
            (uint256 carbonPrice, uint256 carbonTimestamp) = oracle.getCarbonPriceData();
            
            cachedHealthScore = healthScore;
            cachedCarbonPrice = carbonPrice;
            lastHealthScoreUpdate = healthTimestamp;
            lastCarbonPriceUpdate = carbonTimestamp;
            
            emit DataCached(healthScore, carbonPrice, block.timestamp);
        }
    }
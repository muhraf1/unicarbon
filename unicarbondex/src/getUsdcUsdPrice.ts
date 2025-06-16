import { ethers } from "ethers";

// Define the AggregatorV3Interface ABI
const aggregatorV3InterfaceABI = [
  {
    inputs: [],
    name: "decimals",
    outputs: [{ internalType: "uint8", name: "", type: "uint8" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "description",
    outputs: [{ internalType: "string", name: "", type: "string" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "uint80", name: "_roundId", type: "uint80" }],
    name: "getRoundData",
    outputs: [
      { internalType: "uint80", name: "roundId", type: "uint80" },
      { internalType: "int256", name: "answer", type: "int256" },
      { internalType: "uint256", name: "startedAt", type: "uint256" },
      { internalType: "uint256", name: "updatedAt", type: "uint256" },
      { internalType: "uint80", name: "answeredInRound", type: "uint80" },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "latestRoundData",
    outputs: [
      { internalType: "uint80", name: "roundId", type: "uint80" },
      { internalType: "int256", name: "answer", type: "int256" },
      { internalType: "uint256", name: "startedAt", type: "uint256" },
      { internalType: "uint256", name: "updatedAt", type: "uint256" },
      { internalType: "uint80", name: "answeredInRound", type: "uint80" },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "version",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
];

// USDC/USD price feed address on Unichain Sepolia
const USDC_USD_ADDRESS = "0x25DdD2fEd0d51fe79d292Da47dd9f10AbdB4b3EC";
// ETH/USD price feed address on Unichain Sepolia
const ETH_USD_ADDRESS = "0xd9c93081210dFc33326B2af4C2c11848095E6a9a";
// Unichain Sepolia RPC URL
const UNICHAIN_SEPOLIA_RPC = "https://sepolia.unichain.org";

// Function to fetch price data from a price feed
async function getPriceFeedData(address: string, provider: ethers.JsonRpcProvider) {
  const priceFeed = new ethers.Contract(address, aggregatorV3InterfaceABI, provider);
  const roundData = await priceFeed.latestRoundData();
  const decimals = await priceFeed.decimals();
  const price = ethers.formatUnits(roundData.answer, decimals);
  
  return {
    roundId: roundData.roundId,
    price,
    startedAt: new Date(Number(roundData.startedAt) * 1000).toISOString(),
    updatedAt: new Date(Number(roundData.updatedAt) * 1000).toISOString(),
    answeredInRound: roundData.answeredInRound
  };
}

// Function to fetch both USDC/USD and ETH/USD prices
export async function getUsdcUsdPrice() {
  try {
    // Initialize provider
    const provider = new ethers.JsonRpcProvider(UNICHAIN_SEPOLIA_RPC);

    // Fetch USDC/USD price data
    const usdcData = await getPriceFeedData(USDC_USD_ADDRESS, provider);
    console.log("USDC/USD Price Feed Data:");
    console.log(`Round ID: ${usdcData.roundId}`);
    console.log(`Price: ${usdcData.price} USD`);
    console.log(`Started At: ${usdcData.startedAt}`);
    console.log(`Updated At: ${usdcData.updatedAt}`);
    console.log(`Answered In Round: ${usdcData.answeredInRound}`);

    // Fetch ETH/USD price data
    const ethData = await getPriceFeedData(ETH_USD_ADDRESS, provider);
    console.log("\nETH/USD Price Feed Data:");
    console.log(`Round ID: ${ethData.roundId}`);
    console.log(`Price: ${ethData.price} USD`);
    console.log(`Started At: ${ethData.startedAt}`);
    console.log(`Updated At: ${ethData.updatedAt}`);
    console.log(`Answered In Round: ${ethData.answeredInRound}`);

    return { usdcData, ethData };
  } catch (error) {
    console.error("Error fetching price data:", error);
  }
}

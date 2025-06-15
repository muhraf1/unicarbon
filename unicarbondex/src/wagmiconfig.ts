import {mainnet, sepolia, unichainSepolia} from 'viem/chains';
import {http} from 'wagmi';

import {createConfig} from '@privy-io/wagmi';

// Replace these with your app's chains

export const config = createConfig({
  chains: [mainnet, sepolia,unichainSepolia],
  transports: {
    [mainnet.id]: http(),
    [sepolia.id]: http(),
    [unichainSepolia.id]: http(),
  },
});
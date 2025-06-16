import {base, mainnet, sepolia, unichainSepolia} from 'viem/chains';
import {http} from 'wagmi';

import {createConfig} from '@privy-io/wagmi';

// Replace these with your app's chains

export const config = createConfig({
  chains: [unichainSepolia],
  transports: {
    [unichainSepolia.id]: http()
  },
});
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { PrivyProvider } from '@privy-io/react-auth'
import type { ReactNode } from 'react'
import './index.css'
import App from './App.tsx'
import {WagmiProvider, createConfig} from '@privy-io/wagmi';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';

import { BrowserRouter } from 'react-router-dom'
import {config} from './wagmiconfig';
import {privyConfig} from './privyconfig';



const queryClient = new QueryClient();
// Type-safe wrapper for PrivyProvider
const TypedPrivyProvider = PrivyProvider as React.ComponentType<{
  appId: string;
  config?: any;
  children: ReactNode;
}>

const root = createRoot(document.getElementById('root')!)

root.render(
  <StrictMode>

    <TypedPrivyProvider
      appId="cmb3eq21o0086ju0mnhk0yt3e"
      config={{
        "appearance": {
          "accentColor": "#097833",
          "theme": "#A3D696",
          "showWalletLoginFirst": false,
          "logo": "https://auth.privy.io/logos/privy-logo-dark.png",
          "supportedChains": [
            {
              "chainId": '1301', // Replace with Unichain Sepolia chain ID
              "rpcUrls": ['https://sepolia.unichain.org/'], // Replace with actual RPC
              "name": 'Unichain Sepolia',
              "nativeCurrency": { "name": 'Ether', "symbol": 'ETH', "decimals": 18 },
            },
          ],
          "walletList": [
            "detected_wallets",
            "metamask",
            "phantom"
          ]
        },
        "loginMethods": [
          "email",
          "wallet"
        ],
        "fundingMethodConfig": {
          "moonpay": {
            "useSandbox": true
          }
        },
        "embeddedWallets": {
          "requireUserPasswordOnCreate": true,
          "showWalletUIs": true,
          "ethereum": {
            "createOnLogin": "users-without-wallets"
          },
          "solana": {
            "createOnLogin": "off"
          }
        },
        "mfa": {
          "noPromptOnMfaRequired": false
        },
        "externalWallets": {

        }
      }}
    > 
     <QueryClientProvider client={queryClient}>
     <WagmiProvider config={config}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
      </WagmiProvider>
      </QueryClientProvider>
    </TypedPrivyProvider>

  </StrictMode>
)
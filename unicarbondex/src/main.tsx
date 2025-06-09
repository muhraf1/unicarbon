import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { PrivyProvider } from '@privy-io/react-auth'
import type { ReactNode } from 'react'
import './index.css'
import App from './App.tsx'
import { BrowserRouter } from 'react-router-dom'

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
          "walletChainType": "ethereum-and-solana",
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
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </TypedPrivyProvider>

  </StrictMode>
)
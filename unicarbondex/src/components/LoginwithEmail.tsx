import {Children, useState} from 'react';
import { PrivyProvider } from '@privy-io/react-auth';

const TypedPrivyProvider = PrivyProvider as React.ComponentType<{
    appId: string;
    config?: any;
    children: ReactNode;
  }>

export default function LoginWithEmail() {


  return (
    <TypedPrivyProvider
    appId="your-privy-app-id"
    config={{
    "appearance": {
      "accentColor": "#6A6FF5",
      "theme": "#033333",
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
      "solana": {
        "connectors": {}
      }
    }
  }}
  >
 {Children}
   </TypedPrivyProvider>
  );
}
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Card, CardAction, CardContent } from "./ui/card";
import { Button } from "./ui/button"
import { Label } from "@radix-ui/react-dropdown-menu"
import { Input } from "@/components/ui/input"
import { useEffect, useState } from "react";
import { getBalance } from '@wagmi/core';
import { config } from '../wagmiconfig';
import { useWallets } from "@privy-io/react-auth";
import { getUsdcUsdPrice } from "../getUsdcUsdPrice";



interface Token {
  name: string;
  symbol: string;
  address: string;
  logo: string;
  type: string;
}

interface SelectTokenProps {
  onSelect: (token: Token, balance: any) => void;
  selectedToken?: Token;
}

const SelectToken: React.FC<SelectTokenProps> = ({ onSelect, selectedToken }) => {
  const { wallets } = useWallets();
  const [tokenBalance, setTokenBalance] = useState<any>(undefined);
  const [tokenPrice, setTokenPrice] = useState<string | undefined>();

  const tokens = [
    {
      name: "Wrapped ETH",
      symbol: "WETH",
      address: "0x4200000000000000000000000000000000000006",
      logo: "https://s2.coinmarketcap.com/static/img/coins/64x64/2396.png",
      type: "Wraped Token"
    },
    {
      name: "USDC",
      symbol: "USDC",
      address: "0x31d0220469e10c4E71834a79b1f276d740d3768F",
      logo: "https://s2.coinmarketcap.com/static/img/coins/64x64/3408.png",
      type: "Stablecoins Token"
    }
  ];

  useEffect(() => {
    const fetchPriceAndBalance = async () => {
      if (wallets?.[0]?.address && selectedToken) {
        // Fetch balance
        const balance = await getBalance(config, {
          address: (wallets[0].address as `0x${string}`),
          token: selectedToken.address as `0x${string}`,
        });
        setTokenBalance(balance);
        onSelect(selectedToken, balance);

        // Fetch price
        const priceData = await getUsdcUsdPrice();
        if (selectedToken.symbol === "WETH") {
          setTokenPrice(priceData?.ethData?.price);
        } else if (selectedToken.symbol === "USDC") {
          setTokenPrice(priceData?.usdcData?.price);
        }
      }
    };

    fetchPriceAndBalance();
  }, [wallets, selectedToken]);

  const handleTokenSelect = (token: Token) => {
    onSelect(token, tokenBalance);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        {selectedToken ? (
          <div className="flex flex-col gap-1">
            <Button variant="default" className="rounded-lg bg-[#097833] text-white hover:bg-[#097833]/90 px-6 whitespace-nowrap flex items-center gap-2">
              <img
                src={selectedToken.logo}
                width={24}
                height={24}
                alt={selectedToken.name}
                className="rounded-full"
              />
              <span>{selectedToken.symbol}</span>
            </Button>
            <div className="text-sm text-right">
              <div>balance: {tokenBalance?.formatted || ""}</div>
              {tokenPrice && <div>price: ${tokenPrice}</div>}
            </div>
          </div>
        ) : (
          <Button variant="default"
            className="rounded-lg bg-[#097833] text-white hover:bg-[#097833]/90 px-6 whitespace-nowrap">Select token</Button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] bg-[#D6EBD0]">
        <DialogHeader>
          <DialogTitle>Select a Token</DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>

        <div className="flex flex-col gap-2">
          {tokens.map((token) => (
            <div key={token.symbol}>
              <label> {token.type} </label>
              <Card 
                className="flex flex-row p-0 py-2 border-0 cursor-pointer hover:bg-[#A4D696] transition-colors"
                onClick={() => handleTokenSelect(token)}
              >
                <img
                  src={token.logo}
                  width={50}
                  height={50}
                  alt={token.name}
                />
                <div className="flex flex-col">
                  <Label>{token.name}</Label>
                  <div className="flex flex-row gap-1">
                    <p className="font-semibold text-gray-600">{token.symbol}</p>
                    <p className="text-wrap truncate w-[200px]">{token.address}</p>
                  </div>
                </div>
              </Card>
            </div>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SelectToken;
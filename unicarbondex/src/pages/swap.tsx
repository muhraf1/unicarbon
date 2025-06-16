"use client"
import { useState, useEffect } from "react";
import { DropdownMenu } from "@radix-ui/react-dropdown-menu";
import { Card, CardAction, CardContent } from "@/components/ui/card";
import { DropdownMenuContent } from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge"
import SelectToken from "@/components/select_token";
import TradeFeature from "@/components/trade_feature";
import { getBalance } from '@wagmi/core'
import { usePrivy, useWallets, useSignMessage } from "@privy-io/react-auth";
import { config } from '../wagmiconfig';
import { getUsdcUsdPrice } from "@/getUsdcUsdPrice";

interface Token {
  name: string;
  symbol: string;
  address: string;
  logo: string;
  type: string;
}

export function Swap() {
  const { user, login } = usePrivy();
  const { wallets, ready } = useWallets();
  const [token0, setToken0] = useState<Token | undefined>(undefined);
  const [token1, setToken1] = useState<Token | undefined>(undefined);
  const [amount0, setAmount0] = useState("");
  const [amount1, setAmount1] = useState("");
  const [balance0, setBalance0] = useState<any>(undefined);
  const [balance1, setBalance1] = useState<any>(undefined);

  const handleToken0Select = (token: Token, balance: any) => {
    setToken0(token);
    setBalance0(balance);
  };

  const handleToken1Select = (token: Token, balance: any) => {
    setToken1(token);
    setBalance1(balance);
  };

  const handleSwitchTokens = () => {
    const tempToken = token0;
    const tempAmount = amount0;
    const tempBalance = balance0;
    setToken0(token1);
    setToken1(tempToken);
    setAmount0(amount1);
    setAmount1(tempAmount);
    setBalance0(balance1);
    setBalance1(tempBalance);
  };

  

  const handleSwap = async () => {
    if (!user) {
      login();  
     
      return;
    }
    // Implement swap logic here
    console.log(`Swapping ${amount0} ${token0?.symbol} for ${amount1} ${token1?.symbol}`);
    console.log('balance0', balance0);
    console.log('balance1', balance1);
    console.log('Wallets', wallets);
    console.log('Ready', ready);
  
  }; 
  
  
  return (
    <div className="flex flex-col justify-center items-center">
      <div></div>
      <Card className="w-[450px] p-3 bg-[#A4D696] border-0 mt-5 gap-1 relative">
        <TradeFeature />
        {/* upper cards pair */}
        <Card className="gap-0 bg-[#D6EBD0] relative z-10">
          <div className="flex flex-col items-start px-2">
            <div><h4>Sell</h4></div>
            <div className="flex flex-row w-full items-center justify-between gap-2">
              <input 
                className="text-5xl flex-1 outline-none w-[50px]" 
                type="text" 
                placeholder="0"
                value={amount0}
                onChange={(e) => setAmount0(e.target.value)}
              />
              <SelectToken onSelect={handleToken0Select} selectedToken={token0} />
            </div>
            <div className="flex flex-row w-full items-center justify-between gap-2">
              {/* price token 0  */}
              {/* <div>{prices?.usdcPrice}</div> */}
            </div>
          </div>
        </Card>

        {/* Switch button with overlay */}
        <div className="relative z-20">
          <Button
            onClick={handleSwitchTokens}
            className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full p-3 bg-[#097833] text-white hover:bg-[#097833]/90 shadow-lg"
          >
            ↑↓
          </Button>
        </div>

        {/* lower cards pair */}
        <Card className="gap-0 bg-[#D6EBD0] relative z-10">
          <div className="flex flex-col items-start px-2">
            <div><h4>Buy</h4></div>
            <div className="flex flex-row w-full items-center justify-between gap-1">
              <input 
                className="text-5xl flex-1 outline-none w-[50px]" 
                type="text" 
                placeholder="0"
                value={amount1}
                onChange={(e) => setAmount1(e.target.value)}
              />
              <SelectToken onSelect={handleToken1Select} selectedToken={token1} />
            </div>
            <div className="flex flex-row w-full items-center justify-between gap-1">
              {/* Price token 1 */}
              {/* <div>{prices?.ethPrice}</div> */}
            </div>
          </div>
        </Card>

        <Button
          onClick={handleSwap}
          className="w-full mt-4 bg-[#097833] text-white hover:bg-[#097833]/90"
        >
          {!user ? "Connect Wallet" : "Swap"}
        </Button>
      </Card>
    </div>
  );
}

export default Swap;
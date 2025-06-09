import React from 'react'
import { useParams } from 'react-router-dom'

import { DropdownMenu } from "@radix-ui/react-dropdown-menu";
import { Card, CardAction, CardContent, CardFooter } from "@/components/ui/card";
import { DropdownMenuContent } from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge"
import { ArrowDownUp } from 'lucide-react';
import { Slider } from "@/components/ui/slider"
import { useState } from 'react';
import { ChartDemo } from '@/components/chart_demo';
import { RefreshCcw, Plus } from 'lucide-react';
import { Progress } from "@/components/ui/progress"

import TradeFeature from "@/components/trade_feature";
import SelectToken from '@/components/select_token';

// Pool data - you might want to move this to a separate file or fetch from an API
const poolsData = [
  {
    id: 1,
    poolPair: "USDC/ETH",
    feeTier: "0.05%",
    tvl: "$10,250,000",
    poolAPR: "4.2%",
    oneDayVol: "$1,250,000",
    thirtyDayVol: "$32,500,000",
  },
  {
    id: 2,
    poolPair: "WBTC/ETH",
    feeTier: "0.3%",
    tvl: "$8,750,000",
    poolAPR: "5.1%",
    oneDayVol: "$950,000",
    thirtyDayVol: "$28,400,000",
  },
  {
    id: 3,
    poolPair: "USDT/USDC",
    feeTier: "0.01%",
    tvl: "$15,300,000",
    poolAPR: "1.8%",
    oneDayVol: "$3,200,000",
    thirtyDayVol: "$76,500,000",
  },
  {
    id: 4,
    poolPair: "DAI/USDC",
    feeTier: "0.01%",
    tvl: "$7,800,000",
    poolAPR: "1.5%",
    oneDayVol: "$1,100,000",
    thirtyDayVol: "$25,600,000",
  },
  {
    id: 5,
    poolPair: "ETH/MATIC",
    feeTier: "0.3%",
    tvl: "$4,500,000",
    poolAPR: "6.2%",
    oneDayVol: "$850,000",
    thirtyDayVol: "$18,900,000",
  },
  {
    id: 6,
    poolPair: "LINK/ETH",
    feeTier: "0.3%",
    tvl: "$3,200,000",
    poolAPR: "4.8%",
    oneDayVol: "$520,000",
    thirtyDayVol: "$12,400,000",
  },
  {
    id: 7,
    poolPair: "UNI/ETH",
    feeTier: "0.3%",
    tvl: "$2,900,000",
    poolAPR: "5.5%",
    oneDayVol: "$480,000",
    thirtyDayVol: "$10,800,000",
  },
]

const Pool = () => {
  const { poolId } = useParams<{ poolId: string }>()
  const [activeButton, setActiveButton] = useState("market")
  const [activeButtonExpire, setActiveButtonExpire] = useState("1 day")
  const [progress, setProgress] = React.useState(13)

  // Find the current pool data based on the URL parameter
  const currentPool = poolsData.find(pool => pool.id === parseInt(poolId || '1'))

  React.useEffect(() => {
    const timer = setTimeout(() => setProgress(66), 500)
    return () => clearTimeout(timer)
  }, [])

  if (!currentPool) {
    return <div className="flex justify-center items-center h-screen">Pool not found</div>
  }

  return (
    <div className="flex flex-row max-h-full justify-center items-center gap-2">
      <div className='w-1/2 h-[500px] border-0'>
      <ChartDemo currentPool={currentPool}></ChartDemo>
        {/* Display current pool info */}
        {/* <div className="mt-4 p-4 bg-gray-100 rounded-lg">
          <h2 className="text-xl font-bold mb-2">{currentPool.poolPair}</h2>
          <p className="text-sm text-gray-600">Fee Tier: {currentPool.feeTier}</p>
          <p className="text-sm text-gray-600">APR: {currentPool.poolAPR}</p>
        </div> */}
      </div>

      {/* main cards */}
      <Card className=" w-[300px] p-3  bg-[#A4D696] border-0 mt-5 gap-4 ">
        {/* swap & add liquidity  sections */}
        <div className='flex flex-row  gap-2 '>
          {/* swap cards hyperlink */}
          <button
            className='bg-[#097833] w-1/2 rounded-2xl flex justify-center items-center py-2 text-[#D6EBD0] text-xs'>
            <RefreshCcw /> swap
          </button>
          {/* add liquidtiy button */}
          <button
            className='bg-[#097833] w-1/2 rounded-2xl flex justify-center items-center py-2 text-[#D6EBD0] text-xs'>
            <Plus /> Add Liquidity
          </button>
        </div>

        {/* Total Apr sections */}
        <div className="rounded-xl py-2 bg-[#D6EBD0]  text-[#097833] pl-5  text-left ">
          <p className='text-xs  '>Total APR</p>
          <p className='text-2xl font-bold '>{currentPool.poolAPR}</p>
        </div>

        {/* stats sections */}
        <div className="rounded-xl py-2 bg-[#D6EBD0]  text-[#097833] pl-5  text-left  flex flex-col gap-2 ">
          <p className='text-2xl font-bold '>Stats</p>
          <div>
            <p className='text-xs  '>Pool Balance </p>
            <Progress value={progress} className="w-[40%]     " />
          </div>
          
          <div>
            <p className='text-xs  '>TVL </p>
            <p className='text-2xl font-bold '>{currentPool.tvl}</p>
          </div>

          <div>
            <p className='text-xs  '>24 h volume  </p>
            <p className='text-2xl font-bold '>{currentPool.oneDayVol}</p>
          </div>

          <div>
            <p className='text-xs  '>24 h fees </p>
            <p className='text-2xl font-bold '>$11.8k</p>
          </div>
        </div>
          {/* Total Buffer Pool */}
          <div className="rounded-xl py-2 bg-[#D6EBD0]  text-[#097833] pl-5  text-left ">
          <p className='text-xs pb-2 '>Buffer Pool</p>
          <Progress value={progress} className="w-[90%] h-[30px]   " />
        </div>
      </Card>
    
    </div>
  )
}

export default Pool
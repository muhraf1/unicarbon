import React from 'react'

import { DropdownMenu } from "@radix-ui/react-dropdown-menu";
import { Card, CardAction, CardContent } from "@/components/ui/card";
import { DropdownMenuContent } from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge"
import { ShieldCheck } from 'lucide-react';
import { Info } from 'lucide-react';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

import TradeFeature from "@/components/trade_feature";
import { ChevronUp, ChevronDown } from 'lucide-react';
const Twap = () => {
  const [count, setCount] = React.useState(10);
  const [duration, setDuration] = React.useState('1h'); // for total duration
  const [partcount, setpartCount] = React.useState(4);

  const incrementPart = () => setpartCount(prev => prev + 1);
  const decrementPart = () => setpartCount(prev => Math.max(1, prev - 1));

  // Calculate interval in minutes based on duration and parts
  const calculateInterval = () => {
    const durationInMinutes = {
      '1h': 60,
      '6h': 360,
      '12h': 720,
      '1d': 1440
    }[duration] || 60; // Default to 60 minutes if duration is invalid
    
    return Math.floor(durationInMinutes / partcount);
  };
  const formatInterval = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    if (hours > 0) {
      return `${hours}h ${remainingMinutes}m`;
    }
    return `${remainingMinutes}m`;
  };
  return (
    <div className="flex flex-row max-h-full justify-center items-center gap-2">
       <div className='w-1/2 h-[500px]'>
<iframe 
  height="100%" 
  width="100%" 
  id="geckoterminal-embed" 
  title="GeckoTerminal Embed" 
  src="https://www.geckoterminal.com/celo/pools/0x7f7c4335ccac291ddedcef4429a626c442b627ed?embed=1&info=0&swaps=0&grayscale=0&light_chart=0&chart_type=price&resolution=1h" 

  allow="clipboard-write" 
  allowFullScreen
/>
</div>
      {/* main cards */}
      <Card className=" w-[450px] p-3  bg-[#A4D696] border-0 mt-5 gap-2">
        <TradeFeature></TradeFeature>
        {/* upper cards pair  */}
        <Card className="gap-0 py-3">
          <div className="flex flex-col items-start px-2 ">
            {/* title  */}
            <div><h4>Sell</h4></div>
            {/* input & token type */}
            <div className="flex flex-row w-full items-center justify-between gap-2">
              {/* input  */}
              <input className="text-5xl flex-1 outline-none w-[50px]" type="text" placeholder="0" />
              {/* token type  */}
              <Button
                variant="default"
                className="rounded-lg bg-[#097833] text-white hover:bg-[#097833]/90 px-6 whitespace-nowrap"
              >
                Select Token
              </Button>
            </div>
            {/* usd value  & eth value  */}
            <div className="flex flex-row w-full items-center justify-between gap-2">
              <div>$0</div>
              <div>0 ETH <Badge variant="outline" > Max</Badge></div>


            </div>

          </div>
        </Card>
        {/* lower cards pair  */}
        <Card className='py-3'>
          <div className="flex flex-col items-start px-2 ">
            {/* title  */}
            <div><h4>Buy</h4></div>
            {/* input & token type */}
            <div className="flex flex-row w-full items-center justify-between gap-1">
              {/* input  */}
              <input className="text-5xl flex-1 outline-none w-[50px]" type="text" placeholder="0" />
              {/* token type  */}
              <Button
                variant="default"
                className="rounded-lg bg-[#097833] text-white hover:bg-[#097833]/90 px-6 whitespace-nowrap"
              >
                Select Token
              </Button>
            </div>
            {/* usd value  & eth value  */}
            <div className="flex flex-row w-full items-center justify-between gap-1">
              <div>$0</div>
              <div>0 ETH <Badge variant="outline" > Max</Badge></div>


            </div>

          </div>
        </Card>
        {/* slipage tolerance */}
        <Card className='py-0'>
          <div className='flex flex-row gap-1'>
            <div className='flex flex-row w-full gap-4  items-center justify-between px-1'>
              <div className=' flex flex-row  gap-1 text-xs font-semibold text-gray-800'>
                <ShieldCheck className="h-4 w-4" />
                Price Protection

                <Popover>
                  <PopoverTrigger asChild>
                    <Info className='h-4 w-4' />
                  </PopoverTrigger>
                  <PopoverContent>Place content for the popover here.</PopoverContent>
                </Popover>
              </div>
              <div className='text-base font-medium justify-end-safe'>

                2356 USDC
              </div>

            </div>
            <div className="flex justify-end-safe items-center gap-2 px-4 bg-[#097833] text-white rounded-tr-xl rounded-br-xl">
              <div className='flex flex-col'>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setCount(count + 0.1)}
                  className="h-4 w-4 border-0 p-0"
                >
                  <ChevronUp className="h-4 w-4" />
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setCount(count - 0.1)}
                  className="h-4 w-4 border-0"
                >
                  <ChevronDown className="h-4 w-4" />
                </Button>
              </div>
              <div className="min-w-[2rem]">
                {count.toFixed(1)}%
              </div>
            </div>


          </div>
        </Card>
        {/* number of Parts */}
        <Card className='py-0 bg-[#097833]'>
          <div className='flex flex-row gap-1'>
            <div className='flex flex-row w-full  items-center justify-between px-1'>
              <div className=' flex flex-row  pl-4 gap-1 text-xs font-semibold text-white'>

                No.Part

                <Popover>
                  <PopoverTrigger asChild>
                    <Info className='h-4 w-4' />
                  </PopoverTrigger>
                  <PopoverContent>Place content for the popover here.</PopoverContent>
                </Popover>
              </div>


            </div>
            <div className="flex  items-center gap-2 px-4  text-white rounded-tr-xl rounded-br-xl">
              <div className="min-w-[2rem]">
                {partcount.toFixed()}
              </div>
              <div className='flex flex-col'>

                <Button
                  variant="outline"
                  size="icon"
                  onClick={incrementPart}
                  className="h-4 w-4 border-0 p-0"
                >
                  <ChevronUp className="h-4 w-4" />
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={decrementPart}
                  className="h-4 w-4 border-0"
                  disabled={partcount <= 1}
                >
                  <ChevronDown className="h-4 w-4" />
                </Button>
              </div>

            </div>


          </div>
        </Card>
        {/* total duration (left) & Interval (Right)*/}
        <div className='flex flex-row w-full justify-between gap-2'>
          <Card className='py-2 px-2 w-1/2 gap-2'>

            <div className='flex flex-row w-full items-center justify-between px-1 '>
              <div className=' flex flex-row  text-xs font-semibold text-gray-800'>
                Total Duration 
                <Popover>
                  <PopoverTrigger asChild>
                    <Info className='h-4 w-4' />
                  </PopoverTrigger>
                  <PopoverContent>Place content for the popover here.</PopoverContent>
                </Popover>
              </div>
            </div>
            <div className="flex items-center gap-2   rounded-tr-xl rounded-br-xl">
              <select
                className="min-w-[8rem] bg-transparent text-black focus:outline-none"
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
              >
                <option value="1h">1 Hour</option>
                <option value="6h">6 Hours</option>
                <option value="12h">12 Hours</option>
                <option value="1d">1 Day</option>
              </select>
            </div>

          </Card>
          <Card className='py-2 px-2 w-1/2 gap-2'>
            <div className='flex flex-row w-full  items-center justify-between px-1'>
              <div className=' flex flex-row  pl-4 gap-1 text-xs font-semibold text-gray-800'>
                Interval
                <Popover>                  
                  <PopoverTrigger asChild>
                  <Info className='h-4 w-4' />
                </PopoverTrigger> 
                <PopoverContent>Place content for the popover here.</PopoverContent>
                </Popover>
              </div>
            </div>        
                <div className="flex  items-center gap-2 px-4   rounded-tr-xl rounded-br-xl">
              <div className="min-w-[2rem]">
                {formatInterval(calculateInterval())}
              </div>
            </div>
          </Card>

        </div>
        {/* sell part & buy part  */}
        <div className='flex flex-row w-full justify-between gap-2'>
        <Card className='py-2 px-2 w-1/2 gap-2'>
        <div className='flex flex-row w-full  items-center justify-between px-1'>
              <div className=' flex flex-row   gap-1 text-xs font-semibold text-gray-800'>
                Sell per part (1/n)
                <Popover>                  
                  <PopoverTrigger asChild>
                  <Info className='h-4 w-4' />
                </PopoverTrigger> 
                <PopoverContent>Place content for the popover here.</PopoverContent>
                </Popover>
              </div>
            </div>        
                <div className="flex  items-center gap-2 px-4   rounded-tr-xl rounded-br-xl">
              <div className="min-w-[2rem]">
              hihih
              </div>
            </div>

          </Card>
          <Card className='py-2 px-2 w-1/2 gap-2'>
          <div className='flex flex-row w-full  items-center justify-between px-1'>
              <div className=' flex flex-row   gap-1 text-xs font-semibold text-gray-800'>
              Buy per part (1/n)
                <Popover>                  
                  <PopoverTrigger asChild>
                  <Info className='h-4 w-4' />
                </PopoverTrigger> 
                <PopoverContent>Place content for the popover here.</PopoverContent>
                </Popover>
              </div>
            </div>        
                <div className="flex  items-center gap-2 px-4   rounded-tr-xl rounded-br-xl">
              <div className="min-w-[2rem]">
hihih
              </div>
            </div>

          </Card>
        </div>
        <Button variant="default" className="rounded-lg bg-[#097833] text-white hover:bg-[#097833]/90 px-6 whitespace-nowrap">
            Confirm
          </Button>
      </Card>
   



    </div>
  )
}

export default Twap
import React from 'react'

import { DropdownMenu } from "@radix-ui/react-dropdown-menu";
import { Card, CardAction, CardContent, CardFooter } from "@/components/ui/card";
import { DropdownMenuContent } from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge"
import { ArrowDownUp } from 'lucide-react';
import { Slider } from "@/components/ui/slider"
import { useState } from 'react';
import { ChartDemo } from '@/components/chart_demo';





import TradeFeature from "@/components/trade_feature";
import SelectToken from '@/components/select_token';
const Limit = () => {
  const [activeButton, setActiveButton] = useState("market")
  const [activeButtonExpire, setActiveButtonExpire] = useState("1 day")
  return (
    
    <div className="flex flex-row max-h-full justify-center items-center gap-2">

<div className='w-1/2 h-[500px] border-0'>

<ChartDemo></ChartDemo>
{/* <iframe height="100%" width="100%" id="geckoterminal-embed" title="GeckoTerminal Embed" src="https://www.geckoterminal.com/eth/pools/0x1d42064fc4beb5f8aaf85f4617ae8b3b5b8bd801?embed=1&info=0&swaps=0&grayscale=0&light_chart=0&chart_type=price&resolution=15m" frameborder="0" allow="clipboard-write" allowfullscreen></iframe></div> */}
</div>
      {/* main cards */}
      <Card className=" w-[450px] p-3  bg-[#A4D696] border-0 mt-5 gap-1">
        <TradeFeature></TradeFeature>

        {/* limits Settings */}
    
        <div className=" px-0.5 py-1 w-full rounded-xl border-1  bg-[#D6EBD0] ">
          <div className="flex flex-col items-start px-2 py-2">
            {/* when 1 {sell token} is worth & Switch function  */}
            <div className='flex  w-full justify-between '>
              {/* sell token  */}
              <div className='text-sm'>When 1 WETH is worth</div>
              {/* switch function */}
              <div> Market :2567</div>
            </div>
            {/* input & token type */}
            <div className="flex flex-row w-full items-center justify-between gap-2">
              {/* input  */}
              <input className="text-5xl flex-1 outline-none w-[50px]" type="text" placeholder="0" />
              {/* token type  */}
              <SelectToken></SelectToken>
            </div>
            <div >
            <div className="flex gap-2">
                <Button 
                    variant={activeButton === "market" ? "default" : "outline"} 
                    size="sm"
                    onClick={() => setActiveButton("market")}
                    className={activeButton === "market" ? "bg-[#097833] text-white hover:bg-[#097833]/90" : ""}
                >
                    Market
                </Button>
                <Button 
                    variant={activeButton === "1" ? "default" : "outline"} 
                    size="sm"
                    onClick={() => setActiveButton("1")}
                    className={activeButton === "1" ? "bg-[#097833] text-white hover:bg-[#097833]/90" : ""}
                >
                    +1%
                </Button>
                <Button 
                    variant={activeButton === "5" ? "default" : "outline"} 
                    size="sm"
                    onClick={() => setActiveButton("5")}
                    className={activeButton === "5" ? "bg-[#097833] text-white hover:bg-[#097833]/90" : ""}
                >
                    +5%
                </Button>
                <Button 
                    variant={activeButton === "10" ? "default" : "outline"} 
                    size="sm"
                    onClick={() => setActiveButton("10")}
                    className={activeButton === "10" ? "bg-[#097833] text-white hover:bg-[#097833]/90" : ""}
                >
                    +10%
                </Button>
            </div>
             
            </div>

          </div>
        
           
       {/*  */}
        </div>


        {/* upper cards pair  */}
        <Card className="gap-0 py-3 bg-[#D6EBD0]">
          <div className="flex flex-col items-start px-2 ">
            
 
            {/* title  */}
            <div><h4>Sell</h4></div>
            {/* input & token type */}
            <div className="flex flex-row w-full items-center justify-between gap-2">
              {/* input  */}
              <input className="text-5xl flex-1 outline-none w-[50px]" type="text" placeholder="0" />
              {/* token type  */}
              <SelectToken></SelectToken>

            </div>
            
           
            {/* usd value  & eth value  */}
            <div className="flex flex-row w-full items-center justify-between gap-2">
            <div></div>
            <div>Balance: 0</div>


  
            </div> 
          </div>
        </Card>
        {/* lower cards pair  */}
        <Card className='py-3 bg-[#D6EBD0]'>
          <div className="flex flex-col items-start px-2 ">
            {/* title  */}
            <div><h4>Receive at least</h4></div>
            {/* input & token type */}
            <div className="flex flex-row w-full items-center justify-between gap-1">
              {/* input  */}
              <input className="text-5xl flex-1 outline-none w-[50px]" type="text" placeholder="0" />
              {/* token type  */}
              <SelectToken></SelectToken>

            </div>
            {/* usd value  & eth value  */}
            <div className="flex flex-row w-full items-center justify-between gap-1">
              <div></div>
              <div>Balance: 0</div>


            </div>
          </div>
        </Card>

        <div className="flex flex-col  py-4 items-center w-full gap-2">
          {/* expiry  */}
          <div className=' flex flex-row justify-between gap-10'>
            <div>Expiry </div>
            <div className="flex gap-2">
                <Button 
                    variant={activeButtonExpire === "1 day " ? "default" : "outline"} 
                    size="sm"
                    onClick={() => setActiveButtonExpire("1 day")}
                    className={activeButtonExpire === "1 day" ? "bg-[#097833] text-white hover:bg-[#097833]/90" : ""}
                >
                    1 Day
                </Button>
                <Button 
                    variant={activeButtonExpire === "1 week " ? "default" : "outline"} 
                    size="sm"
                    onClick={() => setActiveButtonExpire("1 week")}
                    className={activeButtonExpire === "1 week" ? "bg-[#097833] text-white hover:bg-[#097833]/90" : ""}
                >
                    1 Week  
                </Button>
                <Button 
                    variant={activeButtonExpire === "1 month" ? "default" : "outline"} 
                    size="sm"
                    onClick={() => setActiveButtonExpire("1 month")}
                    className={activeButtonExpire === "1 month" ? "bg-[#097833] text-white hover:bg-[#097833]/90" : ""}
                >
                    1 Month
                </Button>
                <Button 
                    variant={activeButtonExpire === "1 year" ? "default" : "outline"} 
                    size="sm"
                    onClick={() => setActiveButtonExpire("1 year")}
                    className={activeButtonExpire === "1 year" ? "bg-[#097833] text-white hover:bg-[#097833]/90" : ""}
                >
                    1 Year
                </Button>
            </div>
          </div>
         
          </div>
          <Button variant="default" className="rounded-lg bg-[#097833] text-white hover:bg-[#097833]/90 px-6 whitespace-nowrap">
            Confirm
          </Button>
      </Card>

    </div>
  )
}

export default Limit
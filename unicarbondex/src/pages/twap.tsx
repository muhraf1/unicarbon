import React from 'react'

import { DropdownMenu } from "@radix-ui/react-dropdown-menu";
import { Card,CardAction,CardContent } from "@/components/ui/card";
import { DropdownMenuContent } from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge"

import TradeFeature from "@/components/trade_feature";
const Twap = () => {
  return (
    <div className="flex flex-col justify-center items-center">
      <div>

      </div>
        {/* main cards */}
        <Card className=" w-[450px] p-3  bg-[#A4D696] border-0 mt-5 gap-1">
          <TradeFeature></TradeFeature>
        {/* upper cards pair  */}
        <Card className="gap-0">
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
        <Card>
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
      
        </Card>
       
        </div>
  )
}

export default Twap
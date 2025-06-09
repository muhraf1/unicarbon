"use client"
import { DropdownMenu } from "@radix-ui/react-dropdown-menu";
import { Card, CardAction, CardContent } from "@/components/ui/card";
import { DropdownMenuContent } from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge"
import SelectToken from "@/components/select_token";
import TradeFeature from "@/components/trade_feature";

export function Swap() {
  return (
    <div className="flex flex-col justify-center items-center">
      <div>

      </div>
        {/* main cards */}
        <Card className=" w-[450px] p-3  bg-[#A4D696] border-0 mt-5 gap-1">
          <TradeFeature></TradeFeature>
        {/* upper cards pair  */}
        <Card className="gap-0 bg-[#D6EBD0]">
        <div className="flex flex-col items-start px-2 ">
            {/* title  */}
            <div><h4>Sell</h4></div>
            {/* input & token type */}
            <div className="flex flex-row w-full items-center justify-between gap-2">
            {/* input  */}  
            <input className="text-5xl flex-1 outline-none w-[50px]" type="text" placeholder="0" /> 
            {/* token type  */}
            <SelectToken />
            </div> 
            {/* usd value  & eth value  */}
            <div className="flex flex-row w-full items-center justify-between gap-2">
               <div>$0</div>
               <div>0 ETH <Badge variant="outline" > Max</Badge></div>
            </div>
        </div>
        </Card>
        {/* lower cards pair  */}
        <Card className="gap-0 bg-[#D6EBD0]">
        <div className="flex flex-col items-start px-2 ">
            {/* title  */}
            <div><h4>Buy</h4></div>
            {/* input & token type */}
            <div className="flex flex-row w-full items-center justify-between gap-1">
            {/* input  */}  
            <input className="text-5xl flex-1 outline-none w-[50px]" type="text" placeholder="0" /> 
            {/* token type  */}
            <SelectToken />
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

export default Swap
"use client"
import { DropdownMenu } from "@radix-ui/react-dropdown-menu";
import { Card,CardAction,CardContent } from "./ui/card";
import { DropdownMenuContent } from "./ui/dropdown-menu";
import { Button } from "./ui/button";
import { Badge } from "@/components/ui/badge"
import { Link } from 'react-router-dom'

export function MainContext() {
    return (
        <div className="flex flex-col justify-center items-center  ">
       <div className="text-5xl text-[#0D7834] font-bold py-8" >Trade carbon anytime, <br></br> anywhere. </div>
        {/* main cards */}
        <Card className=" w-[450px] p-2  bg-[#A4D696] border-0">
        {/* upper cards pair  */}
        <Card>
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
        <Button
         variant="default" 
                        className="rounded-lg bg-[#097833] text-white hover:bg-[#097833]/90  whitespace-nowrap p-0"
        >  <Link 
        to="/swap" 
        className="h-[100px] flex items-center p-0 text-xl hover:text-gray-600 transition-colors"
    >
        Get Started
        </Link>
    </Button>
        </Card>
       
        </div>
    )}
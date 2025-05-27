"use client"

import { Button } from "@/components/ui/button";
import { Link } from 'react-router-dom'
import { Settings } from 'lucide-react';
import { useState, useEffect } from 'react';
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
  } from "@/components/ui/popover"
  import { Input } from "@/components/ui/input"


export function TradeFeature() {
    const [activeButton, setActiveButton] = useState('swap');

    useEffect(() => {
        // Get the current path and set active button accordingly
        const path = window.location.pathname.substring(1);
        setActiveButton(path || 'swap');
    }, []);

    return (
        <div className="flex flex-row ">
            <Button
                variant={activeButton === 'swap' ? 'default' : 'ghost'}
                className={activeButton === 'swap' ? 'bg-[#097833] text-white' : ''}
                onClick={() => setActiveButton('swap')}
            >
                <Link to="/swap">Swap</Link>
            </Button>
            <Button
                variant={activeButton === 'limit' ? 'default' : 'ghost'}
                className={activeButton === 'limit' ? 'bg-[#097833] text-white' : ''}
                onClick={() => setActiveButton('limit')}
            >
                <Link to="/limit">Limit</Link>
            </Button>
            <Button
                variant={activeButton === 'twap' ? 'default' : 'ghost'}
                className={activeButton === 'twap' ? 'bg-[#097833] text-white' : ''}
                onClick={() => setActiveButton('twap')}
            >
                <Link to="/twap">Twap</Link>
            </Button>
            {activeButton === 'swap' && (
                <div className="flex grow items-center justify-end-safe">
                    <Popover>
                        <PopoverTrigger asChild>
                            <Button variant="ghost" size="icon">
                                <Settings className="h-5 w-5" />
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-80 bg-[#D6EBD0] rounded-2xl mt-2" align="end" side="bottom">
                            <div className="grid gap-2">
                                <div className=" flex flex-col space-y-2">
                                    {/* slipage row  */}
                                    <div className="flex flex-row justify-between gap-3">
                                    Max Slipage 
                                    <Input placeholder="5.5%" className="text-sm w-[100px] text-wrap"></Input>
                                    </div>
                                    {/* deadline  */}
                                    <div className="flex flex-row justify-between gap-3">
                                    Swap Deadline
                                    <Input placeholder="30 Minutes" className="text-sm w-[100px] text-wrap"></Input>
                                    </div>
                                </div>
                            </div>
                        </PopoverContent>
                    </Popover>
                </div>
            )}
        </div>
    )
}

export default TradeFeature
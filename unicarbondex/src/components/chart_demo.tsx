"use client"

import { useState } from "react"
import { TrendingUp } from "lucide-react"
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"

type TimeFrame = "1h" | "1d" | "7d" | "1M"

type PriceData = {
  time: string
  price: number
}

type PoolData = {
  id: number
  poolPair: string
  feeTier: string
  tvl: string
  poolAPR: string
  oneDayVol: string
  thirtyDayVol: string
}

interface ChartDemoProps {
  currentPool?: PoolData
}

// Mock price data for different pools - you might want to fetch this from an API
const mockPriceDataByPool: Record<string, Record<TimeFrame, PriceData[]>> = {
  "USDC/ETH": {
    "1h": [
      { time: "00:00", price: 0.000620 },
      { time: "00:10", price: 0.000625 },
      { time: "00:20", price: 0.000618 },
      { time: "00:30", price: 0.000632 },
      { time: "00:40", price: 0.000615 },
      { time: "00:50", price: 0.000640 },
    ],
    "1d": [
      { time: "00:00", price: 0.000610 },
      { time: "04:00", price: 0.000620 },
      { time: "08:00", price: 0.000615 },
      { time: "12:00", price: 0.000635 },
      { time: "16:00", price: 0.000625 },
      { time: "20:00", price: 0.000645 },
    ],
    "7d": [
      { time: "Mon", price: 0.000600 },
      { time: "Tue", price: 0.000620 },
      { time: "Wed", price: 0.000610 },
      { time: "Thu", price: 0.000635 },
      { time: "Fri", price: 0.000625 },
      { time: "Sat", price: 0.000640 },
      { time: "Sun", price: 0.000630 },
    ],
    "1M": [
      { time: "Week 1", price: 0.000580 },
      { time: "Week 2", price: 0.000620 },
      { time: "Week 3", price: 0.000610 },
      { time: "Week 4", price: 0.000640 },
    ],
  },
  "WBTC/ETH": {
    "1h": [
      { time: "00:00", price: 15.50 },
      { time: "00:10", price: 15.75 },
      { time: "00:20", price: 15.25 },
      { time: "00:30", price: 16.00 },
      { time: "00:40", price: 15.10 },
      { time: "00:50", price: 16.25 },
    ],
    "1d": [
      { time: "00:00", price: 15.20 },
      { time: "04:00", price: 15.50 },
      { time: "08:00", price: 15.35 },
      { time: "12:00", price: 15.85 },
      { time: "16:00", price: 15.65 },
      { time: "20:00", price: 16.15 },
    ],
    "7d": [
      { time: "Mon", price: 14.80 },
      { time: "Tue", price: 15.20 },
      { time: "Wed", price: 15.10 },
      { time: "Thu", price: 15.85 },
      { time: "Fri", price: 15.65 },
      { time: "Sat", price: 16.00 },
      { time: "Sun", price: 15.90 },
    ],
    "1M": [
      { time: "Week 1", price: 14.50 },
      { time: "Week 2", price: 15.20 },
      { time: "Week 3", price: 15.60 },
      { time: "Week 4", price: 16.00 },
    ],
  },
  "USDT/USDC": {
    "1h": [
      { time: "00:00", price: 1.0001 },
      { time: "00:10", price: 1.0002 },
      { time: "00:20", price: 0.9999 },
      { time: "00:30", price: 1.0003 },
      { time: "00:40", price: 0.9998 },
      { time: "00:50", price: 1.0001 },
    ],
    "1d": [
      { time: "00:00", price: 1.0000 },
      { time: "04:00", price: 1.0001 },
      { time: "08:00", price: 0.9999 },
      { time: "12:00", price: 1.0002 },
      { time: "16:00", price: 1.0000 },
      { time: "20:00", price: 1.0001 },
    ],
    "7d": [
      { time: "Mon", price: 0.9999 },
      { time: "Tue", price: 1.0001 },
      { time: "Wed", price: 1.0000 },
      { time: "Thu", price: 1.0002 },
      { time: "Fri", price: 1.0001 },
      { time: "Sat", price: 1.0000 },
      { time: "Sun", price: 1.0001 },
    ],
    "1M": [
      { time: "Week 1", price: 0.9998 },
      { time: "Week 2", price: 1.0001 },
      { time: "Week 3", price: 1.0000 },
      { time: "Week 4", price: 1.0001 },
    ],
  },
  // Default fallback data
  "DEFAULT": {
    "1h": [
      { time: "00:00", price: 1850.50 },
      { time: "00:10", price: 2100.75 },
      { time: "00:20", price: 1750.25 },
      { time: "00:30", price: 2250.00 },
      { time: "00:40", price: 1650.50 },
      { time: "00:50", price: 2400.25 },
    ],
    "1d": [
      { time: "00:00", price: 1450.00 },
      { time: "04:00", price: 1850.50 },
      { time: "08:00", price: 1350.75 },
      { time: "12:00", price: 2150.25 },
      { time: "16:00", price: 1750.00 },
      { time: "20:00", price: 2450.25 },
    ],
    "7d": [
      { time: "Mon", price: 1320.75 },
      { time: "Tue", price: 1850.50 },
      { time: "Wed", price: 1450.25 },
      { time: "Thu", price: 2250.75 },
      { time: "Fri", price: 1650.50 },
      { time: "Sat", price: 2350.25 },
      { time: "Sun", price: 1950.75 },
    ],
    "1M": [
      { time: "Week 1", price: 1350.50 },
      { time: "Week 2", price: 2250.75 },
      { time: "Week 3", price: 1550.25 },
      { time: "Week 4", price: 2450.75 },
    ],
  },
}

export function ChartDemo({ currentPool }: ChartDemoProps) {
  const [timeFrame, setTimeFrame] = useState<TimeFrame>("1h")
  
  // Get pool pair name for data lookup
  const poolPair = currentPool?.poolPair || "DEFAULT"
  const poolData = mockPriceDataByPool[poolPair] || mockPriceDataByPool["DEFAULT"]
  const data = poolData[timeFrame]
  
  // Get current price (last price in the data)
  const currentPrice = data[data.length - 1]?.price || 0
  
  // Calculate price change (simple calculation for demo)
  const firstPrice = data[0]?.price || 0
  const priceChange = firstPrice !== 0 ? ((currentPrice - firstPrice) / firstPrice * 100) : 0
  const isPositive = priceChange >= 0

  const chartConfig = {
    price: {
      label: poolPair,
      color: "#008000",
    },
  }

  const handleTimeFrameChange = (value: string) => {
    setTimeFrame(value as TimeFrame)
  }

  // Format price based on pool pair
  const formatPrice = (price: number) => {
    if (poolPair.includes("USDT/USDC") || poolPair.includes("DAI/USDC")) {
      return price.toFixed(4)
    } else if (poolPair.includes("USDC/ETH")) {
      return price.toFixed(6)
    } else if (poolPair.includes("WBTC/ETH")) {
      return price.toFixed(2)
    } else {
      return price.toFixed(2)
    }
  }

  return (
    <Card className="p-4 border-0">
      <CardHeader>
        <div className="flex justify-between items-center">
          <div className="flex w-full items-start gap-2 text-sm">
            <div className="grid gap-2">
              <div className="flex items-center gap-2 font-medium leading-none">
                {poolPair}: ${formatPrice(currentPrice)}
                {isPositive ? (
                  <TrendingUp className="h-4 w-4 text-green-600" />
                ) : (
                  <TrendingUp className="h-4 w-4 text-red-600 rotate-180" />
                )}
              </div>
              <div className="flex items-center gap-2 leading-none text-muted-foreground">
                <span className={isPositive ? "text-green-600" : "text-red-600"}>
                  {isPositive ? "+" : ""}{priceChange.toFixed(2)}%
                </span>
                {" "}in the last {timeFrame}
              </div>
            </div>
          </div>
          <Select value={timeFrame} onValueChange={handleTimeFrameChange}>
            <SelectTrigger className="w-32">
              <SelectValue placeholder="Select time" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1h">1 Hour</SelectItem>
              <SelectItem value="1d">1 Day</SelectItem>
              <SelectItem value="7d">7 Days</SelectItem>
              <SelectItem value="1M">1 Month</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <AreaChart
            accessibilityLayer
            data={data}
            margin={{
              left: 12,
              right: 35,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="time"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="line" />}
            />
            <Area
              dataKey="price"
              type="natural"
              fill="var(--color-price)"
              fillOpacity={0.4}
              stroke="var(--color-price)"
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
      <CardFooter>
      </CardFooter>
    </Card>
  )
}
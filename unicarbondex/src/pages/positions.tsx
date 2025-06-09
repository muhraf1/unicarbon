import React, { useState } from 'react'
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { 
  Plus, 
  Settings, 
  ExternalLink, 
  TrendingUp, 
  TrendingDown,
  MoreVertical,
  Wallet,
  Gift,
  Users
} from 'lucide-react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

// Mock position data
const mockPositions = [
  {
    id: 1,
    token0: "USDC",
    token1: "ETH",
    fee: "0.05%",
    status: "In Range",
    minPrice: "1,200.45",
    maxPrice: "2,850.22",
    currentPrice: "2,451.33",
    liquidity: "$12,450.67",
    uncollectedFees: "$23.45",
    token0Amount: "5,234.21",
    token1Amount: "2.134",
    poolShare: "0.001%",
    apr: "12.4%",
    priceChange: "+2.3%",
    isPositive: true,
    nftId: "#542891"
  },
  {
    id: 2,
    token0: "WBTC",
    token1: "ETH",
    fee: "0.3%",
    status: "Out of Range",
    minPrice: "14.25",
    maxPrice: "18.75",
    currentPrice: "19.24",
    liquidity: "$8,234.12",
    uncollectedFees: "$156.78",
    token0Amount: "0.234",
    token1Amount: "4.567",
    poolShare: "0.003%",
    apr: "0.0%",
    priceChange: "-1.2%",
    isPositive: false,
    nftId: "#423567"
  },
  {
    id: 3,
    token0: "USDT",
    token1: "USDC",
    fee: "0.01%",
    status: "In Range",
    minPrice: "0.9985",
    maxPrice: "1.0015",
    currentPrice: "1.0001",
    liquidity: "$25,678.90",
    uncollectedFees: "$45.23",
    token0Amount: "12,834.45",
    token1Amount: "12,840.12",
    poolShare: "0.045%",
    apr: "3.2%",
    priceChange: "+0.1%",
    isPositive: true,
    nftId: "#789012"
  }
]

const Positions = () => {
  const [selectedTab, setSelectedTab] = useState<'positions' | 'pools'>('positions')
  
  const totalValue = mockPositions.reduce((sum, pos) => 
    sum + parseFloat(pos.liquidity.replace('$', '').replace(',', '')), 0
  )
  
  const totalFees = mockPositions.reduce((sum, pos) => 
    sum + parseFloat(pos.uncollectedFees.replace('$', '')), 0
  )

  const getRangeProgress = (min: string, max: string, current: string) => {
    const minVal = parseFloat(min.replace(',', ''))
    const maxVal = parseFloat(max.replace(',', ''))
    const currentVal = parseFloat(current.replace(',', ''))
    
    if (currentVal < minVal || currentVal > maxVal) return 0
    return ((currentVal - minVal) / (maxVal - minVal)) * 100
  }

  return (
    // <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-green-100 p-4" style={{background: 'linear-gradient(135deg, #D6EBD0 0%, #ffffff 50%, #D6EBD0 100%)'}}>
    <div className="min-h-screen bg-[#D6EBD0] ">
     <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-green-700 to-green-800 bg-clip-text text-transparent mb-2" style={{color: '#097833'}}>
              Positions
            </h1>
            <p className="text-gray-600">Manage your liquidity positions and track performance</p>
          </div>
          
          <div className="flex gap-3 mt-4 md:mt-0">
            {/* <Button variant="outline" className="flex items-center gap-2 border-green-300 text-green-700 hover:bg-green-50" style={{borderColor: '#A4D696', color: '#097833'}}>
              <Gift className="w-4 h-4" />
              Claim Rewards
            </Button> */}
            <Button className="flex items-center gap-2 text-white hover:opacity-90" style={{background: 'linear-gradient(135deg, #097833 0%, #A4D696 100%)'}}>
              <Plus className="w-4 h-4" />
              New Position
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="border-0 shadow-lg" style={{background: 'linear-gradient(135deg, #D6EBD0 0%, #ffffff 100%)'}}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Value</p>
                  <p className="text-2xl font-bold" style={{color: '#097833'}}>${totalValue.toLocaleString()}</p>
                </div>
                <div className="w-12 h-12 rounded-full flex items-center justify-center" style={{backgroundColor: '#A4D696'}}>
                  <Wallet className="w-6 h-6" style={{color: '#097833'}} />
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="border-0 shadow-lg" style={{background: 'linear-gradient(135deg, #A4D696 0%, #D6EBD0 100%)'}}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Uncollected Fees</p>
                  <p className="text-2xl font-bold" style={{color: '#097833'}}>${totalFees.toFixed(2)}</p>
                </div>
                <div className="w-12 h-12 rounded-full flex items-center justify-center" style={{backgroundColor: '#D6EBD0'}}>
                  <TrendingUp className="w-6 h-6" style={{color: '#097833'}} />
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="border-0 shadow-lg" style={{background: 'linear-gradient(135deg, #097833 0%, #A4D696 100%)'}}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-green-100">Active Positions</p>
                  <p className="text-2xl font-bold text-white">{mockPositions.length}</p>
                </div>
                <div className="w-12 h-12 rounded-full flex items-center justify-center" style={{backgroundColor: '#D6EBD0'}}>
                  <Users className="w-6 h-6" style={{color: '#097833'}} />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Tab Navigation */}
        <div className="flex space-x-1 p-1 rounded-lg mb-6 w-fit" style={{backgroundColor: '#D6EBD0'}}>
          <button
            onClick={() => setSelectedTab('positions')}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
              selectedTab === 'positions'
                ? 'bg-white text-green-800 shadow-sm'
                : 'text-green-700 hover:text-green-800'
            }`}
            style={selectedTab === 'positions' ? {color: '#097833'} : {color: '#097833'}}
          >
            Your Positions ({mockPositions.length})
          </button>
          <button
            onClick={() => setSelectedTab('pools')}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
              selectedTab === 'pools'
                ? 'bg-white text-green-800 shadow-sm'
                : 'text-green-700 hover:text-green-800'
            }`}
            style={selectedTab === 'pools' ? {color: '#097833'} : {color: '#097833'}}
          >
            All Pools
          </button>
        </div>

        {/* Positions List */}
        {selectedTab === 'positions' && (
          <div className="space-y-4">
            {mockPositions.length === 0 ? (
              <Card className="border-0 shadow-lg">
                <CardContent className="p-12 text-center">
                  <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4" style={{backgroundColor: '#D6EBD0'}}>
                    <Wallet className="w-8 h-8" style={{color: '#097833'}} />
                  </div>
                  <h3 className="text-lg font-semibold mb-2" style={{color: '#097833'}}>No positions found</h3>
                  <p className="text-gray-600 mb-6">Get started by creating your first liquidity position</p>
                  <Button className="text-white" style={{background: 'linear-gradient(135deg, #097833 0%, #A4D696 100%)'}}>
                    <Plus className="w-4 h-4 mr-2" />
                    Create Position
                  </Button>
                </CardContent>
              </Card>
            ) : (
              mockPositions.map((position) => (
                <Card key={position.id} className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden">
                  <CardContent className="p-0">
                    <div className="flex flex-col lg:flex-row">
                      {/* Left Section - Pool Info */}
                      <div className="lg:w-1/3 p-6" style={{background: 'linear-gradient(135deg, #D6EBD0 0%, #A4D696 100%)'}}>
                        <div className="flex items-center justify-between mb-4">
                          <div className="flex items-center space-x-3">
                            <div className="flex -space-x-2">
                              <div className="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold" style={{backgroundColor: '#097833'}}>
                                {position.token0.charAt(0)}
                              </div>
                              <div className="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold" style={{backgroundColor: '#A4D696'}}>
                                {position.token1.charAt(0)}
                              </div>
                            </div>
                            <div>
                              <h3 className="font-semibold text-lg" style={{color: '#097833'}}>
                                {position.token0}/{position.token1}
                              </h3>
                              <p className="text-sm text-green-700">{position.fee} fee tier</p>
                            </div>
                          </div>
                          
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="sm" className="hover:bg-green-100" style={{color: '#097833'}}>
                                <MoreVertical className="w-4 h-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent>
                              <DropdownMenuItem>
                                <Settings className="w-4 h-4 mr-2" />
                                Manage Position
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <ExternalLink className="w-4 h-4 mr-2" />
                                View on Explorer
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                        
                        <Badge 
                          variant={position.status === "In Range" ? "default" : "destructive"}
                          className={position.status === "In Range" 
                            ? "text-green-800 hover:bg-green-100" 
                            : "bg-red-100 text-red-800 hover:bg-red-100"
                          }
                          style={position.status === "In Range" ? {backgroundColor: '#A4D696', color: '#097833'} : {}}
                        >
                          {position.status}
                        </Badge>
                        
                        <div className="mt-4 text-xs text-green-700">
                          NFT ID: {position.nftId}
                        </div>
                      </div>

                      {/* Middle Section - Price Range */}
                      <div className="lg:w-1/3 p-6 border-l" style={{borderColor: '#A4D696'}}>
                        <h4 className="font-medium mb-4" style={{color: '#097833'}}>Price Range</h4>
                        
                        <div className="space-y-4">
                          <div className="flex justify-between items-center">
                            <span className="text-sm text-gray-600">Min Price</span>
                            <span className="font-medium" style={{color: '#097833'}}>{position.minPrice}</span>
                          </div>
                          
                          <div className="space-y-2">
                            <div className="flex justify-between items-center">
                              <span className="text-sm text-gray-600">Current Price</span>
                              <div className="flex items-center space-x-2">
                                <span className="font-medium" style={{color: '#097833'}}>{position.currentPrice}</span>
                                <span className={`text-xs ${position.isPositive ? 'text-green-600' : 'text-red-600'}`}>
                                  {position.priceChange}
                                </span>
                              </div>
                            </div>
                            <Progress 
                              value={getRangeProgress(position.minPrice, position.maxPrice, position.currentPrice)} 
                              className="h-2"
                              style={{'--progress-background': '#A4D696'} as React.CSSProperties}
                            />
                          </div>
                          
                          <div className="flex justify-between items-center">
                            <span className="text-sm text-gray-600">Max Price</span>
                            <span className="font-medium" style={{color: '#097833'}}>{position.maxPrice}</span>
                          </div>
                        </div>
                      </div>

                      {/* Right Section - Position Details */}
                      <div className="lg:w-1/3 p-6 border-l" style={{borderColor: '#A4D696'}}>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <p className="text-sm text-gray-600 mb-1">Liquidity</p>
                            <p className="font-semibold text-lg" style={{color: '#097833'}}>{position.liquidity}</p>
                          </div>
                          
                          <div>
                            <p className="text-sm text-gray-600 mb-1">APR</p>
                            <p className="font-semibold text-lg" style={{color: '#097833'}}>{position.apr}</p>
                          </div>
                          
                          <div>
                            <p className="text-sm text-gray-600 mb-1">Uncollected Fees</p>
                            <p className="font-semibold" style={{color: '#097833'}}>{position.uncollectedFees}</p>
                          </div>
                          
                          <div>
                            <p className="text-sm text-gray-600 mb-1">Pool Share</p>
                            <p className="font-semibold" style={{color: '#097833'}}>{position.poolShare}</p>
                          </div>
                        </div>
                        
                        <div className="mt-4 pt-4 border-t" style={{borderColor: '#A4D696'}}>
                          <div className="text-xs text-gray-600 space-y-1">
                            <div className="flex justify-between">
                              <span>{position.token0}:</span>
                              <span>{position.token0Amount}</span>
                            </div>
                            <div className="flex justify-between">
                              <span>{position.token1}:</span>
                              <span>{position.token1Amount}</span>
                            </div>
                          </div>
                        </div>

                        <div className="flex space-x-2 mt-4">
                          <Button size="sm" variant="outline" className="flex-1 border-green-300 text-green-700 hover:bg-green-50" style={{borderColor: '#A4D696', color: '#097833'}}>
                            Collect Fees
                          </Button>
                          <Button size="sm" className="flex-1 text-white" style={{background: 'linear-gradient(135deg, #097833 0%, #A4D696 100%)'}}>
                            Manage
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </div>
        )}

        {/* Pools Tab Content */}
        {selectedTab === 'pools' && (
          <Card className="border-0 shadow-lg">
            <CardContent className="p-12 text-center">
              <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4" style={{background: 'linear-gradient(135deg, #D6EBD0 0%, #A4D696 100%)'}}>
                <Users className="w-8 h-8" style={{color: '#097833'}} />
              </div>
              <h3 className="text-lg font-semibold mb-2" style={{color: '#097833'}}>Explore Pools</h3>
              <p className="text-gray-600 mb-6">Browse available liquidity pools to find opportunities</p>
              <Button className="text-white" style={{background: 'linear-gradient(135deg, #097833 0%, #A4D696 100%)'}}>
                Browse Pools
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}

export default Positions
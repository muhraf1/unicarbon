import { Card } from "@/components/ui/card"
import { useNavigate } from "react-router-dom"
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table"
   
  const pools = [
    {
      id: 1,
      poolPair: "WETH/USDC",
      feeTier: "0.05%",
      tvl: "$10,250,000",
      poolAPR: "4.2%",
      oneDayVol: "$1,250,000",
      thirtyDayVol: "$32,500,000",
    },
    {
      id: 2,
      poolPair: "WETH/USDcar",
      feeTier: "0.3%",
      tvl: "$8,750,000",
      poolAPR: "5.1%",
      oneDayVol: "$950,000",
      thirtyDayVol: "$28,400,000",
    },
    {
      id: 3,
      poolPair: "USDC/USDcar",
      feeTier: "0.01%",
      tvl: "$15,300,000",
      poolAPR: "1.8%",
      oneDayVol: "$3,200,000",
      thirtyDayVol: "$76,500,000",
    },
    {
      id: 4,
      poolPair: "WETH/CAR",
      feeTier: "0.3%",
      tvl: "$7,800,000",
      poolAPR: "4.5%",
      oneDayVol: "$1,100,000",
      thirtyDayVol: "$25,600,000",
    },
    {
      id: 5,
      poolPair: "USDC/CAR",
      feeTier: "0.3%",
      tvl: "$4,500,000",
      poolAPR: "6.2%",
      oneDayVol: "$850,000",
      thirtyDayVol: "$18,900,000",
    },
    {
      id: 6,
      poolPair: "USDcar/CAR",
      feeTier: "0.3%",
      tvl: "$3,200,000",
      poolAPR: "4.8%",
      oneDayVol: "$520,000",
      thirtyDayVol: "$12,400,000",
    }
  ]

const Explore = () => {
  const navigate = useNavigate()

  const handleRowClick = (poolId: number) => {
    // Navigate to pool page with the pool ID as a parameter
    navigate(`/pool/${poolId}`)
  }

  return (
    <div className="w-full px-10 flex flex-row justify-center" style={{backgroundColor: '#D6EBD0'}}>
      <Card className="flex self-center w-[800px] py-0 border-2" style={{borderColor: '#097833', backgroundColor: 'white'}}>
        <Table className="">
          <TableHeader style={{backgroundColor: '#A4D696'}}>
            <TableRow>
              <TableHead className="w-[50px] rounded-tl-xl font-semibold" style={{color: '#097833'}}>
                #
              </TableHead>
              <TableHead className="font-semibold" style={{color: '#097833'}}>
                Pool Pair
              </TableHead>
              <TableHead className="font-semibold" style={{color: '#097833'}}>
                Fee Tier
              </TableHead>
              <TableHead className="font-semibold" style={{color: '#097833'}}>
                TVL
              </TableHead>
              <TableHead className="font-semibold" style={{color: '#097833'}}>
                Pool APR
              </TableHead>
              <TableHead className="font-semibold" style={{color: '#097833'}}>
                1d Vol
              </TableHead>
              <TableHead className="text-right rounded-tr-xl font-semibold" style={{color: '#097833'}}>
                30d Vol
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody className="text-xs text-left">
            {pools.map((pool, index) => (
              <TableRow 
                key={pool.id}
                onClick={() => handleRowClick(pool.id)}
                className="cursor-pointer transition-colors border-b"
                style={{
                  backgroundColor: index % 2 === 0 ? 'white' : '#D6EBD0',
                  borderBottomColor: '#A4D696'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = '#A4D696'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = index % 2 === 0 ? 'white' : '#D6EBD0'
                }}
              >
                <TableCell className="font-medium" style={{color: '#097833'}}>
                  {pool.id}
                </TableCell>
                <TableCell style={{color: '#097833'}}>
                  {pool.poolPair}
                </TableCell>
                <TableCell style={{color: '#097833'}}>
                  {pool.feeTier}
                </TableCell>
                <TableCell style={{color: '#097833'}}>
                  {pool.tvl}
                </TableCell>
                <TableCell style={{color: '#097833'}}>
                  {pool.poolAPR}
                </TableCell>
                <TableCell style={{color: '#097833'}}>
                  {pool.oneDayVol}
                </TableCell>
                <TableCell className="text-right" style={{color: '#097833'}}>
                  {pool.thirtyDayVol}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </div>
  )
}

export default Explore
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Card, CardAction, CardContent } from "./ui/card";
import { Button } from "./ui/button"
import { Label } from "@radix-ui/react-dropdown-menu"
import { Input } from "@/components/ui/input"




const SelectToken = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="default"
          className="rounded-lg bg-[#097833] text-white hover:bg-[#097833]/90 px-6 whitespace-nowrap" >Select token </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] bg-[#D6EBD0]">
        <DialogHeader>
          <DialogTitle>Select a Token</DialogTitle>
          <DialogDescription>

          </DialogDescription>
        </DialogHeader>


        <div className="flex flex-col gap-2">
          {/* carbon token */}
          <div>
            <label > Carbon Token </label>
            <Card className="flex flex-row p-0 py-2 border-0">
              {/* logo */}
              <img
                src="https://coin-images.coingecko.com/coins/images/38094/large/char_logo_toucan.png?1716488453"
                width={50}
                height={50}
              />
              {/* token name  */}
              <div className="flex flex-col">
                <Label>Biochar</Label>
                <div className="flex flex-row  gap-1">
                  <p className="font-semibold text-gray-600">
                    CHAR
                  </p>
                  <p className="text-wrap w-[200px]">
                    {"0x50e8...58345"}
                  </p>
                </div>

              </div>
            </Card>


          </div>
          {/* stablecoins */}
          <div>
            <label > Stablecoins Token </label>
            <Card className="flex flex-row p-0 py-2 border-0">
              {/* logo */}
              <img
                src="https://s2.coinmarketcap.com/static/img/coins/64x64/3408.png"
                width={50}
                height={50}
              />
              {/* token name  */}
              <div className="flex flex-col">
                <Label>USDC</Label>
                <div className="flex flex-row  gap-1">
                  <p className="font-semibold text-gray-600">
                    USDC
                  </p>
                  <p className="text-wrap w-[200px]">
                    {"0x50e8...58345"}
                  </p>
                </div>

              </div>
            </Card>


          </div>

        </div>

      </DialogContent>
    </Dialog>
  )
}

export default SelectToken
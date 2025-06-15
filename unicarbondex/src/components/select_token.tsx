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



interface Token {
  name: string;
  symbol: string;
  address: string;
  logo: string;
  type: string;
}

interface SelectTokenProps {
  onSelect: (token: Token) => void;
  selectedToken?: Token;
}

const SelectToken: React.FC<SelectTokenProps> = ({ onSelect, selectedToken }) => {
  const tokens = [
    {
      name: "Wrapped ETH",
      symbol: "WETH",
      address: "0x4200000000000000000000000000000000000006",
      logo: "https://s2.coinmarketcap.com/static/img/coins/64x64/2396.png",
      type: "Wraped Token"
    },
    {
      name: "USDC",
      symbol: "USDC",
      address: "0x67ce6DA63B1181557493A4A3D17b2Cfbfa7D54A1",
      logo: "https://s2.coinmarketcap.com/static/img/coins/64x64/3408.png",
      type: "Stablecoins Token"
    }
  ];

  return (
    <Dialog>
      <DialogTrigger asChild>
        {selectedToken ? (
          <Button variant="default" className="rounded-lg bg-[#097833] text-white hover:bg-[#097833]/90 px-6 whitespace-nowrap flex items-center gap-2">
            <img
              src={selectedToken.logo}
              width={24}
              height={24}
              alt={selectedToken.name}
              className="rounded-full"
            />
            <span>{selectedToken.symbol}</span>
          </Button>
        ) : (
          <Button variant="default"
            className="rounded-lg bg-[#097833] text-white hover:bg-[#097833]/90 px-6 whitespace-nowrap">Select token</Button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] bg-[#D6EBD0]">
        <DialogHeader>
          <DialogTitle>Select a Token</DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>

        <div className="flex flex-col gap-2">
          {tokens.map((token) => (
            <div key={token.symbol}>
              <label> {token.type} </label>
              <Card 
                className="flex flex-row p-0 py-2 border-0 cursor-pointer hover:bg-[#A4D696] transition-colors"
                onClick={() => onSelect(token)}
              >
                <img
                  src={token.logo}
                  width={50}
                  height={50}
                  alt={token.name}
                />
                <div className="flex flex-col">
                  <Label>{token.name}</Label>
                  <div className="flex flex-row gap-1">
                    <p className="font-semibold text-gray-600">{token.symbol}</p>
                    <p className="text-wrap truncate w-[200px]">{token.address}</p>
                  </div>
                </div>
              </Card>
            </div>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SelectToken;
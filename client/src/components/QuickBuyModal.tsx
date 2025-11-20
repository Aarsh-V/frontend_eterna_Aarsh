// import { useState } from "react";
// import {
//   Dialog,
//   DialogContent,
//   DialogDescription,
//   DialogFooter,
//   DialogHeader,
//   DialogTitle,
// } from "@/components/ui/dialog";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import { Badge } from "@/components/ui/badge";
// import type { Token } from "@shared/schema";
// import { formatPrice, formatMarketCap, truncateAddress } from "@/lib/formatters";
// import { Copy, ExternalLink, AlertTriangle } from "lucide-react";
// import { useToast } from "@/hooks/use-toast";

// interface QuickBuyModalProps {
//   token: Token | null;
//   open: boolean;
//   onClose: () => void;
// }

// export function QuickBuyModal({ token, open, onClose }: QuickBuyModalProps) {
//   const [amount, setAmount] = useState("0.1");
//   const [slippage, setSlippage] = useState("2");
//   const { toast } = useToast();

//   if (!token) return null;

//   const handleCopyAddress = () => {
//     navigator.clipboard.writeText(token.contractAddress);
//     toast({
//       title: "Address copied",
//       description: "Contract address copied to clipboard",
//     });
//   };

//   const handleQuickBuy = () => {
//     toast({
//       title: "Trade executed",
//       description: `Successfully bought ${amount} SOL worth of ${token.symbol}`,
//     });
//     onClose();
//   };

//   return (
//     <Dialog open={open} onOpenChange={onClose}>
//       <DialogContent className="sm:max-w-[500px] bg-card border-border" data-testid="modal-quick-buy">
//         <DialogHeader>
//           <DialogTitle className="flex items-center gap-3">
//             {token.logo && (
//               <img
//                 src={token.logo}
//                 alt={token.symbol}
//                 className="h-10 w-10 rounded-full"
//                 data-testid="img-token-logo"
//               />
//             )}
//             <div>
//               <div className="font-bold text-lg" data-testid="text-token-symbol">{token.symbol}</div>
//               <div className="text-sm text-muted-foreground font-normal" data-testid="text-token-name">{token.name}</div>
//             </div>
//           </DialogTitle>
//           <DialogDescription className="space-y-2 pt-2">
//             <div className="flex items-center justify-between text-xs">
//               <span className="text-muted-foreground">Contract</span>
//               <div className="flex items-center gap-2">
//                 <code className="font-mono bg-muted px-2 py-1 rounded" data-testid="text-contract-address">
//                   {truncateAddress(token.contractAddress)}
//                 </code>
//                 <Button
//                   size="icon"
//                   variant="ghost"
//                   className="h-6 w-6"
//                   onClick={handleCopyAddress}
//                   data-testid="button-copy-address"
//                 >
//                   <Copy className="h-3 w-3" />
//                 </Button>
//               </div>
//             </div>
//             <div className="flex items-center justify-between">
//               <span className="text-sm text-muted-foreground">Market Cap</span>
//               <span className="font-mono font-medium" data-testid="text-market-cap">{formatMarketCap(token.marketCap)}</span>
//             </div>
//             <div className="flex items-center justify-between">
//               <span className="text-sm text-muted-foreground">Price</span>
//               <span className="font-mono font-medium" data-testid="text-price">${formatPrice(token.price)}</span>
//             </div>
//             <div className="flex items-center justify-between">
//               <span className="text-sm text-muted-foreground">Risk Level</span>
//               <Badge
//                 variant={token.riskLevel === 'low' ? 'default' : token.riskLevel === 'medium' ? 'secondary' : 'destructive'}
//                 className="text-xs"
//                 data-testid={`badge-risk-${token.riskLevel}`}
//               >
//                 {token.riskLevel.toUpperCase()}
//               </Badge>
//             </div>
//           </DialogDescription>
//         </DialogHeader>

//         {token.riskLevel === 'high' && (
//           <div className="bg-destructive/10 border border-destructive/20 rounded-md p-3 flex items-start gap-2">
//             <AlertTriangle className="h-4 w-4 text-destructive mt-0.5" />
//             <div className="flex-1 text-sm">
//               <div className="font-medium text-destructive">High Risk Token</div>
//               <div className="text-muted-foreground text-xs mt-1">
//                 This token has high risk indicators. Trade with caution.
//               </div>
//             </div>
//           </div>
//         )}

//         <div className="space-y-4 py-4">
//           <div className="space-y-2">
//             <Label htmlFor="amount">Amount (SOL)</Label>
//             <Input
//               id="amount"
//               type="number"
//               value={amount}
//               onChange={(e) => setAmount(e.target.value)}
//               placeholder="0.1"
//               className="font-mono"
//               data-testid="input-amount"
//             />
//           </div>
//           <div className="space-y-2">
//             <Label htmlFor="slippage">Slippage Tolerance (%)</Label>
//             <div className="flex gap-2">
//               {['1', '2', '5'].map((value) => (
//                 <Button
//                   key={value}
//                   variant={slippage === value ? 'default' : 'outline'}
//                   size="sm"
//                   onClick={() => setSlippage(value)}
//                   className="flex-1"
//                   data-testid={`button-slippage-${value}`}
//                 >
//                   {value}%
//                 </Button>
//               ))}
//               <Input
//                 id="slippage"
//                 type="number"
//                 value={slippage}
//                 onChange={(e) => setSlippage(e.target.value)}
//                 className="w-20 font-mono"
//                 data-testid="input-slippage-custom"
//               />
//             </div>
//           </div>
//         </div>

//         <DialogFooter className="gap-2">
//           <Button variant="outline" onClick={onClose} data-testid="button-cancel">
//             Cancel
//           </Button>
//           <Button onClick={handleQuickBuy} className="gap-2" data-testid="button-confirm-buy">
//             <ExternalLink className="h-4 w-4" />
//             Execute Trade
//           </Button>
//         </DialogFooter>
//       </DialogContent>
//     </Dialog>
//   );
// }
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import type { Token } from "@shared/schema";
import { formatPrice, formatMarketCap, truncateAddress } from "@/lib/formatters";
import { Copy, ExternalLink, AlertTriangle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface QuickBuyModalProps {
  token: Token | null;
  open: boolean;
  onClose: () => void;
}

export function QuickBuyModal({ token, open, onClose }: QuickBuyModalProps) {
  const [amount, setAmount] = useState("0.1");
  const [slippage, setSlippage] = useState("2");
  const { toast } = useToast();
  if (!token) return null;

  const handleCopyAddress = () => {
    navigator.clipboard.writeText(token.contractAddress);
    toast({ title: "Address copied", description: "Contract address copied to clipboard" });
  };

  const handleQuickBuy = () => {
    toast({ title: "Trade executed", description: `Bought ${amount} SOL worth of ${token.symbol}` });
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px] bg-card border border-border">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-3">
            {token.logo && <img src={token.logo} alt={token.symbol} className="h-10 w-10 rounded-full" />}
            <div>
              <div className="font-bold text-lg">{token.symbol}</div>
              <div className="text-sm text-muted-foreground">{token.name}</div>
            </div>
          </DialogTitle>
          <DialogDescription className="space-y-2 pt-2">
            <div className="flex justify-between items-center text-xs">
              <span>Contract</span>
              <div className="flex items-center gap-2">
                <code className="font-mono bg-muted px-2 py-1 rounded">{truncateAddress(token.contractAddress)}</code>
                <Button size="icon" variant="ghost" className="h-6 w-6" onClick={handleCopyAddress}><Copy className="h-3 w-3" /></Button>
              </div>
            </div>
            <div className="flex justify-between"><span>Market Cap</span><span className="font-mono font-medium">{formatMarketCap(token.marketCap)}</span></div>
            <div className="flex justify-between"><span>Price</span><span className="font-mono font-medium">${formatPrice(token.price)}</span></div>
            <div className="flex justify-between items-center">
              <span>Risk Level</span>
              <Badge variant={token.riskLevel === 'low' ? 'default' : token.riskLevel === 'medium' ? 'secondary' : 'destructive'}>{token.riskLevel.toUpperCase()}</Badge>
            </div>
          </DialogDescription>
        </DialogHeader>

        {token.riskLevel === 'high' && (
          <div className="bg-destructive/10 border border-destructive/20 rounded-md p-3 flex items-start gap-2">
            <AlertTriangle className="h-4 w-4 text-destructive mt-0.5" />
            <div className="text-sm flex-1">
              <div className="font-medium text-destructive">High Risk Token</div>
              <div className="text-muted-foreground text-xs mt-1">This token has high risk indicators. Trade with caution.</div>
            </div>
          </div>
        )}

        <div className="space-y-4 py-4">
          <div>
            <Label htmlFor="amount">Amount (SOL)</Label>
            <Input id="amount" type="number" value={amount} onChange={(e) => setAmount(e.target.value)} placeholder="0.1" className="font-mono" />
          </div>
          <div>
            <Label htmlFor="slippage">Slippage (%)</Label>
            <div className="flex gap-2 mt-1">
              {['1','2','5'].map(v => (
                <Button key={v} size="sm" variant={slippage===v?'default':'outline'} className="flex-1" onClick={()=>setSlippage(v)}>{v}%</Button>
              ))}
              <Input id="slippage" type="number" value={slippage} onChange={(e)=>setSlippage(e.target.value)} className="w-20 font-mono"/>
            </div>
          </div>
        </div>

        <DialogFooter className="gap-2">
          <Button variant="outline" onClick={onClose}>Cancel</Button>
          <Button onClick={handleQuickBuy} className="gap-2"><ExternalLink className="h-4 w-4"/> Execute Trade</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

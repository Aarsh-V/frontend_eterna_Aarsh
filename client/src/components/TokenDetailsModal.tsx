

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import type { Token } from "@shared/schema";
import {
  formatPrice,
  formatMarketCap,
  formatAge,
  formatNumber,
  formatPercentage,
  truncateAddress,
} from "@/lib/formatters";
import { Copy } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

interface TokenDetailsModalProps {
  token: Token | null;
  open: boolean;
  onClose: () => void;
}

export function TokenDetailsModal({
  token,
  open,
  onClose,
}: TokenDetailsModalProps) {
  const { toast } = useToast();

  if (!token) return null;

  const handleCopyAddress = () => {
    navigator.clipboard.writeText(token.contractAddress);
    toast({
      title: "Address copied",
      description: "Contract address copied to clipboard",
    });
  };

  const progress = token.bondingCurveProgress ?? null;

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent
        className="sm:max-w-[600px] bg-card border-border max-h-[80vh] overflow-y-auto"
        data-testid="modal-token-details"
      >
        <DialogHeader>
          <DialogTitle className="flex items-center gap-3">
            {token.logo && (
              <img
                src={token.logo}
                alt={token.symbol}
                className="h-12 w-12 rounded-full"
                data-testid="img-token-logo"
              />
            )}
            <div>
              <div
                className="font-bold text-xl"
                data-testid="text-token-symbol"
              >
                {token.symbol}
              </div>
              <div
                className="text-sm text-muted-foreground font-normal"
                data-testid="text-token-name"
              >
                {token.name}
              </div>
            </div>
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Contract Info */}
          <div className="space-y-3">
            <h3 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
              Contract Information
            </h3>

            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Address</span>
              <div className="flex items-center gap-2">
                <code
                  className="font-mono text-sm bg-muted px-2 py-1 rounded"
                  data-testid="text-contract-address"
                >
                  {truncateAddress(token.contractAddress, 8, 6)}
                </code>
                <Button
                  size="icon"
                  variant="ghost"
                  className="h-7 w-7"
                  onClick={handleCopyAddress}
                  data-testid="button-copy-address"
                >
                  <Copy className="h-3 w-3" />
                </Button>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Age</span>
              <span className="font-medium" data-testid="text-age">
                {formatAge(token.age)}
              </span>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Category</span>
              <Badge variant="outline" data-testid="badge-category">
                {token.category?.replace("_", " ").toUpperCase() ?? "N/A"}
              </Badge>
            </div>
          </div>

          <Separator />

          {/* Market Metrics */}
          <div className="space-y-3">
            <h3 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
              Market Metrics
            </h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <div className="text-xs text-muted-foreground mb-1">Price</div>
                <div
                  className="font-mono font-bold text-lg"
                  data-testid="text-price"
                >
                  ${formatPrice(token.price)}
                </div>
              </div>

              <div>
                <div className="text-xs text-muted-foreground mb-1">
                  24h Change
                </div>
                <div
                  className={`font-bold text-lg ${
                    token.priceChange24h > 0 ? "text-bullish" : "text-bearish"
                  }`}
                  data-testid="text-price-change"
                >
                  {formatPercentage(token.priceChange24h)}
                </div>
              </div>

              <div>
                <div className="text-xs text-muted-foreground mb-1">
                  Market Cap
                </div>
                <div
                  className="font-mono font-medium"
                  data-testid="text-market-cap"
                >
                  {formatMarketCap(token.marketCap)}
                </div>
              </div>

              <div>
                <div className="text-xs text-muted-foreground mb-1">
                  Liquidity
                </div>
                <div
                  className="font-mono font-medium"
                  data-testid="text-liquidity"
                >
                  {formatMarketCap(token.liquidity)}
                </div>
              </div>

              <div>
                <div className="text-xs text-muted-foreground mb-1">
                  24h Volume
                </div>
                <div
                  className="font-mono font-medium"
                  data-testid="text-volume"
                >
                  {formatMarketCap(token.volume24h)}
                </div>
              </div>

              <div>
                <div className="text-xs text-muted-foreground mb-1">
                  Transactions
                </div>
                <div className="font-medium" data-testid="text-tx-count">
                  {formatNumber(token.txCount)}
                </div>
              </div>
            </div>
          </div>

          <Separator />

          {/* Holder Analysis */}
          <div className="space-y-3">
            <h3 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
              Holder Analysis
            </h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <div className="text-xs text-muted-foreground mb-1">
                  Total Holders
                </div>
                <div className="font-medium" data-testid="text-holders">
                  {formatNumber(token.holderCount)}
                </div>
              </div>

              <div>
                <div className="text-xs text-muted-foreground mb-1">
                  Top Holder %
                </div>
                <div className="font-medium" data-testid="text-top-holder">
                  {token.topHolderPercentage?.toFixed(2) ?? "0"}%
                </div>
              </div>

              <div>
                <div className="text-xs text-muted-foreground mb-1">
                  Snipers %
                </div>
                <div
                  className={`font-medium ${
                    token.snipersPercentage && token.snipersPercentage > 20
                      ? "text-warning"
                      : ""
                  }`}
                  data-testid="text-snipers"
                >
                  {token.snipersPercentage?.toFixed(2) ?? "0"}%
                </div>
              </div>

              <div>
                <div className="text-xs text-muted-foreground mb-1">
                  Risk Level
                </div>
                <Badge
                  variant={
                    token.riskLevel === "low"
                      ? "default"
                      : token.riskLevel === "medium"
                      ? "secondary"
                      : "destructive"
                  }
                  data-testid={`badge-risk-${token.riskLevel ?? "low"}`}
                >
                  {token.riskLevel?.toUpperCase() ?? "LOW"}
                </Badge>
              </div>
            </div>
          </div>

          {/* Bonding Curve Progress */}
          {progress != null && (
            <>
              <Separator />
              <div className="space-y-3">
                <h3 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
                  Bonding Curve Progress
                </h3>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Progress</span>
                    <span
                      className="font-medium"
                      data-testid="text-bonding-progress"
                    >
                      {progress.toFixed(1)}%
                    </span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div
                      className="bg-primary h-2 rounded-full transition-all duration-300"
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}

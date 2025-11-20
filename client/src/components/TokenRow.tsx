

import { memo, useEffect } from "react";
import { flexRender, type Row } from "@tanstack/react-table";
import type { Token } from "@shared/schema";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { clearFlash } from "@/store/pulseSlice";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";
import { Zap } from "lucide-react";



interface TokenRowProps {
  row: Row<Token>;
  onQuickBuy: (token: Token) => void;
  onRowClick: (token: Token) => void;
}

function TokenRowComponent({ row, onQuickBuy, onRowClick }: TokenRowProps) {
  const dispatch = useAppDispatch();
  const flashState = useAppSelector(
    (state) => state.pulse.flashingTokens?.[row.original.id]
  );

  useEffect(() => {
    if (flashState) {
      const timer = setTimeout(() => {
        dispatch(clearFlash(row.original.id));
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [flashState, dispatch, row.original.id]);

  const handleRowClick = () => {
    onRowClick?.(row.original);
  };

  return (
    <tr
      className={`
        border-b border-border hover:bg-muted/30 transition-colors duration-150 cursor-pointer group
        ${flashState === "green" ? "animate-price-flash-green" : ""}
        ${flashState === "red" ? "animate-price-flash-red" : ""}
      `}
      onClick={handleRowClick}
      data-testid={`row-token-${row.original.id}`}
    >
      {row.getVisibleCells().map((cell) => (
        <td
          key={cell.id}
          className="px-4 py-3 text-sm"
          style={{
            width: cell.column.getSize(),
            minWidth: cell.column.getSize(),
          }}
          data-testid={`cell-${cell.column.id}`}
        >
          {cell.column.id === "quickBuy" ? (
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  size="icon"
                  variant="ghost"
                  className="h-9 w-9 rounded-full hover:bg-quickbuy/10 transition-colors"
                  onClick={(e) => {
                    e.stopPropagation();
                    onQuickBuy?.(row.original);
                  }}
                  data-testid={`button-quick-buy-${row.original.id}`}
                >
                  <Zap className="h-5 w-5 text-quickbuy fill-quickbuy" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Quick Buy {row.original.symbol ?? "Token"}</p>
              </TooltipContent>
            </Tooltip>
          ) : (
            flexRender(cell.column.columnDef.cell, cell.getContext())
          )}
        </td>
      ))}
    </tr>
  );
}

export const TokenRow = memo(TokenRowComponent);

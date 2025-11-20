import { useMemo, useCallback, useState, useEffect } from "react";
import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  flexRender,
  type ColumnDef,
  type SortingState,
} from "@tanstack/react-table";
import type { Token } from "@shared/schema";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { setSortConfig, setSelectedToken } from "@/store/pulseSlice";
import { formatMarketCap, formatPrice, formatAge, formatPercentage, truncateAddress } from "@/lib/formatters";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { Badge } from "@/components/ui/badge";
import { ArrowUpDown, ArrowUp, ArrowDown } from "lucide-react";
import { TokenRow } from "./TokenRow";
import { QuickBuyModal } from "./QuickBuyModal";

interface TokenTableProps {
  tokens: Token[];
}

export function TokenTable({ tokens }: TokenTableProps) {
  const dispatch = useAppDispatch();
  const sortConfig = useAppSelector((state) => state.pulse.sortConfig);
  const [quickBuyToken, setQuickBuyToken] = useState<Token | null>(null);

  const columns = useMemo<ColumnDef<Token>[]>(
    () => [
      {
        id: 'token',
        accessorKey: 'symbol',
        header: () => <div className="text-left">Token</div>,
        cell: ({ row }) => (
          <div className="flex items-center gap-3" data-testid={`cell-token-${row.original.id}`}>
            {row.original.logo ? (
              <img
                src={row.original.logo}
                alt={row.original.symbol}
                className="h-10 w-10 rounded-full bg-muted"
                data-testid={`img-token-logo-${row.original.id}`}
              />
            ) : (
              <div className="h-10 w-10 rounded-full bg-muted flex items-center justify-center text-xs font-bold">
                {row.original.symbol.slice(0, 2)}
              </div>
            )}
            <div>
              <div className="font-bold" data-testid={`text-symbol-${row.original.id}`}>{row.original.symbol}</div>
              <div className="text-xs text-muted-foreground" data-testid={`text-name-${row.original.id}`}>{row.original.name}</div>
            </div>
          </div>
        ),
        size: 200,
      },
      {
        id: 'contractAddress',
        accessorKey: 'contractAddress',
        header: () => <div className="text-left">CA</div>,
        cell: ({ row }) => (
          <Tooltip>
            <TooltipTrigger asChild>
              <code
                className="font-mono text-xs bg-muted px-2 py-1 rounded cursor-pointer hover:bg-muted/80 transition-colors"
                data-testid={`text-contract-${row.original.id}`}
              >
                {truncateAddress(row.original.contractAddress)}
              </code>
            </TooltipTrigger>
            <TooltipContent>
              <p className="font-mono text-xs">{row.original.contractAddress}</p>
            </TooltipContent>
          </Tooltip>
        ),
        size: 120,
      },
      {
        id: 'age',
        accessorKey: 'age',
        header: ({ column }) => (
          <button
            className="flex items-center gap-1 hover:text-foreground transition-colors"
            onClick={() => column.toggleSorting()}
            data-testid="header-age"
          >
            Age
            {column.getIsSorted() === 'asc' ? <ArrowUp className="h-3 w-3" /> : column.getIsSorted() === 'desc' ? <ArrowDown className="h-3 w-3" /> : <ArrowUpDown className="h-3 w-3" />}
          </button>
        ),
        cell: ({ row }) => (
          <span className="text-muted-foreground" data-testid={`text-age-${row.original.id}`}>
            {formatAge(row.original.age)}
          </span>
        ),
        size: 80,
      },
      {
        id: 'marketCap',
        accessorKey: 'marketCap',
        header: ({ column }) => (
          <button
            className="flex items-center gap-1 hover:text-foreground transition-colors"
            onClick={() => column.toggleSorting()}
            data-testid="header-marketcap"
          >
            Market Cap
            {column.getIsSorted() === 'asc' ? <ArrowUp className="h-3 w-3" /> : column.getIsSorted() === 'desc' ? <ArrowDown className="h-3 w-3" /> : <ArrowUpDown className="h-3 w-3" />}
          </button>
        ),
        cell: ({ row }) => (
          <span className="font-mono" data-testid={`text-marketcap-${row.original.id}`}>
            {formatMarketCap(row.original.marketCap)}
          </span>
        ),
        size: 120,
      },
      {
        id: 'liquidity',
        accessorKey: 'liquidity',
        header: ({ column }) => (
          <button
            className="flex items-center gap-1 hover:text-foreground transition-colors"
            onClick={() => column.toggleSorting()}
            data-testid="header-liquidity"
          >
            Liquidity
            {column.getIsSorted() === 'asc' ? <ArrowUp className="h-3 w-3" /> : column.getIsSorted() === 'desc' ? <ArrowDown className="h-3 w-3" /> : <ArrowUpDown className="h-3 w-3" />}
          </button>
        ),
        cell: ({ row }) => (
          <span className="font-mono" data-testid={`text-liquidity-${row.original.id}`}>
            {formatMarketCap(row.original.liquidity)}
          </span>
        ),
        size: 120,
      },
      {
        id: 'volume24h',
        accessorKey: 'volume24h',
        header: ({ column }) => (
          <button
            className="flex items-center gap-1 hover:text-foreground transition-colors"
            onClick={() => column.toggleSorting()}
            data-testid="header-volume"
          >
            Volume 24h
            {column.getIsSorted() === 'asc' ? <ArrowUp className="h-3 w-3" /> : column.getIsSorted() === 'desc' ? <ArrowDown className="h-3 w-3" /> : <ArrowUpDown className="h-3 w-3" />}
          </button>
        ),
        cell: ({ row }) => (
          <span className="font-mono" data-testid={`text-volume-${row.original.id}`}>
            {formatMarketCap(row.original.volume24h)}
          </span>
        ),
        size: 120,
      },
      {
        id: 'price',
        accessorKey: 'price',
        header: ({ column }) => (
          <button
            className="flex items-center gap-1 hover:text-foreground transition-colors"
            onClick={() => column.toggleSorting()}
            data-testid="header-price"
          >
            Price
            {column.getIsSorted() === 'asc' ? <ArrowUp className="h-3 w-3" /> : column.getIsSorted() === 'desc' ? <ArrowDown className="h-3 w-3" /> : <ArrowUpDown className="h-3 w-3" />}
          </button>
        ),
        cell: ({ row }) => (
          <span className="font-mono" data-testid={`text-price-${row.original.id}`}>
            ${formatPrice(row.original.price)}
          </span>
        ),
        size: 120,
      },
      {
        id: 'priceChange24h',
        accessorKey: 'priceChange24h',
        header: ({ column }) => (
          <button
            className="flex items-center gap-1 hover:text-foreground transition-colors"
            onClick={() => column.toggleSorting()}
            data-testid="header-price-change"
          >
            24h %
            {column.getIsSorted() === 'asc' ? <ArrowUp className="h-3 w-3" /> : column.getIsSorted() === 'desc' ? <ArrowDown className="h-3 w-3" /> : <ArrowUpDown className="h-3 w-3" />}
          </button>
        ),
        cell: ({ row }) => (
          <span
            className={`font-bold ${row.original.priceChange24h > 0 ? 'text-bullish' : 'text-bearish'}`}
            data-testid={`text-price-change-${row.original.id}`}
          >
            {formatPercentage(row.original.priceChange24h)}
          </span>
        ),
        size: 100,
      },
      {
        id: 'holderCount',
        accessorKey: 'holderCount',
        header: ({ column }) => (
          <button
            className="flex items-center gap-1 hover:text-foreground transition-colors"
            onClick={() => column.toggleSorting()}
            data-testid="header-holders"
          >
            Holders
            {column.getIsSorted() === 'asc' ? <ArrowUp className="h-3 w-3" /> : column.getIsSorted() === 'desc' ? <ArrowDown className="h-3 w-3" /> : <ArrowUpDown className="h-3 w-3" />}
          </button>
        ),
        cell: ({ row }) => (
          <span className="text-foreground/90" data-testid={`text-holders-${row.original.id}`}>
            {row.original.holderCount.toLocaleString()}
          </span>
        ),
        size: 100,
      },
      {
        id: 'topHolderPercentage',
        accessorKey: 'topHolderPercentage',
        header: () => <div className="text-left">Top Holder %</div>,
        cell: ({ row }) => (
          <span
            className={row.original.topHolderPercentage > 30 ? 'text-warning font-medium' : ''}
            data-testid={`text-top-holder-${row.original.id}`}
          >
            {row.original.topHolderPercentage.toFixed(1)}%
          </span>
        ),
        size: 120,
      },
      {
        id: 'snipersPercentage',
        accessorKey: 'snipersPercentage',
        header: () => <div className="text-left">Snipers %</div>,
        cell: ({ row }) => (
          <span
            className={row.original.snipersPercentage > 20 ? 'text-warning font-medium' : ''}
            data-testid={`text-snipers-${row.original.id}`}
          >
            {row.original.snipersPercentage.toFixed(1)}%
          </span>
        ),
        size: 100,
      },
      {
        id: 'txCount',
        accessorKey: 'txCount',
        header: ({ column }) => (
          <button
            className="flex items-center gap-1 hover:text-foreground transition-colors"
            onClick={() => column.toggleSorting()}
            data-testid="header-tx-count"
          >
            TX Count
            {column.getIsSorted() === 'asc' ? <ArrowUp className="h-3 w-3" /> : column.getIsSorted() === 'desc' ? <ArrowDown className="h-3 w-3" /> : <ArrowUpDown className="h-3 w-3" />}
          </button>
        ),
        cell: ({ row }) => (
          <span className="text-foreground/90" data-testid={`text-tx-count-${row.original.id}`}>
            {row.original.txCount.toLocaleString()}
          </span>
        ),
        size: 100,
      },
      {
        id: 'quickBuy',
        header: () => <div className="text-center">Action</div>,
        cell: () => null,
        size: 80,
      },
    ],
    []
  );

  const sortingFromRedux = useMemo<SortingState>(() => {
    if (sortConfig.column && sortConfig.direction) {
      return [{
        id: sortConfig.column,
        desc: sortConfig.direction === 'desc',
      }];
    }
    return [];
  }, [sortConfig.column, sortConfig.direction]);

  const [sorting, setSorting] = useState<SortingState>(sortingFromRedux);

  useEffect(() => {
    setSorting(sortingFromRedux);
  }, [sortingFromRedux, tokens]);

  const handleSortingChange = useCallback((updater: any) => {
    setSorting((old) => {
      const newSorting = typeof updater === 'function' ? updater(old) : updater;
      if (newSorting.length > 0) {
        dispatch(setSortConfig({
          column: newSorting[0].id,
          direction: newSorting[0].desc ? 'desc' : 'asc',
        }));
      } else {
        dispatch(setSortConfig({ column: null, direction: null }));
      }
      return newSorting;
    });
  }, [dispatch]);

  const table = useReactTable({
    data: tokens,
    columns,
    state: { sorting },
    onSortingChange: handleSortingChange,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  const handleQuickBuy = useCallback((token: Token) => {
    setQuickBuyToken(token);
  }, []);

  const handleRowClick = useCallback((token: Token) => {
    dispatch(setSelectedToken(token));
  }, [dispatch]);

  return (
    <>
      <div className="relative overflow-x-auto">
        <table className="w-full border-collapse" data-testid="table-tokens">
          <thead className="sticky top-0 z-10 bg-card/95 backdrop-blur-sm border-b border-border">
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th
                    key={header.id}
                    className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wide text-muted-foreground"
                    style={{
                      width: header.column.getSize(),
                      minWidth: header.column.getSize(),
                    }}
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(header.column.columnDef.header, header.getContext())}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {table.getRowModel().rows.map((row) => (
              <TokenRow key={row.id} row={row} onQuickBuy={handleQuickBuy} onRowClick={handleRowClick} />
            ))}
          </tbody>
        </table>
      </div>

      <QuickBuyModal
        token={quickBuyToken}
        open={!!quickBuyToken}
        onClose={() => setQuickBuyToken(null)}
      />
    </>
  );
}

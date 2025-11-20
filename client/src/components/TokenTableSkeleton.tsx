


import { Skeleton } from "@/components/ui/skeleton";

export function TokenTableSkeleton() {
  const skeletonRows = Array.from({ length: 10 });

  return (
    <div className="space-y-2">
      {skeletonRows.map((_, index) => (
        <div
          key={index}
          className="flex items-center gap-4 px-4 py-3 border-b border-border"
          data-testid={`skeleton-row-${index}`}
        >
          {/* Token logo & symbol */}
          <div className="flex items-center gap-3 w-48">
            <Skeleton className="h-10 w-10 rounded-full bg-muted animate-shimmer" />
            <Skeleton className="h-4 w-24 bg-muted animate-shimmer" />
          </div>

          {/* Contract Address */}
          <Skeleton className="h-4 w-32 bg-muted animate-shimmer" />

          {/* Age */}
          <Skeleton className="h-4 w-16 bg-muted animate-shimmer" />

          {/* Market Cap */}
          <Skeleton className="h-4 w-24 bg-muted animate-shimmer" />

          {/* Liquidity */}
          <Skeleton className="h-4 w-24 bg-muted animate-shimmer" />

          {/* Volume 24h */}
          <Skeleton className="h-4 w-24 bg-muted animate-shimmer" />

          {/* Price */}
          <Skeleton className="h-4 w-28 bg-muted animate-shimmer" />

          {/* 24h % Change */}
          <Skeleton className="h-4 w-20 bg-muted animate-shimmer" />

          {/* Holders */}
          <Skeleton className="h-4 w-20 bg-muted animate-shimmer" />

          {/* Top Holder % */}
          <Skeleton className="h-4 w-16 bg-muted animate-shimmer" />

          {/* Snipers % */}
          <Skeleton className="h-4 w-16 bg-muted animate-shimmer" />

          {/* TX Count */}
          <Skeleton className="h-4 w-20 bg-muted animate-shimmer" />

          {/* Quick Buy Button */}
          <Skeleton className="h-9 w-9 rounded-full bg-muted animate-shimmer" />
        </div>
      ))}
    </div>
  );
}

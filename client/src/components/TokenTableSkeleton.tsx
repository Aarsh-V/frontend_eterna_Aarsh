import { Skeleton } from "@/components/ui/skeleton";

export function TokenTableSkeleton() {
  return (
    <div className="space-y-2">
      {Array.from({ length: 10 }).map((_, i) => (
        <div
          key={i}
          className="flex items-center gap-4 px-4 py-3 border-b border-border"
          data-testid={`skeleton-row-${i}`}
        >
          <div className="flex items-center gap-3 w-48">
            <Skeleton className="h-10 w-10 rounded-full bg-muted animate-shimmer" />
            <Skeleton className="h-4 w-24 bg-muted animate-shimmer" />
          </div>
          <Skeleton className="h-4 w-32 bg-muted animate-shimmer" />
          <Skeleton className="h-4 w-16 bg-muted animate-shimmer" />
          <Skeleton className="h-4 w-24 bg-muted animate-shimmer" />
          <Skeleton className="h-4 w-24 bg-muted animate-shimmer" />
          <Skeleton className="h-4 w-24 bg-muted animate-shimmer" />
          <Skeleton className="h-4 w-28 bg-muted animate-shimmer" />
          <Skeleton className="h-4 w-20 bg-muted animate-shimmer" />
          <Skeleton className="h-4 w-20 bg-muted animate-shimmer" />
          <Skeleton className="h-4 w-16 bg-muted animate-shimmer" />
          <Skeleton className="h-4 w-16 bg-muted animate-shimmer" />
          <Skeleton className="h-4 w-20 bg-muted animate-shimmer" />
          <Skeleton className="h-9 w-9 rounded-full bg-muted animate-shimmer" />
        </div>
      ))}
    </div>
  );
}

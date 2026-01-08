import { Skeleton } from '@/components/ui/skeleton';

export const CurrentWeatherSkeleton = () => (
  <div className="glass-card p-8">
    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8">
      <div className="flex items-center gap-6">
        <Skeleton className="h-20 w-20 rounded-full skeleton-shimmer" />
        <div>
          <Skeleton className="h-16 w-32 skeleton-shimmer" />
          <Skeleton className="h-6 w-24 mt-2 skeleton-shimmer" />
        </div>
      </div>
      <div className="text-right">
        <Skeleton className="h-8 w-48 ml-auto skeleton-shimmer" />
        <Skeleton className="h-5 w-32 mt-2 ml-auto skeleton-shimmer" />
      </div>
    </div>
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mt-8 pt-8 border-t border-border/50">
      {Array.from({ length: 6 }).map((_, i) => (
        <Skeleton key={i} className="h-16 rounded-xl skeleton-shimmer" />
      ))}
    </div>
  </div>
);

export const ForecastSkeleton = () => (
  <div className="glass-card p-6">
    <Skeleton className="h-7 w-40 mb-6 skeleton-shimmer" />
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
      {Array.from({ length: 5 }).map((_, i) => (
        <div key={i} className="flex flex-col items-center p-4 rounded-xl bg-secondary/30">
          <Skeleton className="h-5 w-12 mb-1 skeleton-shimmer" />
          <Skeleton className="h-4 w-16 mb-3 skeleton-shimmer" />
          <Skeleton className="h-10 w-10 rounded-full skeleton-shimmer" />
          <Skeleton className="h-5 w-10 mt-3 skeleton-shimmer" />
          <Skeleton className="h-4 w-8 mt-1 skeleton-shimmer" />
        </div>
      ))}
    </div>
  </div>
);

export const TableSkeleton = () => (
  <div className="glass-card p-6">
    <div className="flex items-center justify-between mb-6">
      <Skeleton className="h-7 w-48 skeleton-shimmer" />
      <Skeleton className="h-5 w-20 skeleton-shimmer" />
    </div>
    <div className="space-y-4">
      <div className="grid grid-cols-5 gap-4 pb-4 border-b border-border/50">
        {Array.from({ length: 5 }).map((_, i) => (
          <Skeleton key={i} className="h-5 skeleton-shimmer" />
        ))}
      </div>
      {Array.from({ length: 5 }).map((_, i) => (
        <div key={i} className="grid grid-cols-5 gap-4 py-3">
          {Array.from({ length: 5 }).map((_, j) => (
            <Skeleton key={j} className="h-8 skeleton-shimmer" />
          ))}
        </div>
      ))}
    </div>
    <div className="flex items-center justify-between mt-6 pt-4 border-t border-border/50">
      <Skeleton className="h-5 w-32 skeleton-shimmer" />
      <div className="flex gap-2">
        {Array.from({ length: 5 }).map((_, i) => (
          <Skeleton key={i} className="h-8 w-8 skeleton-shimmer" />
        ))}
      </div>
    </div>
  </div>
);

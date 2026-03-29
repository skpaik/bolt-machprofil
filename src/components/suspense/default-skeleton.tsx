"use client";

import { Skeleton } from "@/components/ui/skeleton";

export function DefaultSkeleton() {
  return (
    <div className="space-y-4 p-4">
      <Skeleton className="h-8 w-1/4" />
      <Skeleton className="h-5 w-1/2" />
      <Skeleton className="h-40 w-full rounded-lg" />
    </div>
  );
}

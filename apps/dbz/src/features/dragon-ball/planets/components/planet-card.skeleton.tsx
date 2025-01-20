import React from 'react';

import { Skeleton } from '@/design/ui-kit/components/ui/skeleton';

export function PlanetCardSkeleton() {
  return (
    <Skeleton className="min-h-72 w-full flex-1 overflow-auto rounded-[20] shadow-primary">
      <Skeleton className="absolute bottom-0 w-full rounded-[20] rounded-tl-none rounded-tr-none bg-primary-foreground p-5 dark:bg-primary-foreground">
        <Skeleton className="mb-2 h-5 w-28" />
        <Skeleton className="mb-2 h-2 w-full" />
        <Skeleton className="h-2 w-[70%]" />
      </Skeleton>
    </Skeleton>
  );
}

import { keepPreviousData, useQuery, useQueryClient } from '@tanstack/react-query';
import { useEffect } from 'react';

import type { Page, Planet } from '@/core/api/endpoints/dragon-ball';
import { getDragonBallPlanets } from '@/core/api/endpoints/dragon-ball';

const QUERY_KEY = 'planets';

export function getQueryKey(page?: number) {
  if (page === undefined) return [QUERY_KEY];

  return [QUERY_KEY, page];
}

export function useGetPlanets(page: number) {
  const query = useQuery<Page<Planet> | undefined>({
    queryKey: getQueryKey(page),
    queryFn: ({ signal }) => getDragonBallPlanets(page, { isDestroyed: false }, { signal }),
    placeholderData: keepPreviousData,
  });

  // Prefetch the next page!
  const queryClient = useQueryClient();

  useEffect(() => {
    if (query.data?.links.next) {
      queryClient.prefetchQuery({
        queryKey: getQueryKey(page + 1),
        queryFn: ({ signal }) => getDragonBallPlanets(page + 1, { isDestroyed: false }, { signal }),
      });
    }
  }, [query.data, page, queryClient]);

  return query;
}

import { keepPreviousData, useQuery } from '@tanstack/react-query';

import type { Planet } from '@/core/api/endpoints/dragon-ball';
import { getDragonBallPlanet } from '@/core/api/endpoints/dragon-ball';

const QUERY_KEY = 'planet';

export function getQueryKey(id?: number) {
  if (id === undefined) return [QUERY_KEY];

  return [QUERY_KEY, id];
}

export function useGetPlanet(id: number) {
  const query = useQuery<Planet | undefined>({
    queryKey: getQueryKey(id),
    queryFn: ({ signal }) => getDragonBallPlanet(id, { signal }),
    placeholderData: keepPreviousData,
  });

  return query;
}

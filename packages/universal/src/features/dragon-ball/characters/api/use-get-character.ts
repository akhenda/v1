import { keepPreviousData, useQuery } from '@tanstack/react-query';

import type { Character } from '@/core/api/endpoints/dragon-ball';
import { getDragonBallCharacter } from '@/core/api/endpoints/dragon-ball';

const QUERY_KEY = 'character';

export function getQueryKey(id?: number) {
  if (id === undefined) return [QUERY_KEY];

  return [QUERY_KEY, id];
}

export function useGetCharacter(id: number) {
  const query = useQuery<Character | undefined>({
    queryKey: getQueryKey(id),
    queryFn: ({ signal }) => getDragonBallCharacter(id, { signal }),
    placeholderData: keepPreviousData,
  });

  return query;
}

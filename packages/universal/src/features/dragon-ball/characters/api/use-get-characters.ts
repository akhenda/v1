import { keepPreviousData, useQuery, useQueryClient } from '@tanstack/react-query';
import { useEffect } from 'react';

import type { CharacterListItem, Page } from '@/core/api/endpoints/dragon-ball';
import { getDragonBallCharacters } from '@/core/api/endpoints/dragon-ball';

const QUERY_KEY = 'characters';

export function getQueryKey(page?: number) {
  if (page === undefined) return [QUERY_KEY];

  return [QUERY_KEY, page];
}

export function useGetCharacters(page: number) {
  const query = useQuery<Page<CharacterListItem> | undefined>({
    queryKey: getQueryKey(page),
    queryFn: ({ signal }) =>
      getDragonBallCharacters(page, { affiliation: 'Z Fighter' }, { signal }),
    placeholderData: keepPreviousData,
  });

  // Prefetch the next page!
  const queryClient = useQueryClient();

  useEffect(() => {
    if (query.data?.links.next) {
      queryClient.prefetchQuery({
        queryKey: getQueryKey(page + 1),
        queryFn: ({ signal }) =>
          getDragonBallCharacters(page + 1, { affiliation: 'Z Fighter' }, { signal }),
      });
    }
  }, [query.data, page, queryClient]);

  return query;
}

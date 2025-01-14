import { createSyncStoragePersister } from '@tanstack/query-sync-storage-persister';
import { QueryClient } from '@tanstack/react-query';
import {
  type PersistQueryClientOptions,
  persistQueryClient,
} from '@tanstack/react-query-persist-client';

import { GC_TIME, STALE_TIME, STORAGE_KEYS, THIRTY_DAYS } from '../../constants';
import { queryClientStorage } from '../../storage';

const defaultMutationConfig = { retry: false };
const defaultQueryConfig = {
  retry: false,
  staleTime: STALE_TIME, // 5 minutes
  gcTime: GC_TIME, // 24 hours
  refetchOnWindowFocus: false,
};

const localStoragePersister = createSyncStoragePersister({
  key: STORAGE_KEYS.store.id,
  storage: queryClientStorage,
});

export const persistOptions: Omit<PersistQueryClientOptions, 'queryClient'> = {
  persister: localStoragePersister,
  buster: 'v1',
  maxAge: THIRTY_DAYS,
};

export const queryClient = new QueryClient({
  defaultOptions: { mutations: defaultMutationConfig, queries: defaultQueryConfig },
});

persistQueryClient({ queryClient, persister: localStoragePersister });

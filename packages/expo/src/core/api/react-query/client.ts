import { createAsyncStoragePersister } from '@tanstack/query-async-storage-persister';
import { QueryClient } from '@tanstack/react-query';
import type { PersistQueryClientOptions } from '@tanstack/react-query-persist-client';

import { GC_TIME, STALE_TIME, STORAGE_KEYS, THIRTY_DAYS } from '@/core/constants';
import { queryClientStorage } from '@/core/storage';

const defaultMutationConfig = { retry: false };
const defaultQueryConfig = {
  retry: false,
  staleTime: STALE_TIME, // 5 minutes
  gcTime: GC_TIME, // 24 hours
  refetchOnWindowFocus: false,
};

const asyncStoragePersister = createAsyncStoragePersister({
  key: STORAGE_KEYS.store.id,
  storage: queryClientStorage,
});

export const persistOptions: Omit<PersistQueryClientOptions, 'queryClient'> = {
  persister: asyncStoragePersister,
  buster: 'v1',
  maxAge: THIRTY_DAYS,
};

export const queryClient = new QueryClient({
  defaultOptions: { mutations: defaultMutationConfig, queries: defaultQueryConfig },
});

import { PersistQueryClientProvider } from '@tanstack/react-query-persist-client';
import { ThemeProvider } from 'next-themes';
import type { PropsWithChildren } from 'react';
import { Toaster } from 'sonner';

import { persistOptions, queryClient } from '../api';
import { Analytics } from '../services/analytics';
import { FeatureFlagsProvider } from '../services/feature-flags';

const { PostHogProvider } = Analytics;

export default function Providers({ children }: PropsWithChildren) {
  return (
    <ThemeProvider>
      <PostHogProvider>
        <FeatureFlagsProvider>
          <PersistQueryClientProvider client={queryClient} persistOptions={persistOptions}>
            {children}
          </PersistQueryClientProvider>
          <Toaster position="bottom-right" />
        </FeatureFlagsProvider>
      </PostHogProvider>
    </ThemeProvider>
  );
}

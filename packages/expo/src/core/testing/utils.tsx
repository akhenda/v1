import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import { ThemeProvider } from '@react-navigation/native';
import { PortalHost } from '@rn-primitives/portal';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import type { RenderAPI } from '@testing-library/react-native';
import { cleanup, render as rtlRender } from '@testing-library/react-native';
import type { ReactElement } from 'react';
import { SafeAreaProvider, initialWindowMetrics } from 'react-native-safe-area-context';

import { NAV_THEME } from '@/design/lib/constants';

afterEach(cleanup);

const infinity = Number.POSITIVE_INFINITY;
const theme = { dark: false, colors: NAV_THEME.light, fonts: NAV_THEME.fonts };

const createTestQueryClient = () =>
  new QueryClient({
    defaultOptions: { queries: { retry: false, gcTime: infinity, staleTime: infinity } },
  });

export const customRender = (component: ReactElement): RenderAPI => {
  const wrapper = (
    <SafeAreaProvider initialMetrics={initialWindowMetrics}>
      <ThemeProvider value={theme}>
        <QueryClientProvider client={createTestQueryClient()}>
          <BottomSheetModalProvider>{component}</BottomSheetModalProvider>
          <PortalHost />
        </QueryClientProvider>
      </ThemeProvider>
    </SafeAreaProvider>
  );

  return rtlRender(wrapper);
};

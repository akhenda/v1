import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import { type Theme, ThemeProvider } from '@react-navigation/native';
import { PortalHost } from '@rn-primitives/portal';
import { PersistQueryClientProvider } from '@tanstack/react-query-persist-client';
import { StatusBar } from 'expo-status-bar';
import { type ErrorInfo, type PropsWithChildren, useMemo } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { StyleSheet } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { KeyboardProvider } from 'react-native-keyboard-controller';
import { SafeAreaProvider, initialWindowMetrics } from 'react-native-safe-area-context';

import { persistOptions, queryClient } from '@/core/api';
import { ErrorMonitoring } from '@/core/observability';
import { Analytics } from '@/core/services/analytics';
import { FeatureFlagsProvider } from '@/core/services/feature-flags';
import { NAV_THEME } from '@/design/lib/constants';
import { useColorScheme } from '@/design/lib/hooks';
import { FullscreenErrorBoundary } from '@/design/ui-kit/components/fullscreen-error-boundary';

const { ExpoPostHogProvider } = Analytics;

const styles = StyleSheet.create({ container: { flex: 1 } });
const DARK_THEME: Theme = { dark: true, colors: NAV_THEME.dark, fonts: NAV_THEME.fonts };
const LIGHT_THEME: Theme = { dark: false, colors: NAV_THEME.light, fonts: NAV_THEME.fonts };

const onGlobalError = (error: Error, errorInfo: ErrorInfo) => {
  const data = { componentStack: errorInfo };

  ErrorMonitoring.breadcrumbs({ type: 'error', level: 'error', data });
  ErrorMonitoring.exception(error);
};

/**
 * The `Providers` component wraps the app in the necessary context providers
 * to ensure proper functionality and styling.
 *
 * It includes the following providers:
 * - `SafeAreaProvider`: Ensures the app respects device safe areas.
 * - `ThemeProvider`: Supplies the app with a theme.
 * - `StatusBar`: Manages the status bar style based on the `statusBarStyle` prop.
 * - `GestureHandlerRootView`: Enables gesture handling throughout the app.
 * - `ExpoPostHogProvider`: Integrates analytics capabilities.
 * - `FeatureFlagsProvider`: Manages feature flags and toggles.
 * - `PersistQueryClientProvider`: Manages query caching and persistence.
 * - `BottomSheetModalProvider`: Supports bottom sheet modal functionality.
 * - `KeyboardProvider`: Manages keyboard visibility and height.
 * - `PortalHost`: Manages portal interactions.
 * - `ErrorBoundary`: Handles errors and provides a fallback UI.
 *
 * @param {ReactNode} children - The child components of the app.
 * @returns {ReactNode} The rendered app with the necessary providers.
 */
export default function Providers({ children }: PropsWithChildren) {
  const { isDarkColorScheme: isDark } = useColorScheme();
  const statusBarStyle = useMemo(() => (isDark ? 'light' : 'dark'), [isDark]);
  const appTheme: Theme = useMemo(() => (isDark ? DARK_THEME : LIGHT_THEME), [isDark]);

  return (
    <SafeAreaProvider initialMetrics={initialWindowMetrics}>
      <ThemeProvider value={appTheme}>
        <StatusBar style={statusBarStyle} />
        <GestureHandlerRootView style={styles.container}>
          <ExpoPostHogProvider>
            <FeatureFlagsProvider>
              <PersistQueryClientProvider client={queryClient} persistOptions={persistOptions}>
                <BottomSheetModalProvider>
                  <KeyboardProvider>
                    <ErrorBoundary
                      FallbackComponent={FullscreenErrorBoundary}
                      onError={onGlobalError}
                    >
                      {children}
                    </ErrorBoundary>
                  </KeyboardProvider>
                  <PortalHost />
                </BottomSheetModalProvider>
              </PersistQueryClientProvider>
            </FeatureFlagsProvider>
          </ExpoPostHogProvider>
        </GestureHandlerRootView>
      </ThemeProvider>
    </SafeAreaProvider>
  );
}

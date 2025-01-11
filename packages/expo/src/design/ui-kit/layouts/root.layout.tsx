import type { PropsWithChildren } from 'react';

import Providers from '@/core/providers';
import { useSplashScreen } from '@/design/lib/hooks';

// Catch any errors thrown by the Layout component.
export { ErrorBoundary } from 'expo-router';

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: '(tabs)',
};

export default function RootLayout({ children }: PropsWithChildren) {
  const proceed = useSplashScreen();

  if (!proceed) return null;

  return <Providers>{children}</Providers>;
}

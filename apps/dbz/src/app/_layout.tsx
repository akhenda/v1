import { Stack } from 'expo-router';

import Root from '@/design/ui-kit/layouts/root.layout';

export default function RootLayout() {
  return (
    <Root>
      <Stack initialRouteName="(tabs)">
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="modal" options={{ presentation: 'modal', title: 'Modal' }} />
      </Stack>
    </Root>
  );
}

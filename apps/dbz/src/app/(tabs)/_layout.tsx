import { Tabs } from 'expo-router';

import { LikedCharactersProvider, LikedPlanetsProvider } from '@/core/storage';
import { ContactRound, Orbit, UserRoundCog } from '@/design/lib/icons';
import { ModalToggle } from '@/design/ui-kit/components/modal-toggle';
import { ThemeToggle } from '@/design/ui-kit/components/theme-toggle';

export default function TabsLayout() {
  return (
    <LikedPlanetsProvider>
      <LikedCharactersProvider>
        <Tabs>
          <Tabs.Screen
            name="index"
            options={{
              title: 'Planets',
              headerTitle: 'DBZ',
              tabBarIcon({ color, size }) {
                return <Orbit color={color} size={size} />;
              },
              headerLeft: () => <ModalToggle />,
              headerRight: () => <ThemeToggle />,
            }}
          />
          <Tabs.Screen
            name="characters"
            options={{
              title: 'Characters',
              headerTitle: 'DBZ',
              tabBarIcon({ color, size }) {
                return <ContactRound color={color} size={size} />;
              },
              headerLeft: () => <ModalToggle />,
              headerRight: () => <ThemeToggle />,
            }}
          />
          <Tabs.Screen
            name="profile"
            options={{
              title: 'Profile',
              tabBarIcon({ color, size }) {
                return <UserRoundCog color={color} size={size} />;
              },
              headerRight: () => <ThemeToggle />,
            }}
          />
        </Tabs>
      </LikedCharactersProvider>
    </LikedPlanetsProvider>
  );
}

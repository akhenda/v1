import { Tabs } from 'expo-router';

import { LayoutPanelLeft, MenuSquare } from '../../lib/icons';
import { ModalToggle } from '../components/modal-toggle';
import { ThemeToggle } from '../components/theme-toggle';

export default function TabsLayout() {
  return (
    <Tabs>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon({ color, size }) {
            return <LayoutPanelLeft color={color} size={size} />;
          },
          headerLeft: () => <ModalToggle />,
          headerRight: () => <ThemeToggle />,
        }}
      />
      <Tabs.Screen
        name="nx"
        options={{
          title: 'Nx',
          tabBarIcon({ color, size }) {
            return <MenuSquare color={color} size={size} />;
          },
          headerRight: () => <ThemeToggle />,
        }}
      />
    </Tabs>
  );
}

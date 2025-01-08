import * as NavigationBar from 'expo-navigation-bar';
import { Platform } from 'react-native';

import { NAV_THEME } from '../constants';

/**
 * Sets the Android navigation bar style and background color based on the specified theme.
 *
 * @param theme - The theme to set for the navigation bar, either 'light' or 'dark'.
 *                When 'dark' is selected, the button style will be 'light' and the background
 *                color will be set to the dark theme background color. When 'light' is selected,
 *                the button style will be 'dark' and the background color will be set to the light
 *                theme background color.
 *
 * This function only applies on Android platforms.
 */
export async function setAndroidNavigationBar(theme: 'light' | 'dark') {
  if (Platform.OS !== 'android') return;

  await NavigationBar.setButtonStyleAsync(theme === 'dark' ? 'light' : 'dark');
  await NavigationBar.setBackgroundColorAsync(
    theme === 'dark' ? NAV_THEME.dark.background : NAV_THEME.light.background,
  );
}

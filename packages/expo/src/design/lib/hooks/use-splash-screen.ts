import { SplashScreen } from 'expo-router';
import { useEffect, useState } from 'react';
import { Platform } from 'react-native';

import { logger } from '@/core/observability';
import { bootstrapServices } from '@/core/services/bootstrap';
import { appStorage } from '@/core/storage';
import { checkForOtaUpdate } from '@/core/utils';
import { useColorScheme } from '@/design/lib/hooks';
import { setAndroidNavigationBar } from '@/design/lib/utils';

// Prevent the splash screen from auto-hiding before getting the color scheme.
SplashScreen.preventAutoHideAsync()
  .catch((error) => {
    logger.error(error, 'Failed to persist the SplashScreen');
  })
  .finally(() => {
    logger.done('Persisted the SplashScreen');
  });

export const useSplashScreen = () => {
  const { colorScheme, setColorScheme } = useColorScheme();
  const [isColorSchemeLoaded, setIsColorSchemeLoaded] = useState(false);

  useEffect(() => {
    (async () => {
      const theme = appStorage.getItem()?.theme;

      if (Platform.OS === 'web') {
        // Adds the background color to the html element to prevent white background on overscroll.
        document.documentElement.classList.add('bg-background');
      }

      if (!theme) {
        appStorage.setItem({ theme: colorScheme });
        setIsColorSchemeLoaded(true);

        return;
      }

      const colorTheme = theme === 'dark' ? 'dark' : 'light';

      if (colorTheme !== colorScheme) {
        setColorScheme(colorTheme);
        setAndroidNavigationBar(colorTheme);
        setIsColorSchemeLoaded(true);

        return;
      }

      setAndroidNavigationBar(colorTheme);
      setIsColorSchemeLoaded(true);

      await bootstrapServices();
      await checkForOtaUpdate();
    })().finally(() => {
      SplashScreen.hideAsync()
        .catch((error: unknown) => {
          logger.error(error, 'Failed to hide the SplashScreen');
        })
        .finally(() => {
          logger.done('Hidden the SplashScreen');
        });
    });
  }, [colorScheme, setColorScheme]);

  if (!isColorSchemeLoaded) return false;

  return true;
};

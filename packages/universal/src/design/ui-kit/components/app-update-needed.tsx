import React from 'react';
import { useTranslation } from 'react-i18next';
import { View } from 'react-native';

import { useLastSupportedAppVersion } from '@/core/hooks/use-last-supported-app-version';
import { openAppStorePage } from '@/core/utils';

import { Button } from './ui/button';
import { Text } from './ui/text';

/**
 * Shows a full screen that prompts the user to update the app
 * when the current installed version is not supported anymore.
 *
 * @returns {JSX.Element} The component or null if the app is supported.
 */
export const AppUpdateNeeded = () => {
  const { t } = useTranslation();
  const { isAppSupported } = useLastSupportedAppVersion();

  if (isAppSupported) return null;

  return (
    <View
      className="bg flex items-center justify-center h-full w-full px-8"
      testID="app-update-needed-screen"
    >
      <Text className="pb-2 text-large">{t('Your app is outdated')}</Text>
      <Text className="mb-4 text-center">
        {t('Please update the application to get the latest features')}
      </Text>
      <Button testID="app-update-needed-cta" onPress={openAppStorePage}>
        {t('Update now')}
      </Button>
    </View>
  );
};

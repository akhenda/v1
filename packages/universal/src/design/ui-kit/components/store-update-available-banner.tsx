import React from 'react';
import { useTranslation } from 'react-i18next';
import { View } from 'react-native';

import { openAppStorePage } from '@/core/utils';

import { Button } from './ui/button';
import { Text } from './ui/text';

/**
 * A banner that is displayed when an update is available for the app on the
 * stores.
 *
 * It displays a text and a button that allows the user to open the app store
 * and update the app.
 *
 * @returns A JSX element representing the banner.
 */
export const StoreUpdateAvailableBanner = () => {
  const { t } = useTranslation();

  return (
    <View className="bg-dark flex-wrap flex-row gap-2 p-4 rounded-lg">
      <Text>{t('Go update now')}</Text>
      <Button onPress={openAppStorePage}>{t('An update is available on the stores')}</Button>
    </View>
  );
};

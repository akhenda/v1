import { useTranslation } from 'react-i18next';
import { View } from 'react-native';

import { reloadApp } from '@/core/utils';

import { Button } from './ui/button';
import { Text } from './ui/text';

/**
 * A full screen error boundary component that will be rendered if an error
 * occures anywhere in the app. It will display a error message and a button
 * that will reload the app when pressed.
 *
 * @returns A full screen error boundary component.
 */
export const FullscreenErrorBoundary = () => {
  const { t } = useTranslation();

  return (
    <View className="bg flex self-center items-center justify-center h-full w-full px-6">
      <Text className="mb-2 text-large">{t('Error!')}</Text>
      <Text className="text-medium text-center">
        {t('An unknown error occured. If the error persist, contact support.')}
      </Text>
      <View className="mt-4">
        <Button onPress={reloadApp}>{t('Relaunch the app')}</Button>
      </View>
    </View>
  );
};

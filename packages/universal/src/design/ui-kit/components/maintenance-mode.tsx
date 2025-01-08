import React from 'react';
import { useTranslation } from 'react-i18next';
import { View } from 'react-native';

import { useIsFeatureFlagEnabled } from '@/core/services/feature-flags';

import { Text } from './ui/text';

/**
 * A component that displays a maintenance message
 * if the is-maintenance-mode feature flag is enabled.
 *
 * If the feature flag is disabled, the component
 * will not render anything.
 *
 * @returns A JSX element that displays a maintenance
 * message if the feature flag is enabled.
 */
export const MaintenanceMode = () => {
  const { t } = useTranslation();
  const isMaintenanceModeEnabled = useIsFeatureFlagEnabled('is-maintenance-mode');

  if (!isMaintenanceModeEnabled) return null;

  return (
    <View className="bg flex items-center justify-center h-full w-full px-8">
      <Text className="bb-2 text-large">{t('The app is in maintenance')}</Text>
      <Text className="text-center">{t('It will be available online as soon as possible')}</Text>
    </View>
  );
};

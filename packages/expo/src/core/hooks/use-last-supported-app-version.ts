import { useState } from 'react';
import semverGte from 'semver/functions/gte';

import { config } from '../constants';
import { useGetFlagValueSync } from '../services/feature-flags';

import { useOnMount } from './use-on-mount';

/**
 * Hook to determine if the current app version is supported.
 * It checks the last supported version from feature flags and compares it with
 * the current app version. If the current app version is greater than or equal
 * to the last supported version, the app is considered supported.
 *
 * @returns {Object} An object containing a boolean `isAppSupported` indicating
 * whether the app version is supported.
 */
export const useLastSupportedAppVersion = () => {
  const { getFlagValueSync } = useGetFlagValueSync();
  const [isAppSupported, setIsAppSupported] = useState(true);

  useOnMount(() => {
    const lastSupportedVersion = getFlagValueSync('last-supported-app-version');

    // We can't get last supported version, so leave the app running
    if (!lastSupportedVersion || typeof lastSupportedVersion !== 'string') return;

    const isSupported = config.appVersion
      ? semverGte(config.appVersion, lastSupportedVersion)
      : true;

    setIsAppSupported(isSupported);
  });

  return { isAppSupported };
};

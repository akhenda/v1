import { useState } from 'react';
import semverGte from 'semver/functions/gte';

import { config } from '@/core/constants';
import { useGetFlagValueSync } from '@/core/services/feature-flags';

import { useOnMount } from './use-on-mount';

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

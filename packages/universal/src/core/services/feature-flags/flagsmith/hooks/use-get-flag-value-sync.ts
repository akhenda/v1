import { useFlagsmith } from 'react-native-flagsmith/react';

import type { FlagOptions } from '../../types';

/**
 * A hook that returns a function to get the value of a feature flag synchronously.
 *
 * @returns An object with a single method, `getFlagValueSync`, which takes a
 *   `flagKey` and returns its value.
 *
 * @example
 * const { getFlagValueSync } = useGetFlagValueSync();
 * const value = getFlagValueSync('some-flag');
 */
export const useGetFlagValueSync = () => {
  const flagsmith = useFlagsmith();
  const getFlagValueSync = (flagKey: FlagOptions) => flagsmith.getValue(flagKey);

  return { getFlagValueSync };
};

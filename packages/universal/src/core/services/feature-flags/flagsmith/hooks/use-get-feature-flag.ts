import { useFlags } from 'react-native-flagsmith/react';

import type { FlagOptions, TraitOptions } from '../../types';

/**
 * A hook that returns a specific feature flag.
 *
 * @param {FlagOptions} flagKey - The key of the feature flag to get.
 * @returns {Flag<FlagOptions, TraitOptions>} The feature flag.
 */
export function useGetFeatureFlag(flagKey: FlagOptions) {
  const flag = useFlags<FlagOptions, TraitOptions>([flagKey])[flagKey];

  return flag;
}

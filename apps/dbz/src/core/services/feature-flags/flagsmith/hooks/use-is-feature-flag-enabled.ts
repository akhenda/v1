import { useGetFeatureFlag } from './use-get-feature-flag';

import type { FlagOptions } from '../../types';

/**
 * Custom hook to determine if a specific feature flag is enabled.
 *
 * @param {FlagOptions} flagKey - The key identifying the feature flag.
 * @returns {boolean} - Returns `true` if the feature flag is enabled, otherwise `false`.
 */
export function useIsFeatureFlagEnabled(flagKey: FlagOptions) {
  const flag = useGetFeatureFlag(flagKey);

  return flag.enabled;
}

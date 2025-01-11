import { useFeatureFlagEnabled } from 'posthog-js/react';

import type { FlagOptions } from '../../types';

/**
 * A hook that returns a specific feature flag.
 *
 * @param {FlagOptions} flagKey - The key of the feature flag to get.
 * @returns {boolean} - The feature flag.
 */
export function useGetFeatureFlag(flagKey: FlagOptions) {
  const flag = useFeatureFlagEnabled(flagKey);

  return flag;
}

import { useFeatureFlag } from 'posthog-react-native';

import type { FlagOptions } from '../../types';

/**
 * A hook that returns a specific feature flag.
 *
 * @param {FlagOptions} flagKey - The key of the feature flag to get.
 * @returns {import('posthog-react-native').Flag} The feature flag.
 */
export function useGetFeatureFlag(flagKey: FlagOptions) {
  const flag = useFeatureFlag(flagKey);

  return flag;
}

import { usePostHog } from 'posthog-react-native';

import type { FlagOptions } from '../../types';

/**
 * A hook that returns a function to check if a feature flag is enabled.
 *
 * @param {FlagOptions} flagKey - The key of the feature flag to check.
 * @returns {boolean} - Whether the feature flag is enabled.
 *
 * @example
 * const isFeatureEnabled = useIsFeatureFlagEnabled('some-flag');
 */
export function useIsFeatureFlagEnabled(flagKey: FlagOptions) {
  const postHog = usePostHog();

  return postHog.isFeatureEnabled(flagKey);
}

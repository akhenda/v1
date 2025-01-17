import { usePostHog } from 'posthog-react-native';

import type { FlagOptions } from '../../types';

/**
 * A hook that returns a function to synchronously get the value of a feature flag
 * using PostHog.
 *
 * @returns An object with a single method, `getFlagValueSync`, which takes a
 *   `flagKey` and returns the feature flag's value.
 *
 * @example
 * const { getFlagValueSync } = useGetFlagValueSync();
 * const value = getFlagValueSync('some-flag');
 */
export const useGetFlagValueSync = () => {
  const postHog = usePostHog();
  const getFlagValueSync = (flagKey: FlagOptions) => postHog.getFeatureFlag(flagKey);

  return { getFlagValueSync };
};

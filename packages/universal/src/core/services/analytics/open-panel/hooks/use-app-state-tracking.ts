import { useAppState } from '@/core/hooks/use-app-state';

import Analytics from '../lib';

/**
 * A hook that tracks app state changes and sends an event to analytics when the
 * app is put in the background or comes back to the foreground.
 *
 * @example
 *
 * import { useAppStateTracking } from '@/core/analytics/open-panel/hooks/use-app-state-tracking';
 *
 * const MyComponent = () => {
 *   useAppStateTracking();
 *
 *   // ...
 * };
 *
 * @returns {void}
 */
export const useAppStateTracking = () => {
  useAppState({
    onGoingToBackground: () => {
      Analytics.trackEvent('app-put-in-background');
    },
    onComingToForeground: () => {
      Analytics.trackEvent('app-put-in-foreground');
    },
  });
};

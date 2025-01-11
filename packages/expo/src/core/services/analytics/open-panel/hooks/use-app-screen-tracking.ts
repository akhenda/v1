import { usePathname, useSegments } from 'expo-router';
import { useCallback, useEffect } from 'react';

import { convertStringToKebabCase } from '@/core/utils';

import Analytics from '../lib';

/**
 * Custom hook for tracking screen views in the application.
 *
 * This hook utilizes the `useSegments` and `usePathname` hooks from `expo-router`
 * to determine the current screen being viewed and generates a corresponding
 * event name. The event name follows the format `${string}-screen-viewed`.
 *
 * The hook calls the `Analytics.trackPageView` function to log the screen view
 * event, with optional segment data for better route grouping.
 *
 * @returns {void}
 */
export const useAppScreenTracking = () => {
  // Segments is optional but can be nice to have if you
  // want to group routes together
  // pathname = /posts/123
  // segements = ['posts', '[id]']
  const segments = useSegments();
  const pathname = usePathname();

  const getScreenTrackedEventName = useCallback((): `${string}-screen-viewed` => {
    if (pathname === '/') return 'home-screen-viewed';
    if (pathname.includes('/dragon-balls')) return 'dragon-balls-screen-viewed';

    // Add other specific tracking events for screens that need it

    const pathNameWithoutSlash = pathname.replace('/', '').replaceAll('/', '>');

    return `${convertStringToKebabCase(pathNameWithoutSlash)}-screen-viewed`;
  }, [pathname]);

  useEffect(() => {
    const eventName = getScreenTrackedEventName();

    Analytics.trackPageView(eventName, {
      // segments is optional but nice to have
      segments: segments.join('/'),

      // other optional data you want to send with the screen view
    });
  }, [getScreenTrackedEventName, segments]);
};

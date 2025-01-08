import { Image as ExpoImage } from 'expo-image';

import { logger } from '@/core/observability';

/**
 * Preloads images from the given sources.
 *
 * @param sources An array of image source URLs or URIs.
 *
 * This function is a wrapper around Expo's `Image.prefetch` method. It is
 * intended to be used to preload images that are used in the app's UI, such
 * as those used in the navigation bar or tab bar.
 *
 * The function does not return a value, but instead logs any errors that
 * occur during the preloading process.
 */
export const preloadImages = (sources: string[]) => {
  ExpoImage.prefetch(sources).catch((error: unknown) => {
    logger.error(error, 'Failed to preload images');
  });
};

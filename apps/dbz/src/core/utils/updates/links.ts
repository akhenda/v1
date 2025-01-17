import * as Updates from 'expo-updates';
import { Linking } from 'react-native';

import { IS_ANDROID, config } from '../../constants';
import { ErrorMonitoring, logger } from '../../observability';

/**
 * Opens the app store page of the app in the system browser.
 *
 * If the platform is iOS, it uses the iTunes Item ID to open the app store
 * page. If the platform is Android, it uses the bundle ID to open the play store
 * page.
 *
 * If an error occurs while opening the app store page, it will be logged as an
 * error.
 *
 * @returns {Promise<void>}
 */
export const openAppStorePage = async () => {
  try {
    await Linking.openURL(
      IS_ANDROID
        ? `market://details?id=${config.bundleId}&showAllReviews=true`
        : `https://apps.apple.com/app/apple-store/id${config.itunesItemId}`,
    );
  } catch (error) {
    logger.error(error, 'Failed to open app store to update the app');
  }
};

/**
 * Reloads the application using Expo updates.
 *
 * If an error occurs during the reload process, it is logged as an exception
 * using the ErrorMonitoring service.
 *
 * @returns {Promise<void>}
 */
export const reloadApp = async () => {
  await Updates.reloadAsync().catch((error: unknown) => {
    ErrorMonitoring.exception(error);
  });
};

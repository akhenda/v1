import * as Application from 'expo-application';
import * as Updates from 'expo-updates';
import { Linking } from 'react-native';
import type { StartUpdateOptions } from 'sp-react-native-in-app-updates';
import SpInAppUpdates, { IAUUpdateKind } from 'sp-react-native-in-app-updates';

import { IS_ANDROID, ONE_SECOND, config } from '@/core/constants';
import { ErrorMonitoring, logger } from '@/core/observability';

import { noop } from './helpers';
import { sleep } from './sleep';

/**
 * Checks if there is an available Expo OTA update and if so, fetches and loads
 * it. If an error occurs while fetching or loading the update, it will be logged
 * as a warning.
 *
 * @returns {Promise<void>}
 */
export const checkForOtaUpdate = async () => {
  try {
    const update = await Updates.checkForUpdateAsync();

    if (update.isAvailable) {
      await Updates.fetchUpdateAsync();
      await Updates.reloadAsync();
      await sleep(ONE_SECOND);
    }
  } catch (error) {
    logger.warn('Error fetching latest Expo update', { error });
  }
};

/**
 * Checks if there is an available native update and if so, returns an object
 * with shouldUpdate=true, startUpdate=async function, storeVersion=string, and
 * currentVersion=string. If an error occurs while checking for an update, it
 * will be logged as a warning.
 *
 * @param optionsOverwrites The options to overwrite the default behavior.
 * @returns
 *   {
 *     shouldUpdate: boolean;
 *     startUpdate: () => Promise<void>;
 *     storeVersion: string;
 *     currentVersion: string;
 *   }
 */
export const checkForNativeUpdate = async (optionsOverwrites: StartUpdateOptions) => {
  let options: StartUpdateOptions = {};

  const inAppUpdates = new SpInAppUpdates(config.debugInAppUpdates);
  const currentVersion = Application.nativeApplicationVersion;
  const { shouldUpdate, storeVersion } = await inAppUpdates.checkNeedsUpdate();

  if (shouldUpdate) {
    if (IS_ANDROID) options = { ...optionsOverwrites, updateType: IAUUpdateKind.FLEXIBLE };
    else options = optionsOverwrites;

    return {
      shouldUpdate,
      startUpdate: async () => inAppUpdates.startUpdate(options),
      storeVersion,
      currentVersion,
    };
  }

  return { shouldUpdate: false, startUpdate: noop, storeVersion, currentVersion };
};

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
      !IS_ANDROID
        ? `https://apps.apple.com/app/apple-store/id${config.itunesItemId}`
        : `market://details?id=${config.bundleId}&showAllReviews=true`,
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

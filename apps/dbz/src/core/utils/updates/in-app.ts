import * as Application from 'expo-application';
import type { StartUpdateOptions } from 'sp-react-native-in-app-updates';
import SpInAppUpdates, { IAUUpdateKind } from 'sp-react-native-in-app-updates';

import { IS_ANDROID, config } from '../../constants';

import { noop } from '../helpers';

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

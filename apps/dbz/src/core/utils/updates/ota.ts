import * as Updates from 'expo-updates';

import { ONE_SECOND } from '../../constants';
import { logger } from '../../observability';
import { sleep } from '../sleep';

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
    logger.warn('Error fetching latest Expo update =>', { error });
  }
};

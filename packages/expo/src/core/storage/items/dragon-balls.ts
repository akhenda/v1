import { MMKV } from 'react-native-mmkv';

import { STORAGE_KEYS } from '@/core/constants';

import { getStorageHelpers } from '../helpers';

export type DragonBall = {
  id: string;
  stars: number;
  collected: boolean;
  location: string;
};

/** Dragon balls storage key */
export const DRAGON_BALLS_KEY = STORAGE_KEYS.dragonBalls.collected;

const { getItemArray, setItem, removeItemFromArray } = getStorageHelpers(
  new MMKV({ id: DRAGON_BALLS_KEY }),
);

/**
 * Retrieves the user's saved dragon balls from device storage.
 *
 * @returns An array of the user's saved dragon balls, or an empty array if
 *          there are no saved dragon balls.
 */
export const getDragonBalls = () => getItemArray<DragonBall>(DRAGON_BALLS_KEY);

/**
 * Saves the given dragon balls to the user's device storage.
 *
 * @param dragonBalls An array of dragon balls to save.
 */
export const setDragonBalls = (dragonBalls: DragonBall[]) => setItem(DRAGON_BALLS_KEY, dragonBalls);

/**
 * Deletes a dragon ball from the user's device storage.
 *
 * @param id The ID of the dragon ball to delete.
 */
export const deleteDragonBall = (id: string) => {
  return removeItemFromArray<DragonBall, string>(DRAGON_BALLS_KEY, 'id', id);
};

/**
 * A collection of functions for working with the dragon ball's storage.
 */
export const dragonBallsStorage = {
  /** Retrieves the user's saved dragon balls from the device storage. */
  getItem: getDragonBalls,

  /** Saves the given dragon balls to the user's device storage. */
  setItem: setDragonBalls,

  /** Removes a dragon ball from the user's device storage. */
  removeItem: deleteDragonBall,
};

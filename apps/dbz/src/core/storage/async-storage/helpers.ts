import AsyncStorage from '@react-native-async-storage/async-storage';

import { logger } from '../../observability';

/**
 * Retrieves a value from the device storage.
 * @param key The key of the value to retrieve.
 * @returns The value of type T that was stored, or null if the key does not
 * exist or the value is not a valid JSON.
 */
export async function getItem<T>(key: string): Promise<T | null> {
  const value = await AsyncStorage.getItem(key);

  try {
    return value ? JSON.parse(value) || null : null;
  } catch (error) {
    logger.error(error, 'Error parsing JSON:');

    return null;
  }
}

/**
 * Retrieves an array of values from the device storage.
 * @param key The key of the value to retrieve.
 * @returns The array of values of type T that was stored, or an empty array
 * if the key does not exist or the value is not a valid JSON.
 */
export async function getItemArray<T>(key: string) {
  const value = await getItem<T[]>(key);

  return value || [];
}

/**
 * Stores a value in the device storage.
 * @param key The key to store the value under.
 * @param value The value to store. It will be converted to JSON.
 */
export async function setItem<T>(key: string, value: T) {
  try {
    await AsyncStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    logger.error(error, 'Error storing JSON:');
  }
}

/**
 * Deletes a key-value pair from the device storage.
 * @param key The key of the value to delete.
 */
export async function removeItem(key: string) {
  await AsyncStorage.removeItem(key);
}

/**
 * Removes the first item from an array stored in AsyncStorage that matches the
 * given target property and target value.
 *
 * @param key The key of the array to remove the item from.
 * @param target The property key to match on within the array items.
 * @param targetValue The value of the property to match on for removal.
 */
export async function removeItemFromArray<T, U>(key: string, target: keyof T, targetValue: U) {
  const items = await getItemArray<T>(key);
  const updatedItems = items.filter((item) => item[target] !== targetValue);

  await setItem(key, updatedItems);
}

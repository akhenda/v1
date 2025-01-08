import { MMKV } from 'react-native-mmkv';

import { logger } from '@/core/observability';

export const defaultStorage = new MMKV();

/**
 * Retrieves a value from the MMKV storage.
 * @param storage The MMKV storage object to read from.
 * @param key The key of the value to retrieve.
 * @returns The value of type T that was stored, or null if the key does not
 * exist or value is not a valid JSON.
 */
export function getItem<T>(storage: MMKV, key: string): T | null {
  const value = storage.getString(key);

  try {
    return value ? JSON.parse(value) || null : null;
  } catch (error) {
    logger.error(error, 'Error parsing JSON:');

    return null;
  }
}

/**
 * Retrieves an array of values from the MMKV storage.
 * @param storage The MMKV storage object to read from.
 * @param key The key of the value to retrieve.
 * @returns The array of values of type T that was stored, or an empty array
 * if the key does not exist or value is not a valid JSON.
 */
export function getItemArray<T>(storage: MMKV, key: string) {
  const value = getItem<T[]>(storage, key);

  return value || [];
}

/**
 * Stores a value in the MMKV storage.
 * @param storage The MMKV storage object to write to.
 * @param key The key to store the value under.
 * @param value The value to store. Will be converted to JSON.
 */
export function setItem<T>(storage: MMKV, key: string, value: T) {
  try {
    storage.set(key, JSON.stringify(value));
  } catch (error) {
    logger.error(error, 'Error storing JSON:');
  }
}

/**
 * Removes a key-value pair from the MMKV storage.
 * @param storage The MMKV storage object to remove the value from.
 * @param key The key of the value to remove.
 */
export function removeItem(storage: MMKV, key: string) {
  storage.delete(key);
}

/**
 * Removes the first item from an array in MMKV storage that matches the given target
 * and target value.
 *
 * @param storage The MMKV storage object to remove the value from.
 * @param key The key of the array to remove the value from.
 * @param target The key of the property to match on.
 * @param targetValue The value of the property to match on.
 */
export function removeItemFromArray<T, U>(
  storage: MMKV,
  key: string,
  target: keyof T,
  targetValue: U,
) {
  const items = getItemArray<T>(storage, key);
  const updatedItems = items.filter((item) => item[target] !== targetValue);

  setItem(storage, key, updatedItems);
}

export function getStorageHelpers(storage: MMKV = defaultStorage) {
  return {
    /** Retrieves a value from the MMKV storage. */
    getItem: <T>(key: string) => getItem<T>(storage, key),

    /** Retrieves an array of values from the MMKV storage. */
    getItemArray: <T>(key: string) => getItemArray<T>(storage, key),

    /** Stores a value in the MMKV storage. */
    setItem: <T>(key: string, value: T) => setItem<T>(storage, key, value),

    /** Removes a key-value pair from the MMKV storage. */
    removeItem: (key: string) => removeItem(storage, key),

    /** Removes the first item from an array in MMKV storage that matches the
     * given target and target value.
     */
    removeItemFromArray: <T, U>(key: string, target: keyof T, targetValue: U) =>
      removeItemFromArray<T, U>(storage, key, target, targetValue),
  };
}

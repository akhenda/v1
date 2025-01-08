import * as SecureStore from 'expo-secure-store';

import { logger } from '@/core/observability';

/**
 * Retrieves a value from the secure storage.
 * @param key The key of the value to retrieve.
 * @returns The value of type T that was stored, or null if the key does not
 * exist or the value is not a valid JSON.
 */
export function getSecureItem<T>(key: string): T | null {
  const value = SecureStore.getItem(key);

  try {
    return value ? JSON.parse(value) || null : null;
  } catch (error) {
    logger.error(error, 'Error parsing JSON:');

    return null;
  }
}

/**
 * Retrieves an array of values from the secure storage.
 * @param key The key of the array to retrieve.
 * @returns The array of values of type T that was stored, or an empty array
 * if the key does not exist or value is not a valid JSON.
 */
export function getSecureItemArray<T>(key: string) {
  const value = getSecureItem<T[]>(key);

  return value || [];
}

/**
 * Stores a value in the secure storage.
 * @param key The key of the value to store.
 * @param value The value to store. Will be converted to JSON.
 */
export function setSecureItem<T>(key: string, value: T) {
  try {
    SecureStore.setItem(key, JSON.stringify(value));
  } catch (error) {
    logger.error(error, 'Error storing JSON:');
  }
}

/**
 * Deletes a key-value pair from the secure storage.
 * @param key The key of the value to delete.
 * @returns A promise that resolves when the value is successfully deleted.
 */
export function removeSecureItem(key: string) {
  SecureStore.deleteItemAsync(key);
}

/**
 * Removes the first item from an array in secure storage that matches the
 * given target and target value.
 *
 * @param key The key of the array to remove the value from.
 * @param target The key of the property to match on.
 * @param targetValue The value of the property to match on.
 */
export function removeSecureItemFromArray<T, U>(key: string, target: keyof T, targetValue: U) {
  const items = getSecureItemArray<T>(key);
  const updatedItems = items.filter((item) => item[target] !== targetValue);

  setSecureItem(key, updatedItems);
}

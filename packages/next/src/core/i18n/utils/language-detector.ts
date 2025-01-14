import { appLocaleStorage } from '../../storage';
import type { SupportedLocale } from '../types';

/**
 * Retrieves the user's saved locale from the app's storage. The locale is saved in the key
 * `APP_LOCALE_KEY` (which is imported from `../../storage/items/app`).
 *
 * @returns The saved locale, or undefined if it is not set.
 */
export const getSavedAppLocale = () => appLocaleStorage.getItem();

/**
 * Saves the given locale to the user's device storage. This function should be used
 * when the user explicitly selects a different locale than the one that the app
 * is currently using. The locale is saved in the app's storage in the key
 * `APP_LOCALE_KEY` (which is imported from `../../storage/items/app`).
 *
 * @param locale - The locale to save, in the format of a language code (for
 * example, `en`, `fr`, `es`, etc).
 * @returns Whether the locale was successfully saved.
 */
export const setSavedAppLocale = (locale: SupportedLocale) => appLocaleStorage.setItem(locale);

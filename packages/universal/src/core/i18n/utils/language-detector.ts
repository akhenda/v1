import * as Localization from 'expo-localization';
import type { LanguageDetectorModule } from 'i18next';

import { config } from '@/core/constants';
import type { SupportedLocale } from '@/core/i18n/types';
import { Analytics } from '@/core/services/analytics';
import { appLocaleStorage } from '@/core/storage';

/**
 * Retrieves the user's saved locale from the app's storage. The locale is saved in the key
 * `APP_LOCALE_KEY` (which is imported from `@/core/storage/items/app`).
 *
 * @returns The saved locale, or undefined if it is not set.
 */
export const getSavedAppLocale = () => appLocaleStorage.getItem();

/**
 * Saves the given locale to the user's device storage. This function should be used
 * when the user explicitly selects a different locale than the one that the app
 * is currently using. The locale is saved in the app's storage in the key
 * `APP_LOCALE_KEY` (which is imported from `@/core/storage/items/app`).
 *
 * @param locale - The locale to save, in the format of a language code (for
 * example, `en`, `fr`, `es`, etc).
 * @returns Whether the locale was successfully saved.
 */
export const setSavedAppLocale = (locale: SupportedLocale) => appLocaleStorage.setItem(locale);

/**
 * Detects the user's primary language setting on their phone.
 *
 * Note: There can be multiple locales set on the user's phone, with the primary
 * one being the one that is currently being used. This function retrieves the
 * primary locale.
 *
 * @returns The primary locale, or undefined if it could not be determined.
 */
const detectPhonePrimaryLocale = () => {
  const primaryLocaleIndex = 0;
  const locales = Localization.getLocales();
  const primaryLocale = locales[primaryLocaleIndex];

  return primaryLocale ? (primaryLocale.languageTag as SupportedLocale) : null;
};

/**
 * Detects the language to use based on the user's selection in the app,
 * falling back to the device's primary locale or the default locale.
 *
 * @returns The detected language to use.
 */
const detectLanguageToUse = () => {
  const currentlySelectedLocale = getSavedAppLocale();

  if (currentlySelectedLocale) {
    Analytics.setUserProperty('language', currentlySelectedLocale);

    return currentlySelectedLocale;
  }

  const phonePrimaryLocale = detectPhonePrimaryLocale();
  const selectedLanguage = phonePrimaryLocale ?? config.defaultLocale;

  Analytics.setUserProperty('language', selectedLanguage);
  setSavedAppLocale(selectedLanguage);

  return selectedLanguage;
};

export const languageDetector: LanguageDetectorModule = {
  type: 'languageDetector',
  detect: detectLanguageToUse,
};

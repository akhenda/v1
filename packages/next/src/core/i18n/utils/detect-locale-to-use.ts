import i18next from 'i18next';

import { config } from '@/core/constants';

const NOT_FOUND_INDEX = -1;

/**
 * This function determines the locale to use for date formatting based on the device's region setting.
 * It first gets the device's region from the Expo localization API.
 * Then it checks if the device's region is supported by the app.
 * If it is, it uses the device's region for date formatting. Otherwise, it defaults to the app's default locale.
 * The function returns the locale to use for date formatting.
 */
export const getSupportedDateLocale = () => {
  const languageTag = i18next.language || window.localStorage.i18nextLng || 'en-US';
  const isSupportedLocale = config.supportedLocales.findIndex((supportedLanguage) => {
    if (languageTag.includes(supportedLanguage)) return true;

    return false;
  });

  const dateLocaleToSet = isSupportedLocale === NOT_FOUND_INDEX ? null : languageTag;

  return dateLocaleToSet ? dateLocaleToSet.slice(0, 2) : config.defaultLocale;
};

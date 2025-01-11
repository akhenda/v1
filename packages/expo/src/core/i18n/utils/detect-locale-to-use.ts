import * as Localization from 'expo-localization';

import { config } from '@/core/constants';

const SELECTED_LOCALIZATION = 0;
const NOT_FOUND_INDEX = -1;

/**
 * Gets the device's region and returns it as an object.
 * The object contains the device's region, language tag and timezone.
 * If the device's region is not supported by the app, the default locale is used.
 * If the device's region is supported, the device's region is used.
 * The function returns the region in the following format:
 * {
 *   region: string,
 *   languageTag: string,
 *   timezone: string
 * }
 */
const getDeviceRegion = () => {
  const locales = Localization.getLocales();
  const calendar = Localization.getCalendars();

  const primaryLocale = locales[SELECTED_LOCALIZATION];
  const primaryCalendar = calendar[SELECTED_LOCALIZATION];

  const region = primaryLocale?.regionCode;
  const languageTag = primaryLocale?.languageTag;
  const timezone = primaryCalendar?.timeZone;

  return {
    region,
    languageTag: languageTag ?? config.defaultLocale,
    timezone: timezone ?? 'Europe/London', // Default timezone being GMT +0
  };
};

/**
 * This function determines the locale to use for date formatting based on the device's region setting.
 * It first gets the device's region from the Expo localization API.
 * Then it checks if the device's region is supported by the app.
 * If it is, it uses the device's region for date formatting. Otherwise, it defaults to the app's default locale.
 * The function returns the locale to use for date formatting.
 */
export const getSupportedDateLocale = () => {
  const { languageTag } = getDeviceRegion();
  const isSupportedLocale = config.supportedLocales.findIndex((supportedLanguage) => {
    if (languageTag.includes(supportedLanguage)) return true;

    return false;
  });

  const dateLocaleToSet = isSupportedLocale === NOT_FOUND_INDEX ? null : languageTag;

  return dateLocaleToSet ? dateLocaleToSet.slice(0, 2) : config.defaultLocale;
};

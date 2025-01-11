import type { i18n } from 'i18next';

import { config } from '@/core/constants';

/**
 * Returns the best-matching locale to the given i18n instance's language.
 *
 * If the exact language code is supported, it will be returned.
 * If not, the first part of the language code (i.e. the primary language code)
 * will be returned if it is supported.
 * If neither is supported, the default locale will be returned.
 *
 * @param i18n - The i18next instance to use
 * @returns The best-matching locale
 */
export const getCurrentLocale = (i18n: i18n) => {
  const languageCode = i18n.language;
  const [primaryCode] = languageCode.split('-');

  if (i18n.hasResourceBundle(languageCode, 'app')) return languageCode;
  if (primaryCode && i18n.hasResourceBundle(primaryCode, 'app')) return primaryCode;

  return config.defaultLocale;
};

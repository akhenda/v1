import i18next from 'i18next';

import { initDateLocale } from '@v1/date/dayjs';

import type { SupportedLocale } from '@/core/i18n/types';
import { logger } from '@/core/observability';
import { Analytics } from '@/core/services/analytics';
import { Notifications } from '@/core/services/notifications';

import { setSavedAppLocale } from './language-detector';

/**
 * Changes the current language for the i18next instance.
 *
 * @param language - The language to change to
 * @returns A Promise that resolves when the language has been changed
 */
export const changeLanguage = async (language: SupportedLocale) => {
  await i18next.changeLanguage(language, (error, t) => {
    let msg = t('The language has been changed');

    if (error) {
      msg = t('The language could not be changed');

      logger.error(error, msg, { userMessage: { title: msg, message: error.message } });

      return;
    }

    setSavedAppLocale(language);
    Notifications.setUserLanguage(language);
    Analytics.setUserProperty('language', language);
    initDateLocale(language);

    logger.success(msg, { userMessage: { title: 'Success', message: msg } });
  });
};

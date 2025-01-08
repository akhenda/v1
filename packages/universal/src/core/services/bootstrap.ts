import { initDateLocale } from '@v1/date/dayjs';

import { getSupportedDateLocale } from '@/core/i18n';

import { Attribution } from './attribution';
import { Notifications } from './notifications';
import { Purchase } from './purchase';

const initNotifications = (locale: string) => {
  Notifications.init();
  Notifications.setUserLanguage(locale);
};

const initDateLib = (locale: string) => initDateLocale(locale);

export const bootstrapServices = async () => {
  // Core services to init first in a specific order
  // await Analytics.init(); // already initialized in ./analytics
  await Attribution.init();

  // Misc
  const localeToUse = getSupportedDateLocale();

  // All other core services
  initNotifications(localeToUse);
  initDateLib(localeToUse);

  // Used SDKs
  Purchase.init();
};

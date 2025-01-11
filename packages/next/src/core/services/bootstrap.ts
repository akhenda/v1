import { initDateLocale } from '@v1/date/dayjs';

import { getSupportedDateLocale } from '@/core/i18n';

import { Attribution } from './attribution';

const initDateLib = (locale: string) => initDateLocale(locale);

export const bootstrapServices = async () => {
  // Core services to init first in a specific order
  // await Analytics.init(); // already initialized in ./analytics
  await Attribution.init();

  // Misc
  const localeToUse = getSupportedDateLocale();

  // All other core services
  initDateLib(localeToUse);

  // Used SDKs
  // ...
};

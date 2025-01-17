// TODO(prod): Enable after prebuild links OneSignal Native module
// export * from './one-signal';

import { logger } from '../../observability';

export const Notifications = {
  init: () => {
    logger.trace('Notifications.init');
  },
  setUserLanguage: (language: string) => {
    logger.trace('Notifications.setUserLanguage', { language });
  },
};

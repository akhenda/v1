// TODO(prod): Enable after prebuild links RevenueCat Native module
// export { Purchase } from './revenue-cat';
export type { EntitlementsType } from './types';

import { logger } from '../../observability';

export const Purchase = {
  init: () => {
    logger.trace('Purchase.init');
  },
};

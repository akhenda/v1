import type { PropsWithChildren } from 'react';

import { logger } from '../../observability';

// TODO(prod): Enable after prebuild links PostHog Native module
// export { default as Analytics } from './post-hog';

export const Analytics = {
  setUserProperty: (prop: string, val: unknown) => {
    logger.trace('Analytics.setUserProperty', { prop, val });
  },
  ExpoPostHogProvider: ({ children }: PropsWithChildren) => {
    logger.trace('Analytics.ExpoPostHogProvider');

    return <>{children}</>;
  },
};

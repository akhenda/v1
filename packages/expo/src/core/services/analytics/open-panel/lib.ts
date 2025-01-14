import { setupAnalytics } from '@v1/analytics/op/mobile';

import { config } from '../../../constants';

import type { AnalyticsEventNames } from '../types';

const { clientId, clientSecret } = config.openPanel;
const Analytics = setupAnalytics<AnalyticsEventNames>(
  { clientId, clientSecret },
  { isProd: config.isProd },
);

export default Analytics;

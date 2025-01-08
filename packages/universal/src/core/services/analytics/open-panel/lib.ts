import { setupAnalytics } from '@v1/analytics/op/mobile';

import { config } from '@/core/constants';

import type { AnalyticsType } from '../types';

const { clientId, clientSecret } = config.openPanel;
const Analytics = setupAnalytics<AnalyticsType.EventNames>(
  { clientId, clientSecret },
  { isProd: config.isProd },
);

export default Analytics;

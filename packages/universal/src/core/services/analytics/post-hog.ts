/**
 * https://expo.github.io/router/docs/migration/react-navigation/screen-tracking/#migrating-from-react-navigation
 * https://github.com/PostHog/posthog-js-lite/issues/171
 */
import { setupAnalytics } from '@v1/analytics/mobile';

import { config } from '@/core/constants';

import type { AnalyticsType } from './types';

const { apiKey, apiHost, personProfiles } = config.postHog;
const Analytics = setupAnalytics<AnalyticsType.PropertyNames, AnalyticsType.EventNames>(
  { apiKey, apiHost, personProfiles },
  { isProd: config.isProd },
);

export default Analytics;

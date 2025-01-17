export type ValidAnalyticsPropertyType =
  | number
  | string
  | boolean
  | (string | number)[]
  | { [key: string]: ValidAnalyticsPropertyType };

export type AnalyticsPropertyNames = 'session-count' | 'language';

export type AnalyticsEventNames =
  // App lifecycle
  | 'app-start'
  | 'app-put-in-background'
  | 'app-put-in-foreground'

  // Navigation
  | 'XXX-screen-viewed'

  // Attribution
  | 'organic-install'
  | 'non-organic-install'
  | 'deep-link-opened';

export type AnalyticsProductIds =
  | 'monthly-subscription'
  | 'monthly-subscription-30-off'
  | 'monthly-subscription-50-off'
  | 'yearly-subscription'
  | 'yearly-subscription-30-off'
  | 'yearly-subscription-50-off';

export type AnalyticsRevenueTypes = 'purchase';

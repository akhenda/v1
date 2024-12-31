// https://develop.sentry.dev/sdk/event-payloads/breadcrumbs/#breadcrumb-types
export const breadcrumbType = {
  default: 'default',
  debug: 'debug',
  error: 'error',
  navigation: 'navigation',
  http: 'http',
  info: 'info',
  query: 'query',
  transaction: 'transaction',
  ui: 'ui',
  user: 'user',
} as const;

export const breadcrumbsCategory = {
  network: 'network',
  exception: 'exception',
  navigation: 'navigation',
  auth: 'auth',
} as const;

export const tags = {
  locale: 'Locale',
  env: 'Environment',
  runtimeVersion: 'RuntimeVersion',
  version: 'Version',
  updatedVersion: 'UpdatedVersion',
} as const;

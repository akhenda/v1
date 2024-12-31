import type { Breadcrumb, CaptureContext, Event, Scope, SeverityLevel, User } from '@sentry/core';

import type { tags } from './constants.js';
import type { ErrorMonitoringConfig, PossibleSentry, Primitives } from './types.js';

const prodSampleRate = 0.5;
const fullSampleRate = 1;

export function getProjectErrorMonitoring<T extends PossibleSentry>(
  Sentry: T,
  { env, sentryDsn, runtimeVersion, version, integrations = [] }: ErrorMonitoringConfig,
) {
  return {
    /*  Setup  */
    init() {
      const isEnabled = env !== 'development';
      const sampleRate = env === 'production' ? prodSampleRate : fullSampleRate;

      if (!sentryDsn) {
        console.warn('Failed to initialize Sentry - No DSN found');

        return;
      }

      Sentry.init({
        dsn: sentryDsn,
        debug: false,
        tracesSampleRate: sampleRate,
        enabled: isEnabled,
        environment: env,
        integrations,
        denyUrls: [
          /mixpanel.com/i,
          /flagsmith.com/i,
          /onesignal.com/i,
          /apple.com/i,
          /posthog.com/i,
        ],
        beforeBreadcrumb(breadcrumb) {
          if (typeof breadcrumb.data?.url === 'string') {
            if (
              breadcrumb.data.url.match(/mixpanel.com/i) ??
              breadcrumb.data.url.match(/flagsmith.com/i) ??
              breadcrumb.data.url.match(/onesignal.com/i) ??
              breadcrumb.data.url.match(/apple.com/i)
            )
              return null;
          }

          if (breadcrumb.category === 'console') return null;

          return breadcrumb;
        },
      });

      if (typeof runtimeVersion === 'string') this.tag('runtimeVersion', runtimeVersion);

      this.tag('version', version);
    },

    /*  User related  */

    setUser(user: User) {
      Sentry.setUser(user);
    },

    clearUser() {
      Sentry.configureScope((scope) => scope.setUser(null));
    },

    /*  Monitoring  */

    event(event: Event) {
      Sentry.captureEvent(event);
    },

    exception(exception: unknown) {
      Sentry.captureException(exception);
    },

    message(message: string, context?: CaptureContext | SeverityLevel) {
      Sentry.captureMessage(message, context);
    },

    tag(key: keyof typeof tags, value: Primitives) {
      Sentry.setTag(key, value);
    },

    context(name: string, context: Record<string, unknown> | null) {
      Sentry.setContext(name, context);
    },

    breadcrumbs(breadcrumb: Breadcrumb) {
      Sentry.addBreadcrumb(breadcrumb);
    },

    scope(callback: (scope: Scope) => void) {
      Sentry.withScope(callback);
    },
  };
}

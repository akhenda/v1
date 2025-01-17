import type { Breadcrumb, CaptureContext, Event, Scope, SeverityLevel, User } from '@sentry/core';

import type { Primitives } from '@v1/types';

import type { tags } from './constants';
import type { ErrorMonitoringConfig, PossibleSentry } from './types';

const prodSampleRate = 0.5;
const fullSampleRate = 1;

const mixPanelRegex = /mixpanel.com/i;
const flagsmithRegex = /flagsmith.com/i;
const onesignalRegex = /onesignal.com/i;
const appleRegex = /apple.com/i;
const postHogRegex = /posthog.com/i;

export function getAppErrorMonitoring<TSentry extends PossibleSentry>(Sentry: TSentry) {
  return {
    /*  Setup  */
    init({
      environment,
      sentryDsn,
      runtimeVersion,
      version,
      integrations = [],
    }: ErrorMonitoringConfig) {
      const enabled = environment !== 'development';
      const tracesSampleRate = environment === 'production' ? prodSampleRate : fullSampleRate;

      if (!sentryDsn) {
        // biome-ignore lint/suspicious/noConsole: <explanation>
        console.warn('Failed to initialize Sentry - No DSN found');

        return;
      }

      Sentry.init({
        dsn: sentryDsn,
        debug: false,
        tracesSampleRate,
        enabled,
        environment,
        integrations,
        denyUrls: [mixPanelRegex, flagsmithRegex, onesignalRegex, appleRegex, postHogRegex],
        beforeBreadcrumb(breadcrumb) {
          if (
            typeof breadcrumb.data?.url === 'string' &&
            (breadcrumb.data.url.match(mixPanelRegex) ??
              breadcrumb.data.url.match(flagsmithRegex) ??
              breadcrumb.data.url.match(onesignalRegex) ??
              breadcrumb.data.url.match(postHogRegex) ??
              breadcrumb.data.url.match(appleRegex))
          )
            return null;

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
      Sentry.configureScope?.((scope) => scope.setUser(null));
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

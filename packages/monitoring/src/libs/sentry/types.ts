import type {
  Breadcrumb,
  CaptureContext,
  Event,
  Integration,
  Scope,
  SeverityLevel,
  Span,
  StartSpanOptions,
  User,
} from '@sentry/core';

import type { Primitives } from '@v1/types';

import type { tags } from './constants.js';

export type { Primitives };

export type PossibleSentry = {
  init: (options: {
    dsn: string;
    enabled: boolean;
    integrations: Integration[];
    debug: boolean;
    tracesSampleRate: number;
    environment: 'production' | 'development';
    denyUrls: (string | RegExp)[];
    beforeBreadcrumb: (breadcrumb: Breadcrumb) => Breadcrumb | null;
  }) => void;
  captureEvent: (event: Event) => void;
  captureException: (exception: unknown) => void;
  captureMessage: (message: string, context?: CaptureContext | SeverityLevel) => void;
  configureScope?: (callback: (scope: Scope) => void) => void;
  setContext: (name: string, context: Record<string, unknown> | null) => void;
  setTag: (key: keyof typeof tags, value: Primitives) => void;
  setUser: (user: User) => void;
  addBreadcrumb: (breadcrumb: Breadcrumb) => void;
  withScope: (callback: (scope: Scope) => void) => void;
  startSpan: (context: StartSpanOptions, callback: (span: Span | undefined) => void) => void;
  startInactiveSpan: (context: StartSpanOptions) => void;
};

export type ErrorMonitoringConfig = {
  environment: 'production' | 'development';
  sentryDsn?: string;
  runtimeVersion?: string;
  version?: string;
  integrations?: Integration[];
};

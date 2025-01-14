import type { Span, StartSpanOptions } from '@sentry/core';

import type { PossibleSentry } from './types.js';

export function getProjectPerformanceMonitoring<T extends PossibleSentry>(Sentry: T) {
  return {
    startTransaction<T>(context: StartSpanOptions, callback: (span: Span | undefined) => T) {
      Sentry.startSpan(context, callback);
    },

    startIndependentTransaction(context: StartSpanOptions) {
      Sentry.startInactiveSpan(context);
    },
  };
}

import * as Sentry from '@sentry/nextjs';

import { getAppErrorMonitoring } from '@v1/monitoring';

export const ErrorMonitoring = getAppErrorMonitoring(Sentry);

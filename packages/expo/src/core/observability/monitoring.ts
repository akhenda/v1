import * as Sentry from '@sentry/react-native';

import { getAppErrorMonitoring } from '@v1/monitoring';

export const ErrorMonitoring = getAppErrorMonitoring(Sentry);

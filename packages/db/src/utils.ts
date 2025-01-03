import * as R from 'remeda';

import { createProjectLogger } from '@v1/logging';

export const noop = R.doNothing;
export const logger = createProjectLogger('@v1/db', 'trace');

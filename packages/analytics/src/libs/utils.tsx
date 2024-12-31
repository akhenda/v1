import type { ReactNode } from 'react';
import * as R from 'remeda';

import { createProjectLogger } from '@v1/logging';

export const noop = R.doNothing;
export const logger = createProjectLogger('@v1/analytics', 'trace');

export function NoOp({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
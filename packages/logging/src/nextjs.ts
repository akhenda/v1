/**
 * NOTE:
 * https://medium.com/vectoscalar/react-native-logs-best-practices-3d271a20b541
 * https://medium.com/@barisberkemalkoc/axios-interceptor-intelligent-db46653b7303
 * https://github.com/nestjs/nest/issues/507#issuecomment-374221089
 * https://adrianhall.github.io/cloud/2019/06/30/building-an-efficient-logger-in-typescript/
 * https://betterstack.com/docs/logs/javascript/nextjs/
 */

import type { LogLevel } from './config.js';
import { createLogger as createPinoLogger } from './libs/pino.js';
import { createLogger } from './libs/universal-logger/index.js';

export function createProjectLogger(
  project: string,
  level: LogLevel = 'trace',
  options?: Record<string, unknown>,
  withLogtail = true,
) {
  const PinoLogger = createPinoLogger(project, level, options, withLogtail);
  const devLogger = createLogger(project, level, options);
  const prodLogger = withLogtail ? PinoLogger : devLogger;

  return process.env.NODE_ENV === 'production' ? prodLogger : devLogger;
}

/**
 * https://medium.com/vectoscalar/react-native-logs-best-practices-3d271a20b541
 */
import { consoleTransport, logger } from 'react-native-logs';
import type { ConsoleTransportOptions } from 'react-native-logs/dist/transports/consoleTransport.js';

import getConfig from '@v1/config/mobile';

import type { LogLevel } from './config.js';
import { createLogger } from './libs/pino.js';

type Colors = NonNullable<ConsoleTransportOptions['colors']>;
type ExtractColor<T> = T extends Record<string, infer U> ? U : never;
type Color = ExtractColor<Colors>;

const config = getConfig({ client: {}, shared: {} });
const { env } = config;

const DevLogger = logger.createLogger({
  async: true,
  severity: 'verbose',
  transport: consoleTransport,
  dateFormat: 'time',
  levels: {
    trace: 0,
    debug: 1,
    done: 2,
    success: 3,
    info: 4,
    notice: 5,
    warn: 6,
    error: 7,
    fatal: 8,
  } satisfies Record<LogLevel, number>,
  transportOptions: {
    colors: {
      trace: 'cyanBright',
      debug: 'white',
      done: 'whiteBright',
      success: 'greenBright',
      info: 'blueBright',
      notice: 'blue',
      warn: 'yellowBright',
      error: 'red',
      fatal: 'redBright',
    } satisfies Record<LogLevel, Color>,
  },
  printDate: true,
  printLevel: true,
});

export type { LogLevel };

export function createProjectLogger(
  project: string,
  level: LogLevel = 'trace',
  options?: Record<string, unknown>,
  withLogtail = true,
) {
  const PinoLogger = createLogger(project, level, options, withLogtail);

  return env.isDevelopment ? DevLogger : PinoLogger;
}

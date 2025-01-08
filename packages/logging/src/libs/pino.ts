import { pino } from 'pino';
import { LOG_LEVELS, type LogLevel } from '../config.js';
import type { LoggerOptions } from './universal-logger/core/types.js';

export function createLogger(
  project = '@v1',
  level: LogLevel = 'trace',
  options?: LoggerOptions,
  withLogtail = false,
) {
  /**
   * Pino's default levels
   *
   * levels: {
   *   silent: Infinity,
   *   fatal: 60,
   *   error: 50,
   *   warn: 50,
   *   info: 30,
   *   debug: 20,
   *   trace: 10
   *  },
   *  levelComparison: 'ASC'
   */

  if (withLogtail) {
    pino.transport({
      target: '@logtail/pino',
      options: { sourceToken: process.env.LOGTAIL_SOURCE_TOKEN },
    });
  } else {
    pino.transport({
      target: 'pino-pretty',
      options: { colorize: true, ignore: 'pid,hostname' },
    });
  }

  const logger = pino<LogLevel, true>({
    name: project,
    customLevels: LOG_LEVELS,
    useOnlyCustomLevels: true,
    level,
    levelComparison: 'DESC',
    ...options,
  });

  return logger;
}

import { pino } from 'pino';
import type { LogLevel } from '../config.js';
import type { LoggerOptions } from './universal-logger/core/types.js';

export function createProjectLogger(project: string, level: LogLevel, options?: LoggerOptions) {
  const logger = pino({ name: project, level, ...options });

  return logger;
}

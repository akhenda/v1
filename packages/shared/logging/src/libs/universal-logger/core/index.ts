import type { LogLevel as Level } from '../../../config.js';

import LogLevel from './LogLevel.js';
import Logger from './Logger.js';
import { DEBUG } from './constants.js';

const contextualLoggers: { [key: string]: Logger } = {};
const globalLogger = new Logger({ level: DEBUG });

globalLogger.on('setLevel', (level) => {
  // Apply filter level to all registered contextual loggers
  Object.keys(contextualLoggers).forEach((key) => {
    const logger = contextualLoggers[key];

    if (logger) logger.setLevel(level);
  });
});

const logger = (name: string) => {
  // biome-ignore lint/style/noParameterAssign: very intentional
  name = String(name || '');

  if (!name) return globalLogger;
  if (!contextualLoggers[name]) {
    contextualLoggers[name] = new Logger(name, { level: globalLogger.level });
  }

  return contextualLoggers[name] as Logger;
};

export const defineLogLevel = (name: Level, value: number) => {
  return new LogLevel(name, value);
};

export * from './constants.js';
export default logger;

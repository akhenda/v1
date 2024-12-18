import type { LogLevel, LogLevels } from './config.js';

export type { LogLevel, LogLevels };

export type LogLevelObject = {
  name: LogLevel;
  value: number;
};

export type LoggerOptions = {
  showSource?: boolean;
  showTimestamp?: boolean;
  colorized?: boolean;
  style?: { level?: LogLevelObject };
  useNativeConsoleMethods?: boolean;
  formatTimestamp?: (timestamp: number) => string;
  formatter?: (context: LogContext, messages: string[]) => string[];
};

export type LogContext = {
  namespace: string;
  level: LogLevelObject;
  stackframes: { source: string }[];
};

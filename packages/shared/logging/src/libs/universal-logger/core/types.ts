import type ErrorStackParser from 'error-stack-parser';
import type LogLevel from './LogLevel.js';

export type LogContext = {
  namespace: string;
  level: LogLevel;
  stackframes: ErrorStackParser.StackFrame[];
};

export type LogHandler = (context: LogContext, messages: unknown[], next: () => void) => void;

export type LoggerOptions = {
  showIcon?: boolean;
  showSource?: boolean;
  showTimestamp?: boolean;
  colorized?: boolean;
  style?: { level?: Record<LogLevel['name'], string> };
  useNativeConsoleMethods?: boolean;
  formatTimestamp?: (timestamp: number) => string;
  formatter?: (context: LogContext, messages: unknown[]) => string[];
};

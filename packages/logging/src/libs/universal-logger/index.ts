import * as R from 'remeda';
import universalLogger, { defineLogLevel } from 'universal-logger';

import { LOGS_CONFIG, type LogLevel } from '../../config.js';
import type { LoggerOptions } from '../../types.js';

import { styleable } from './plugin/index.js';

const TRACE = defineLogLevel('trace', LOGS_CONFIG.levels.trace);
const DEBUG = defineLogLevel('debug', LOGS_CONFIG.levels.debug);
const DONE = defineLogLevel('done', LOGS_CONFIG.levels.done);
const SUCCESS = defineLogLevel('success', LOGS_CONFIG.levels.success);
const INFO = defineLogLevel('info', LOGS_CONFIG.levels.info);
const NOTICE = defineLogLevel('notice', LOGS_CONFIG.levels.notice);
const WARN = defineLogLevel('warn', LOGS_CONFIG.levels.warn);
const ERROR = defineLogLevel('error', LOGS_CONFIG.levels.error);
const FATAL = defineLogLevel('fatal', LOGS_CONFIG.levels.fatal);

/**
 * Retrieves the log level object corresponding to the specified log level.
 *
 * @param level - The log level for which the corresponding log level object
 * is to be retrieved. This determines the severity of log messages.
 * @returns The log level object associated with the specified log level.
 */
function getLevelObject(level: LogLevel) {
  return {
    done: DONE,
    trace: TRACE,
    debug: DEBUG,
    success: SUCCESS,
    info: INFO,
    notice: NOTICE,
    warn: WARN,
    error: ERROR,
    fatal: FATAL,
  }[level];
}

/**
 * The Logger class defines the `getInstance` method that lets clients access
 * the unique singleton instance.
 */
class Logger {
  private static instance: Logger;
  private static level: LogLevel;
  private static project: string;
  public logger: ReturnType<typeof universalLogger>;

  /**
   * The Logger's constructor should always be private to prevent direct
   * construction calls with the `new` operator.
   */
  private constructor(project: string, level: LogLevel, options?: LoggerOptions) {
    Logger.level = level;
    Logger.project = project;

    this.configure(options);
  }

  /**
   * The static method that controls the access to the singleton instance.
   *
   * This implementation let you subclass the Logger class while keeping
   * just one instance of each subclass around.
   */
  public static getInstance(project: string, level: LogLevel, options?: LoggerOptions): Logger {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
    if (!Logger.instance) Logger.instance = new Logger(project, level, options);

    return Logger.instance;
  }

  /**
   * Configure the logger with a given set of options.
   *
   * @param options logger options
   */
  configure(options: LoggerOptions = { showSource: true, showTimestamp: true, colorized: true }) {
    this.logger = universalLogger(Logger.project)
      .use(styleable(options))
      .on('log', () => {
        // If context.level === ERROR
        // use sentry
      });

    this.logger.disableStackTrace();
    this.logger.setLevel(getLevelObject(Logger.level));
  }

  /**
   * Trace log message.
   *
   * @param message log message
   * @param args additional log metadata
   */
  trace(message: string, ...args: unknown[]) {
    this.logger?.log(TRACE, message, ...args);
  }

  /**
   * Debug log message.
   *
   * @param message log message
   * @param args additional log metadata
   */
  debug(message: string, ...args: unknown[]) {
    this.logger?.log(DEBUG, message, ...args);
  }

  /**
   * Done log message.
   *
   * @param message log message
   * @param args additional log metadata
   */
  done(message: string, ...args: unknown[]) {
    this.logger?.log(DONE, message, ...args);
  }

  /**
   * Success log message.
   *
   * @param message log message
   * @param args additional log metadata
   */
  success(message: string, ...args: unknown[]) {
    this.logger?.log(SUCCESS, message, ...args);
  }

  /**
   * Information log message.
   *
   * @param message log message
   * @param args additional log metadata
   */
  info(message: string, ...args: unknown[]) {
    this.logger?.log(INFO, message, ...args);
  }

  /**
   * Notice log message.
   *
   * @param message log message
   * @param args additional log metadata
   */
  notice(message: string, ...args: unknown[]) {
    this.logger?.log(NOTICE, message, ...args);
  }

  /**
   * Warning log message.
   *
   * @param message log message
   * @param args additional log metadata
   */
  warn(message: string, ...args: unknown[]) {
    this.logger?.log(WARN, message, ...args);
  }

  /**
   * Logs an error message along with an Error object.
   *
   * Constructs a detailed error message including the function scope where
   * the error occurred and the error message itself. The constructed message
   * is then logged at the ERROR level.
   *
   * @param error - The Error object to be logged.
   * @param message - An optional message to provide additional context for the error.
   */
  error(error: unknown, message = '') {
    let msg = '';

    if (R.isError(error)) {
      const scope = error.stack?.split('\n')[2]?.trim().split(' ')[1];

      if (scope) msg += `(${scope}): `;

      msg += message;
      msg += ' -';
    }

    // Add error monitoring here

    this.logger?.log(ERROR, msg || message, error);
  }

  /**
   * Logs a fatal error message.
   *
   * Logs the given message at the FATAL level, which is the highest level of severity
   * for log messages. Fatal messages are typically used to indicate a critical error
   * that requires immediate attention.
   *
   * @param message The message to be logged at the FATAL level.
   * @param args Additional metadata to be logged along with the message.
   */
  fatal(message: string, ...args: unknown[]) {
    this.logger?.log(FATAL, message, ...args);
  }
}

/**
 * Creates and returns a singleton instance of the Logger for a given project.
 * This ensures that only one Logger instance exists for each unique project,
 * log level, and options combination.
 *
 * @param project - The name of the project for which the logger is created.
 * @param level - The log level for the logger, which determines the severity
 * of messages to be logged.
 * @param options - Optional configuration for the logger, such as whether to
 * show the source, enable timestamps, or use colorized output.
 * @returns The singleton Logger instance for the specified project, level, and options.
 */
export function createProjectLogger(project: string, level: LogLevel, options?: LoggerOptions) {
  return Logger.getInstance(project, level, options);
}

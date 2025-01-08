import * as R from 'remeda';

import {
  ConsoleOutput,
  type LogLevel,
  Logger as UnilogrLogger,
  addInterval,
  addTimestamp,
  capitalizeField,
  colorizeField,
  discardLessSevereThan,
  markSlot,
  writeTo,
} from 'unilogr';

import { LOGS_CONFIG } from '../config.js';

/**
 * The Logger class defines the `getInstance` method that lets clients access
 * the unique singleton instance.
 */
class Logger {
  // eslint-disable-next-line no-use-before-define
  private static instance?: Logger;
  private static level?: LogLevel;
  private static project?: string;
  private logger?: UnilogrLogger;

  /**
   * The Logger's constructor should always be private to prevent direct
   * construction calls with the `new` operator.
   */
  private constructor(project: string, level: LogLevel) {
    Logger.level = level;
    Logger.project = project;

    this.configure();
  }

  /**
   * The static method that controls the access to the singleton instance.
   *
   * This implementation let you subclass the Logger class while keeping
   * just one instance of each subclass around.
   */
  public static getInstance(project: string, level: LogLevel): Logger {
    if (!Logger.instance) Logger.instance = new Logger(project, level);

    return Logger.instance;
  }

  /**
   * Configures the logger by setting up a series of transformations and formatting
   * rules for log messages. This includes capitalizing and colorizing the log level,
   * adding timestamps and intervals, and formatting the message with project-specific
   * information and icons. The final formatted message is written to the console.
   */
  private configure() {
    this.logger = new UnilogrLogger([
      discardLessSevereThan(Logger.level),
      capitalizeField('level'), // Capitalize the "level" field
      colorizeField('level'), // Colorize the "level" field according to severity
      addTimestamp(), // Add the "timestamp" field
      addInterval(), // Add the "interval" field

      markSlot(), // Mark this spot for extensions

      ({ timestamp, level, message, interval, ...rest }) => {
        // console.log('rest: ', rest);
        const theLevel = rest[Symbol.for('level')];
        const logPrefix = LOGS_CONFIG.colorize(
          ` ${timestamp} ${LOGS_CONFIG.getIcon(theLevel)} (${Logger.project}) `,
          theLevel,
        );

        const body = R.isEmpty(rest) ? '' : `\n${JSON.stringify(rest, null, 2)}`;

        return `${logPrefix} [${level}]: ${message} (${interval})${body}`; // Format message
      },

      writeTo(new ConsoleOutput()), // Write formatted message to console
    ]);
  }

  fatal(message: string, ...args: unknown[]) {
    this.logger?.debug(message, ...args);
  }

  error(error: Error, message = '') {
    let msg = message;

    if (R.isError(error)) {
      msg = '';

      const scope = error.stack?.split('\n')[2]?.trim().split(' ')[1];

      if (scope) msg += `(${scope}): `;

      msg += message;

      if (error.message) {
        msg += ' - ';
        msg += error.message;
      }
    }

    // Add error monitoring here

    this.logger?.error(msg, error);
  }

  warn(message: string, ...args: unknown[]) {
    this.logger?.warn(message, ...args);
  }

  info(message: string, ...args: unknown[]) {
    this.logger?.info(message, ...args);
  }

  debug(message: string, ...args: unknown[]) {
    this.logger?.debug(message, ...args);
  }

  verbose(message: string, ...args: unknown[]) {
    this.logger?.verbose(message, ...args);
  }
}

/**
 * Creates and returns a singleton instance of the Logger for a given project.
 * This ensures that only one Logger instance exists for each unique project
 * and log level combination.
 *
 * @param project - The name of the project for which the logger is created.
 * @param level - The log level for the logger, which determines the severity
 * of messages to be logged.
 * @returns The singleton Logger instance for the specified project and level.
 */
export function createLogger(project = '@v1', level: LogLevel = 'debug') {
  return Logger.getInstance(project, level);
}

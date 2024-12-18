import { createLogger } from '@rasri/log';
import * as R from 'remeda';

import type { LogLevel } from '../config.js';

/**
 * The Logger class defines the `getInstance` method that lets clients access
 * the unique singleton instance.
 */
class Logger {
  private static instance?: Logger;
  private static level?: LogLevel;
  private static project?: string;
  private logger?: ReturnType<typeof createLogger>;

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

  private configure() {
    this.logger = createLogger(Logger.project, {
      shouldShowTime: () => true,
      // shouldPrint: (level: string) => {
      //   return level === Logger.level;
      // }
    });
  }

  fatal(message: string, ...args: unknown[]) {
    this.logger?.error(message, ...args);
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

  trace(message: string, ...args: unknown[]) {
    this.logger?.debug(message, ...args);
  }

  success(message: string, ...args: unknown[]) {
    this.logger?.info(message, ...args);
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
export function createProjectLogger(project: string, level: LogLevel) {
  return Logger.getInstance(project, level);
}

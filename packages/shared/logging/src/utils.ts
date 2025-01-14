import * as R from 'remeda';

import { LOGS_CONFIG, type LogLevel } from './config.js';

/**
 * A function that does nothing.
 * @returns null
 */
export const noop = R.doNothing;

/**
 * Check if the current environment is a server environment.
 * @returns true if the code is running on the server, false if it is running on the client.
 */
export function isServer() {
  return !(typeof window !== 'undefined' && window.document);
}

/**
 * Check if the current environment is a client environment.
 * @returns true if the code is running on the client, false if it is running on the server.
 */
export function isClient() {
  return typeof window !== 'undefined' && Boolean(window.document);
}

/**
 * Applies color to a string based on the specified log level.
 *
 * @param str - The string to be colorized.
 * @param level - The log level which determines the color.
 * @param bothTextAndBackground - A boolean flag to determine if both text and background
 *                                colors should be applied. Defaults to false.
 * @returns The colorized string with the appropriate colors applied.
 */

export function colorize(str: string, level: LogLevel | 'off', bothTextAndBackground = false) {
  if (level === 'off') return;

  return bothTextAndBackground
    ? LOGS_CONFIG.colorize(str, level)
    : LOGS_CONFIG.colorizeText(str, level);
}

/**
 * Retrieves the icon associated with a given log level.
 *
 * @param level - The log level for which the icon is to be retrieved.
 * @returns The icon associated with the specified log level.
 */

export function getIcon(level: LogLevel | 'off') {
  if (level === 'off') return '';

  return LOGS_CONFIG.getIcon(level);
}

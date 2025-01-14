import chalk from 'chalk';

import type { Union2Tuple } from '@v1/types';

/**
 * Log levels
 */
export const LOG_LEVELS = {
  trace: 0,
  debug: 1,
  done: 2,
  success: 3,
  info: 4,
  notice: 5,
  warn: 6,
  error: 7,
  fatal: 8,
} as const;

/**
 * Log level
 */
export type LogLevel = keyof typeof LOG_LEVELS;

/**
 * Log levels
 */
export type LogLevels = Union2Tuple<LogLevel>;

/**
 * Log icons
 */
export type LogIcons = Record<LogLevel, string>;

/**
 * Log colors
 */
export type LogColors = Record<LogLevel, string>;

/**
 * Log colors
 */
export const LOG_COLORS = {
  bg: {
    trace: '#FEFEFE',
    debug: '#DFF2BF',
    done: '#FFFFFF',
    success: '#77C926',
    info: '#BDE5F8',
    notice: '#BBCCFF',
    warn: '#EFEFB3',
    error: '#FFBABA',
    fatal: '#FF805C',
  },
  border: {
    trace: '#AAAAAA',
    debug: '#4F8A10',
    done: '#222222',
    success: '#30740C',
    info: '#00529B',
    notice: '#1122EE',
    warn: '#9F6000',
    error: '#D8000C',
    fatal: '#7A071A',
  },
  text: {
    trace: '#AAAAAA',
    debug: '#4F8A10',
    done: '#222222',
    success: '#30740C',
    info: '#00529B',
    notice: '#1122EE',
    warn: '#9F6000',
    error: '#D8000C',
    fatal: '#7A071A',
  },
} as const;

/**
 * Log icons
 *
 * →✓ℹ⨯ 🔈📣📢✔️✅☠️❗❕ℹ️⚠️ 🕵️‍♂️🔎👀👁️👣‼️ ❌🛑⛔🆘
 */
const LOG_ICONS = {
  trace: '👣',
  debug: '🐛',
  done: '☑️',
  success: '✅',
  info: 'ℹ️ ',
  notice: '‼️',
  warn: '⚠️',
  error: '⛔',
  fatal: '☠️',
} as const;

/**
 * Retrieves the icon associated with a given log level.
 *
 * @param logLevel - The log level for which the icon is to be retrieved.
 * @returns The icon associated with the specified log level.
 */
function getIcon(logLevel: LogLevel) {
  const level = logLevel.toLowerCase() as keyof typeof LOG_ICONS;

  return LOG_ICONS[level];
}

/**
 * Applies background and text color to a string based on the specified log level.
 *
 * @param str - The string to be colorized.
 * @param logLevel - The log level which determines the background and text color.
 * @returns The colorized string with the background and text color applied.
 */

function colorize(str: string, logLevel: LogLevel) {
  const level = logLevel.toLowerCase() as LogLevel;

  return chalk.bgHex(LOG_COLORS.bg[level]).hex(LOG_COLORS.text[level])(str);
}

/**
 * Applies text color to a string based on the specified log level.
 *
 * @param str - The string to be colorized.
 * @param logLevel - The log level which determines the text color.
 * @returns The colorized string with the text color applied.
 */

/**
 * Applies text color to a string based on the specified log level.
 *
 * @param str - The string to be colorized.
 * @param logLevel - The log level which determines the text color.
 * @returns The colorized string with the text color applied.
 */
function colorizeText(str: string, logLevel: LogLevel) {
  const level = logLevel.toLowerCase() as LogLevel;

  return chalk.hex(LOG_COLORS.text[level])(str);
}

/**
 * Configuration object for logging
 */
export const LOGS_CONFIG = {
  colors: LOG_COLORS,
  icons: LOG_ICONS,
  levels: LOG_LEVELS,
  getIcon,
  colorize,
  colorizeText,
} as const;

/**
 * Log colors
 */
export const logColors = LOGS_CONFIG.colors;

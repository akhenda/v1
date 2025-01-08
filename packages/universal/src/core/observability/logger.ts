import type { SeverityLevel } from '@sentry/core';

import { type LogLevel, createProjectLogger } from '@v1/logging/mobile';
import { breadcrumbType, breadcrumbsCategory } from '@v1/monitoring';

import { Toaster, type ToasterType } from '@/design/ui-kit/components/toaster';

import { ErrorMonitoring } from './monitoring';
import type { LoggerDetails, NetworkErrorType, UserMessageType } from './types';

const Logger = createProjectLogger('@v1/universal');

function showToast(userMessage?: UserMessageType, type: ToasterType['type'] = 'error') {
  if (userMessage && Boolean(userMessage.title) && Boolean(userMessage.message)) {
    Toaster.show({ type, text1: userMessage.title, text2: userMessage.message });
  }
}

function networkError({ description, requestData, userMessage }: NetworkErrorType) {
  const { request, method, statusCode, reason } = requestData;

  ErrorMonitoring.breadcrumbs({
    type: breadcrumbType.http,
    category: breadcrumbsCategory.network,
    message: description,
    level: 'error',
    timestamp: Date.now(),
    data: { url: request, method, status_code: statusCode, reason },
  });

  showToast(userMessage);
}

function reporter(level: LogLevel, message?: string, details?: LoggerDetails) {
  const logger = Logger[level];
  const { error, userMessage, ...rest } = details || {};
  const severityLevel = {
    trace: 'log',
    debug: 'debug',
    done: 'info',
    success: 'info',
    info: 'info',
    notice: 'info',
    warn: 'warning',
    error: 'error',
    fatal: 'fatal',
  }[level] as SeverityLevel;

  if (['error', 'fatal'].includes(level) && error) {
    try {
      ErrorMonitoring.scope((scope) => {
        scope.setLevel(severityLevel);

        if (rest.transactionName) scope.setTransactionName(rest.transactionName);

        ErrorMonitoring.exception(error);
      });

      if (message) logger(message, error, rest);
      showToast(userMessage);
    } catch (newError) {
      console.error('Error parsing error:', newError);
    }
  } else {
    if (message) logger(message, rest);
    showToast(userMessage, level === 'success' ? 'success' : 'info');
  }

  let errorMessage: string;

  if (error) {
    errorMessage = 'An error occurred';

    if (error instanceof Error) {
      errorMessage = error.message;
    } else if (error && typeof error === 'object' && 'message' in error) {
      errorMessage = error.message as string;
    } else {
      errorMessage = String(error);
    }

    return { message, userMessage, errorMessage };
  }

  return { message, userMessage };
}

const dev = (message: string, details?: LoggerDetails) => reporter('debug', message, details);
const trace = (message: string, details?: LoggerDetails) => reporter('trace', message, details);
const debug = (message: string, details?: LoggerDetails) => reporter('debug', message, details);
const done = (message: string, details?: LoggerDetails) => reporter('done', message, details);
const success = (message: string, details?: LoggerDetails) => reporter('success', message, details);
const info = (message: string, details?: LoggerDetails) => reporter('info', message, details);
const notice = (message: string, details?: LoggerDetails) => reporter('notice', message, details);
const warn = (message: string, details?: LoggerDetails) => reporter('warn', message, details);
const error = (error: unknown, message?: string, details?: LoggerDetails) =>
  reporter('error', message, { error, ...details });
const fatal = (error: unknown, message?: string, details?: LoggerDetails) =>
  reporter('fatal', message, { error, ...details });

export const logger = {
  showToast,
  networkError,
  error,
  dev,
  trace,
  debug,
  done,
  success,
  info,
  notice,
  warn,
  fatal,
};

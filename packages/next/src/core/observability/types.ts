import type { SeverityLevel } from '@sentry/core';

export type UserMessageType = { title: string; message: string };
export type BaseErrorType = { message: string };

export interface ErrorType extends BaseErrorType {
  error: unknown;
  userMessage?: UserMessageType;
  level?: SeverityLevel;
  transactionName?: string;
}

export type LoggerDetails = {
  error?: unknown;
  transactionName?: string;
  userMessage?: UserMessageType;
  [key: string]: unknown;
};

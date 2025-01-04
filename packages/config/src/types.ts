import type { ClientOptions, ServerOptions } from '@t3-oss/env-core';
import type { ZodType } from 'zod';

/** Node Envs */
export const nodeEnvs = ['development', 'test', 'production', 'staging'] as const;

/** Expo App Variants */
export const expoAppVariants = ['development', 'preview', 'production'] as const;

export type NodeEnv = (typeof nodeEnvs)[number];
export type ExpoAppVariant = (typeof expoAppVariants)[number];

export interface CleanedEnvAccessors {
  /** True if NODE_ENV === 'development' */
  readonly isDevelopment: boolean;

  /** Alias to isDevelopemnt */
  readonly isDev: boolean;

  /** True if NODE_ENV === 'test' */
  readonly isTest: boolean;

  /** True if NODE_ENV === 'production' */
  readonly isProduction: boolean;

  /** Alias to isProduction */
  readonly isProd: boolean;
}

export interface CleanedMobileEnvAccessors {
  /** True if APP_VARIANT === 'development' */
  readonly isDevelopment: boolean;

  /** Alias to isDevelopemnt */
  readonly isDev: boolean;

  /** True if APP_VARIANT === 'preview' */
  readonly isPreview: boolean;

  /** True if APP_VARIANT === 'production' */
  readonly isProduction: boolean;

  /** Alias to isProduction */
  readonly isProd: boolean;

  /** True if `__DEV__` is true */
  readonly isDevBundle: boolean;

  /** True if `__DEV__` is false */
  readonly isProdBundle: boolean;
}

export type EnvAccessors<T, U> = U extends true
  ? T & CleanedMobileEnvAccessors
  : T & CleanedEnvAccessors;

export const CLIENT_PREFIX = 'PUBLIC_';
export type ClientPrefix = typeof CLIENT_PREFIX;
export const NEXT_CLIENT_PREFIX = 'NEXT_PUBLIC_';
export type NextClientPrefix = typeof NEXT_CLIENT_PREFIX;
export const EXPO_CLIENT_PREFIX = 'EXPO_PUBLIC_';
export type ExpoClientPrefix = typeof EXPO_CLIENT_PREFIX;

export type EnvPrefixFormat = string | undefined;
export type ZodEnvSchema = Record<string, ZodType>;
export type ServerEnvSchema = ZodEnvSchema;
export type ClientEnvSchema<TClient extends ZodEnvSchema = NonNullable<unknown>> = ClientOptions<
  ClientPrefix,
  TClient
>['client'];
export type SharedEnvSchema = ZodEnvSchema;

export type NextServerEnvSchema<
  TPrefix extends EnvPrefixFormat = undefined,
  TServer extends ZodEnvSchema = NonNullable<unknown>,
> = ServerOptions<TPrefix, TServer>['server'];
export type NextClientEnvSchema<TClient extends ZodEnvSchema = NonNullable<unknown>> =
  ClientOptions<NextClientPrefix, TClient>['client'];
export type NextSharedEnvSchema = ZodEnvSchema;
export type NextExperimentalRuntimeEnv = Record<string, string | boolean | number | undefined>;

export type ExpoServerEnvSchema<
  TPrefix extends EnvPrefixFormat = undefined,
  TServer extends ZodEnvSchema = NonNullable<unknown>,
> = ServerOptions<TPrefix, TServer>['server'];
export type ExpoClientEnvSchema<TClient extends ZodEnvSchema = NonNullable<unknown>> =
  ClientOptions<ExpoClientPrefix, TClient>['client'];
export type ExpoSharedEnvSchema = ZodEnvSchema;

export type NextEnvOptions<
  TServer extends NextServerEnvSchema,
  TClient extends NextClientEnvSchema,
  TShared extends NextSharedEnvSchema,
  TExperimentalRuntimeEnv extends NextExperimentalRuntimeEnv = NonNullable<unknown>,
> = {
  /**
   * Specify your server-side environment variables schema here. This way you
   * can ensure the app isn't built with invalid env vars.
   */
  server: TServer;

  /**
   * Specify your client-side environment variables schema here. This way you
   * can ensure the app isn't built with invalid env vars.
   */
  client: TClient;

  /**
   * Shared variables, often those that are provided by build tools and is
   * available to both client and server, but isn't prefixed and doesn't
   * require to be manually supplied. For example NODE_ENV, VERCEL_URL etc.
   */
  shared: TShared;

  /**
   * Can be used for Next.js ^13.4.4 since they stopped static analysis of
   * server side process.env. Only client side process.env is statically
   * analyzed and needs to be manually destructured.
   */
  runtimeEnv: TExperimentalRuntimeEnv;
};

export type ExpoEnvOptions<
  TClient extends ExpoClientEnvSchema,
  TShared extends ExpoSharedEnvSchema,
> = {
  /**
   * Specify your client-side environment variables schema here. This way you
   * can ensure the app isn't built with invalid env vars.
   */
  client: TClient;

  /**
   * Shared variables, often those that are provided by build tools and is
   * available to both client and server, but isn't prefixed and doesn't
   * require to be manually supplied. For example NODE_ENV, VERCEL_URL etc.
   */
  shared: TShared;
};

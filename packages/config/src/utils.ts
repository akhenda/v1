export const nodeEnvs = ['development', 'test', 'production', 'staging'] as const;
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

export function getCleanedEnvAccessors<T extends Record<string, unknown>>(env: T) {
  const environment = env.NODE_ENV ?? env.ENV ?? env.PUBLIC_ENV;

  return {
    // If NODE_ENV is not set, assume production
    isProd: !environment || environment === 'production',
    isDev: environment === 'development',
    isTest: environment === 'test',
  };
}

export function getCleanedMobileEnvAccessors<T extends Record<string, unknown>>(
  env: T,
  isDevBundle = true,
) {
  return {
    // If APP_VARIANT is not set, assume production
    isProd: !env.APP_VARIANT || env.APP_VARIANT === 'production',
    isDev: env.APP_VARIANT === 'development',
    isPreview: env.APP_VARIANT === 'preview',
    isDevBundle,
    isProdBundle: !isDevBundle,
  };
}

export function getEnvWithAccessors<T extends Record<string, unknown>, U extends boolean = false>(
  env: T,
  isMobile?: U,
  isDev = true,
) {
  if (isMobile) {
    const accessors = getCleanedMobileEnvAccessors(env, isDev);

    Object.defineProperties(env, {
      isDev: { value: accessors.isDev },
      isDevelopment: { value: accessors.isDev },
      isProd: { value: accessors.isProd },
      isProduction: { value: accessors.isProd },
      isPreview: { value: accessors.isPreview },
      isDevBundle: { value: accessors.isDevBundle },
      isProdBundle: { value: accessors.isProdBundle },
    });

    return env as EnvAccessors<T, U>;
  }

  const accessors = getCleanedEnvAccessors(env);

  Object.defineProperties(env, {
    isDev: { value: accessors.isDev },
    isDevelopment: { value: accessors.isDev },
    isProd: { value: accessors.isProd },
    isProduction: { value: accessors.isProd },
    isTest: { value: accessors.isTest },
  });

  return env as EnvAccessors<T, U>;
}

export function withEnvSuffix(name: string) {
  return process.env.APP_VARIANT === 'production' ? name : `${name}.${process.env.APP_VARIANT}`;
}

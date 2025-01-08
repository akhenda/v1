/**
 * These are configuration settings for the dev environment.
 *
 * Do not include API secrets in this file or anywhere in your JS.
 *
 * https://reactnative.dev/docs/security#storing-sensitive-info
 * https://github.com/t3-oss/t3-env/issues/203
 */
import { createEnv } from '@t3-oss/env-core';
import type { ExpoClientPrefix, ExpoEnvOptions, ZodEnvSchema } from '../types.js';
import { getEnvWithAccessors } from '../utils.js';

import { isDev } from './constants.js';

/**
 * Define the env variables schema
 *
 * We split the env variables into two parts:
 *   1. client: These variables are used in the client-side code (`src` folder).
 *   2. shared: These variables are used in the build process (app.config.ts file).
 *      You can think of them as server-side variables.
 *
 * Main rules:
 *    1. If you need your variable on the client-side, you should add it to the
 *       client schema; otherwise, you should add it to the shared schema.
 *    2. You should not add any secrets to the client schema.
 *
 * Note: `z.string()` means that the variable exists and can be an empty
 * string, but not `undefined`. If you want to make the variable required, you
 * should use `z.string().min(1)` instead.
 * Read more about zod here: https://zod.dev/?id=strings
 *
 * 💡 Tip: If you recently updated the .env.${APP_ENV} file and the error still
 * persists, try restarting the server with the -c flag to clear the cache.
 */
function getEnv<
  TClient extends ZodEnvSchema,
  TShared extends ZodEnvSchema,
  TServer extends ZodEnvSchema,
>(options: ExpoEnvOptions<TClient, TShared>) {
  const { client, shared } = options;

  return getEnvWithAccessors(
    createEnv<ExpoClientPrefix, TServer, TClient, TShared>({
      clientPrefix: 'EXPO_PUBLIC_',
      client,
      shared,
      runtimeEnv: process.env,
    }),
    true,
    isDev,
  );
}

export default getEnv;

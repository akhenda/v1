/**
 * These are configuration settings for the dev environment.
 *
 * Do not include API secrets in this file or anywhere in your JS.
 *
 * https://reactnative.dev/docs/security#storing-sensitive-info
 * https://github.com/t3-oss/t3-env/issues/203
 */
import { createEnv } from '@t3-oss/env-core';
import { z } from 'zod';

import { expoAppVariants, getEnvWithAccessors, withEnvSuffix } from '../utils.js';

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
const dev = createEnv({
  clientPrefix: 'EXPO_PUBLIC_',

  client: {
    EXPO_PUBLIC_APP_NAME: z.string().describe('The mobile app name'),
    EXPO_PUBLIC_APP_SCHEME: z.string().describe('App scheme'),
    EXPO_PUBLIC_APP_BUNDLE_ID: z.string().transform(withEnvSuffix).describe('iOS bundle ID'),
    EXPO_PUBLIC_APP_PACKAGE: z.string().transform(withEnvSuffix).describe('Android package name'),

    // ADD YOUR CLIENT ENV VARS HERE
    EXPO_PUBLIC_API_URL: z.string(),
    EXPO_PUBLIC_ADMIN_EMAIL: z.string().email().default('admin@example.com'),

    // COERCED_BOOLEAN: transform to boolean using preferred coercion logic
    EXPO_PUBLIC_USE_REACTOTRON: z.string().transform((s) => s !== 'false' && s !== '0'),
    EXPO_PUBLIC_USE_REDUX_DEV_TOOLS: z.string().transform((s) => s !== 'false' && s !== '0'),
    EXPO_PUBLIC_USE_REDUX_LOGGER: z.string().transform((s) => s !== 'false' && s !== '0'),
    // ONLY_BOOLEAN: https://env.t3.gg/docs/recipes#booleans
    EXPO_PUBLIC_USE_ZUSTAND_DEV_TOOLS: z
      .string()
      // only allow "true" or "false"
      .refine((s) => s === 'true' || s === 'false')
      // transform to boolean
      .transform((s) => s === 'true'),
  },

  shared: {
    APP_VARIANT: z.enum(expoAppVariants).default('development'),
    EXPO_ACCOUNT_OWNER: z.string().describe('Expo account owner'),
    EAS_PROJECT_ID: z.string().describe('Expo EAS project ID'),

    // ADD YOUR BUILD TIME ENV VARS HERE
    SECRET_KEY: z.string(),
  },

  runtimeEnv: process.env,
});

export default getEnvWithAccessors(dev, true, isDev);

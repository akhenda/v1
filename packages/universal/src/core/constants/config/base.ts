import { z } from 'zod';

import getConfig from '@v1/config/mobile';

/**
 * @see https://docs.expo.dev/guides/using-config/#environment-variables
 *
 * Expo app client env vars
 */
export const expoAppClientEnvSchema = {
  // APP INFO
  EXPO_PUBLIC_APP_NAME: z.string(),
  EXPO_PUBLIC_APP_SCHEME: z.string(),
  EXPO_PUBLIC_APP_BUNDLE_ID: z.string(),
  EXPO_PUBLIC_APP_PACKAGE: z.string(),
  EXPO_PUBLIC_APP_VERSION: z.string(),

  // ADD YOUR CLIENT ENV VARS HERE
  EXPO_PUBLIC_API_BASE_URL: z.string(),
  EXPO_PUBLIC_VAR_NUMBER: z.number(),
  EXPO_PUBLIC_VAR_BOOL: z.boolean(),
};

/**
 * @see https://docs.expo.dev/guides/using-config/#environment-variables
 *
 * Shared env vars
 */
const SharedEnvSchema = {
  SENTRY_DSN: z.string(),
};

const config = getConfig({ client: expoAppClientEnvSchema, shared: SharedEnvSchema });

export default config;

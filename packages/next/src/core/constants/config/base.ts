import { z } from 'zod';

import getConfig from '@v1/config/next';

/**
 * @see https://nextjs.org/docs/pages/building-your-application/configuring/environment-variables
 *
 * Next app client env vars
 */
export const nextAppClientEnvSchema = {
  // APP INFO
  NEXT_PUBLIC_APP_NAME: z.string(),

  // ADD YOUR CLIENT ENV VARS HERE
  NEXT_PUBLIC_API_BASE_URL: z.string(),
  NEXT_PUBLIC_VAR_NUMBER: z.number(),
  NEXT_PUBLIC_VAR_BOOL: z.boolean(),
};

/**
 * @see https://nextjs.org/docs/pages/building-your-application/configuring/environment-variables
 *
 * Shared env vars
 */
const sharedEnvSchema = {
  SENTRY_DSN: z.string(),
};

/**
 * @see https://nextjs.org/docs/pages/building-your-application/configuring/environment-variables
 *
 * Server env vars
 */
const serverEnvSchema = {};

const config = getConfig({
  client: nextAppClientEnvSchema,
  server: serverEnvSchema,
  shared: sharedEnvSchema,
  runtimeEnv: {
    NEXT_PUBLIC_APP_NAME: process.env.NEXT_PUBLIC_APP_NAME,
    NEXT_PUBLIC_API_BASE_URL: process.env.NEXT_PUBLIC_API_BASE_URL,
    NEXT_PUBLIC_VAR_NUMBER: process.env.NEXT_PUBLIC_VAR_NUMBER,
    NEXT_PUBLIC_VAR_BOOL: process.env.NEXT_PUBLIC_VAR_BOOL,
    SENTRY_DSN: process.env.SENTRY_DSN,
  },
});

export default config;

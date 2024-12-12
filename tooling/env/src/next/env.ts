import { createEnv } from '@t3-oss/env-nextjs';
import { z } from 'zod';

import { getEnvWithAccessors, nodeEnvs } from '../utils.js';

// https://env.t3.gg/docs/nextjs#validate-schema-on-build-(recommended)
const env = createEnv({
  shared: {
    NODE_ENV: z.enum(nodeEnvs).default('development'),
    PORT: z.coerce.number().int().default(3000),
    VERCEL_URL: z
      .string()
      .optional()
      .transform((v) => (v ? `https://${v}` : undefined)),
  },

  client: {
    NEXT_PUBLIC_CONVEX_URL: z.string(),
    NEXT_PUBLIC_OPENPANEL_CLIENT_ID: z.optional(z.string()),
    NEXT_PUBLIC_SENTRY_DSN: z.optional(z.string()),
  },

  runtimeEnv: {
    NODE_ENV: process.env.NODE_ENV,
    NEXT_PUBLIC_CONVEX_URL: process.env.NEXT_PUBLIC_CONVEX_URL,
    NEXT_PUBLIC_OPENPANEL_CLIENT_ID: process.env.NEXT_PUBLIC_OPENPANEL_CLIENT_ID,
    NEXT_PUBLIC_SENTRY_DSN: process.env.NEXT_PUBLIC_SENTRY_DSN,

    PORT: process.env.PORT,
    VERCEL_URL: process.env.VERCEL_URL,
  },

  skipValidation: !!process.env.CI || !!process.env.SKIP_ENV_VALIDATION,

  // Tell the library when we're in a server context.
  isServer: typeof window === 'undefined',

  // Treat empty strings as undefined.
  emptyStringAsUndefined: true,
});

export default getEnvWithAccessors(env);

import { z } from 'zod';

import { nodeEnvs } from '../types.js';

export const serverSchema = {};
export const clientSchema = {
  NEXT_PUBLIC_CONVEX_URL: z.string(),
  NEXT_PUBLIC_OPENPANEL_CLIENT_ID: z.optional(z.string()),
  NEXT_PUBLIC_SENTRY_DSN: z.optional(z.string()),
};

export const sharedSchema = {
  NODE_ENV: z.enum(nodeEnvs).default('development'),
  PORT: z.coerce.number().int().default(3000),
  VERCEL_URL: z
    .string()
    .optional()
    .transform((v) => (v ? `https://${v}` : undefined)),
};

export const runtimeEnv = {
  NEXT_PUBLIC_CONVEX_URL: process.env.NEXT_PUBLIC_CONVEX_URL,
  NEXT_PUBLIC_OPENPANEL_CLIENT_ID: process.env.NEXT_PUBLIC_OPENPANEL_CLIENT_ID,
  NEXT_PUBLIC_SENTRY_DSN: process.env.NEXT_PUBLIC_SENTRY_DSN,
};

export const options = {
  server: serverSchema,
  client: clientSchema,
  shared: sharedSchema,
  runtimeEnv,
};

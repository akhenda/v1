import { z } from 'zod';

import { nodeEnvs } from '../types.js';

export const clientSchema = {
  PUBLIC_ENV: z.enum(nodeEnvs).default('development'),
  PUBLIC_ADMIN_EMAIL: z.string().email().default('admin@example.com'),
  PUBLIC_CLERK_PUBLISHABLE_KEY: z.string(),
  PUBLIC_CONVEX_URL: z.string(),
};

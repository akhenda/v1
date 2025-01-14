import { z } from 'zod';

import { nodeEnvs } from '../types.js';

/**
 * Example server env variables schema
 */
export const serverSchema = {
  NODE_ENV: z.enum(nodeEnvs).default('development'),
  ADMIN_EMAIL: z.string().email().default('admin@example.com'),
  CLERK_HOSTNAME: z.string().default('http://localhost:3000'),

  /**
   * This should be configured on Convex Dashboard
   */
  CLERK_WEBHOOK_SECRET: z
    .string()
    .default('')
    .describe('This should be configured on Convex Dashboard'),
};

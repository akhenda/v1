import { z } from 'zod';

/**
 * NOTE: We are forced to build our config package because `drizzle-kit` does
 * not support ESM
 *
 * TODO(prod): Once `drizzle-kit` supports ESM, we should stop building it.
 * We'll just import it directly and let JIT handle it in this package.
 */
import getConfig from '@v1/config/server';

const stringBoolean = z.coerce
  .string()
  .transform((val) => val === 'true')
  .default('false');

const EnvSchema = {
  NODE_ENV: z.string().default('development'),
  DB_HOST: z.string(),
  DB_USER: z.string(),
  DB_PASSWORD: z.string(),
  DB_NAME: z.string(),
  DB_PORT: z.coerce.number(),
  DATABASE_URL: z.string(),
  DB_MIGRATING: stringBoolean,
  DB_SEEDING: stringBoolean,
  DB_LOG_LEVEL: z.enum(['info', 'warn', 'error', 'debug', 'trace']).default('info'),
};

const config = getConfig(EnvSchema);

export default config.env;

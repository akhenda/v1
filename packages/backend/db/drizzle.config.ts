/**
 * Drizzle does not support ESM
 *
 * https://github.com/drizzle-team/drizzle-orm/issues/819#issuecomment-2541739450
 * https://github.com/drizzle-team/drizzle-orm/issues/1561#issuecomment-2211815525
 */
import { defineConfig } from 'drizzle-kit';

// @ts-ignore
import env from './dist/env.js';

export default defineConfig({
  schema: './dist/src/schema/index.js',
  out: './src/migrations',
  dialect: 'postgresql',
  dbCredentials: { url: env.DATABASE_URL },
  verbose: true,
  strict: true,
});

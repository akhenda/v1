/**
 * Drizzle does not support ESM
 *
 * https://github.com/drizzle-team/drizzle-orm/issues/819#issuecomment-2541739450
 * https://github.com/drizzle-team/drizzle-orm/issues/1561#issuecomment-2211815525
 */
import { defineConfig } from 'drizzle-kit';

import env from './dist/env.js';

export default defineConfig({
  schema: './dist/src/schema/index.js',
  out: env.DB_MIGRATION_DIR,
  dialect: 'postgresql',
  dbCredentials: { url: env.DATABASE_URL },
  verbose: true,
  strict: true,
});

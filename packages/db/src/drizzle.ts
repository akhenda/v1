import { drizzle as drizzleORM } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';

import schema, { type DB } from './schema/index.js';

import env from '../env.js';

declare global {
  var drizzle: DB | undefined;
}

export const connection = postgres(env.DATABASE_URL, {
  max: env.DB_MIGRATING || env.DB_SEEDING ? 1 : undefined,
  onnotice: env.DB_SEEDING ? () => null : undefined,
});

export const db =
  globalThis.drizzle || drizzleORM(connection, { logger: env.DB_LOG_LEVEL === 'debug', schema });

if (env.NODE_ENV === 'development') globalThis.drizzle = db;

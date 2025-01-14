import type { PostgresJsDatabase } from 'drizzle-orm/postgres-js';

import { type TableNames, relations, tables } from './tables/index.js';

export * from './tables/index.js';

export const schema = { ...tables, ...relations } as const;
export default schema;

export type Schema = typeof schema;
export type DB = PostgresJsDatabase<Schema>;
export type Query<T extends TableNames> = DB['query'][T];

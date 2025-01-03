import { migrate } from 'drizzle-orm/postgres-js/migrator';

import { connection, db } from './drizzle.js';

import config from '../drizzle.config.js';
import env from '../env.js';

if (!env.DB_MIGRATING) {
  throw new Error('You must set DB_MIGRATING to "true" when running migrations');
}

(async () => {
  await migrate(db, { migrationsFolder: config.out! });

  await connection.end();
})();

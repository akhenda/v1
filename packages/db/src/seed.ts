import { type Table, getTableName, sql } from 'drizzle-orm';

import { connection, db } from './drizzle.js';
import { type DB, schema } from './schema/index.js';
import * as seeds from './seeds/index.js';

import env from '../env.js';

if (!env.DB_SEEDING) throw new Error('You must set DB_SEEDING to "true" when running seeds');

async function resetTable(db: DB, table: Table) {
  return db.execute(sql.raw(`TRUNCATE TABLE ${getTableName(table)} RESTART IDENTITY CASCADE`));
}

(async () => {
  for (const table of [schema.book, schema.user]) {
    // await db.delete(table); // clear tables without truncating / resetting ids
    await resetTable(db, table);
  }

  await seeds.book(db);
  await seeds.user(db);

  await connection.end();
})();

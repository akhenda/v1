import books from './fixtures/books.json' with { type: 'json' };

import dal from '../data-access/index.js';
import { logger } from '../utils.js';

export default async function seed() {
  logger.info('Seeding books...');

  await Promise.all(
    books.map(async (book) => {
      await dal.books.create({ ...book, borrowerId: null });
    }),
  );
}

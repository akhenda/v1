import users from './fixtures/users.json' with { type: 'json' };

import dal from '../data-access/index.js';
import type { Role } from '../schema/index.js';
import { logger } from '../utils.js';

export default async function seed() {
  logger.info('Seeding users...');

  await Promise.all(
    users.map(async (user, index) => {
      logger.info('Inserting user...', user);

      const insertedUser = await dal.users.create({
        ...user,
        clerkUserId: index.toString(),
        emailVerified: user.email_verified,
        phoneVerified: user.phone_verified,
        avatarUrl: user.avatar_url,
        confirmationCode: user.confirmation_code,
        password: user.password,
        role: (user.role as Role) || 'READER',
      });

      if (!insertedUser) {
        logger.error('Failed to insert user');

        throw new Error('Failed to insert user');
      }

      /**
       * Update borrowed books
       */
      await Promise.all(
        user.borrowed.map(async (bookId: number) => {
          await dal.books.updateBorrower(bookId, insertedUser.id);
        }),
      );

      /**
       * Update authored books
       */
      await Promise.all(
        user.authored.map(async (bookId: number) => {
          await dal.bookAuthors.create(bookId, insertedUser.id);
        }),
      );
    }),
  );
}

import { relations } from 'drizzle-orm';

import { bookAuthor } from '../book-author/book-author.table.js';
import { user } from '../user/user.table.js';

import { book } from './book.table.js';

export const bookRelations = relations(book, ({ one, many }) => ({
  authors: many(bookAuthor),
  borrower: one(user, { fields: [book.borrowerId], references: [user.id] }),
}));

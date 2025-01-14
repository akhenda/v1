import { relations } from 'drizzle-orm';

import { user } from './user.table.js';

import { bookAuthor } from '../book-author/book-author.table.js';
import { book } from '../book/book.table.js';

export const userRelations = relations(user, ({ many }) => ({
  booksAuthored: many(bookAuthor),
  booksBorrowed: many(book),
}));

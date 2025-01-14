import { relations } from 'drizzle-orm';

import { book } from '../book/book.table.js';
import { user } from '../user/user.table.js';

import { bookAuthor } from './book-author.table.js';

export const bookAuthorRelations = relations(bookAuthor, ({ one }) => ({
  author: one(user, { fields: [bookAuthor.authorId], references: [user.id] }),
  book: one(book, { fields: [bookAuthor.bookId], references: [book.id] }),
}));

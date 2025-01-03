import { eq } from 'drizzle-orm';

import { db } from '../drizzle.js';
import type { InsertedRecord } from '../schema/index.js';
import { tables } from '../schema/index.js';
import { logger } from '../utils.js';

type TableName = 'book';

const query = db.query.book;
const table = tables.book;

/**
 * Creates a new book in the database.
 *
 * @param newRecord - The new book to insert, without an id (which will be generated).
 * @returns The new book, with an id.
 * @throws If the book cannot be inserted (e.g. due to a unique constraint violation).
 */
async function create(newRecord: InsertedRecord<TableName>) {
  logger.debug('create book', newRecord);

  try {
    const [book] = await db.insert(table).values(newRecord).returning();

    logger.debug('created book', book);

    return book;
  } catch (error) {
    logger.error(error);

    throw error;
  }
}

/**
 * Finds a book by its id.
 *
 * @param id - The id of the book to find.
 * @returns The book with the given id, or `undefined` if no book is found.
 */
async function findById(id: number) {
  logger.debug('find book by id', id);

  const book = await query.findFirst({ where: (t, { eq }) => eq(t.id, id) });

  logger.debug('found book', book);

  return book;
}

/**
 * Finds all book records in the database.
 *
 * @returns An array of all book records in the database.
 */
async function findAll() {
  logger.debug('find all books');

  return query.findMany();
}

/**
 * Updates a book record in the database.
 *
 * @param id - The id of the book to update.
 * @param data - An object containing the fields and their new values to update in the book's record.
 * @returns The updated book record.
 * @throws If the book cannot be updated (e.g. due to a unique constraint violation).
 */
async function update(id: number, data: InsertedRecord<TableName>) {
  logger.debug('update book', id, data);

  try {
    const [updatedBook] = await db.update(table).set(data).where(eq(table.id, id)).returning();

    logger.debug('updated book', updatedBook);

    return updatedBook;
  } catch (error) {
    logger.error(error);

    throw error;
  }
}

/**
 * Deletes a book by its id.
 *
 * @param id - The id of the book to delete.
 * @returns The deleted book, or `undefined` if no book is found.
 * @throws If the book cannot be deleted (e.g. if it is already deleted).
 */
async function deleteById(id: number) {
  logger.debug('delete book by id', id);

  try {
    const [deletedBook] = await db.delete(table).where(eq(table.id, id)).returning();

    return deletedBook;
  } catch (error) {
    logger.error(error);

    throw error;
  }
}

/**
 * Updates the borrower of a book.
 *
 * @param id - The id of the book to update.
 * @param borrowerId - The id of the user that is borrowing the book.
 * @returns The updated book record.
 * @throws If the book cannot be updated (e.g. due to a unique constraint violation).
 */
async function updateBorrower(id: number, borrowerId: number) {
  logger.debug('update book borrower', id, borrowerId);

  try {
    const [updatedBook] = await db
      .update(table)
      .set({ borrowerId })
      .where(eq(table.id, id))
      .returning();

    return updatedBook;
  } catch (error) {
    logger.error(error);

    throw error;
  }
}

export default {
  create,
  findById,
  findAll,
  update,
  delete: deleteById,
  updateBorrower,
};

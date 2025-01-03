import { bookAuthor, bookAuthorRelations } from './book-author/index.js';
import { book, bookRelations } from './book/index.js';
import { user, userRelations } from './user/index.js';

export * from './columns.js';
export * from './book-author/index.js';
export * from './book/index.js';
export * from './user/index.js';

export const tables = { bookAuthor, book, user } as const;
export const relations = { bookAuthorRelations, bookRelations, userRelations } as const;

export type Tables = typeof tables;
export type TableNames = keyof Tables;
export type Table<TableName extends TableNames> = Tables[TableName];
export type InsertedRecord<TableName extends TableNames> = Table<TableName>['$inferInsert'];
export type ReturnedRecord<TableName extends TableNames> = Table<TableName>['$inferSelect'];

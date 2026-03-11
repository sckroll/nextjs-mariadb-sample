import { mysqlTable, varchar, timestamp, int, date, decimal, text, mysqlEnum } from 'drizzle-orm/mysql-core';
import { sql } from 'drizzle-orm';

export const users = mysqlTable('users', {
  id: varchar('id', { length: 36 }).primaryKey(),
  email: varchar('email', { length: 255 }).notNull().unique(),
  passwordHash: varchar('password_hash', { length: 255 }).notNull(),
  createdAt: timestamp('created_at').default(sql`CURRENT_TIMESTAMP`),
  updatedAt: timestamp('updated_at').default(sql`CURRENT_TIMESTAMP`).onUpdateNow(),
});

export const books = mysqlTable('books', {
  id: varchar('id', { length: 36 }).primaryKey(),
  userId: varchar('user_id', { length: 36 }).notNull().references(() => users.id, { onDelete: 'cascade' }),
  title: varchar('title', { length: 255 }).notNull(),
  author: varchar('author', { length: 255 }),
  publisher: varchar('publisher', { length: 255 }),
  coverImage: varchar('cover_image', { length: 255 }),
  totalPages: int('total_pages').notNull(),
  status: mysqlEnum('status', ['WISH', 'READING', 'COMPLETED']).default('WISH').notNull(),
  startDate: date('start_date'),
  endDate: date('end_date'),
  rating: decimal('rating', { precision: 2, scale: 1 }),
  oneLiner: text('one_liner'),
  createdAt: timestamp('created_at').default(sql`CURRENT_TIMESTAMP`),
  updatedAt: timestamp('updated_at').default(sql`CURRENT_TIMESTAMP`).onUpdateNow(),
});

export const notes = mysqlTable('notes', {
  id: varchar('id', { length: 36 }).primaryKey(),
  bookId: varchar('book_id', { length: 36 }).notNull().references(() => books.id, { onDelete: 'cascade' }),
  content: text('content').notNull(),
  highlight: text('highlight'),
  pageNumber: int('page_number'),
  chapter: varchar('chapter', { length: 255 }),
  createdAt: timestamp('created_at').default(sql`CURRENT_TIMESTAMP`),
  updatedAt: timestamp('updated_at').default(sql`CURRENT_TIMESTAMP`).onUpdateNow(),
});

export const readingProgress = mysqlTable('reading_progress', {
  id: varchar('id', { length: 36 }).primaryKey(),
  bookId: varchar('book_id', { length: 36 }).notNull().references(() => books.id, { onDelete: 'cascade' }),
  readPages: int('read_pages').notNull(),
  recordedDate: date('recorded_date').notNull(),
  createdAt: timestamp('created_at').default(sql`CURRENT_TIMESTAMP`),
});

export const tags = mysqlTable('tags', {
  id: varchar('id', { length: 36 }).primaryKey(),
  userId: varchar('user_id', { length: 36 }).notNull().references(() => users.id, { onDelete: 'cascade' }),
  name: varchar('name', { length: 100 }).notNull(),
  color: varchar('color', { length: 50 }).notNull(),
  createdAt: timestamp('created_at').default(sql`CURRENT_TIMESTAMP`),
});

export const bookTags = mysqlTable('book_tags', {
  bookId: varchar('book_id', { length: 36 }).notNull().references(() => books.id, { onDelete: 'cascade' }),
  tagId: varchar('tag_id', { length: 36 }).notNull().references(() => tags.id, { onDelete: 'cascade' }),
}, (t) => ({
  pk: {
    columns: [t.bookId, t.tagId],
  }
}));

export const goals = mysqlTable('goals', {
  id: varchar('id', { length: 36 }).primaryKey(),
  userId: varchar('user_id', { length: 36 }).notNull().references(() => users.id, { onDelete: 'cascade' }),
  periodType: mysqlEnum('period_type', ['MONTHLY', 'YEARLY']).notNull(),
  targetType: mysqlEnum('target_type', ['BOOKS', 'PAGES', 'DAYS']).notNull(),
  targetValue: int('target_value').notNull(),
  startDate: date('start_date').notNull(),
  endDate: date('end_date').notNull(),
  createdAt: timestamp('created_at').default(sql`CURRENT_TIMESTAMP`),
});
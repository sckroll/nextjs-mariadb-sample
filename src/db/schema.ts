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

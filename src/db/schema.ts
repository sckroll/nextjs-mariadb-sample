import { mysqlTable, varchar, timestamp, int, date, decimal, text, mysqlEnum, boolean } from 'drizzle-orm/mysql-core';
import { sql } from 'drizzle-orm';

// Better Auth - User Table
export const user = mysqlTable('user', {
  id: varchar('id', { length: 36 }).primaryKey(),
  name: varchar('name', { length: 255 }).notNull(),
  email: varchar('email', { length: 255 }).notNull().unique(),
  emailVerified: boolean('email_verified').notNull().default(false),
  image: varchar('image', { length: 255 }),
  createdAt: timestamp('created_at').notNull().default(sql`CURRENT_TIMESTAMP`),
  updatedAt: timestamp('updated_at').notNull().default(sql`CURRENT_TIMESTAMP`).onUpdateNow(),
});

// Better Auth - Session Table
export const session = mysqlTable('session', {
  id: varchar('id', { length: 36 }).primaryKey(),
  userId: varchar('user_id', { length: 36 }).notNull().references(() => user.id, { onDelete: 'cascade' }),
  token: varchar('token', { length: 255 }).notNull().unique(),
  expiresAt: timestamp('expires_at').notNull(),
  ipAddress: varchar('ip_address', { length: 45 }),
  userAgent: text('user_agent'),
  createdAt: timestamp('created_at').notNull().default(sql`CURRENT_TIMESTAMP`),
  updatedAt: timestamp('updated_at').notNull().default(sql`CURRENT_TIMESTAMP`).onUpdateNow(),
});

// Better Auth - Account Table (for OAuth)
export const account = mysqlTable('account', {
  id: varchar('id', { length: 36 }).primaryKey(),
  userId: varchar('user_id', { length: 36 }).notNull().references(() => user.id, { onDelete: 'cascade' }),
  accountId: varchar('account_id', { length: 255 }).notNull(),
  providerId: varchar('provider_id', { length: 255 }).notNull(),
  accessToken: text('access_token'),
  refreshToken: text('refresh_token'),
  idToken: text('id_token'),
  expiresAt: timestamp('expires_at'),
  password: text('password'),
  createdAt: timestamp('created_at').notNull().default(sql`CURRENT_TIMESTAMP`),
  updatedAt: timestamp('updated_at').notNull().default(sql`CURRENT_TIMESTAMP`).onUpdateNow(),
});

// Better Auth - Verification Table
export const verification = mysqlTable('verification', {
  id: varchar('id', { length: 36 }).primaryKey(),
  identifier: varchar('identifier', { length: 255 }).notNull(),
  value: varchar('value', { length: 255 }).notNull(),
  expiresAt: timestamp('expires_at').notNull(),
  createdAt: timestamp('created_at').notNull().default(sql`CURRENT_TIMESTAMP`),
  updatedAt: timestamp('updated_at').notNull().default(sql`CURRENT_TIMESTAMP`).onUpdateNow(),
});

// ReadLog Domain - Books Table
export const books = mysqlTable('books', {
  id: varchar('id', { length: 36 }).primaryKey(),
  userId: varchar('user_id', { length: 36 }).notNull().references(() => user.id, { onDelete: 'cascade' }),
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
  userId: varchar('user_id', { length: 36 }).notNull().references(() => user.id, { onDelete: 'cascade' }),
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
  userId: varchar('user_id', { length: 36 }).notNull().references(() => user.id, { onDelete: 'cascade' }),
  periodType: mysqlEnum('period_type', ['MONTHLY', 'YEARLY']).notNull(),
  targetType: mysqlEnum('target_type', ['BOOKS', 'PAGES', 'DAYS']).notNull(),
  targetValue: int('target_value').notNull(),
  startDate: date('start_date').notNull(),
  endDate: date('end_date').notNull(),
  createdAt: timestamp('created_at').default(sql`CURRENT_TIMESTAMP`),
});

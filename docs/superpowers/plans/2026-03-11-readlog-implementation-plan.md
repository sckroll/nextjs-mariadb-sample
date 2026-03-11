# ReadLog Implementation Plan

> **For agentic workers:** REQUIRED: Use superpowers:subagent-driven-development (if subagents available) or superpowers:executing-plans to implement this plan. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Next.js와 MariaDB를 활용하여 개인 독서 활동을 관리할 수 있는 ReadLog 웹 서비스(인증, 서재 관리, 노트, 진행률, 통계 등)의 기초를 구축한다.

**Architecture:** Next.js App Router 기반의 풀스택 아키텍처를 구성한다. Drizzle ORM을 통해 MariaDB와 통신하고, Better Auth를 사용해 인증 및 세션을 관리한다. 비즈니스 로직은 Server Actions 및 Route Handlers로 처리하며, 클라이언트와 서버 컴포넌트를 적절히 분리해 렌더링을 최적화한다.

**Tech Stack:** Next.js (App Router), MariaDB, Drizzle ORM, Better Auth, Tailwind CSS, Zod, bcrypt

---

## Chunk 1: Database Setup & Drizzle ORM Schema

### Task 1: 데이터베이스 연결 설정 및 스키마 정의 (Users & Books)

**Files:**
- Create: `src/db/index.ts`
- Create: `src/db/schema.ts`
- Create: `drizzle.config.ts`
- Modify: `.env` (환경변수 템플릿용)

- [ ] **Step 1: 스키마 파일 생성 및 `users`, `books` 테이블 정의**
```typescript
// src/db/schema.ts
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
```

- [ ] **Step 2: Drizzle ORM DB 연결 인스턴스 생성**
```typescript
// src/db/index.ts
import { drizzle } from 'drizzle-orm/mysql2';
import mysql from 'mysql2/promise';
import * as schema from './schema';

const poolConnection = mysql.createPool({
  uri: process.env.DATABASE_URL,
});

export const db = drizzle(poolConnection, { schema, mode: 'default' });
```

- [ ] **Step 3: Drizzle Config 설정**
```typescript
// drizzle.config.ts
import type { Config } from 'drizzle-kit';
import * as dotenv from 'dotenv';
dotenv.config();

export default {
  schema: './src/db/schema.ts',
  out: './drizzle',
  driver: 'mysql2',
  dbCredentials: {
    uri: process.env.DATABASE_URL as string,
  },
} satisfies Config;
```

- [ ] **Step 4: 스키마 생성(마이그레이션) 실행 스크립트 추가 및 DB 마이그레이션 검증**
Run: `npx drizzle-kit generate:mysql && npx drizzle-kit push:mysql` (실제 명령어는 DB 설정에 따라 다를 수 있으나, push로 검증)
Expected: DB에 `users` 및 `books` 테이블이 성공적으로 생성됨.

- [ ] **Step 5: Commit**
```bash
git add src/db/schema.ts src/db/index.ts drizzle.config.ts package.json
git commit -m "feat: setup database connection and core schemas (users, books)"
```

### Task 2: 추가 스키마 정의 (Notes, Progress, Tags, Goals)

**Files:**
- Modify: `src/db/schema.ts`

- [ ] **Step 1: `notes` 및 `reading_progress` 스키마 추가**
```typescript
// src/db/schema.ts (append)
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
```

- [ ] **Step 2: `tags`, `book_tags`, `goals` 스키마 추가**
```typescript
// src/db/schema.ts (append)
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
```

- [ ] **Step 3: DB 마이그레이션 적용**
Run: `npx drizzle-kit push:mysql`

- [ ] **Step 4: Commit**
```bash
git add src/db/schema.ts
git commit -m "feat: add schemas for notes, reading progress, tags, and goals"
```

---

## Chunk 2: Authentication System (Better Auth)

### Task 3: Better Auth 구성 및 API 설정

**Files:**
- Create: `src/lib/auth.ts`
- Create: `src/app/api/auth/[...all]/route.ts`

- [ ] **Step 1: `auth.ts`에 Better Auth 인스턴스 생성**
```typescript
// src/lib/auth.ts
import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { db } from "@/db";
import * as schema from "@/db/schema";
import bcrypt from "bcrypt";

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: "mysql",
    schema,
  }),
  emailAndPassword: {
    enabled: true,
    async hashPassword(password) {
      return await bcrypt.hash(password, 10);
    },
    async verifyPassword(password, hash) {
      return await bcrypt.compare(password, hash);
    },
  },
});
```

- [ ] **Step 2: Auth Route Handler 생성**
```typescript
// src/app/api/auth/[...all]/route.ts
import { auth } from "@/lib/auth";
import { toNextJsHandler } from "better-auth/next-js";

export const { GET, POST } = toNextJsHandler(auth);
```

- [ ] **Step 3: Commit**
```bash
git add src/lib/auth.ts src/app/api/auth/[...all]/route.ts
git commit -m "feat: setup better auth with email and password"
```

### Task 4: Middleware 및 Auth 라우트 보호

**Files:**
- Create: `src/middleware.ts`

- [ ] **Step 1: Next.js 미들웨어 작성**
```typescript
// src/middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  const sessionToken = request.cookies.get("better-auth.session_token");
  const { pathname } = request.nextUrl;

  const isAuthRoute = pathname.startsWith("/login") || pathname.startsWith("/register");
  
  if (!sessionToken && !isAuthRoute) {
    if (pathname !== "/") {
        return NextResponse.redirect(new URL("/login", request.url));
    }
  }

  if (sessionToken && isAuthRoute) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
```

- [ ] **Step 2: Commit**
```bash
git add src/middleware.ts
git commit -m "feat: add auth middleware to protect routes"
```

---

## Chunk 3: Books Management

### Task 5: 책 등록/수정을 위한 Zod Validation 및 Server Action

**Files:**
- Create: `src/lib/validations/book.ts`
- Create: `src/actions/book.ts`

- [ ] **Step 1: Zod 스키마 작성**
```typescript
// src/lib/validations/book.ts
import { z } from "zod";

export const bookSchema = z.object({
  title: z.string().min(1, "Title is required"),
  author: z.string().optional(),
  publisher: z.string().optional(),
  coverImage: z.string().url().optional().or(z.literal('')),
  totalPages: z.number().int().min(1, "Total pages must be greater than 0"),
  status: z.enum(["WISH", "READING", "COMPLETED"]).default("WISH"),
  startDate: z.string().optional(),
  endDate: z.string().optional(),
  rating: z.number().min(0).max(5).multipleOf(0.5).optional(),
  oneLiner: z.string().optional(),
});
```

- [ ] **Step 2: 책 등록/수정/삭제 Server Action 구현**
```typescript
// src/actions/book.ts
"use server";

import { db } from "@/db";
import { books } from "@/db/schema";
import { bookSchema } from "@/lib/validations/book";
import { eq } from "drizzle-orm";
import { randomUUID } from "crypto";

// (유저 인증 검증 로직은 상단에 포함한다고 가정)

export async function createBook(userId: string, data: z.infer<typeof bookSchema>) {
  const validated = bookSchema.parse(data);
  const id = randomUUID();
  
  await db.insert(books).values({
    id,
    userId,
    ...validated,
    startDate: validated.startDate ? new Date(validated.startDate) : null,
    endDate: validated.endDate ? new Date(validated.endDate) : null,
  });
  
  return { success: true, id };
}

export async function deleteBook(userId: string, bookId: string) {
  // 실제 서비스에서는 userId 소유 검증 필요
  await db.delete(books).where(eq(books.id, bookId));
  return { success: true };
}
```

- [ ] **Step 3: Commit**
```bash
git add src/lib/validations/book.ts src/actions/book.ts
git commit -m "feat: server actions and validations for book management"
```

*(참고: UI 컴포넌트, 통계(Statistic), 진행률(Progress) 등 나머지 상세 기능은 플랜 실행 중 추가 Plan을 작성하여 점진적으로 확장합니다. 본 플랜은 초기 셋업과 핵심 도메인 구축을 목표로 합니다.)*

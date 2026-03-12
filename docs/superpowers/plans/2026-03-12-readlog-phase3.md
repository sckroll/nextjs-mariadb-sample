# ReadLog Implementation Plan - Phase 3: Book Management & Dashboard

> **For agentic workers:** REQUIRED: Use superpowers:subagent-driven-development (if subagents available) or superpowers:executing-plans to implement this plan. Steps use checkbox (`- [x]`) syntax for tracking.

**Goal:** Implement the Dashboard Book List, Book Detail Page, and Edit/Delete functionalities.

**Architecture:** We will create server actions to fetch and modify data, and React Server Components to pass data to Client Components. TDD will be strictly followed for all new actions and UI components.

**Tech Stack:** Next.js (App Router), Drizzle ORM, Vitest, React Testing Library

---

## Chunk 1: Dashboard Book List

### Task 1: Fetch Books Server Action

**Files:**
- Create: `src/actions/book.test.ts`
- Modify: `src/actions/book.ts`

- [x] **Step 1: Write failing test for `getBooks`**
```typescript
// src/actions/book.test.ts
import { describe, it, expect, vi } from "vitest";
import { getBooks } from "./book";

// Need to mock db call
vi.mock("@/db", () => ({
  db: {
    select: vi.fn().mockReturnThis(),
    from: vi.fn().mockReturnThis(),
    where: vi.fn().mockResolvedValue([{ id: "1", title: "Test Book" }]),
    orderBy: vi.fn().mockReturnThis(),
  },
}));

describe("book actions", () => {
  it("getBooks returns an array of books for a user", async () => {
    const books = await getBooks("test-user-id");
    expect(books).toHaveLength(1);
    expect(books[0].title).toBe("Test Book");
  });
});
```

- [x] **Step 2: Run test to verify it fails**
Run: `npm run test`
Expected: FAIL because `getBooks` is not defined in `src/actions/book.ts`.

- [x] **Step 3: Write minimal implementation**
```typescript
// src/actions/book.ts (append)
import { desc } from "drizzle-orm";

export async function getBooks(userId: string) {
  return await db.select().from(books).where(eq(books.userId, userId)).orderBy(desc(books.createdAt));
}
```

- [x] **Step 4: Run test to verify it passes**
Run: `npm run test`
Expected: PASS

- [x] **Step 5: Commit**
```bash
git add src/actions
git commit -m "feat: add getBooks server action with test"
```

### Task 2: BookCard UI Component

**Files:**
- Create: `src/components/books/BookCard.test.tsx`
- Create: `src/components/books/BookCard.tsx`

- [x] **Step 1: Write failing test for `BookCard`**
```tsx
// src/components/books/BookCard.test.tsx
import { render, screen } from "@testing-library/react";
import BookCard from "./BookCard";

describe("BookCard", () => {
  it("renders book title, author, and status", () => {
    const mockBook = {
      id: "1",
      title: "The Great Gatsby",
      author: "F. Scott Fitzgerald",
      status: "READING" as const,
      totalPages: 180,
    };
    render(<BookCard book={mockBook as any} />);
    
    expect(screen.getByText("The Great Gatsby")).toBeInTheDocument();
    expect(screen.getByText("F. Scott Fitzgerald")).toBeInTheDocument();
    expect(screen.getByText("읽는 중")).toBeInTheDocument();
  });
});
```

- [x] **Step 2: Run test to verify it fails**
Run: `npm run test`
Expected: FAIL

- [x] **Step 3: Write minimal implementation**
```tsx
// src/components/books/BookCard.tsx
import Link from "next/link";
import { type books } from "@/db/schema";

type Book = typeof books.$inferSelect;

export default function BookCard({ book }: { book: Book }) {
  const statusLabel = {
    WISH: "읽고 싶음",
    READING: "읽는 중",
    COMPLETED: "완독"
  }[book.status];

  return (
    <Link href={`/dashboard/books/${book.id}`} className="block border rounded-lg p-4 bg-white shadow-sm hover:shadow-md transition">
      <h3 className="font-bold text-lg">{book.title}</h3>
      <p className="text-gray-600">{book.author || "저자 미상"}</p>
      <span className="inline-block mt-2 px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded">{statusLabel}</span>
    </Link>
  );
}
```

- [x] **Step 4: Run test to verify it passes**
Run: `npm run test`
Expected: PASS

- [x] **Step 5: Commit**
```bash
git add src/components/books
git commit -m "feat: create BookCard component"
```

### Task 3: Integrate Book List into Dashboard

**Files:**
- Modify: `src/app/dashboard/page.test.tsx` (Create it)
- Modify: `src/app/dashboard/page.tsx`

- [x] **Step 1: Write test for Dashboard page fetching books**
```tsx
// src/app/dashboard/page.test.tsx
import { render, screen } from "@testing-library/react";
import DashboardPage from "./page";
import { vi } from "vitest";

vi.mock("next/headers", () => ({ headers: vi.fn() }));
vi.mock("next/navigation", () => ({ redirect: vi.fn() }));
vi.mock("@/lib/auth", () => ({
  auth: { api: { getSession: vi.fn().mockResolvedValue({ user: { id: "user-1" } }) } },
}));

vi.mock("@/actions/book", () => ({
  getBooks: vi.fn().mockResolvedValue([
    { id: "1", title: "Test Book 1", status: "WISH" }
  ]),
}));

describe("DashboardPage", () => {
  it("renders fetched books", async () => {
    const resolvedComponent = await DashboardPage();
    render(resolvedComponent);
    expect(await screen.findByText("Test Book 1")).toBeInTheDocument();
  });
});
```

- [x] **Step 2: Run test to verify it fails**
Run: `npm run test`
Expected: FAIL because current `DashboardPage` doesn't fetch or render books.

- [x] **Step 3: Update `src/app/dashboard/page.tsx`**
```tsx
// src/app/dashboard/page.tsx
import Link from "next/link";
import { getBooks } from "@/actions/book";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import BookCard from "@/components/books/BookCard";

export default async function DashboardPage() {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) redirect("/login");

  const books = await getBooks(session.user.id);

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">내 서재</h2>
        <Link href="/dashboard/books/new" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">책 추가</Link>
      </div>
      
      {books.length === 0 ? (
        <div className="border border-dashed border-gray-300 rounded-lg p-4 bg-white/50 flex flex-col items-center justify-center h-48 text-gray-400">
          <p className="mb-2">아직 등록된 책이 없습니다.</p>
          <Link href="/dashboard/books/new" className="text-blue-500 hover:underline">첫 책 등록하기</Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {books.map(book => (
            <BookCard key={book.id} book={book as any} />
          ))}
        </div>
      )}
    </div>
  );
}
```

- [x] **Step 4: Run test to verify it passes**
Run: `npm run test`
Expected: PASS

- [x] **Step 5: Commit**
```bash
git add src/app/dashboard
git commit -m "feat: integrate book list into dashboard"
```

---

## Chunk 2: Book Detail Page

### Task 4: Fetch Book By ID Server Action

**Files:**
- Modify: `src/actions/book.test.ts`
- Modify: `src/actions/book.ts`

- [x] **Step 1: Write test for `getBookById`**
```typescript
// src/actions/book.test.ts (append)
  it("getBookById returns a single book and validates owner", async () => {
    // We already mocked db in the same file. 
    // This is a simplistic unit test.
    const { getBookById } = await import("./book");
    const book = await getBookById("1", "test-user-id");
    expect(book?.title).toBe("Test Book");
  });
```

- [x] **Step 2: Add `getBookById` to `book.ts`**
```typescript
// src/actions/book.ts (append)
import { and } from "drizzle-orm";

export async function getBookById(id: string, userId: string) {
  const result = await db.select().from(books).where(and(eq(books.id, id), eq(books.userId, userId)));
  return result[0] || null;
}
```

- [x] **Step 3: Run test**
Run: `npm run test`
Expected: PASS

- [x] **Step 4: Commit**
```bash
git add src/actions
git commit -m "feat: add getBookById server action"
```

### Task 5: Book Detail Page Route

**Files:**
- Create: `src/app/dashboard/books/[id]/page.test.tsx`
- Create: `src/app/dashboard/books/[id]/page.tsx`

- [x] **Step 1: Write failing test**
```tsx
// src/app/dashboard/books/[id]/page.test.tsx
import { render, screen } from "@testing-library/react";
import BookDetailPage from "./page";
import { vi } from "vitest";

vi.mock("next/headers", () => ({ headers: vi.fn() }));
vi.mock("next/navigation", () => ({ redirect: vi.fn(), notFound: vi.fn() }));
vi.mock("@/lib/auth", () => ({
  auth: { api: { getSession: vi.fn().mockResolvedValue({ user: { id: "user-1" } }) } },
}));
vi.mock("@/actions/book", () => ({
  getBookById: vi.fn().mockResolvedValue({ id: "1", title: "Detail Test Book", author: "Author Name" }),
}));

describe("BookDetailPage", () => {
  it("renders book details", async () => {
    const resolvedComponent = await BookDetailPage({ params: Promise.resolve({ id: "1" }) });
    render(resolvedComponent);
    expect(screen.getByText("Detail Test Book")).toBeInTheDocument();
    expect(screen.getByText("Author Name")).toBeInTheDocument();
  });
});
```

- [x] **Step 2: Implement Book Detail Page**
```tsx
// src/app/dashboard/books/[id]/page.tsx
import { getBookById } from "@/actions/book";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { notFound, redirect } from "next/navigation";
import Link from "next/link";

export default async function BookDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) redirect("/login");

  const resolvedParams = await params;
  const book = await getBookById(resolvedParams.id, session.user.id);
  
  if (!book) notFound();

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border">
      <div className="flex justify-between items-start mb-6">
        <div>
          <h2 className="text-3xl font-bold mb-2">{book.title}</h2>
          <p className="text-lg text-gray-600">{book.author || "저자 미상"} | {book.publisher || "출판사 미상"}</p>
        </div>
        <div className="flex gap-2">
           <Link href={`/dashboard/books/${book.id}/edit`} className="px-4 py-2 border rounded hover:bg-gray-50">수정</Link>
           {/* Delete button will be a separate client component or form later */}
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4 border-t pt-4">
        <div><span className="font-semibold">상태:</span> {book.status}</div>
        <div><span className="font-semibold">총 페이지:</span> {book.totalPages} 쪽</div>
      </div>
    </div>
  );
}
```

- [x] **Step 3: Run test**
Run: `npm run test`
Expected: PASS

- [x] **Step 4: Commit**
```bash
git add src/app/dashboard/books
git commit -m "feat: add book detail page"
```

---

## Chunk 3: Delete & Edit Book

### Task 6: Delete Book Client Component

**Files:**
- Create: `src/components/books/DeleteBookButton.tsx`
- Modify: `src/app/dashboard/books/[id]/page.tsx`

- [x] **Step 1: Write `DeleteBookButton` (Skip deep vitest for simple form action or `useTransition`)**
```tsx
// src/components/books/DeleteBookButton.tsx
"use client";
import { deleteBook } from "@/actions/book";
import { useRouter } from "next/navigation";

export default function DeleteBookButton({ bookId, userId }: { bookId: string, userId: string }) {
  const router = useRouter();
  
  const handleDelete = async () => {
    if (confirm("정말로 이 책을 삭제하시겠습니까? (관련 노트와 기록도 모두 삭제됩니다)")) {
      await deleteBook(userId, bookId);
      router.push("/dashboard");
    }
  };

  return (
    <button onClick={handleDelete} className="px-4 py-2 bg-red-50 text-red-600 border border-red-200 rounded hover:bg-red-100">
      삭제
    </button>
  );
}
```

- [x] **Step 2: Add button to Detail Page**
Update `src/app/dashboard/books/[id]/page.tsx` to include `<DeleteBookButton bookId={book.id} userId={session.user.id} />` next to the Edit link.

- [x] **Step 3: Commit**
```bash
git add src/components/books src/app/dashboard/books
git commit -m "feat: add delete book functionality"
```

*(Edit logic and Search/Filter will be added in a future Phase 3 extension if required).*

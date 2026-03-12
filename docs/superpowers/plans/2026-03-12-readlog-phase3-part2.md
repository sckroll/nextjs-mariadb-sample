# ReadLog Implementation Plan - Phase 3 Part 2: Edit, Search & Filter

> **For agentic workers:** REQUIRED: Use superpowers:subagent-driven-development (if subagents available) or superpowers:executing-plans to implement this plan. Steps use checkbox (`- [x]`) syntax for tracking.

**Goal:** Implement book information editing and library search/filtering capabilities.

**Architecture:** Extend existing server actions to support updates and filtered queries. Refactor the book form into a reusable component for both add and edit scenarios. Use URL search parameters for filtering and searching to maintain shareable state.

**Tech Stack:** Next.js (App Router), Drizzle ORM, Vitest, React Testing Library, Lucide React (for icons)

---

## Chunk 1: Edit Book Functionality

### Task 1: Update Book Server Action

**Files:**
- Modify: `src/actions/book.test.ts`
- Modify: `src/actions/book.ts`

- [x] **Step 1: Write failing test for `updateBook`**
```typescript
// src/actions/book.test.ts (append)
  it("updateBook modifies existing book data", async () => {
    const { updateBook } = await import("./book");
    const result = await updateBook("user-1", "1", { title: "Updated Title" } as any);
    expect(result.success).toBe(true);
  });
```

- [x] **Step 2: Add `updateBook` to `src/actions/book.ts`**
```typescript
// src/actions/book.ts (append)
export async function updateBook(userId: string, bookId: string, data: import("zod").infer<typeof bookSchema>) {
  const validated = bookSchema.parse(data);
  // Verification of ownership should happen here in real app
  await db.update(books)
    .set({
      ...validated,
      rating: validated.rating ? validated.rating.toString() : null,
      startDate: validated.startDate ? new Date(validated.startDate) : null,
      endDate: validated.endDate ? new Date(validated.endDate) : null,
      updatedAt: new Date(),
    })
    .where(and(eq(books.id, bookId), eq(books.userId, userId)));
  
  return { success: true };
}
```

- [x] **Step 3: Run tests and commit**
Run: `npm run test`
Expected: PASS

### Task 2: Reusable `BookForm` Component

**Files:**
- Create: `src/components/books/BookForm.test.tsx`
- Create: `src/components/books/BookForm.tsx`
- Modify: `src/components/books/AddBookForm.tsx` (to be deprecated/refactored)

- [x] **Step 1: Create `BookForm` which supports initial data**
- [x] **Step 2: Test rendering with initial values**
- [x] **Step 3: Refactor `AddBookForm` to use `BookForm` or replace it entirely**

### Task 3: Edit Book Page Route

**Files:**
- Create: `src/app/dashboard/books/[id]/edit/page.tsx`
- Create: `src/app/dashboard/books/[id]/edit/page.test.tsx`

- [x] **Step 1: Implement the edit page fetching initial data and passing to form**
- [x] **Step 2: Add navigation to Edit page from Detail page**

---

## Chunk 2: Search & Filter

### Task 4: Extend `getBooks` with Filters

**Files:**
- Modify: `src/actions/book.ts`
- Modify: `src/actions/book.test.ts`

- [x] **Step 1: Update `getBooks` to accept `search` and `status` params**
- [x] **Step 2: Update tests to verify filtering logic**

### Task 5: Search & Filter UI in Dashboard

**Files:**
- Modify: `src/app/dashboard/page.tsx`
- Create: `src/components/dashboard/SearchFilter.tsx`

- [x] **Step 1: Create UI for search input and status select**
- [x] **Step 2: Connect UI to URL search parameters**
- [x] **Step 3: Update Dashboard to read searchParams and pass to `getBooks`**

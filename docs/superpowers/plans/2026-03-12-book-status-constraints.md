# ReadLog Implementation Plan - Book Status Constraints & Progress Reset

> **For agentic workers:** REQUIRED: Use superpowers:subagent-driven-development (if subagents available) or superpowers:executing-plans to implement this plan. Steps use checkbox (`- [x]`) syntax for tracking.

**Goal:** Prevent progress updates for books in `WISH` status and implement automatic progress reset (with confirmation) when a book's status is changed back to `WISH`.

**Architecture:** Add server-side checks in `updateProgress`. Implement a `resetProgress` server action. Update the `BookForm` to include a client-side confirmation dialog when the status is changed to `WISH`.

**Tech Stack:** Next.js (App Router), Drizzle ORM, Vitest, React Testing Library, Tailwind CSS

---

## Chunk 1: Server Side Logic & Actions

### Task 1: Update Progress Constraints

**Files:**
- Modify: `src/actions/book.ts`
- Modify: `src/actions/book.test.ts`

- [x] **Step 1: Write failing test for status-based progress blocking**
```typescript
// src/actions/book.test.ts (append)
  it("updateProgress fails if book status is WISH", async () => {
    // Mock getBookById to return a WISH book
    vi.mocked(getBookById).mockResolvedValueOnce({ id: "1", status: "WISH", totalPages: 100 } as any);
    
    await expect(updateProgress("1", 50, "2026-03-12"))
      .rejects.toThrow("읽기 시작한 책만 진행률을 기록할 수 있습니다.");
  });
```

- [x] **Step 2: Implement validation in `updateProgress`**
```typescript
// src/actions/book.ts
export async function updateProgress(bookId: string, readPages: number, recordedDate: string) {
  const book = await db.select().from(books).where(eq(books.id, bookId)).limit(1);
  if (book[0]?.status === "WISH") {
    throw new Error("읽기 시작한 책만 진행률을 기록할 수 있습니다.");
  }
  // ... existing insert logic
}
```

- [x] **Step 3: Run tests and verify**

### Task 2: Progress Reset Action

**Files:**
- Modify: `src/actions/book.ts`

- [x] **Step 1: Add `resetProgress` action**
```typescript
// src/actions/book.ts
export async function resetProgress(bookId: string) {
  await db.delete(readingProgress).where(eq(readingProgress.bookId, bookId));
  return { success: true };
}
```

- [x] **Step 2: Update `updateBook` to handle status change to WISH**
```typescript
// src/actions/book.ts
// In updateBook, if new status is WISH, call resetProgress
```

---

## Chunk 2: UI Logic & Enhancements

### Task 3: Disable `ProgressTracker` for WISH Books

**Files:**
- Modify: `src/components/books/ProgressTracker.tsx`
- Modify: `src/app/dashboard/books/[id]/page.tsx`

- [x] **Step 1: Pass book status to `ProgressTracker`**
- [x] **Step 2: Disable inputs and show helpful message if status is WISH**

### Task 4: Confirmation Dialog in `BookForm`

**Files:**
- Modify: `src/components/books/BookForm.tsx`

- [x] **Step 1: Add state to track if status is being changed to WISH**
- [x] **Step 2: Use `window.confirm` or a custom modal before submitting if status changed to WISH**

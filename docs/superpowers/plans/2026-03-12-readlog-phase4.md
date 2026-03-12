# ReadLog Implementation Plan - Phase 4: Reading Progress & Notes

> **For agentic workers:** REQUIRED: Use superpowers:subagent-driven-development (if subagents available) or superpowers:executing-plans to implement this plan. Steps use checkbox (`- [x]`) syntax for tracking.

**Goal:** Implement reading progress tracking and book-specific notes management.

**Architecture:** Use server actions for data mutations and fetching. Update the Book Detail page to display a progress bar, a form to update progress, and a section for managing notes. Adhere to TDD for all new logic.

**Tech Stack:** Next.js (App Router), Drizzle ORM, Vitest, React Testing Library, Tailwind CSS

---

## Chunk 1: Reading Progress

### Task 1: Reading Progress Server Actions

**Files:**
- Modify: `src/actions/book.ts`
- Modify: `src/actions/book.test.ts`

- [x] **Step 1: Write failing test for `updateProgress`**
```typescript
// src/actions/book.test.ts (append)
import { updateProgress, getLatestProgress } from "./book";

describe("progress actions", () => {
  it("updateProgress adds a new progress record", async () => {
    const result = await updateProgress("1", 50, "2026-03-12");
    expect(result.success).toBe(true);
  });

  it("getLatestProgress returns the most recent progress for a book", async () => {
    const progress = await getLatestProgress("1");
    expect(progress?.readPages).toBe(50);
  });
});
```

- [x] **Step 2: Add `updateProgress` and `getLatestProgress` to `src/actions/book.ts`**
```typescript
// src/actions/book.ts (append)
import { readingProgress } from "@/db/schema";

export async function updateProgress(bookId: string, readPages: number, recordedDate: string) {
  const id = randomUUID();
  await db.insert(readingProgress).values({
    id,
    bookId,
    readPages,
    recordedDate: new Date(recordedDate),
  });
  return { success: true };
}

export async function getLatestProgress(bookId: string) {
  const result = await db.select()
    .from(readingProgress)
    .where(eq(readingProgress.bookId, bookId))
    .orderBy(desc(readingProgress.recordedDate), desc(readingProgress.createdAt))
    .limit(1);
  return result[0] || null;
}
```

- [x] **Step 3: Update db mock in `src/actions/book.test.ts` to support `readingProgress`**
```typescript
// src/actions/book.test.ts
// Update the mock to handle readingProgress table
```

- [x] **Step 4: Run tests and commit**
Run: `npm run test`
Expected: PASS

### Task 2: Progress UI Components

**Files:**
- Create: `src/components/books/ProgressTracker.tsx`
- Create: `src/components/books/ProgressTracker.test.tsx`

- [x] **Step 1: Create `ProgressTracker` showing progress bar and update form**
- [x] **Step 2: Test rendering and submission**

### Task 3: Integrate Progress into Book Detail Page

**Files:**
- Modify: `src/app/dashboard/books/[id]/page.tsx`

- [x] **Step 1: Fetch latest progress in `BookDetailPage`**
- [x] **Step 2: Display `ProgressTracker` component**

---

## Chunk 2: Reading Notes

### Task 4: Reading Notes Server Actions

**Files:**
- Create: `src/actions/note.ts`
- Create: `src/actions/note.test.ts`

- [x] **Step 1: Write tests for `createNote`, `getNotes`, `deleteNote`**
- [x] **Step 2: Implement actions using Drizzle ORM**

### Task 5: Notes UI Components

**Files:**
- Create: `src/components/notes/NoteForm.tsx`
- Create: `src/components/notes/NoteList.tsx`
- Create: `src/components/notes/NoteItem.tsx`

- [x] **Step 1: Implement UI components with tests**

### Task 6: Integrate Notes into Book Detail Page

**Files:**
- Modify: `src/app/dashboard/books/[id]/page.tsx`

- [x] **Step 1: Display notes section with form and list**
- [x] **Step 2: Ensure real-time updates (revalidatePath or client state)**

# ReadLog Implementation Plan - Part 3: Book Registration

> **For agentic workers:** REQUIRED: Use superpowers:subagent-driven-development (if subagents available) or superpowers:executing-plans to implement this plan. Steps use checkbox (`- [x]`) syntax for tracking.

**Goal:** Implement the "Add Book" feature allowing users to manually register a new book to their library.

**Architecture:** Client-side form using React state or React Hook Form, submitting data to the previously created `createBook` server action. Adheres strictly to TDD (Red-Green-Refactor) using Vitest and React Testing Library.

**Tech Stack:** Next.js (App Router), React, Vitest, React Testing Library, Tailwind CSS

---

## Chunk 1: Add Book Form Component

### Task 1: Create `AddBookForm` UI Tests

**Files:**
- Create: `src/components/books/AddBookForm.test.tsx`
- Create: `src/components/books/AddBookForm.tsx`

- [x] **Step 1: Write the failing test for rendering fields**
```tsx
// src/components/books/AddBookForm.test.tsx
import { render, screen } from "@testing-library/react";
import AddBookForm from "./AddBookForm";
import { vi } from "vitest";

describe("AddBookForm", () => {
  it("renders all required input fields", () => {
    render(<AddBookForm onSubmitAction={vi.fn()} />);
    
    expect(screen.getByLabelText(/제목/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/저자/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/출판사/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/총 페이지 수/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /등록하기/i })).toBeInTheDocument();
  });
});
```

- [x] **Step 2: Run test to verify it fails**
Run: `npm run test`
Expected: FAIL due to missing `AddBookForm.tsx` or missing fields.

- [x] **Step 3: Write minimal implementation**
```tsx
// src/components/books/AddBookForm.tsx
"use client";

interface Props {
  onSubmitAction: (data: FormData) => void;
}

export default function AddBookForm({ onSubmitAction }: Props) {
  return (
    <form action={onSubmitAction} className="flex flex-col gap-4 max-w-md">
      <div>
        <label htmlFor="title">제목 *</label>
        <input id="title" name="title" type="text" required className="border p-2 w-full text-black" />
      </div>
      <div>
        <label htmlFor="author">저자</label>
        <input id="author" name="author" type="text" className="border p-2 w-full text-black" />
      </div>
      <div>
        <label htmlFor="publisher">출판사</label>
        <input id="publisher" name="publisher" type="text" className="border p-2 w-full text-black" />
      </div>
      <div>
        <label htmlFor="totalPages">총 페이지 수 *</label>
        <input id="totalPages" name="totalPages" type="number" min="1" required className="border p-2 w-full text-black" />
      </div>
      <button type="submit" className="bg-blue-600 text-white p-2 rounded">등록하기</button>
    </form>
  );
}
```

- [x] **Step 4: Run test to verify it passes**
Run: `npm run test`
Expected: PASS

- [x] **Step 5: Commit**
```bash
git add src/components/books
git commit -m "feat: add basic UI for AddBookForm with tests"
```

### Task 2: Form Submission Logic Test

**Files:**
- Modify: `src/components/books/AddBookForm.test.tsx`
- Modify: `src/components/books/AddBookForm.tsx`

- [x] **Step 1: Write failing test for form submission**
```tsx
// src/components/books/AddBookForm.test.tsx (append to describe block)
import userEvent from "@testing-library/user-event";

  it("calls onSubmitAction with correct data when submitted", async () => {
    const mockSubmit = vi.fn();
    render(<AddBookForm onSubmitAction={mockSubmit} />);
    
    const user = userEvent.setup();
    await user.type(screen.getByLabelText(/제목/i), "Test Book");
    await user.type(screen.getByLabelText(/총 페이지 수/i), "200");
    await user.click(screen.getByRole("button", { name: /등록하기/i }));

    expect(mockSubmit).toHaveBeenCalledTimes(1);
    const formData = mockSubmit.mock.calls[0][0] as FormData;
    expect(formData.get("title")).toBe("Test Book");
    expect(formData.get("totalPages")).toBe("200");
  });
```

- [x] **Step 2: Run test to verify it fails (if not handled by native form)**
Run: `npm run test`
Expected: PASS or FAIL depending on JSDOM's native form submission support. JSDOM sometimes doesn't fire `action` props properly in React 19 without extra setup. Let's adapt if needed, but native HTML `action` with a mock function usually works if manually invoked, or we use `onSubmit`.
*Note: If JSDOM fails to trigger the `action` prop automatically via click, we can change the test to use a standard `onSubmit` handler in React for testing purposes, or update implementation.*

- [x] **Step 3: Update implementation if test fails**
```tsx
// src/components/books/AddBookForm.tsx
"use client";

interface Props {
  onSubmitAction: (data: FormData) => void;
}

export default function AddBookForm({ onSubmitAction }: Props) {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    onSubmitAction(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 max-w-md">
      {/* ...existing inputs... */}
      <div>
        <label htmlFor="title">제목 *</label>
        <input id="title" name="title" type="text" required className="border p-2 w-full text-black" />
      </div>
      <div>
        <label htmlFor="author">저자</label>
        <input id="author" name="author" type="text" className="border p-2 w-full text-black" />
      </div>
      <div>
        <label htmlFor="publisher">출판사</label>
        <input id="publisher" name="publisher" type="text" className="border p-2 w-full text-black" />
      </div>
      <div>
        <label htmlFor="totalPages">총 페이지 수 *</label>
        <input id="totalPages" name="totalPages" type="number" min="1" required className="border p-2 w-full text-black" />
      </div>
      <button type="submit" className="bg-blue-600 text-white p-2 rounded">등록하기</button>
    </form>
  );
}
```

- [x] **Step 4: Run test to verify it passes**
Run: `npm install -D @testing-library/user-event` (if not installed)
Run: `npm run test`
Expected: PASS

- [x] **Step 5: Commit**
```bash
git add src/components/books package.json package-lock.json
git commit -m "feat: add form submission logic to AddBookForm"
```

---

## Chunk 2: New Book Page Integration

### Task 3: Create `NewBookPage`

**Files:**
- Create: `src/app/dashboard/books/new/page.test.tsx`
- Create: `src/app/dashboard/books/new/page.tsx`

- [x] **Step 1: Write failing test for page rendering**
```tsx
// src/app/dashboard/books/new/page.test.tsx
import { render, screen } from "@testing-library/react";
import NewBookPage from "./page";

// Mock the AddBookForm to avoid testing its internal logic here
vi.mock("@/components/books/AddBookForm", () => {
  return {
    default: () => <div data-testid="mock-add-book-form">Mock Form</div>,
  };
});

describe("NewBookPage", () => {
  it("renders the page title and form", () => {
    render(<NewBookPage />);
    
    expect(screen.getByRole("heading", { name: /새 책 등록/i })).toBeInTheDocument();
    expect(screen.getByTestId("mock-add-book-form")).toBeInTheDocument();
  });
});
```

- [x] **Step 2: Run test to verify it fails**
Run: `npm run test`
Expected: FAIL (module not found)

- [x] **Step 3: Write minimal implementation**
```tsx
// src/app/dashboard/books/new/page.tsx
import AddBookForm from "@/components/books/AddBookForm";
// import { createBook } from "@/actions/book"; // Will be integrated later

export default function NewBookPage() {
  const handleAddBook = async (formData: FormData) => {
    "use server";
    // Wrapper for server action
    // In a real scenario we need the userId from session
    console.log("Submit", formData.get("title"));
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">새 책 등록</h2>
      <AddBookForm onSubmitAction={handleAddBook} />
    </div>
  );
}
```

- [x] **Step 4: Run test to verify it passes**
Run: `npm run test`
Expected: PASS

- [x] **Step 5: Commit**
```bash
git add src/app/dashboard/books/new
git commit -m "feat: create new book page with mocked server action"
```
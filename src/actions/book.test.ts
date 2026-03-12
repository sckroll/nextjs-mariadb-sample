import { describe, it, expect, vi } from "vitest";

// Need to mock db call before importing the module that uses it
vi.mock("@/db", () => {
  const queryBuilder = {
    from: vi.fn().mockReturnThis(),
    orderBy: vi.fn().mockReturnThis(),
    set: vi.fn().mockReturnThis(),
    where: vi.fn().mockReturnThis(),
    $dynamic: vi.fn().mockReturnThis(),
    limit: vi.fn().mockReturnThis(),
    then: function (resolve: any) {
      resolve([{ id: "1", title: "Test Book", readPages: 50 }]);
    }
  };
  return {
    db: {
      select: vi.fn().mockReturnValue(queryBuilder),
      where: vi.fn().mockReturnValue(queryBuilder),
      update: vi.fn().mockReturnValue(queryBuilder),
      insert: vi.fn().mockReturnThis(),
      values: vi.fn().mockResolvedValue({ success: true }),
    },
  };
});

import { getBooks, getBookById, updateBook, updateProgress, getLatestProgress } from "./book";

describe("book actions", () => {
  it("getBooks returns an array of books for a user", async () => {
    const books = await getBooks("test-user-id");
    expect(books).toHaveLength(1);
    expect(books[0].title).toBe("Test Book");
  });

  it("getBooks applies search and status filters", async () => {
    // In this unit test we just verify the function can be called with these params
    const books = await getBooks("test-user-id", { search: "test", status: "READING" });
    expect(books).toBeDefined();
  });

  it("getBookById returns a single book", async () => {
    const book = await getBookById("1", "test-user-id");
    expect(book?.title).toBe("Test Book");
  });

  it("updateBook modifies existing book data", async () => {
    const result = await updateBook("user-1", "1", { 
      title: "Updated Title",
      totalPages: 300,
      status: "READING"
    });
    expect(result.success).toBe(true);
  });
});

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
import { describe, it, expect, vi, beforeEach } from "vitest";

let mockBookStatus = "READING";

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
      resolve([{ id: "1", title: "Test Book", readPages: 50, status: mockBookStatus }]);
    }
  };
  return {
    db: {
      select: vi.fn().mockReturnValue(queryBuilder),
      where: vi.fn().mockReturnValue(queryBuilder),
      update: vi.fn().mockReturnValue(queryBuilder),
      insert: vi.fn().mockReturnThis(),
      values: vi.fn().mockResolvedValue({ success: true }),
      delete: vi.fn().mockReturnThis(),
    },
  };
});

import { getBooks, getBookById, updateBook, updateProgress, getLatestProgress, resetProgress } from "./book";

describe("book actions", () => {
  beforeEach(() => {
    mockBookStatus = "READING";
  });

  it("getBooks returns an array of books for a user", async () => {
    const books = await getBooks("test-user-id");
    expect(books).toHaveLength(1);
    expect(books[0].title).toBe("Test Book");
  });

  it("getBooks applies search and status filters", async () => {
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
  beforeEach(() => {
    mockBookStatus = "READING";
  });

  it("updateProgress adds a new progress record", async () => {
    const result = await updateProgress("1", 50, "2026-03-12");
    expect(result.success).toBe(true);
  });

  it("getLatestProgress returns the most recent progress for a book", async () => {
    const progress = await getLatestProgress("1");
    expect(progress?.readPages).toBe(50);
  });

  it("updateProgress fails if book status is WISH", async () => {
    mockBookStatus = "WISH";
    await expect(updateProgress("1", 50, "2026-03-12"))
      .rejects.toThrow("읽기 시작한 책만 진행률을 기록할 수 있습니다.");
  });

  it("resetProgress removes all progress records", async () => {
    const result = await resetProgress("1");
    expect(result.success).toBe(true);
  });
});
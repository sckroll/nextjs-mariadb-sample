import { describe, it, expect, vi } from "vitest";

// Need to mock db call before importing the module that uses it
vi.mock("@/db", () => {
  const queryBuilder = {
    orderBy: vi.fn().mockResolvedValue([{ id: "1", title: "Test Book" }]),
    then: function (resolve: any) {
      resolve([{ id: "1", title: "Test Book" }]);
    }
  };
  return {
    db: {
      select: vi.fn().mockReturnThis(),
      from: vi.fn().mockReturnThis(),
      where: vi.fn().mockReturnValue(queryBuilder),
    },
  };
});

import { getBooks, getBookById } from "./book";

describe("book actions", () => {
  it("getBooks returns an array of books for a user", async () => {
    const books = await getBooks("test-user-id");
    expect(books).toHaveLength(1);
    expect(books[0].title).toBe("Test Book");
  });

  it("getBookById returns a single book", async () => {
    const book = await getBookById("1", "test-user-id");
    expect(book?.title).toBe("Test Book");
  });
});
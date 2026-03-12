import { describe, it, expect, vi } from "vitest";

// Need to mock db call before importing the module that uses it
vi.mock("@/db", () => ({
  db: {
    select: vi.fn().mockReturnThis(),
    from: vi.fn().mockReturnThis(),
    where: vi.fn().mockReturnThis(),
    orderBy: vi.fn().mockResolvedValue([{ id: "1", title: "Test Book" }]),
  },
}));

import { getBooks } from "./book";

describe("book actions", () => {
  it("getBooks returns an array of books for a user", async () => {
    const books = await getBooks("test-user-id");
    expect(books).toHaveLength(1);
    expect(books[0].title).toBe("Test Book");
  });
});
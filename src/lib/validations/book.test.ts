import { bookSchema } from "@/lib/validations/book";

describe("bookSchema", () => {
  it("should validate a correct book object", () => {
    const validBook = {
      title: "The Great Gatsby",
      author: "F. Scott Fitzgerald",
      totalPages: 180,
      status: "WISH",
      rating: 4.5,
    };

    const result = bookSchema.safeParse(validBook);
    expect(result.success).toBe(true);
  });

  it("should fail validation if title is missing", () => {
    const invalidBook = {
      author: "F. Scott Fitzgerald",
      totalPages: 180,
    };

    const result = bookSchema.safeParse(invalidBook);
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues[0].path).toContain("title");
    }
  });

  it("should fail validation if totalPages is less than 1", () => {
    const invalidBook = {
      title: "The Great Gatsby",
      totalPages: 0,
    };

    const result = bookSchema.safeParse(invalidBook);
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues[0].message).toBe("Total pages must be greater than 0");
    }
  });

  it("should format string rating as decimal constraint permits", () => {
    const validBook = {
      title: "The Great Gatsby",
      totalPages: 100,
      rating: 4.3, // Not a multiple of 0.5
    };

    const result = bookSchema.safeParse(validBook);
    expect(result.success).toBe(false);
    if (!result.success) {
        expect(result.error.issues[0].message).toBe("Invalid number: must be a multiple of 0.5");
    }
  });
});
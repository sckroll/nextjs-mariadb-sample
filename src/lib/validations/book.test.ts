import { bookSchema } from "@/lib/validations/book";

describe("bookSchema 검증", () => {
  it("올바른 도서 객체를 통과시켜야 한다", () => {
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

  it("제목이 누락되면 검증에 실패해야 한다", () => {
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

  it("총 페이지 수가 1보다 작으면 검증에 실패해야 한다", () => {
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

  it("평점은 0.5 단위여야 한다", () => {
    const validBook = {
      title: "The Great Gatsby",
      totalPages: 100,
      rating: 4.3, // 0.5의 배수가 아님
    };

    const result = bookSchema.safeParse(validBook);
    expect(result.success).toBe(false);
    if (!result.success) {
        expect(result.error.issues[0].message).toBe("Invalid number: must be a multiple of 0.5");
    }
  });
});
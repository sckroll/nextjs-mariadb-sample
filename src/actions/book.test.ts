import { describe, it, expect, vi, beforeEach } from "vitest";

let mockBookStatus = "READING";

// DB 호출 모킹
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

describe("도서 관련 서버 액션", () => {
  beforeEach(() => {
    mockBookStatus = "READING";
  });

  it("getBooks는 사용자의 도서 목록을 반환해야 한다", async () => {
    const books = await getBooks("test-user-id");
    expect(books).toHaveLength(1);
    expect(books[0].title).toBe("Test Book");
  });

  it("getBooks는 검색어와 상태 필터를 적용해야 한다", async () => {
    const books = await getBooks("test-user-id", { search: "test", status: "READING" });
    expect(books).toBeDefined();
  });

  it("getBookById는 단일 도서 정보를 반환해야 한다", async () => {
    const book = await getBookById("1", "test-user-id");
    expect(book?.title).toBe("Test Book");
  });

  it("updateBook은 기존 도서 정보를 수정해야 한다", async () => {
    const result = await updateBook("user-1", "1", { 
      title: "Updated Title",
      totalPages: 300,
      status: "READING"
    });
    expect(result.success).toBe(true);
  });
});

describe("진행률 관련 서버 액션", () => {
  beforeEach(() => {
    mockBookStatus = "READING";
  });

  it("updateProgress는 새로운 진행 기록을 추가해야 한다", async () => {
    const result = await updateProgress("1", 50, "2026-03-12");
    expect(result.success).toBe(true);
  });

  it("getLatestProgress는 도서의 최신 진행 정보를 반환해야 한다", async () => {
    const progress = await getLatestProgress("1");
    expect(progress?.readPages).toBe(50);
  });

  it("책 상태가 WISH인 경우 updateProgress가 실패해야 한다", async () => {
    mockBookStatus = "WISH";
    await expect(updateProgress("1", 50, "2026-03-12"))
      .rejects.toThrow("읽기 시작한 책만 진행률을 기록할 수 있습니다.");
  });

  it("resetProgress는 모든 진행 기록을 삭제해야 한다", async () => {
    const result = await resetProgress("1");
    expect(result.success).toBe(true);
  });
});
import { describe, it, expect, vi } from "vitest";

// DB 호출 모킹
vi.mock("@/db", () => {
  const queryBuilder = {
    from: vi.fn().mockReturnThis(),
    innerJoin: vi.fn().mockReturnThis(),
    where: vi.fn().mockReturnThis(),
    groupBy: vi.fn().mockReturnThis(),
    then: function (resolve: any) {
      resolve([{ count: 0, avgRating: 0, total: 0 }]);
    }
  };
  return {
    db: {
      select: vi.fn().mockReturnValue(queryBuilder),
    },
  };
});

import { getMonthlyStatistics } from "./statistics";

describe("통계 관련 서버 액션", () => {
  it("getMonthlyStatistics는 월별 통계 데이터를 반환해야 한다", async () => {
    const stats = await getMonthlyStatistics("user-1", 2026, 3);
    expect(stats).toBeDefined();
    expect(stats).toHaveProperty("booksCompleted");
    expect(stats).toHaveProperty("pagesRead");
    expect(stats).toHaveProperty("averageRating");
  });
});
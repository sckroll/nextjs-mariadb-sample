import { describe, it, expect, vi } from "vitest";

// DB 호출 모킹
vi.mock("@/db", () => {
  const queryBuilder = {
    from: vi.fn().mockReturnThis(),
    where: vi.fn().mockReturnThis(),
    orderBy: vi.fn().mockReturnThis(),
    then: function (resolve: any) {
      resolve([{ id: "goal-1", targetValue: 10 }]);
    }
  };
  return {
    db: {
      select: vi.fn().mockReturnValue(queryBuilder),
      insert: vi.fn().mockReturnThis(),
      values: vi.fn().mockResolvedValue({ success: true }),
      delete: vi.fn().mockReturnThis(),
      where: vi.fn().mockResolvedValue({ success: true }),
    },
  };
});

import { createGoal, getGoals, deleteGoal } from "./goal";

describe("목표 관련 서버 액션", () => {
  it("createGoal은 새로운 목표를 생성해야 한다", async () => {
    const result = await createGoal("user-1", {
      periodType: "MONTHLY",
      targetType: "BOOKS",
      targetValue: 5,
      startDate: "2026-03-01",
      endDate: "2026-03-31",
    });
    expect(result.success).toBe(true);
  });

  it("getGoals는 사용자의 목표 목록을 반환해야 한다", async () => {
    const goals = await getGoals("user-1");
    expect(goals).toHaveLength(1);
    expect(goals[0].targetValue).toBe(10);
  });

  it("deleteGoal은 목표를 삭제해야 한다", async () => {
    const result = await deleteGoal("goal-1");
    expect(result.success).toBe(true);
  });
});
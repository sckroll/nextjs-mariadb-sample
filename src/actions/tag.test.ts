import { describe, it, expect, vi, beforeEach } from "vitest";

// DB 호출 모킹
vi.mock("@/db", () => {
  const queryBuilder = {
    from: vi.fn().mockReturnThis(),
    where: vi.fn().mockReturnThis(),
    orderBy: vi.fn().mockReturnThis(),
    then: function (resolve: any) {
      resolve([{ id: "tag-1", name: "소설", color: "#FF0000" }]);
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

import { createTag, getTags, deleteTag } from "./tag";

describe("태그 관련 서버 액션", () => {
  it("createTag는 새로운 태그를 생성해야 한다", async () => {
    const result = await createTag("user-1", { name: "SF", color: "#00FF00" });
    expect(result.success).toBe(true);
  });

  it("getTags는 사용자의 모든 태그를 반환해야 한다", async () => {
    const tags = await getTags("user-1");
    expect(tags).toHaveLength(1);
    expect(tags[0].name).toBe("소설");
  });

  it("deleteTag는 태그를 삭제해야 한다", async () => {
    const result = await deleteTag("tag-1");
    expect(result.success).toBe(true);
  });
});
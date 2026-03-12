import { describe, it, expect, vi } from "vitest";

// DB 호출 모킹
vi.mock("@/db", () => {
  const queryBuilder = {
    from: vi.fn().mockReturnThis(),
    where: vi.fn().mockReturnThis(),
    orderBy: vi.fn().mockResolvedValue([{ id: "note-1", content: "Test Note" }]),
    then: function (resolve: any) {
      resolve([{ id: "note-1", content: "Test Note" }]);
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

import { createNote, getNotes, deleteNote } from "./note";

describe("노트 관련 서버 액션", () => {
  it("createNote는 새로운 노트를 추가해야 한다", async () => {
    const result = await createNote({ bookId: "1", content: "Great read!" });
    expect(result.success).toBe(true);
  });

  it("getNotes는 도서의 모든 노트를 반환해야 한다", async () => {
    const notes = await getNotes("1");
    expect(notes).toHaveLength(1);
    expect(notes[0].content).toBe("Test Note");
  });

  it("deleteNote는 노트를 삭제해야 한다", async () => {
    const result = await deleteNote("note-1");
    expect(result.success).toBe(true);
  });
});
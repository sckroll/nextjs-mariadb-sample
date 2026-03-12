import { describe, it, expect, vi } from "vitest";

// Mock db call
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

describe("note actions", () => {
  it("createNote adds a new note", async () => {
    const result = await createNote({ bookId: "1", content: "Great read!" });
    expect(result.success).toBe(true);
  });

  it("getNotes returns all notes for a book", async () => {
    const notes = await getNotes("1");
    expect(notes).toHaveLength(1);
    expect(notes[0].content).toBe("Test Note");
  });

  it("deleteNote removes a note", async () => {
    const result = await deleteNote("note-1");
    expect(result.success).toBe(true);
  });
});
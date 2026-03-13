import { render, screen } from "@testing-library/react";
import BookDetailPage from "./page";
import { describe, it, expect, vi } from "vitest";

vi.mock("next/headers", () => ({ headers: vi.fn() }));
vi.mock("next/navigation", () => ({ 
  redirect: vi.fn(), 
  notFound: vi.fn(),
  useRouter: vi.fn().mockReturnValue({ push: vi.fn() })
}));
vi.mock("@/lib/auth", () => ({
  auth: { api: { getSession: vi.fn().mockResolvedValue({ user: { id: "user-1" } }) } },
}));
vi.mock("@/actions/book", () => ({
  getBookById: vi.fn().mockResolvedValue({ id: "1", title: "Detail Test Book", author: "Author Name", status: "WISH", totalPages: 100 }),
  getLatestProgress: vi.fn().mockResolvedValue({ readPages: 25 }),
  updateProgress: vi.fn(),
}));

vi.mock("@/actions/note", () => ({
  getNotes: vi.fn().mockResolvedValue([{ id: "note-1", content: "Test Note Content" }]),
  createNote: vi.fn(),
  deleteNote: vi.fn(),
}));

vi.mock("@/actions/tag", () => ({
  getBookTags: vi.fn().mockResolvedValue([{ id: "tag-1", name: "SF", color: "#000000" }]),
}));

describe("도서 상세 페이지", () => {
  it("도서 정보, 진행률, 노트를 렌더링해야 한다", async () => {
    const resolvedComponent = await BookDetailPage({ params: Promise.resolve({ id: "1" }) });
    render(resolvedComponent);
    expect(screen.getByText("Detail Test Book")).toBeInTheDocument();
    expect(screen.getByText(/25 \/ 100 쪽/)).toBeInTheDocument();
    expect(screen.getByText("Test Note Content")).toBeInTheDocument();
  });
});
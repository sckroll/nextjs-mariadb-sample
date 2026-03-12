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
}));

describe("BookDetailPage", () => {
  it("renders book details", async () => {
    const resolvedComponent = await BookDetailPage({ params: Promise.resolve({ id: "1" }) });
    render(resolvedComponent);
    expect(screen.getByText("Detail Test Book")).toBeInTheDocument();
    expect(screen.getByText("Author Name | 출판사 미상")).toBeInTheDocument();
  });
});
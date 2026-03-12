import { render, screen } from "@testing-library/react";
import EditBookPage from "./page";
import { describe, it, expect, vi } from "vitest";

vi.mock("next/headers", () => ({ headers: vi.fn() }));
vi.mock("next/navigation", () => ({ redirect: vi.fn(), notFound: vi.fn() }));
vi.mock("@/lib/auth", () => ({
  auth: { api: { getSession: vi.fn().mockResolvedValue({ user: { id: "user-1" } }) } },
}));
vi.mock("@/actions/book", () => ({
  getBookById: vi.fn().mockResolvedValue({ id: "1", title: "Edit Test Book", author: "Author Name", status: "WISH", totalPages: 100 }),
  updateBook: vi.fn(),
}));

describe("EditBookPage", () => {
  it("renders the edit form with book data", async () => {
    const resolvedComponent = await EditBookPage({ params: Promise.resolve({ id: "1" }) });
    render(resolvedComponent);
    
    expect(screen.getByRole("heading", { name: /책 정보 수정/i })).toBeInTheDocument();
    expect(screen.getByLabelText(/제목/i)).toHaveValue("Edit Test Book");
  });
});
import { render, screen } from "@testing-library/react";
import DashboardPage from "./page";
import { describe, it, expect, vi } from "vitest";

vi.mock("next/headers", () => ({ headers: vi.fn() }));
vi.mock("next/navigation", () => ({ 
  redirect: vi.fn(),
  useRouter: vi.fn().mockReturnValue({ push: vi.fn() }),
  useSearchParams: vi.fn().mockReturnValue(new URLSearchParams()),
}));
vi.mock("@/lib/auth", () => ({
  auth: { api: { getSession: vi.fn().mockResolvedValue({ user: { id: "user-1" } }) } },
}));

vi.mock("@/actions/book", () => ({
  getBooks: vi.fn().mockResolvedValue([
    { id: "1", title: "Test Book 1", status: "WISH" }
  ]),
}));

describe("대시보드 페이지", () => {
  it("가져온 도서 목록을 렌더링해야 한다", async () => {
    const resolvedComponent = await DashboardPage({ searchParams: Promise.resolve({}) });
    render(resolvedComponent);
    expect(await screen.findByText("Test Book 1")).toBeInTheDocument();
  });
});
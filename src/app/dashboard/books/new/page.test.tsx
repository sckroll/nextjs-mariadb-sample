import { render, screen } from "@testing-library/react";
import NewBookPage from "./page";
import { describe, it, expect, vi } from "vitest";

// 내부 로직 테스트를 피하기 위해 AddBookForm 모킹
vi.mock("@/components/books/AddBookForm", () => {
  return {
    default: () => <div data-testid="mock-add-book-form">Mock Form</div>,
  };
});

// Next.js 및 인증 모킹
vi.mock("next/headers", () => ({
  headers: vi.fn(),
}));
vi.mock("next/navigation", () => ({
  redirect: vi.fn(),
}));
vi.mock("@/lib/auth", () => ({
  auth: {
    api: {
      getSession: vi.fn().mockResolvedValue({ user: { id: "test-user-id" } }),
    },
  },
}));

describe("새 도서 등록 페이지", () => {
  it("페이지 제목과 폼을 렌더링해야 한다", async () => {
    // NewBookPage는 비동기 서버 컴포넌트임
    const resolvedComponent = await NewBookPage();
    render(resolvedComponent);
    
    expect(screen.getByRole("heading", { name: /새 책 등록/i })).toBeInTheDocument();
    expect(screen.getByTestId("mock-add-book-form")).toBeInTheDocument();
  });
});
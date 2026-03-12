import { render, screen } from "@testing-library/react";
import AccountPage from "./page";
import { describe, it, expect, vi } from "vitest";

vi.mock("next/headers", () => ({ headers: vi.fn() }));
vi.mock("next/navigation", () => ({ 
  redirect: vi.fn(),
  useRouter: vi.fn().mockReturnValue({ push: vi.fn() })
}));

vi.mock("@/lib/auth", () => ({
  auth: { 
    api: { 
      getSession: vi.fn().mockResolvedValue({ 
        user: { 
          id: "user-1",
          name: "Test User",
          email: "test@example.com",
          image: "https://example.com/avatar.png"
        } 
      }) 
    } 
  },
}));

vi.mock("@/lib/auth-client", () => ({
  authClient: {
    updateUser: vi.fn(),
    changePassword: vi.fn(),
    signOut: vi.fn(),
  }
}));

describe("계정 관리 페이지", () => {
  it("기존 사용자 정보가 폼에 렌더링되어야 한다", async () => {
    const resolvedComponent = await AccountPage();
    render(resolvedComponent);
    
    expect(screen.getByDisplayValue("Test User")).toBeInTheDocument();
    expect(screen.getByDisplayValue("test@example.com")).toBeInTheDocument();
    expect(screen.getByDisplayValue("https://example.com/avatar.png")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "프로필 업데이트" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "비밀번호 변경" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "로그아웃" })).toBeInTheDocument();
  });
});
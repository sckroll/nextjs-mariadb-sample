import { render, screen } from "@testing-library/react";
import Home from "@/app/page";
import { describe, it, expect } from "vitest";

describe("홈 페이지", () => {
  it("메인 카피와 시작하기 링크를 렌더링해야 한다", () => {
    render(<Home />);
    
    expect(screen.getByText(/당신의 독서 여정/i)).toBeInTheDocument();
    
    const startLinks = screen.getAllByRole("link", { name: /무료로 시작하기|무료로 시작/i });
    expect(startLinks.length).toBeGreaterThan(0);
    expect(startLinks[0]).toHaveAttribute("href", "/register");
    
    const loginLinks = screen.getAllByRole("link", { name: /로그인/i });
    expect(loginLinks.length).toBeGreaterThan(0);
    expect(loginLinks[0]).toHaveAttribute("href", "/login");
  });
});
import { render, screen } from "@testing-library/react";
import Home from "@/app/page";

describe("홈 페이지", () => {
  it("메인 제목을 렌더링해야 한다", () => {
    render(<Home />);
    
    const heading = screen.getByRole("heading", { level: 1 });
    expect(heading).toBeInTheDocument();
    expect(heading).toHaveTextContent("ReadLog");
  });

  it("로그인 및 회원가입 링크를 렌더링해야 한다", () => {
    render(<Home />);
    
    const loginLink = screen.getByRole("link", { name: "로그인" });
    const registerLink = screen.getByRole("link", { name: "회원가입" });
    
    expect(loginLink).toBeInTheDocument();
    expect(loginLink).toHaveAttribute("href", "/login");
    
    expect(registerLink).toBeInTheDocument();
    expect(registerLink).toHaveAttribute("href", "/register");
  });
});
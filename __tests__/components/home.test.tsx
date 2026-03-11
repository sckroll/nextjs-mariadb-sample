import { render, screen } from "@testing-library/react";
import Home from "@/app/page";

describe("Home Page", () => {
  it("renders the main heading", () => {
    render(<Home />);
    
    const heading = screen.getByRole("heading", { level: 1 });
    expect(heading).toBeInTheDocument();
    expect(heading).toHaveTextContent("ReadLog");
  });

  it("renders login and register links", () => {
    render(<Home />);
    
    const loginLink = screen.getByRole("link", { name: "로그인" });
    const registerLink = screen.getByRole("link", { name: "회원가입" });
    
    expect(loginLink).toBeInTheDocument();
    expect(loginLink).toHaveAttribute("href", "/login");
    
    expect(registerLink).toBeInTheDocument();
    expect(registerLink).toHaveAttribute("href", "/register");
  });
});
import { render, screen } from "@testing-library/react";
import AddBookForm from "./AddBookForm";
import { vi } from "vitest";

describe("AddBookForm", () => {
  it("renders all required input fields", () => {
    render(<AddBookForm onSubmitAction={vi.fn()} />);
    
    expect(screen.getByLabelText(/제목/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/저자/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/출판사/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/총 페이지 수/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /등록하기/i })).toBeInTheDocument();
  });
});
import { render, screen } from "@testing-library/react";
import NewBookPage from "./page";
import { vi } from "vitest";

// Mock the AddBookForm to avoid testing its internal logic here
vi.mock("@/components/books/AddBookForm", () => {
  return {
    default: () => <div data-testid="mock-add-book-form">Mock Form</div>,
  };
});

describe("NewBookPage", () => {
  it("renders the page title and form", () => {
    render(<NewBookPage />);
    
    expect(screen.getByRole("heading", { name: /새 책 등록/i })).toBeInTheDocument();
    expect(screen.getByTestId("mock-add-book-form")).toBeInTheDocument();
  });
});
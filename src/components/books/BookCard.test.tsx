import { render, screen } from "@testing-library/react";
import BookCard from "./BookCard";
import { describe, it, expect } from "vitest";

describe("BookCard", () => {
  it("도서 제목, 저자, 상태를 렌더링해야 한다", () => {
    const mockBook = {
      id: "1",
      title: "The Great Gatsby",
      author: "F. Scott Fitzgerald",
      status: "READING" as const,
      totalPages: 180,
    };
    render(<BookCard book={mockBook as any} />);
    
    expect(screen.getByText("The Great Gatsby")).toBeInTheDocument();
    expect(screen.getByText("F. Scott Fitzgerald")).toBeInTheDocument();
    expect(screen.getByText("읽는 중")).toBeInTheDocument();
  });
});
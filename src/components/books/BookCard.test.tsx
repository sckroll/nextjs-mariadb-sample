import { render, screen } from "@testing-library/react";
import BookCard from "./BookCard";
import { describe, it, expect } from "vitest";

describe("BookCard", () => {
  it("renders book title, author, and status", () => {
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
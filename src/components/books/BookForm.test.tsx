import { render, screen } from "@testing-library/react";
import BookForm from "./BookForm";
import { describe, it, expect, vi } from "vitest";

describe("BookForm", () => {
  it("기존 데이터와 함께 폼을 렌더링해야 한다", () => {
    const initialData = {
      title: "Existing Book",
      author: "Existing Author",
      totalPages: 123,
      status: "READING" as const,
    };
    
    render(<BookForm initialData={initialData} onSubmitAction={vi.fn()} />);
    
    expect(screen.getByLabelText(/제목/i)).toHaveValue("Existing Book");
    expect(screen.getByLabelText(/저자/i)).toHaveValue("Existing Author");
    expect(screen.getByLabelText(/총 페이지 수/i)).toHaveValue(123);
    expect(screen.getByLabelText(/상태/i)).toHaveValue("READING");
  });
});
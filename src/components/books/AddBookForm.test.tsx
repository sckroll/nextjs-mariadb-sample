import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
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

  it("calls onSubmitAction with correct data when submitted", async () => {
    const mockSubmit = vi.fn();
    render(<AddBookForm onSubmitAction={mockSubmit} />);
    
    const user = userEvent.setup();
    await user.type(screen.getByLabelText(/제목/i), "Test Book");
    await user.type(screen.getByLabelText(/총 페이지 수/i), "200");
    await user.click(screen.getByRole("button", { name: /등록하기/i }));

    expect(mockSubmit).toHaveBeenCalledTimes(1);
    const formData = mockSubmit.mock.calls[0][0] as FormData;
    expect(formData.get("title")).toBe("Test Book");
    expect(formData.get("totalPages")).toBe("200");
  });
});
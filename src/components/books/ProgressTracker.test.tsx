import { render, screen } from "@testing-library/react";
import ProgressTracker from "./ProgressTracker";
import { describe, it, expect, vi } from "vitest";

describe("ProgressTracker", () => {
  it("renders current progress and total pages", () => {
    render(<ProgressTracker bookId="1" currentPages={50} totalPages={200} status="READING" onUpdate={vi.fn()} />);
    
    expect(screen.getByText(/50 \/ 200 쪽/)).toBeInTheDocument();
    expect(screen.getByText(/25%/)).toBeInTheDocument();
  });

  it("renders a progress bar with correct width", () => {
    const { container } = render(<ProgressTracker bookId="1" currentPages={50} totalPages={200} status="READING" onUpdate={vi.fn()} />);
    const progressBar = container.querySelector(".bg-blue-600");
    expect(progressBar).toHaveStyle({ width: "25%" });
  });
});
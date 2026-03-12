import { render, screen } from "@testing-library/react";
import ProgressTracker from "./ProgressTracker";
import { describe, it, expect, vi } from "vitest";

describe("ProgressTracker", () => {
  it("현재 진행률과 총 페이지 수를 렌더링해야 한다", () => {
    render(<ProgressTracker bookId="1" currentPages={50} totalPages={200} status="READING" onUpdate={vi.fn()} />);
    
    expect(screen.getByText(/50 \/ 200 쪽/)).toBeInTheDocument();
    expect(screen.getByText(/25%/)).toBeInTheDocument();
  });

  it("올바른 너비의 진행률 바를 렌더링해야 한다", () => {
    const { container } = render(<ProgressTracker bookId="1" currentPages={50} totalPages={200} status="READING" onUpdate={vi.fn()} />);
    const progressBar = container.querySelector(".bg-blue-600");
    expect(progressBar).toHaveStyle({ width: "25%" });
  });
});
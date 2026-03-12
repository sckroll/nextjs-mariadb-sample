import { render, screen } from "@testing-library/react";
import TagManager from "./TagManager";
import { describe, it, expect, vi } from "vitest";

describe("TagManager", () => {
  const mockTags = [
    { id: "1", name: "소설", color: "#FF0000", userId: "user-1", createdAt: new Date() },
    { id: "2", name: "SF", color: "#00FF00", userId: "user-1", createdAt: new Date() },
  ];

  it("태그 목록을 렌더링해야 한다", () => {
    render(<TagManager tags={mockTags} onCreate={vi.fn()} onDelete={vi.fn()} />);
    
    expect(screen.getByText("소설")).toBeInTheDocument();
    expect(screen.getByText("SF")).toBeInTheDocument();
  });

  it("새 태그 추가 폼을 렌더링해야 한다", () => {
    render(<TagManager tags={[]} onCreate={vi.fn()} onDelete={vi.fn()} />);
    
    expect(screen.getByPlaceholderText(/태그 이름/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /추가/i })).toBeInTheDocument();
  });
});
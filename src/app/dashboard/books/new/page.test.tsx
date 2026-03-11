import { render, screen } from "@testing-library/react";
import NewBookPage from "./page";
import { vi } from "vitest";

// Mock the AddBookForm to avoid testing its internal logic here
vi.mock("@/components/books/AddBookForm", () => {
  return {
    default: () => <div data-testid="mock-add-book-form">Mock Form</div>,
  };
});

// Mock Next.js and Auth
vi.mock("next/headers", () => ({
  headers: vi.fn(),
}));
vi.mock("next/navigation", () => ({
  redirect: vi.fn(),
}));
vi.mock("@/lib/auth", () => ({
  auth: {
    api: {
      getSession: vi.fn().mockResolvedValue({ user: { id: "test-user-id" } }),
    },
  },
}));

describe("NewBookPage", () => {
  it("renders the page title and form", async () => {
    // NewBookPage is an async Server Component
    const resolvedComponent = await NewBookPage();
    render(resolvedComponent);
    
    expect(screen.getByRole("heading", { name: /새 책 등록/i })).toBeInTheDocument();
    expect(screen.getByTestId("mock-add-book-form")).toBeInTheDocument();
  });
});
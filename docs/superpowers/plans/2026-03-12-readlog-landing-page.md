# ReadLog Implementation Plan - Landing Page Redesign

> **For agentic workers:** REQUIRED: Use superpowers:subagent-driven-development (if subagents available) or superpowers:executing-plans to implement this plan. Steps use checkbox (`- [x]`) syntax for tracking.

**Goal:** Redesign the root landing page (`/`) based on the provided Figma designs (responsive for desktop and mobile).

**Architecture:** 
- A single responsive React Component in `src/app/page.tsx`.
- Use Tailwind CSS utility classes (`md:`, `lg:`) to handle responsiveness.
- Update the existing `src/app/page.test.tsx` to match the new text content and layout.

**Tech Stack:** Next.js (App Router), Tailwind CSS v4, React Testing Library

---

## Chunk 1: Landing Page UI Implementation

### Task 1: Update Tests for New Design

**Files:**
- Modify: `src/app/page.test.tsx`

- [x] **Step 1: Rewrite tests to match the new copy**
```tsx
import { render, screen } from "@testing-library/react";
import Home from "@/app/page";
import { describe, it, expect } from "vitest";

describe("홈 페이지", () => {
  it("메인 카피와 시작하기 링크를 렌더링해야 한다", () => {
    render(<Home />);
    
    expect(screen.getByText(/당신의 독서 여정/i)).toBeInTheDocument();
    
    // There are multiple "무료로 시작하기" buttons in the design
    const startLinks = screen.getAllByRole("link", { name: /무료로 시작하기/i });
    expect(startLinks.length).toBeGreaterThan(0);
    expect(startLinks[0]).toHaveAttribute("href", "/register");
    
    const loginLinks = screen.getAllByRole("link", { name: /로그인/i });
    expect(loginLinks.length).toBeGreaterThan(0);
    expect(loginLinks[0]).toHaveAttribute("href", "/login");
  });
});
```

### Task 2: Implement Responsive UI

**Files:**
- Modify: `src/app/page.tsx`

- [x] **Step 1: Add image constants from Figma**
- [x] **Step 2: Build the Navigation Bar (Header)**
- [x] **Step 3: Build the Hero Section**
- [x] **Step 4: Build the Features Section**
- [x] **Step 5: Build the Testimonials Section**
- [x] **Step 6: Build the CTA and Footer**
- [x] **Step 7: Run tests to verify**
Run: `npm run test src/app/page.test.tsx`
Expected: PASS

- [x] **Step 8: Commit**
```bash
git add src/app/page.tsx src/app/page.test.tsx
git commit -m "feat: redesign landing page based on figma"
```
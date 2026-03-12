# ReadLog AI Agent Guidelines

This document defines the guidelines that AI agents (Gemini, Claude, etc.) must strictly follow when developing the ReadLog project.

## 1. Project Context
- **Project Name:** ReadLog
- **Goal:** Build a personal reading activity tracking, management, and statistics web service.
- **Core Features:** User authentication, reading status and progress management, reading notes, calendar, and monthly statistics.

## 2. Tech Stack
- **Framework:** Next.js (App Router)
- **Styling:** Tailwind CSS v4
- **Database:** MariaDB
- **ORM:** Drizzle ORM
- **Authentication:** Better Auth (email/password)
- **Validation:** Zod
- **Testing:** Vitest, React Testing Library

### 3.1 Test-Driven Development (TDD) Requirement
- **Strictly adhere to the Red-Green-Refactor cycle.**
- When developing new features or fixing bugs, you must FIRST write a **failing test (Red)** and run it to verify that it fails correctly.
- Afterward, write the minimum amount of code required to pass the test (Green), and perform refactoring if necessary.
- Test files must be co-located with the implementation files in the `src` directory (e.g., `src/app/page.test.tsx`), NOT in a separate `__tests__` folder.
- **Test cases must be named in Korean.** (e.g., `it("사용자는 로그인을 할 수 있다", ...)` instead of `it("user can login", ...)`)

### 3.2 Git Commit Rules
- Separate commits into logical units such as feature, fix, test, and chore.
- Write concise and clear commit messages in English.
- Examples: `feat: add book validation logic`, `test: implement TDD for book registration`

### 3.3 Testing Async Server Components
- When testing Next.js async Server Components using Vitest and React Testing Library, you cannot render them directly using `<Component />` syntax.
- Instead, await the component and render the resolved JSX:
  ```tsx
  const resolvedComponent = await AsyncServerComponent();
  render(resolvedComponent);
  ```
- Ensure to properly mock Next.js server-side functions like `next/headers`, `next/navigation`, and auth session calls using `vi.mock()`.

### 3.4 Documentation & Comments
- **All functions must have JSDoc comments.** 
- Based on global project guidelines, **JSDoc comments must be written in Korean.**

## 4. Database & Schema Management
- When modifying the schema, update `src/db/schema.ts` and ensure you run `npx drizzle-kit push` to apply the changes to the database.
- Maintain the 4 core tables required for Better Auth integration: `user`, `session`, `account`, and `verification`.

## 5. Writing and Executing Implementation Plans
- Before starting work on any item from `@docs/ROADMAP.md`, you must create a detailed implementation plan document in markdown format under the `@docs/superpowers/plans/` directory.
- Use checkboxes (`- [ ]`) to track progress within the plan document.
- All implementation work must strictly follow the steps defined in the plan.

## 6. Updating Progress
- Upon completing a task or a phase:
    1. Update the checkboxes in the corresponding implementation plan in `@docs/superpowers/plans/`.
    2. Update the progress status and checkboxes in `@docs/ROADMAP.md`.
- Ensure all related documentation is synchronized with the actual state of the codebase.

---
**Note to Agent:** Always keep the TDD, roadmap-based planning, and architectural rules defined in this file (`AGENTS.md`) in mind before changing or adding any code.
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

## 3. Development Workflow

### 3.1 Test-Driven Development (TDD) Requirement
- **Strictly adhere to the Red-Green-Refactor cycle.**
- When developing new features or fixing bugs, you must FIRST write a **failing test (Red)** and run it to verify that it fails correctly.
- Afterward, write the minimum amount of code required to pass the test (Green), and perform refactoring if necessary.
- Test files must be co-located with the implementation files in the `src` directory (e.g., `src/app/page.test.tsx`), NOT in a separate `__tests__` folder.

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

## 4. Database & Schema Management
- When modifying the schema, update `src/db/schema.ts` and ensure you run `npx drizzle-kit push` to apply the changes to the database.
- Maintain the 4 core tables required for Better Auth integration: `user`, `session`, `account`, and `verification`.

## 5. Writing and Executing Implementation Plans
- Before implementing new features, create an implementation plan document in markdown format under the `@docs/superpowers/plans/` directory. Use checkboxes to track progress.
- All implementation work must strictly follow the steps defined in the plan.

---
**Note to Agent:** Always keep the TDD and architectural rules defined in this file (`AGENTS.md`) in mind before changing or adding any code.
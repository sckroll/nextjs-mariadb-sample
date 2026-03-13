# ReadLog Development Roadmap

This document tracks the high-level progress of the ReadLog project and outlines the upcoming tasks based on the Product Requirements Document (PRD) and Technical Requirements Document (TRD).

## ✅ Phase 1: Project Infrastructure & Authentication (Completed)
- [x] Initial Next.js App Router setup
- [x] Database configuration (MariaDB + Drizzle ORM)
- [x] Define core database schemas (`user`, `session`, `books`, `notes`, etc.)
- [x] Integrate Better Auth for email/password authentication
- [x] Create login and registration pages
- [x] Setup Tailwind CSS v4 for styling
- [x] Implement TDD workflow with Vitest and React Testing Library

## ✅ Phase 2: Core Domain Logic - Part 1 (Completed)
- [x] Server actions and Zod validation for Book creation
- [x] Base Dashboard UI layout with Navigation
- [x] `AddBookForm` UI component with Vitest tests
- [x] Connect `AddBookForm` to actual server actions

## ✅ Phase 3: Book Management & Dashboard (Completed)
- [x] **Dashboard Book List:** Fetch and display the user's books on the dashboard.
- [x] **Book Detail Page:** A dedicated page (`/dashboard/books/[id]`) to view full book details.
- [x] **Delete Book:** Allow users to delete a book from their library.
- [x] **Edit Book:** Allow users to update book info.
- [x] **Search & Filter:** Implement UI to filter books by status and search by title.

## ✅ Phase 4: Reading Progress & Notes (Completed)
- [x] **Reading Progress Tracking:**
  - UI to input current page number.
  - Calculate and display progress percentage based on `total_pages`.
  - Save progress logs to the `reading_progress` table.
- [x] **Reading Notes:**
  - Form to add a new note on the Book Detail page.
  - List notes specific to the selected book.
  - Delete existing notes.

## ✅ Interim Task: Book Status Constraints & Logic (Completed)
- [x] **WISH Status Restrictions:** Prevent progress updates when book is in `WISH` status.
- [x] **Progress Reset:** Reset all reading records when book status is changed back to `WISH` (with confirmation).

## ✅ Phase 5: Tagging System (Completed)
- [x] **Tag Management:** Create, edit, and delete user-specific tags (with colors).
- [x] **Assign Tags to Books:** UI to attach multiple tags to a single book.
- [x] **Filter by Tags:** Allow users to filter their library using selected tags.

## ✅ Phase 6: Statistics, Goals & Calendar (Completed)
- [x] **Monthly Statistics:** 
  - Calculate books read, pages read, and average rating for the current month.
  - Display charts or summary cards on a `/dashboard/statistics` page.
- [x] **Reading Goals:** 
  - UI to set monthly or yearly goals.
  - Show goal progress based on completed books or pages.
- [x] **Reading Calendar:**
  - Build a calendar view showing days with reading activity based on `reading_progress` logs.

## ✅ Interim Task: Account Management & Auth UX (Completed)
- [x] **Auth Redirection:** Redirect logged-in users from root and auth pages to dashboard.
- [x] **Enhanced Registration:** Add Name and Profile Image URL fields to registration form.
- [x] **Account Management:** 
  - Page to update Name and Profile Image.
  - Form to change password.
  - Logout functionality.

## ✅ Phase 7: Polish & Advanced Features (In Progress)
- [x] **Landing Page Redesign:** Implement responsive landing page based on Figma designs.
- [x] **Login Page Redesign:** Implement responsive login page based on Figma designs (without social login).
- [x] **Registration Page Redesign:** Implement responsive registration page based on Figma designs (without social login).
- [ ] Integrate Kakao Book Search API for automatic book info population.
- [ ] Responsive UI refinements for mobile devices.
- [ ] Performance optimizations (caching, index tuning).

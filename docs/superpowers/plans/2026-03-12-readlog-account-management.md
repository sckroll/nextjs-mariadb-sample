# ReadLog Implementation Plan - Account Management & Auth UX

> **For agentic workers:** REQUIRED: Use superpowers:subagent-driven-development (if subagents available) or superpowers:executing-plans to implement this plan. Steps use checkbox (`- [x]`) syntax for tracking.

**Goal:** Improve authentication UX by redirecting logged-in users, adding name and profile image to registration, and creating an account management page with logout functionality.

**Architecture:** 
- Use existing Better Auth schemas which already support `name` and `image`.
- Update `src/middleware.ts` for redirect logic.
- Client components for Registration and Account Management will use `authClient`.
- Implement TDD using Vitest with Korean test names.

**Tech Stack:** Next.js (App Router), Better Auth, React, Vitest, Tailwind CSS

---

## Chunk 1: Auth Redirection & Registration Updates

### Task 1: Middleware Redirection

**Files:**
- Modify: `src/middleware.ts`

- [x] **Step 1: Update middleware logic**
Modify `middleware.ts` to redirect to `/dashboard` if `sessionToken` exists and `pathname` is `/`, `/login`, or `/register`.
- [x] **Step 2: Commit**

### Task 2: Enhance Registration Form

**Files:**
- Modify: `src/app/(auth)/register/page.tsx`

- [x] **Step 1: Add Name and Profile Image input fields to UI**
- [x] **Step 2: Update `authClient.signUp.email` payload to include `name` and `image`**
- [x] **Step 3: Commit**

---

## Chunk 2: Account Management Page

### Task 3: Account Settings Form

**Files:**
- Create: `src/app/dashboard/account/page.test.tsx`
- Create: `src/app/dashboard/account/page.tsx`
- Modify: `src/app/dashboard/layout.tsx` (Add navigation link)

- [x] **Step 1: Write test for Account Page rendering**
Mock `auth.api.getSession` and check if Name, Image URL fields are populated, and Password change fields are present.
- [x] **Step 2: Implement Account Page UI**
Form 1: Update Profile (Name, Image).
Form 2: Change Password (Current Password, New Password).
Button: Logout.
- [x] **Step 3: Implement client-side logic using `authClient`**
Use `authClient.updateUser`, `authClient.changePassword`, and `authClient.signOut`.
- [x] **Step 4: Update `layout.tsx` to include a link to Account Page (계정 관리)**
- [x] **Step 5: Run tests and verify**
- [x] **Step 6: Commit**

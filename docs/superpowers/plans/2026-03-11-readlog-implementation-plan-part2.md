# ReadLog Implementation Plan - Part 2: Frontend & UI

> **For agentic workers:** REQUIRED: Use superpowers:subagent-driven-development (if subagents available) or superpowers:executing-plans to implement this plan. Steps use checkbox (`- [x]`) syntax for tracking.

**Goal:** Next.js와 Tailwind CSS를 설정하고 로그인, 회원가입 페이지 및 대시보드(서재)의 기본 UI를 구축한다.

**Architecture:** Next.js App Router 구조를 활용한다. Better Auth 클라이언트 라이브러리를 사용하여 프론트엔드 인증 처리를 구현하며, 서버 액션을 호출하는 클라이언트 컴포넌트를 구성한다.

**Tech Stack:** Next.js (App Router), Tailwind CSS v4, Better Auth Client, React Hook Form (or native forms)

---

## Chunk 1: Frontend Infrastructure Setup

### Task 1: Tailwind CSS 및 기본 레이아웃 구성

**Files:**
- Create: `src/app/globals.css`
- Create: `src/app/layout.tsx`
- Create: `src/app/page.tsx`

- [x] **Step 1: Tailwind CSS 관련 패키지 설치 (v4 적용 완료)**
- [x] **Step 2: Tailwind 설정 (v4 기반 @import 적용)**
- [x] **Step 3: 전역 CSS 추가**
- [x] **Step 4: Root Layout 및 Root Page 구성**
- [x] **Step 5: Commit**

---

## Chunk 2: Authentication UI

### Task 2: Better Auth Client 설정

**Files:**
- Create: `src/lib/auth-client.ts`

- [x] **Step 1: Auth Client 생성**
- [x] **Step 2: Commit**

### Task 3: 회원가입 (Register) 및 로그인 (Login) 페이지 구현

**Files:**
- Create: `src/app/(auth)/register/page.tsx`
- Create: `src/app/(auth)/login/page.tsx`

- [x] **Step 1: 회원가입 컴포넌트 작성**
- [x] **Step 2: 로그인 컴포넌트 작성**
- [x] **Step 3: Commit**

---

## Chunk 3: Dashboard Basic Layout

### Task 4: 대시보드 레이아웃과 서재 메인 화면 추가

**Files:**
- Create: `src/app/dashboard/layout.tsx`
- Create: `src/app/dashboard/page.tsx`

- [x] **Step 1: 대시보드 레이아웃 작성 (네비게이션 포함)**
- [x] **Step 2: 대시보드 메인 페이지 (서재 목록 뼈대) 작성**
- [x] **Step 3: Commit**

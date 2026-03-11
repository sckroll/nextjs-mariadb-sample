# ReadLog Implementation Plan

> **For agentic workers:** REQUIRED: Use superpowers:subagent-driven-development (if subagents available) or superpowers:executing-plans to implement this plan. Steps use checkbox (`- [x]`) syntax for tracking.

**Goal:** Next.js와 MariaDB를 활용하여 개인 독서 활동을 관리할 수 있는 ReadLog 웹 서비스(인증, 서재 관리, 노트, 진행률, 통계 등)의 기초를 구축한다.

**Architecture:** Next.js App Router 기반의 풀스택 아키텍처를 구성한다. Drizzle ORM을 통해 MariaDB와 통신하고, Better Auth를 사용해 인증 및 세션을 관리한다. 비즈니스 로직은 Server Actions 및 Route Handlers로 처리하며, 클라이언트와 서버 컴포넌트를 적절히 분리해 렌더링을 최적화한다.

**Tech Stack:** Next.js (App Router), MariaDB, Drizzle ORM, Better Auth, Tailwind CSS, Zod, bcrypt

---

## Chunk 1: Database Setup & Drizzle ORM Schema

### Task 1: 데이터베이스 연결 설정 및 스키마 정의 (Users & Books)

**Files:**
- Create: `src/db/index.ts`
- Create: `src/db/schema.ts`
- Create: `drizzle.config.ts`
- Modify: `.env` (환경변수 템플릿용)

- [x] **Step 1: 스키마 파일 생성 및 `users`, `books` 테이블 정의**
- [x] **Step 2: Drizzle ORM DB 연결 인스턴스 생성**
- [x] **Step 3: Drizzle Config 설정**
- [x] **Step 4: 스키마 생성(마이그레이션) 실행 스크립트 추가 및 DB 마이그레이션 검증**
- [x] **Step 5: Commit**

### Task 2: 추가 스키마 정의 (Notes, Progress, Tags, Goals)

**Files:**
- Modify: `src/db/schema.ts`

- [x] **Step 1: `notes` 및 `reading_progress` 스키마 추가**
- [x] **Step 2: `tags`, `book_tags`, `goals` 스키마 추가**
- [x] **Step 3: DB 마이그레이션 적용**
- [x] **Step 4: Commit**

---

## Chunk 2: Authentication System (Better Auth)

### Task 3: Better Auth 구성 및 API 설정

**Files:**
- Create: `src/lib/auth.ts`
- Create: `src/app/api/auth/[...all]/route.ts`

- [x] **Step 1: `auth.ts`에 Better Auth 인스턴스 생성**
- [x] **Step 2: Auth Route Handler 생성**
- [x] **Step 3: Commit**

### Task 4: Middleware 및 Auth 라우트 보호

**Files:**
- Create: `src/middleware.ts`

- [x] **Step 1: Next.js 미들웨어 작성**
- [x] **Step 2: Commit**

---

## Chunk 3: Books Management

### Task 5: 책 등록/수정을 위한 Zod Validation 및 Server Action

**Files:**
- Create: `src/lib/validations/book.ts`
- Create: `src/actions/book.ts`

- [x] **Step 1: Zod 스키마 작성**
- [x] **Step 2: 책 등록/수정/삭제 Server Action 구현**
- [x] **Step 3: Commit**

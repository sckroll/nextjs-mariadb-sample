# ReadLog Implementation Plan - Phase 5: Tagging System

> **For agentic workers:** REQUIRED: Use superpowers:subagent-driven-development (if subagents available) or superpowers:executing-plans to implement this plan. Steps use checkbox (`- [x]`) syntax for tracking.

**Goal:** Implement a tagging system allowing users to create custom tags, assign them to books, and filter their library by tags.

**Architecture:** 
- `tags` table for global tag definitions per user.
- `book_tags` junction table for many-to-many relationships.
- Server actions for Tag CRUD and mapping logic.
- UI components for tag management and selection.
- Update library query to support multi-tag filtering.

**Tech Stack:** Next.js (App Router), Drizzle ORM, Vitest, React Testing Library, Tailwind CSS

---

## Chunk 1: Tag CRUD Operations

### Task 1: Tag Server Actions

**Files:**
- Create: `src/actions/tag.ts`
- Create: `src/actions/tag.test.ts`

- [x] **Step 1: 태그 생성, 조회, 삭제 기능에 대한 실패하는 테스트 작성**
- [x] **Step 2: 테스트를 통과하기 위한 최소한의 서버 액션 구현 (JSDoc 포함)**
- [x] **Step 3: 테스트 실행 및 통과 확인**
- [x] **Step 4: Commit**

### Task 2: Tag Management UI

**Files:**
- Create: `src/components/tags/TagManager.tsx`
- Create: `src/components/tags/TagManager.test.tsx`

- [x] **Step 1: 태그 관리 UI(목록 표시, 추가 폼) 테스트 작성**
- [x] **Step 2: `TagManager` 컴포넌트 구현**
- [x] **Step 3: 대시보드 또는 설정 페이지에 통합 (임시로 대시보드 상단)**

---

## Chunk 2: Book-Tag Mapping

### Task 3: Book-Tag Relationship Actions

**Files:**
- Modify: `src/actions/tag.ts`
- Modify: `src/actions/tag.test.ts`

- [x] **Step 1: 도서에 태그 할당 및 조회 기능 테스트 작성**
- [x] **Step 2: `assignTagsToBook`, `getBookTags` 서버 액션 구현**
- [x] **Step 3: 테스트 확인 및 커밋**

### Task 4: Tag Selection in Book Form

**Files:**
- Modify: `src/components/books/BookForm.tsx`
- Modify: `src/components/books/BookForm.test.tsx`

- [x] **Step 1: 도서 등록/수정 폼에서 태그를 선택할 수 있도록 UI 수정**
- [x] **Step 2: 저장 시 선택된 태그 ID 목록을 서버 액션으로 전달**

---

## Chunk 3: Filtering & Display

### Task 5: Filter Books by Tag

**Files:**
- Modify: `src/actions/book.ts`
- Modify: `src/actions/book.test.ts`

- [x] **Step 1: `getBooks` 액션이 태그 ID 필터를 지원하도록 테스트 및 로직 업데이트**
- [x] **Step 2: 조인 쿼리를 사용하여 검색 성능 최적화**

### Task 6: Search & Filter UI Update

**Files:**
- Modify: `src/components/dashboard/SearchFilter.tsx`

- [x] **Step 1: 태그 선택 드롭다운(또는 배지 목록) 추가**
- [x] **Step 2: 선택된 태그를 URL 쿼리 파라미터(`tag`)와 연동**
- [x] **Step 3: 로드맵 및 진행 상황 업데이트**

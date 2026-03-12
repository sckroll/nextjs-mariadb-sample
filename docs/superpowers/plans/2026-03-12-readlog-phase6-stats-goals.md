# ReadLog Implementation Plan - Phase 6: Statistics, Goals & Calendar

> **For agentic workers:** REQUIRED: Use superpowers:subagent-driven-development (if subagents available) or superpowers:executing-plans to implement this plan. Steps use checkbox (`- [x]`) syntax for tracking.

**Goal:** Implement monthly reading statistics, a goal setting system, and an activity calendar.

**Architecture:** 
- Statistics will be computed via server actions using aggregate queries on `books` and `reading_progress` tables.
- A new `goals` table management system for CRUD and progress tracking.
- A calendar view generated from `reading_progress` timestamps.
- TDD will be strictly followed with Korean test names.

**Tech Stack:** Next.js (App Router), Drizzle ORM, Vitest, React Testing Library, Tailwind CSS

---

## Chunk 1: Monthly Statistics

### Task 1: Statistics Server Actions

**Files:**
- Create: `src/actions/statistics.ts`
- Create: `src/actions/statistics.test.ts`

- [x] **Step 1: 월별 통계 조회 기능(읽은 책 수, 읽은 페이지 수, 평균 평점)에 대한 실패하는 테스트 작성**
- [x] **Step 2: `getMonthlyStatistics` 서버 액션 구현 (JSDoc 포함)**
- [x] **Step 3: 테스트 실행 및 통과 확인**
- [x] **Step 4: Commit**

### Task 2: Statistics Page & UI

**Files:**
- Create: `src/app/dashboard/statistics/page.tsx`
- Create: `src/components/statistics/StatCard.tsx`

- [x] **Step 1: 통계 정보를 표시하는 대시보드 페이지 및 카드 컴포넌트 구현**
- [x] **Step 2: 월 선택(연도/월) 필터 추가**

---

## Chunk 2: Reading Goals

### Task 3: Goal Server Actions

**Files:**
- Create: `src/actions/goal.ts`
- Create: `src/actions/goal.test.ts`

- [x] **Step 1: 목표 생성, 조회, 삭제 기능 테스트 작성**
- [x] **Step 2: `createGoal`, `getGoals`, `deleteGoal` 서버 액션 구현**
- [x] **Step 3: 테스트 확인 및 커밋**

### Task 4: Goal Management UI

**Files:**
- Create: `src/components/goals/GoalManager.tsx`
- Create: `src/components/goals/GoalProgress.tsx`

- [x] **Step 1: 목표 설정 폼 및 진행률 표시 UI 구현**
- [x] **Step 2: 통계 페이지 하단 또는 별도 섹션에 통합**

---

## Chunk 3: Reading Calendar

### Task 5: Calendar Data Action

**Files:**
- Modify: `src/actions/statistics.ts`
- Modify: `src/actions/statistics.test.ts`

- [x] **Step 1: 특정 월의 날짜별 독서량(페이지) 조회 기능 테스트 및 구현**

### Task 6: Activity Calendar UI

**Files:**
- Create: `src/components/calendar/ReadingCalendar.tsx`
- Create: `src/app/dashboard/calendar/page.tsx`

- [x] **Step 1: 월간 달력 형태의 독서 활동 시각화 컴포넌트 구현**
- [x] **Step 2: 로드맵 완료 처리 및 최종 검업**

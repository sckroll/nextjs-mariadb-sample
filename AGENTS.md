# ReadLog AI Agent Guidelines

이 문서는 AI 에이전트(Gemini, Claude 등)가 ReadLog 프로젝트를 개발할 때 반드시 지켜야 할 가이드라인을 정의합니다.

## 1. 프로젝트 개요 (Project Context)
- **프로젝트명:** ReadLog
- **목표:** 사용자의 개인 독서 활동 기록, 관리 및 통계 웹 서비스 구축
- **핵심 기능:** 사용자 인증, 독서 상태 및 진행률 관리, 독서 노트, 캘린더 및 월별 통계

## 2. 기술 스택 (Tech Stack)
- **Framework:** Next.js (App Router)
- **Styling:** Tailwind CSS v4
- **Database:** MariaDB
- **ORM:** Drizzle ORM
- **Authentication:** Better Auth (email/password)
- **Validation:** Zod
- **Testing:** Vitest, React Testing Library

## 3. 개발 워크플로우 (Development Workflow)

### 3.1 Test-Driven Development (TDD) 필수 적용
- **Red-Green-Refactor 사이클을 엄격히 준수합니다.**
- 기능 개발 또는 버그 수정 시 **무조건 실패하는 테스트(Red)**를 먼저 작성하고 실행하여 실패를 확인해야 합니다.
- 그 후, 테스트를 통과하기 위한 최소한의 코드(Green)를 작성하고, 필요시 리팩토링(Refactor)을 진행합니다.
- 테스트 파일은 `__tests__` 폴더가 아닌, 코드가 위치한 `src` 하위의 **동일한 디렉토리**에 `.test.ts` 또는 `.test.tsx` 형태로 위치시킵니다. (예: `src/app/page.test.tsx`)

### 3.2 Git Commit 규칙
- 커밋은 기능(feature), 수정(fix), 테스트(test), 설정(chore) 등 논리적인 단위로 분리하여 진행합니다.
- 영문 메시지로 간결하고 명확하게 작성합니다.
- 예: `feat: add book validation logic`, `test: implement TDD for book registration`

## 4. 데이터베이스 및 스키마 관리
- 스키마 변경 시 `src/db/schema.ts`를 수정하고, 반드시 `npx drizzle-kit push`를 실행하여 DB에 반영해야 합니다.
- Better Auth 연동을 위해 `user`, `session`, `account`, `verification` 4개의 핵심 테이블을 유지합니다.

## 5. 작업 플랜 작성 및 실행
- 새로운 기능 구현 시 `@docs/superpowers/plans/` 경로에 Markdown 형태의 작업 플랜을 생성하고 체크박스 형태로 진행 상황을 추적합니다.
- 모든 작업은 플랜에 명시된 단계를 기반으로 진행합니다.

---
**Note to Agent:** 코드를 변경하거나 추가하기 전에 항상 이 파일(`AGENTS.md`)의 TDD 및 아키텍처 규칙을 염두에 두고 진행하세요.
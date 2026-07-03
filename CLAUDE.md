@AGENTS.md

# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## 프로젝트 개요

**볼링킹 (BowlingKing)** — 볼링 동호회(10~30명 규모) 홈페이지. 일정 공유, 경기 결과/통계 관리, 회원 커뮤니티를 위한 온라인 허브.

스택: **Next.js 16 (App Router) + TypeScript + Tailwind CSS v4**, **Vercel** 배포, 회원 점수·갤러리 데이터는 **Firebase Firestore** (Admin SDK, 서버 컴포넌트에서 조회), 갤러리 사진 파일은 **Vercel Blob**.

참고 자료:
- `docs/기획서.docx` — 원본 기획서
- `public/logo.png` — 로고 에셋

## 개발 명령어

- `npm run dev` — 개발 서버 (Turbopack)
- `npm run build` — 프로덕션 빌드
- `npm run lint` — ESLint 검사

## 규칙

- 모든 답변은 한국어로 작성
- 커밋 메시지는 한국어로 작성
- 스타일링은 Tailwind CSS만 사용 (별도 CSS 파일/CSS-in-JS 지양)
- 모바일 반응형 필수 (경기장에서 스마트폰으로 점수 입력/조회하는 시나리오 고려)
- 컴포넌트는 `src/components` 폴더에 생성

## 디자인

- 메인 컬러: 네이비 `#1e3a5f` + 오렌지 `#ff6b35` (Tailwind 유틸리티명: `navy` / `ember`, `src/app/globals.css`의 `@theme` 블록에 정의)
- 키워드: 역동적, 친근함, 깔끔함
- 폰트: Noto Sans KR(본고딕 계열) / Inter(영문)
- 다크모드 고려

## 아키텍처 메모 (Next.js 16 관련)

- Tailwind v4를 사용하므로 `tailwind.config.ts`가 **없음** — 테마 커스터마이징은 `src/app/globals.css`의 `@theme` 블록에서 CSS 커스텀 프로퍼티로 정의.
- `params`/`searchParams`는 Promise 기반이므로 `await` 필요 (동적 라우트 추가 시 유의).
- Firestore 데이터를 매 요청마다 새로 읽는 페이지(`/scores`, `/gallery`)는 `export const dynamic = 'force-dynamic'`로 명시.
- Firebase Admin SDK 초기화(`src/lib/firebase/admin.ts`)는 서버 전용 — 클라이언트 컴포넌트에서 import 금지.

## 관리자 기능 (`/admin`)

운영진이 콘솔에 들어가지 않고 홈페이지에서 직접 갤러리 사진과 회원 점수를 관리할 수 있는 기능.

- **인증**: 운영진 공용 비밀번호 1개(`ADMIN_PASSWORD`) + HMAC 서명 세션 쿠키(`src/lib/auth/session.ts`, `src/lib/auth/require-admin.ts`). 별도 인증 라이브러리 없이 Node `crypto`만 사용. Google 로그인 등 사용자별 인증은 도입하지 않음(운영진 수가 적어 과한 복잡도로 판단).
- **라우트**: `/admin/login`(공개)과 `/admin`, `/admin/gallery`, `/admin/scores`(`(protected)` 라우트 그룹, `requireAdminSession()`으로 게이트) — 그룹명은 URL에 나타나지 않음.
- **쓰기 경로는 전부 서버 액션**(`src/app/admin/(protected)/*/actions.ts`)이며, 각 액션 최상단에서 반드시 `requireAdminSession()`을 호출 — 서버 액션은 UI 없이도 직접 호출 가능한 엔드포인트이므로 페이지 보호만으로는 불충분.
- **갤러리 사진**: 업로드 시 `@vercel/blob`의 `put()`으로 파일 저장 후 URL을 Firestore `gallery` 컬렉션에 기록 (`src/lib/firebase/gallery.ts`). 삭제 시 Firestore 문서와 Blob 파일을 함께 제거. 기존의 정적 `gallery-data.ts`는 제거됨 — 갤러리는 이제 전부 Firestore 기반.
- **회원 점수**: `src/lib/firebase/scores.ts`의 `upsertMember`/`deleteMember`로 `members` 컬렉션 직접 CRUD.
- 신규 환경변수: `ADMIN_PASSWORD`, `ADMIN_SESSION_SECRET`, `BLOB_READ_WRITE_TOKEN` (`.env.local.example` 참고).

## 기능 (기획서 기준, 우선순위순)

1. 🔴 동호회 소개 / 회원 모집 (가입 문의 폼)
2. 🔴 경기 일정 관리 (캘린더/리스트 뷰, 결과 입력, 레인 배정)
3. 🔴 통계 대시보드 (개인 점수 추이, 평균, 랭킹, 스트라이크/스페어율)
4. 🟡 회원 프로필 (사진, 볼링 이력, 장비, 개인 통계)
5. 🟡 커뮤니티 (공지사항, 자유게시판, 갤러리)
6. 🟢 관리자 기능 (회원 관리, 경기 데이터 입력, 공지 작성)

> MVP(1차 구현) 범위는 5개 페이지(메인/소개/갤러리/회원 점수 기록/가입 문의)로 한정. 일정 관리, 로그인, 관리자 기능, 커뮤니티는 다음 단계 과제.

### 사이트 구조 (IA, 전체 비전 — MVP 이후 확장분 포함)

| URL | 페이지 |
|---|---|
| `/` | 메인 홈 |
| `/about` | 동호회 소개 / 모집 안내 |
| `/gallery` | 활동 사진 갤러리 (Firestore + Vercel Blob 연동) |
| `/scores` | 회원 점수 기록 (Firestore 연동) |
| `/join` | 가입 문의 (가인볼링장 은평점 연락처 안내) |
| `/admin`, `/admin/gallery`, `/admin/scores` | 운영진 전용 관리 페이지 (비밀번호 로그인) |
| `/schedule`, `/schedule/{id}` | (확장) 경기 일정 목록 / 상세 |
| `/community` | (확장) 공지 / 자유글 |

### 회원 권한 체계 (확장 시 참고)

비회원 < 일반 회원 < 운영진 < 관리자 — 경기 결과/통계 열람, 커뮤니티 글 작성, 점수 입력, 회원 관리, 공지 작성 권한이 단계별로 부여됨. 상세는 `docs/기획서.docx` 4장 참고.

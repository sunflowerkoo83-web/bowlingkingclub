@AGENTS.md

# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## 프로젝트 개요

**볼링킹 (BowlingKing)** — 볼링 동호회(10~30명 규모) 홈페이지. 일정 공유, 경기 결과/통계 관리, 회원 커뮤니티를 위한 온라인 허브.

스택: **Next.js 16 (App Router) + TypeScript + Tailwind CSS v4**, **Vercel** 배포, 회원 프로필·갤러리 데이터는 **Firebase Firestore** (Admin SDK, 서버 컴포넌트에서 조회), 갤러리·회원 사진 파일은 **Vercel Blob**.

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

- 메인 컬러: 네이비 `#1e3a5f` + 오렌지 `#ff6b35` + 골드 포인트(`gold-300~600`, `#e0bf75` 계열) (Tailwind 유틸리티명: `navy` / `ember` / `gold`, `src/app/globals.css`의 `@theme` 블록에 정의)
- 각 공개 페이지 상단은 공용 `src/components/ui/PageHeader.tsx`(다크 네이비 배경 + 골드 eyebrow + 흰 제목)로 통일 — 새 공개 페이지 추가 시 이 패턴을 따를 것. 본문 영역은 가독성을 위해 밝은 배경 유지, 관리자 페이지는 이 톤을 적용하지 않음.
- 키워드: 역동적, 친근함, 고급스러움
- 폰트: Noto Sans KR(본고딕 계열) / Inter(영문) — 세리프 폰트는 시도했다가 피드백으로 되돌림, 고딕체로 통일 유지

## 아키텍처 메모 (Next.js 16 관련)

- Tailwind v4를 사용하므로 `tailwind.config.ts`가 **없음** — 테마 커스터마이징은 `src/app/globals.css`의 `@theme` 블록에서 CSS 커스텀 프로퍼티로 정의.
- `params`/`searchParams`는 Promise 기반이므로 `await` 필요 (동적 라우트 추가 시 유의).
- Firestore 데이터를 매 요청마다 새로 읽는 페이지(`/scores`, `/gallery`, `/community`)는 `export const dynamic = 'force-dynamic'`로 명시.
- Firebase Admin SDK 초기화(`src/lib/firebase/admin.ts`)는 서버 전용 — 클라이언트 컴포넌트에서 import 금지.
- `/gallery`의 유튜브 영상은 `src/lib/youtube.ts`에서 채널 RSS 피드(`youtube.com/feeds/videos.xml?channel_id=...`)를 파싱해 가져옴 — API 키 불필요, 채널에 새 영상이 올라오면 자동 반영.

## 관리자 기능 (`/admin`)

운영진이 콘솔에 들어가지 않고 홈페이지에서 직접 갤러리 사진과 회원 프로필을 관리할 수 있는 기능.

- **인증**: 운영진 공용 비밀번호 1개(`ADMIN_PASSWORD`) + HMAC 서명 세션 쿠키(`src/lib/auth/session.ts`, `src/lib/auth/require-admin.ts`). 별도 인증 라이브러리 없이 Node `crypto`만 사용. Google 로그인 등 사용자별 인증은 도입하지 않음(운영진 수가 적어 과한 복잡도로 판단).
- **라우트**: `/admin/login`(공개)과 `/admin`, `/admin/gallery`, `/admin/scores`, `/admin/community`(`(protected)` 라우트 그룹, `requireAdminSession()`으로 게이트) — 그룹명은 URL에 나타나지 않음.
- **쓰기 경로는 전부 서버 액션**(`src/app/admin/(protected)/*/actions.ts`)이며, 각 액션 최상단에서 반드시 `requireAdminSession()`을 호출 — 서버 액션은 UI 없이도 직접 호출 가능한 엔드포인트이므로 페이지 보호만으로는 불충분.
- **갤러리 사진**: 업로드 시 `@vercel/blob`의 `put()`으로 파일 저장 후 URL을 Firestore `gallery` 컬렉션에 기록 (`src/lib/firebase/gallery.ts`). 삭제 시 Firestore 문서와 Blob 파일을 함께 제거. 기존의 정적 `gallery-data.ts`는 제거됨 — 갤러리는 이제 전부 Firestore 기반.
- **회원 프로필**: `src/lib/firebase/scores.ts`의 `upsertMember`/`deleteMember`로 `members` 컬렉션 직접 CRUD. 이름/에버리지/하이스코어 외에 사진, 구력, 볼링스타일, 평균 구속·RPM, 장점/단점/특이사항까지 관리 (`src/lib/types.ts`의 `Member` 타입 참고). 프로필 사진도 갤러리와 동일하게 Vercel Blob에 업로드.
- 신규 환경변수: `ADMIN_PASSWORD`, `ADMIN_SESSION_SECRET`, `BLOB_READ_WRITE_TOKEN` (`.env.local.example` 참고).

## 커뮤니티 게시판 (`/community`)

로그인 없이 **누구나** 이름/제목/내용만 입력하면 글을 쓸 수 있는 공개 게시판 (사용자 요청으로 의도적으로 무인증 — 소규모 동호회 사이트라 스팸 위험보다 진입장벽 최소화를 우선). `src/app/community/actions.ts`의 `createPostAction`은 `requireAdminSession()` 없이 누구나 호출 가능한 유일한 쓰기 서버 액션.

- 기본적인 스팸 방지: 숨겨진 허니팟 필드(`website`, 사람 눈에는 안 보이지만 봇은 채우는 경우가 많음)와 글자 수 제한만 적용. reCAPTCHA 등 외부 서비스는 도입하지 않음.
- 모더레이션은 운영진 전용 `/admin/community`에서 삭제만 가능 (수정 기능 없음) — `src/lib/firebase/posts.ts`의 `deletePost`.
- 삭제 외 쓰기(작성)는 인증 없이 열려 있다는 점을 항상 염두에 둘 것 — 이 라우트에 새 서버 액션을 추가할 때 `requireAdminSession()`을 실수로 빼먹지 않도록 주의(반대로 `createPostAction`에는 의도적으로 없음).
- **공지사항**: 자유게시판과 달리 **운영진만 작성 가능** — `/community` 상단에 고정 노출, `/admin/community`에서 작성/삭제 (`src/lib/firebase/notices.ts`의 `addNotice`/`deleteNotice`, `createNoticeAction`/`deleteNoticeAction`은 자유게시판 액션과 같은 파일 `src/app/admin/(protected)/community/actions.ts`에 위치, 둘 다 `requireAdminSession()` 필수).

## 기능 (기획서 기준, 우선순위순)

1. 🔴 동호회 소개 / 회원 모집 (가입 문의 폼)
2. 🔴 경기 일정 관리 (캘린더/리스트 뷰, 결과 입력, 레인 배정)
3. 🔴 통계 대시보드 (개인 점수 추이, 평균, 랭킹, 스트라이크/스페어율)
4. 🟡 회원 프로필 (사진, 볼링 이력, 장비, 개인 통계) — `/scores`에서 구현 완료
5. 🟡 커뮤니티 (공지사항 + 자유게시판) — `/community`에서 구현 완료 (갤러리 통합은 미구현, 갤러리는 별도 `/gallery`)
6. 🟢 관리자 기능 (회원 관리, 경기 데이터 입력, 공지 작성) — 회원 프로필/갤러리/게시판/공지사항 관리 모두 구현 완료

> MVP 범위(메인/소개/갤러리/회원 프로필/가입 문의) + 커뮤니티 게시판까지 구현 완료. 경기 일정 관리는 다음 단계 과제.

### 사이트 구조 (IA, 전체 비전 — MVP 이후 확장분 포함)

| URL | 페이지 |
|---|---|
| `/` | 메인 홈 |
| `/about` | 동호회 소개 / 모집 안내 |
| `/gallery` | 활동 사진 갤러리 (Firestore + Vercel Blob) + 유튜브 재생목록/영상 그리드 |
| `/scores` | 회원 프로필 (사진/구력/스타일/기록, Firestore + Vercel Blob 연동) |
| `/community` | 공지사항(운영진 작성, 고정 노출) + 자유게시판(로그인 없이 누구나 작성), Firestore 연동 |
| `/join` | 가입 문의 (가인볼링장 은평점 연락처 안내) |
| `/admin`, `/admin/gallery`, `/admin/scores`, `/admin/community` | 운영진 전용 관리 페이지 (비밀번호 로그인) |
| `/schedule`, `/schedule/{id}` | (확장) 경기 일정 목록 / 상세 |

### 회원 권한 체계 (확장 시 참고)

비회원 < 일반 회원 < 운영진 < 관리자 — 경기 결과/통계 열람, 커뮤니티 글 작성, 점수 입력, 회원 관리, 공지 작성 권한이 단계별로 부여됨. 상세는 `docs/기획서.docx` 4장 참고.

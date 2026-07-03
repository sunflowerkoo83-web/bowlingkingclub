import type { NavLink } from "@/lib/types";

export const SITE_NAME = "볼링킹";
export const SITE_NAME_EN = "BowlingKing";

export const NAV_LINKS: NavLink[] = [
  { href: "/", label: "홈" },
  { href: "/about", label: "소개" },
  { href: "/gallery", label: "갤러리" },
  { href: "/scores", label: "점수 기록" },
  { href: "/join", label: "가입 문의" },
];

// TODO: 실제 은평가인볼링센터 연락처(전화번호)로 교체해 주세요.
export const BOWLING_CENTER = {
  name: "은평가인볼링센터",
  phone: "02-000-0000",
  address: "서울특별시 은평구 (상세 주소 입력 필요)",
};

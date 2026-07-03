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

export const BOWLING_CENTER = {
  name: "가인볼링장 은평점",
  phone: "02-6975-5329",
  address: "서울 은평구 통일로 1050 롯데몰 4층",
};

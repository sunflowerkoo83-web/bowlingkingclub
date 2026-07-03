import type { NavLink } from "@/lib/types";

export const SITE_NAME = "볼링킹";
export const SITE_NAME_EN = "BowlingKing";

export const NAV_LINKS: NavLink[] = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/notices", label: "Notices" },
  { href: "/gallery", label: "Gallery" },
  { href: "/scores", label: "Members" },
  { href: "/community", label: "Community" },
  { href: "/join", label: "Join" },
];

export const BOWLING_CENTER = {
  name: "가인볼링장 은평점",
  phone: "02-6975-5329",
  address: "서울 은평구 통일로 1050 롯데몰 4층",
};

export const YOUTUBE_URL = "https://www.youtube.com/@Bowlingking-jjun";
export const YOUTUBE_CHANNEL_ID = "UCUfU44CQ5obQAqSFgdjT7zw";
// 채널 UC ID의 "UC"를 "UU"로 바꾸면 업로드 전체 재생목록 ID가 됨
export const YOUTUBE_UPLOADS_PLAYLIST_ID = "UUUfU44CQ5obQAqSFgdjT7zw";

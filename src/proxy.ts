import { NextResponse } from "next/server";
import type { NextFetchEvent, NextRequest } from "next/server";
import { recordVisit, visitDateKey } from "@/lib/firebase/visits";

const VISIT_COOKIE = "bk_visited";

export function proxy(request: NextRequest, event: NextFetchEvent) {
  const today = visitDateKey();
  const response = NextResponse.next();

  if (request.cookies.get(VISIT_COOKIE)?.value !== today) {
    response.cookies.set(VISIT_COOKIE, today, {
      path: "/",
      maxAge: 60 * 60 * 24,
      sameSite: "lax",
    });
    // 방문 집계 실패가 페이지 렌더링을 막지 않도록 백그라운드로 처리
    event.waitUntil(recordVisit(today).catch(() => {}));
  }

  return response;
}

export const config = {
  matcher: [
    "/((?!admin|api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)",
  ],
};

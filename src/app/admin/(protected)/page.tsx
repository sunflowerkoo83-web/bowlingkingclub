import type { Metadata } from "next";
import Link from "next/link";
import Card from "@/components/ui/Card";
import { getRecentVisitStats } from "@/lib/firebase/visits";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "관리자 대시보드 | 볼링킹",
};

const SECTIONS = [
  {
    href: "/admin/gallery",
    title: "갤러리 관리",
    description: "활동 사진을 업로드하거나 삭제합니다.",
  },
  {
    href: "/admin/scores",
    title: "회원 프로필 관리",
    description: "회원 사진, 구력, 스타일, 기록 등을 추가·수정·삭제합니다.",
  },
  {
    href: "/admin/community",
    title: "게시판 관리",
    description: "회원들이 자유롭게 쓴 글을 확인하고 스팸/부적절한 글을 삭제합니다.",
  },
];

const WEEKDAY_LABELS = ["일", "월", "화", "수", "목", "금", "토"];

export default async function AdminDashboardPage() {
  const days = await getRecentVisitStats(7);
  const today = days[days.length - 1];
  const maxCount = Math.max(1, ...days.map((d) => d.count));

  return (
    <div>
      <h1 className="text-2xl font-black text-navy-600">관리자 대시보드</h1>

      <Card className="mt-6">
        <div className="flex items-baseline justify-between">
          <h2 className="font-bold text-navy-600">오늘 방문자 수</h2>
          <p className="text-3xl font-black text-ember-600">
            {today?.count ?? 0}
            <span className="ml-1 text-sm font-medium text-navy-600/60">명</span>
          </p>
        </div>

        <div className="mt-6 flex items-end gap-3">
          {days.map((day) => {
            const date = new Date(`${day.date}T00:00:00+09:00`);
            const heightPct = (day.count / maxCount) * 100;
            return (
              <div key={day.date} className="flex flex-1 flex-col items-center gap-2">
                <div className="flex h-24 w-full items-end justify-center">
                  <div
                    className="w-full max-w-8 rounded-t bg-ember-600"
                    style={{ height: `${Math.max(heightPct, 4)}%` }}
                    title={`${day.date} 방문 ${day.count}명`}
                  />
                </div>
                <span className="text-xs font-medium text-navy-600">{day.count}</span>
                <span className="text-xs text-navy-600/60">
                  {WEEKDAY_LABELS[date.getDay()]}
                </span>
              </div>
            );
          })}
        </div>
      </Card>

      <div className="mt-4 grid gap-4 sm:grid-cols-2">
        {SECTIONS.map((section) => (
          <Link key={section.href} href={section.href} className="block">
            <Card className="h-full transition-shadow hover:shadow-md">
              <h2 className="font-bold text-navy-600">{section.title}</h2>
              <p className="mt-2 text-sm text-navy-600/80">{section.description}</p>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}

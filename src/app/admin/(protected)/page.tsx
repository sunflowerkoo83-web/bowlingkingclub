import type { Metadata } from "next";
import Link from "next/link";
import Card from "@/components/ui/Card";

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
];

export default function AdminDashboardPage() {
  return (
    <div>
      <h1 className="text-2xl font-black text-navy-600">관리자 대시보드</h1>
      <div className="mt-6 grid gap-4 sm:grid-cols-2">
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

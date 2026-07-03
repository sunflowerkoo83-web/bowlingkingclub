import type { Metadata } from "next";
import Section from "@/components/ui/Section";
import PageHeader from "@/components/ui/PageHeader";
import NoticeList from "@/components/community/NoticeList";
import EmptyState from "@/components/ui/EmptyState";
import ErrorState from "@/components/ui/ErrorState";
import { getNotices } from "@/lib/firebase/notices";

export const metadata: Metadata = {
  title: "Notices | BowlingKing",
};

export const dynamic = "force-dynamic";

export default async function NoticesPage() {
  const result = await getNotices();

  return (
    <>
      <PageHeader
        eyebrow="Announcements"
        title="Notices"
        description="볼링킹 운영진이 전하는 공지사항을 확인하세요."
      />
      <Section>
        {result.status === "ok" && <NoticeList notices={result.notices} />}
        {result.status === "empty" && (
          <EmptyState
            title="아직 등록된 공지사항이 없습니다."
            description="새 소식이 있으면 이곳에 안내해 드릴게요."
          />
        )}
        {result.status === "error" && <ErrorState title="공지사항을 불러오지 못했습니다." />}
      </Section>
    </>
  );
}

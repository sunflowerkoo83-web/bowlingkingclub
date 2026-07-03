import type { Metadata } from "next";
import Section from "@/components/ui/Section";
import PageHeader from "@/components/ui/PageHeader";
import MemberProfileGrid from "@/components/scores/MemberProfileGrid";
import EmptyState from "@/components/ui/EmptyState";
import ErrorState from "@/components/ui/ErrorState";
import { getMemberScores } from "@/lib/firebase/scores";

export const metadata: Metadata = {
  title: "Members | BowlingKing",
};

export const dynamic = "force-dynamic";

export default async function ScoresPage() {
  const result = await getMemberScores();

  return (
    <>
      <PageHeader
        eyebrow="Meet the Team"
        title="Members"
        description="볼링킹 회원들의 구력, 스타일, 기록을 소개합니다."
      />
      <Section>
        {result.status === "ok" && <MemberProfileGrid members={result.members} />}
        {result.status === "empty" && (
          <EmptyState
            title="아직 등록된 회원 프로필이 없습니다."
            description="회원 정보가 입력되면 이곳에서 소개를 확인할 수 있어요."
          />
        )}
        {result.status === "error" && <ErrorState title="회원 프로필을 불러오지 못했습니다." />}
      </Section>
    </>
  );
}

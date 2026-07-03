import type { Metadata } from "next";
import Section from "@/components/ui/Section";
import ScoreTable from "@/components/scores/ScoreTable";
import EmptyState from "@/components/ui/EmptyState";
import ErrorState from "@/components/ui/ErrorState";
import { getMemberScores } from "@/lib/firebase/scores";

export const metadata: Metadata = {
  title: "회원 점수 기록 | 볼링킹",
};

export const dynamic = "force-dynamic";

export default async function ScoresPage() {
  const result = await getMemberScores();

  return (
    <Section>
      <h1 className="text-3xl font-black text-navy-600 sm:text-4xl">
        회원 점수 기록
      </h1>
      <p className="mt-3 max-w-2xl text-navy-600/80">
        회원별 에버리지와 하이스코어를 에버리지 순으로 확인할 수 있어요.
      </p>

      <div className="mt-10">
        {result.status === "ok" && <ScoreTable members={result.members} />}
        {result.status === "empty" && (
          <EmptyState
            title="아직 등록된 기록이 없습니다."
            description="경기 결과가 입력되면 이곳에서 회원별 점수를 확인할 수 있어요."
          />
        )}
        {result.status === "error" && <ErrorState title="점수 기록을 불러오지 못했습니다." />}
      </div>
    </Section>
  );
}

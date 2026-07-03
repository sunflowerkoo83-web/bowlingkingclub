import type { Metadata } from "next";
import Section from "@/components/ui/Section";
import ScoreTable from "@/components/scores/ScoreTable";
import ScoreEmptyState from "@/components/scores/ScoreEmptyState";
import ScoreErrorState from "@/components/scores/ScoreErrorState";
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
        {result.status === "empty" && <ScoreEmptyState />}
        {result.status === "error" && <ScoreErrorState />}
      </div>
    </Section>
  );
}

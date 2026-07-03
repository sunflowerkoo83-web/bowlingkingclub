import type { Metadata } from "next";
import MemberForm from "@/components/admin/MemberForm";
import MemberManageTable from "@/components/admin/MemberManageTable";
import ErrorState from "@/components/ui/ErrorState";
import { getMemberScores } from "@/lib/firebase/scores";

export const metadata: Metadata = {
  title: "회원 프로필 관리 | 볼링킹",
};

export const dynamic = "force-dynamic";

export default async function AdminScoresPage() {
  const result = await getMemberScores();
  const members = result.status === "ok" ? result.members : [];

  return (
    <div>
      <h1 className="text-2xl font-black text-navy-600">회원 프로필 관리</h1>

      <div className="mt-6 rounded-2xl border border-navy-100 p-6">
        <h2 className="mb-4 font-bold text-navy-600">회원 추가</h2>
        <MemberForm />
      </div>

      <div className="mt-10">
        <h2 className="mb-4 font-bold text-navy-600">회원 목록 ({members.length})</h2>
        {result.status === "error" ? (
          <ErrorState title="회원 목록을 불러오지 못했습니다." />
        ) : (
          <MemberManageTable members={members} />
        )}
      </div>
    </div>
  );
}

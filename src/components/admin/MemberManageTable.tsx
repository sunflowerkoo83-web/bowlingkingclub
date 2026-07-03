"use client";

import { useState } from "react";
import { deleteMemberAction } from "@/app/admin/(protected)/scores/actions";
import ConfirmSubmitButton from "@/components/admin/ConfirmSubmitButton";
import MemberForm from "@/components/admin/MemberForm";
import type { Member } from "@/lib/types";

export default function MemberManageTable({ members }: { members: Member[] }) {
  const [editingId, setEditingId] = useState<string | null>(null);

  if (members.length === 0) {
    return <p className="text-sm text-navy-600/70">등록된 회원이 없습니다.</p>;
  }

  return (
    <div className="space-y-3">
      {members.map((member) =>
        editingId === member.id ? (
          <div key={member.id} className="rounded-xl border border-ember-100 p-4">
            <MemberForm member={member} onDone={() => setEditingId(null)} />
            <button
              type="button"
              onClick={() => setEditingId(null)}
              className="mt-3 text-xs text-navy-600/70 underline"
            >
              취소
            </button>
          </div>
        ) : (
          <div
            key={member.id}
            className="flex items-center justify-between gap-4 rounded-xl border border-navy-100 p-4"
          >
            <div>
              <p className="font-semibold text-navy-600">{member.name}</p>
              <p className="text-sm text-navy-600/70">
                에버리지 {member.average} · 하이스코어 {member.highScore}
                {member.gamesPlayed !== undefined ? ` · ${member.gamesPlayed}게임` : ""}
              </p>
            </div>
            <div className="flex shrink-0 gap-2">
              <button
                type="button"
                onClick={() => setEditingId(member.id)}
                className="min-h-[44px] rounded-full border border-navy-600 px-3 text-xs font-semibold text-navy-600 hover:bg-navy-50"
              >
                수정
              </button>
              <form action={deleteMemberAction}>
                <input type="hidden" name="id" value={member.id} />
                <ConfirmSubmitButton
                  confirmMessage={`${member.name} 회원을 삭제할까요?`}
                  className="min-h-[44px] rounded-full border border-ember-600 px-3 text-xs font-semibold text-ember-600 hover:bg-ember-50"
                >
                  삭제
                </ConfirmSubmitButton>
              </form>
            </div>
          </div>
        )
      )}
    </div>
  );
}

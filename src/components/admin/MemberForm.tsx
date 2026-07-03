"use client";

import { useActionState, useRef } from "react";
import {
  upsertMemberAction,
  type MemberFormState,
} from "@/app/admin/(protected)/scores/actions";
import Button from "@/components/ui/Button";
import type { Member } from "@/lib/types";

const initialState: MemberFormState = {};

export default function MemberForm({
  member,
  onDone,
}: {
  member?: Member;
  onDone?: () => void;
}) {
  const formRef = useRef<HTMLFormElement>(null);

  const [state, formAction, isPending] = useActionState(
    async (prevState: MemberFormState, formData: FormData) => {
      const result = await upsertMemberAction(prevState, formData);
      if (!result.error) {
        if (member) {
          onDone?.();
        } else {
          formRef.current?.reset();
        }
      }
      return result;
    },
    initialState
  );

  return (
    <form ref={formRef} action={formAction} className="grid gap-3 sm:grid-cols-2">
      {member?.id && <input type="hidden" name="id" value={member.id} />}

      <div className="sm:col-span-2">
        <label className="block text-sm font-medium text-navy-600">이름</label>
        <input
          name="name"
          type="text"
          required
          defaultValue={member?.name}
          className="mt-1 min-h-[44px] w-full rounded-lg border border-navy-100 px-4 text-navy-600 focus:border-ember-600 focus:outline-none"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-navy-600">에버리지</label>
        <input
          name="average"
          type="number"
          step="0.1"
          required
          defaultValue={member?.average}
          className="mt-1 min-h-[44px] w-full rounded-lg border border-navy-100 px-4 text-navy-600 focus:border-ember-600 focus:outline-none"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-navy-600">하이스코어</label>
        <input
          name="highScore"
          type="number"
          required
          defaultValue={member?.highScore}
          className="mt-1 min-h-[44px] w-full rounded-lg border border-navy-100 px-4 text-navy-600 focus:border-ember-600 focus:outline-none"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-navy-600">게임 수 (선택)</label>
        <input
          name="gamesPlayed"
          type="number"
          defaultValue={member?.gamesPlayed}
          className="mt-1 min-h-[44px] w-full rounded-lg border border-navy-100 px-4 text-navy-600 focus:border-ember-600 focus:outline-none"
        />
      </div>

      {state?.error && <p className="text-sm text-ember-700 sm:col-span-2">{state.error}</p>}

      <div className="sm:col-span-2">
        <Button type="submit" disabled={isPending}>
          {isPending ? "저장 중..." : member ? "수정 저장" : "회원 추가"}
        </Button>
      </div>
    </form>
  );
}

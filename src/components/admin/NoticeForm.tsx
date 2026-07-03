"use client";

import { useActionState, useRef } from "react";
import {
  createNoticeAction,
  type NoticeFormState,
} from "@/app/admin/(protected)/community/actions";
import Button from "@/components/ui/Button";

const initialState: NoticeFormState = {};

const inputClass =
  "mt-1 min-h-[44px] w-full rounded-lg border border-navy-100 px-4 text-navy-600 focus:border-ember-600 focus:outline-none";

export default function NoticeForm() {
  const formRef = useRef<HTMLFormElement>(null);

  const [state, formAction, isPending] = useActionState(
    async (prevState: NoticeFormState, formData: FormData) => {
      const result = await createNoticeAction(prevState, formData);
      if (!result.error) {
        formRef.current?.reset();
      }
      return result;
    },
    initialState
  );

  return (
    <form ref={formRef} action={formAction} className="space-y-3">
      <div>
        <label className="block text-sm font-medium text-navy-600">제목</label>
        <input name="title" type="text" required maxLength={100} className={inputClass} />
      </div>

      <div>
        <label className="block text-sm font-medium text-navy-600">내용</label>
        <textarea name="content" required maxLength={2000} rows={4} className={inputClass} />
      </div>

      {state?.error && <p className="text-sm text-ember-700">{state.error}</p>}

      <Button type="submit" disabled={isPending}>
        {isPending ? "등록 중..." : "공지 등록"}
      </Button>
    </form>
  );
}

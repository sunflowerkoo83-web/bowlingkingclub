"use client";

import { useActionState, useRef } from "react";
import { createPostAction, type PostFormState } from "@/app/community/actions";
import Button from "@/components/ui/Button";

const initialState: PostFormState = {};

const inputClass =
  "mt-1 min-h-[44px] w-full rounded-lg border border-navy-100 px-4 text-navy-600 focus:border-ember-600 focus:outline-none";

export default function PostForm() {
  const formRef = useRef<HTMLFormElement>(null);

  const [state, formAction, isPending] = useActionState(
    async (prevState: PostFormState, formData: FormData) => {
      const result = await createPostAction(prevState, formData);
      if (!result.error) {
        formRef.current?.reset();
      }
      return result;
    },
    initialState
  );

  return (
    <form
      ref={formRef}
      action={formAction}
      className="space-y-3 rounded-2xl border border-navy-100 p-6"
    >
      {/* 허니팟: 사람에게는 보이지 않고 스팸 봇만 채우는 필드 */}
      <input
        type="text"
        name="website"
        tabIndex={-1}
        autoComplete="off"
        className="hidden"
        aria-hidden="true"
      />

      <div>
        <label className="block text-sm font-medium text-navy-600">이름</label>
        <input name="name" type="text" required maxLength={30} className={inputClass} />
      </div>

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
        {isPending ? "등록 중..." : "글쓰기"}
      </Button>
    </form>
  );
}

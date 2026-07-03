"use client";

import { useActionState, useRef } from "react";
import {
  uploadGalleryImageAction,
  type UploadState,
} from "@/app/admin/(protected)/gallery/actions";
import Button from "@/components/ui/Button";

const initialState: UploadState = {};

export default function GalleryUploadForm() {
  const formRef = useRef<HTMLFormElement>(null);

  const [state, formAction, isPending] = useActionState(
    async (prevState: UploadState, formData: FormData) => {
      const result = await uploadGalleryImageAction(prevState, formData);
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
      className="space-y-4 rounded-2xl border border-navy-100 p-6"
    >
      <div>
        <label htmlFor="file" className="block text-sm font-medium text-navy-600">
          사진 파일
        </label>
        <input
          id="file"
          name="file"
          type="file"
          accept="image/*"
          required
          className="mt-1 block w-full text-sm text-navy-600"
        />
      </div>

      <div>
        <label htmlFor="alt" className="block text-sm font-medium text-navy-600">
          사진 설명
        </label>
        <input
          id="alt"
          name="alt"
          type="text"
          required
          placeholder="예: 정기 모임 현장"
          className="mt-1 min-h-[44px] w-full rounded-lg border border-navy-100 px-4 text-navy-600 focus:border-ember-600 focus:outline-none"
        />
      </div>

      {state?.error && <p className="text-sm text-ember-700">{state.error}</p>}

      <Button type="submit" disabled={isPending}>
        {isPending ? "업로드 중..." : "업로드"}
      </Button>
    </form>
  );
}

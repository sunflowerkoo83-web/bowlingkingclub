"use client";

import { useActionState, useRef } from "react";
import {
  upsertMemberAction,
  type MemberFormState,
} from "@/app/admin/(protected)/scores/actions";
import Button from "@/components/ui/Button";
import type { Member } from "@/lib/types";

const initialState: MemberFormState = {};

const inputClass =
  "mt-1 min-h-[44px] w-full rounded-lg border border-navy-100 px-4 text-navy-600 focus:border-ember-600 focus:outline-none";

function Field({
  label,
  name,
  type = "text",
  required,
  defaultValue,
  step,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  defaultValue?: string | number;
  step?: string;
}) {
  return (
    <div>
      <label className="block text-sm font-medium text-navy-600">{label}</label>
      <input
        name={name}
        type={type}
        step={step}
        required={required}
        defaultValue={defaultValue}
        className={inputClass}
      />
    </div>
  );
}

function TextAreaField({
  label,
  name,
  defaultValue,
}: {
  label: string;
  name: string;
  defaultValue?: string;
}) {
  return (
    <div className="sm:col-span-2">
      <label className="block text-sm font-medium text-navy-600">{label}</label>
      <textarea name={name} rows={2} defaultValue={defaultValue} className={inputClass} />
    </div>
  );
}

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
      {member?.photoUrl && (
        <input type="hidden" name="existingPhotoUrl" value={member.photoUrl} />
      )}

      <div className="sm:col-span-2">
        <label className="block text-sm font-medium text-navy-600">사진 (선택)</label>
        <input name="photo" type="file" accept="image/*" className="mt-1 block w-full text-sm text-navy-600" />
      </div>

      <Field label="이름" name="name" required defaultValue={member?.name} />
      <Field label="구력 (선택, 예: 3년)" name="experience" defaultValue={member?.experience} />

      <Field
        label="에버리지"
        name="average"
        type="number"
        step="0.1"
        required
        defaultValue={member?.average}
      />
      <Field label="하이스코어" name="highScore" type="number" required defaultValue={member?.highScore} />

      <Field label="볼링스타일 (선택)" name="bowlingStyle" defaultValue={member?.bowlingStyle} />
      <div className="grid grid-cols-2 gap-3">
        <Field
          label="평균 구속 (km/h, 선택)"
          name="avgBallSpeed"
          type="number"
          step="0.1"
          defaultValue={member?.avgBallSpeed}
        />
        <Field label="평균 RPM (선택)" name="avgRpm" type="number" defaultValue={member?.avgRpm} />
      </div>

      <TextAreaField label="장점 (선택)" name="strengths" defaultValue={member?.strengths} />
      <TextAreaField label="단점 (선택)" name="weaknesses" defaultValue={member?.weaknesses} />
      <TextAreaField label="특이사항 (선택)" name="notes" defaultValue={member?.notes} />

      {state?.error && <p className="text-sm text-ember-700 sm:col-span-2">{state.error}</p>}

      <div className="sm:col-span-2">
        <Button type="submit" disabled={isPending}>
          {isPending ? "저장 중..." : member ? "수정 저장" : "회원 추가"}
        </Button>
      </div>
    </form>
  );
}

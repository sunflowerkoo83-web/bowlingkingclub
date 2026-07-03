"use server";

import { revalidatePath } from "next/cache";
import { requireAdminSession } from "@/lib/auth/require-admin";
import { upsertMember, deleteMember, type MemberInput } from "@/lib/firebase/scores";

export type MemberFormState = { error?: string };

function parseNumber(value: FormDataEntryValue | null): number | undefined {
  if (typeof value !== "string" || value.trim() === "") return undefined;
  const num = Number(value);
  return Number.isFinite(num) ? num : undefined;
}

function parseText(value: FormDataEntryValue | null): string | undefined {
  if (typeof value !== "string" || !value.trim()) return undefined;
  return value.trim();
}

// 사진 파일은 클라이언트에서 Vercel Blob으로 직접 업로드된 뒤(src/app/api/blob-upload)
// photoUrl만 이 액션으로 전달됨 — 서버리스 함수 요청 본문 제한(~4.5MB)을 피하기 위해
// 파일 자체는 이 액션을 거치지 않음.
export async function upsertMemberAction(
  _prevState: MemberFormState,
  formData: FormData
): Promise<MemberFormState> {
  await requireAdminSession();

  const id = formData.get("id");
  const name = formData.get("name");
  const average = parseNumber(formData.get("average"));
  const highScore = parseNumber(formData.get("highScore"));
  const existingPhotoUrl = formData.get("existingPhotoUrl");
  const newPhotoUrl = formData.get("photoUrl");

  if (typeof name !== "string" || !name.trim()) {
    return { error: "이름을 입력해 주세요." };
  }
  if (average === undefined) {
    return { error: "에버리지를 숫자로 입력해 주세요." };
  }
  if (highScore === undefined) {
    return { error: "하이스코어를 숫자로 입력해 주세요." };
  }

  const photoUrl =
    (typeof newPhotoUrl === "string" && newPhotoUrl) ||
    (typeof existingPhotoUrl === "string" && existingPhotoUrl) ||
    undefined;

  const input: MemberInput = {
    id: typeof id === "string" && id ? id : undefined,
    name: name.trim(),
    photoUrl,
    experience: parseText(formData.get("experience")),
    average,
    bowlingStyle: parseText(formData.get("bowlingStyle")),
    avgBallSpeed: parseNumber(formData.get("avgBallSpeed")),
    avgRpm: parseNumber(formData.get("avgRpm")),
    highScore,
    strengths: parseText(formData.get("strengths")),
    weaknesses: parseText(formData.get("weaknesses")),
    notes: parseText(formData.get("notes")),
  };

  await upsertMember(input);

  revalidatePath("/scores");
  revalidatePath("/admin/scores");

  return {};
}

export async function deleteMemberAction(formData: FormData): Promise<void> {
  await requireAdminSession();

  const id = formData.get("id");
  if (typeof id !== "string" || !id) return;

  await deleteMember(id);

  revalidatePath("/scores");
  revalidatePath("/admin/scores");
}

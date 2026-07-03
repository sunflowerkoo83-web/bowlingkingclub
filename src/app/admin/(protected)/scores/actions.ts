"use server";

import { put } from "@vercel/blob";
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
  const photoFile = formData.get("photo");

  if (typeof name !== "string" || !name.trim()) {
    return { error: "이름을 입력해 주세요." };
  }
  if (average === undefined) {
    return { error: "에버리지를 숫자로 입력해 주세요." };
  }
  if (highScore === undefined) {
    return { error: "하이스코어를 숫자로 입력해 주세요." };
  }

  let photoUrl = typeof existingPhotoUrl === "string" && existingPhotoUrl ? existingPhotoUrl : undefined;

  if (photoFile instanceof File && photoFile.size > 0) {
    const blob = await put(`members/${Date.now()}-${photoFile.name}`, photoFile, {
      access: "public",
    });
    photoUrl = blob.url;
  }

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

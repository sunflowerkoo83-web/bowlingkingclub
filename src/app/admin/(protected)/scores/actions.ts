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

export async function upsertMemberAction(
  _prevState: MemberFormState,
  formData: FormData
): Promise<MemberFormState> {
  await requireAdminSession();

  const id = formData.get("id");
  const name = formData.get("name");
  const average = parseNumber(formData.get("average"));
  const highScore = parseNumber(formData.get("highScore"));
  const gamesPlayed = parseNumber(formData.get("gamesPlayed"));

  if (typeof name !== "string" || !name.trim()) {
    return { error: "이름을 입력해 주세요." };
  }
  if (average === undefined) {
    return { error: "에버리지를 숫자로 입력해 주세요." };
  }
  if (highScore === undefined) {
    return { error: "하이스코어를 숫자로 입력해 주세요." };
  }

  const input: MemberInput = {
    id: typeof id === "string" && id ? id : undefined,
    name: name.trim(),
    average,
    highScore,
    gamesPlayed,
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

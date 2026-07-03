"use server";

import { revalidatePath } from "next/cache";
import { requireAdminSession } from "@/lib/auth/require-admin";
import { deletePost } from "@/lib/firebase/posts";
import { addNotice, deleteNotice } from "@/lib/firebase/notices";

export async function deletePostAction(formData: FormData): Promise<void> {
  await requireAdminSession();

  const id = formData.get("id");
  if (typeof id !== "string" || !id) return;

  await deletePost(id);

  revalidatePath("/community");
  revalidatePath("/admin/community");
}

export type NoticeFormState = { error?: string };

export async function createNoticeAction(
  _prevState: NoticeFormState,
  formData: FormData
): Promise<NoticeFormState> {
  await requireAdminSession();

  const title = formData.get("title");
  const content = formData.get("content");

  if (typeof title !== "string" || !title.trim()) {
    return { error: "제목을 입력해 주세요." };
  }
  if (typeof content !== "string" || !content.trim()) {
    return { error: "내용을 입력해 주세요." };
  }

  await addNotice({ title: title.trim(), content: content.trim() });

  revalidatePath("/community");
  revalidatePath("/admin/community");

  return {};
}

export async function deleteNoticeAction(formData: FormData): Promise<void> {
  await requireAdminSession();

  const id = formData.get("id");
  if (typeof id !== "string" || !id) return;

  await deleteNotice(id);

  revalidatePath("/community");
  revalidatePath("/admin/community");
}

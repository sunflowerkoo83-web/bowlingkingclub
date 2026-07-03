"use server";

import { revalidatePath } from "next/cache";
import { requireAdminSession } from "@/lib/auth/require-admin";
import { deletePost } from "@/lib/firebase/posts";

export async function deletePostAction(formData: FormData): Promise<void> {
  await requireAdminSession();

  const id = formData.get("id");
  if (typeof id !== "string" || !id) return;

  await deletePost(id);

  revalidatePath("/community");
  revalidatePath("/admin/community");
}

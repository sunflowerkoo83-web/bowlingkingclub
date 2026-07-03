"use server";

import { put } from "@vercel/blob";
import { revalidatePath } from "next/cache";
import { requireAdminSession } from "@/lib/auth/require-admin";
import { addGalleryImage, deleteGalleryImage } from "@/lib/firebase/gallery";

export type UploadState = { error?: string };

export async function uploadGalleryImageAction(
  _prevState: UploadState,
  formData: FormData
): Promise<UploadState> {
  await requireAdminSession();

  const file = formData.get("file");
  const alt = formData.get("alt");

  if (!(file instanceof File) || file.size === 0) {
    return { error: "사진 파일을 선택해 주세요." };
  }

  if (typeof alt !== "string" || !alt.trim()) {
    return { error: "사진 설명을 입력해 주세요." };
  }

  const blob = await put(`gallery/${Date.now()}-${file.name}`, file, {
    access: "public",
  });

  await addGalleryImage({ url: blob.url, alt: alt.trim() });

  revalidatePath("/gallery");
  revalidatePath("/admin/gallery");

  return {};
}

export async function deleteGalleryImageAction(formData: FormData): Promise<void> {
  await requireAdminSession();

  const id = formData.get("id");
  const url = formData.get("url");

  if (typeof id !== "string" || typeof url !== "string") {
    return;
  }

  await deleteGalleryImage(id, url);

  revalidatePath("/gallery");
  revalidatePath("/admin/gallery");
}

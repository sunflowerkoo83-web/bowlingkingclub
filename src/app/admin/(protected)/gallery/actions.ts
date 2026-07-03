"use server";

import { revalidatePath } from "next/cache";
import { requireAdminSession } from "@/lib/auth/require-admin";
import { addGalleryImage, deleteGalleryImage } from "@/lib/firebase/gallery";

export type UploadState = { error?: string };

// 파일은 클라이언트에서 Vercel Blob으로 직접 업로드된 뒤(src/app/api/blob-upload)
// url만 이 액션으로 전달되어 Firestore에 기록됨 — 서버리스 함수 요청 본문 제한(~4.5MB)을
// 피하기 위해 파일 자체는 이 액션을 거치지 않음.
export async function addGalleryImageAction(
  _prevState: UploadState,
  formData: FormData
): Promise<UploadState> {
  await requireAdminSession();

  const url = formData.get("url");
  const alt = formData.get("alt");

  if (typeof url !== "string" || !url) {
    return { error: "사진 업로드에 실패했습니다. 다시 시도해 주세요." };
  }

  if (typeof alt !== "string" || !alt.trim()) {
    return { error: "사진 설명을 입력해 주세요." };
  }

  await addGalleryImage({ url, alt: alt.trim() });

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

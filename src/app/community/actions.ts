"use server";

import { revalidatePath } from "next/cache";
import { addPost } from "@/lib/firebase/posts";

export type PostFormState = { error?: string };

const MAX_NAME = 30;
const MAX_TITLE = 100;
const MAX_CONTENT = 2000;

export async function createPostAction(
  _prevState: PostFormState,
  formData: FormData
): Promise<PostFormState> {
  // 허니팟 필드: 사람 눈에는 안 보이지만 봇은 보통 자동으로 채움
  const honeypot = formData.get("website");
  if (typeof honeypot === "string" && honeypot) {
    return {};
  }

  const name = formData.get("name");
  const title = formData.get("title");
  const content = formData.get("content");

  if (typeof name !== "string" || !name.trim()) {
    return { error: "이름을 입력해 주세요." };
  }
  if (typeof title !== "string" || !title.trim()) {
    return { error: "제목을 입력해 주세요." };
  }
  if (typeof content !== "string" || !content.trim()) {
    return { error: "내용을 입력해 주세요." };
  }
  if (name.length > MAX_NAME || title.length > MAX_TITLE || content.length > MAX_CONTENT) {
    return { error: "입력한 내용이 너무 깁니다." };
  }

  await addPost({ name: name.trim(), title: title.trim(), content: content.trim() });

  revalidatePath("/community");
  revalidatePath("/admin/community");

  return {};
}

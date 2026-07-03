import "server-only";
import { getAdminFirestore } from "@/lib/firebase/admin";
import type { Post } from "@/lib/types";

const COLLECTION = "posts";

export type PostsResult =
  | { status: "ok"; posts: Post[] }
  | { status: "empty" }
  | { status: "error" };

export async function getPosts(): Promise<PostsResult> {
  try {
    const snapshot = await getAdminFirestore()
      .collection(COLLECTION)
      .orderBy("createdAt", "desc")
      .get();

    if (snapshot.empty) {
      return { status: "empty" };
    }

    const posts: Post[] = snapshot.docs.map((doc) => {
      const data = doc.data();
      const createdAt: Date = data.createdAt?.toDate?.() ?? new Date();
      return {
        id: doc.id,
        name: data.name ?? "익명",
        title: data.title ?? "",
        content: data.content ?? "",
        createdAt: createdAt.toISOString(),
      };
    });

    return { status: "ok", posts };
  } catch (error) {
    console.error("[getPosts] Firestore 조회 실패:", error);
    return { status: "error" };
  }
}

export async function addPost({
  name,
  title,
  content,
}: {
  name: string;
  title: string;
  content: string;
}): Promise<void> {
  await getAdminFirestore().collection(COLLECTION).add({
    name,
    title,
    content,
    createdAt: new Date(),
  });
}

export async function deletePost(id: string): Promise<void> {
  await getAdminFirestore().collection(COLLECTION).doc(id).delete();
}

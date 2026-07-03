import "server-only";
import { getAdminFirestore } from "@/lib/firebase/admin";
import type { Notice } from "@/lib/types";

const COLLECTION = "notices";

export type NoticesResult =
  | { status: "ok"; notices: Notice[] }
  | { status: "empty" }
  | { status: "error" };

export async function getNotices(): Promise<NoticesResult> {
  try {
    const snapshot = await getAdminFirestore()
      .collection(COLLECTION)
      .orderBy("createdAt", "desc")
      .get();

    if (snapshot.empty) {
      return { status: "empty" };
    }

    const notices: Notice[] = snapshot.docs.map((doc) => {
      const data = doc.data();
      const createdAt: Date = data.createdAt?.toDate?.() ?? new Date();
      return {
        id: doc.id,
        title: data.title ?? "",
        content: data.content ?? "",
        createdAt: createdAt.toISOString(),
      };
    });

    return { status: "ok", notices };
  } catch (error) {
    console.error("[getNotices] Firestore 조회 실패:", error);
    return { status: "error" };
  }
}

export async function addNotice({
  title,
  content,
}: {
  title: string;
  content: string;
}): Promise<void> {
  await getAdminFirestore().collection(COLLECTION).add({
    title,
    content,
    createdAt: new Date(),
  });
}

export async function deleteNotice(id: string): Promise<void> {
  await getAdminFirestore().collection(COLLECTION).doc(id).delete();
}

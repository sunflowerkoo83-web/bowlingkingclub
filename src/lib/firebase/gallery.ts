import "server-only";
import { del } from "@vercel/blob";
import { getAdminFirestore } from "@/lib/firebase/admin";
import type { GalleryImage } from "@/lib/types";

const COLLECTION = "gallery";

export type GalleryResult =
  | { status: "ok"; images: GalleryImage[] }
  | { status: "empty" }
  | { status: "error" };

export async function getGalleryImages(): Promise<GalleryResult> {
  try {
    const snapshot = await getAdminFirestore()
      .collection(COLLECTION)
      .orderBy("createdAt", "desc")
      .get();

    if (snapshot.empty) {
      return { status: "empty" };
    }

    const images: GalleryImage[] = snapshot.docs.map((doc) => {
      const data = doc.data();
      return {
        id: doc.id,
        url: data.url,
        alt: data.alt ?? "볼링킹 활동 사진",
      };
    });

    return { status: "ok", images };
  } catch (error) {
    console.error("[getGalleryImages] Firestore 조회 실패:", error);
    return { status: "error" };
  }
}

export async function addGalleryImage({
  url,
  alt,
}: {
  url: string;
  alt: string;
}): Promise<void> {
  await getAdminFirestore().collection(COLLECTION).add({
    url,
    alt,
    createdAt: new Date(),
  });
}

export async function deleteGalleryImage(id: string, url: string): Promise<void> {
  await getAdminFirestore().collection(COLLECTION).doc(id).delete();
  await del(url);
}

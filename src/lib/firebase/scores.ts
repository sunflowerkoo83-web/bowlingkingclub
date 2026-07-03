import "server-only";
import { getAdminFirestore } from "@/lib/firebase/admin";
import type { Member } from "@/lib/types";

export type ScoresResult =
  | { status: "ok"; members: Member[] }
  | { status: "empty" }
  | { status: "error" };

export async function getMemberScores(): Promise<ScoresResult> {
  try {
    const snapshot = await getAdminFirestore()
      .collection("members")
      .orderBy("average", "desc")
      .get();

    if (snapshot.empty) {
      return { status: "empty" };
    }

    const members: Member[] = snapshot.docs.map((doc) => {
      const data = doc.data();
      return {
        id: doc.id,
        name: data.name ?? "이름 없음",
        average: data.average ?? 0,
        highScore: data.highScore ?? 0,
        gamesPlayed: data.gamesPlayed,
      };
    });

    return { status: "ok", members };
  } catch (error) {
    console.error("[getMemberScores] Firestore 조회 실패:", error);
    return { status: "error" };
  }
}

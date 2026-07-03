import "server-only";
import { getAdminFirestore } from "@/lib/firebase/admin";
import type { Member } from "@/lib/types";

const COLLECTION = "members";

export type ScoresResult =
  | { status: "ok"; members: Member[] }
  | { status: "empty" }
  | { status: "error" };

export type MemberInput = {
  id?: string;
  name: string;
  photoUrl?: string;
  experience?: string;
  average: number;
  bowlingStyle?: string;
  avgBallSpeed?: number;
  avgRpm?: number;
  highScore: number;
  strengths?: string;
  weaknesses?: string;
  notes?: string;
};

export async function getMemberScores(): Promise<ScoresResult> {
  try {
    const snapshot = await getAdminFirestore()
      .collection(COLLECTION)
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
        photoUrl: data.photoUrl,
        experience: data.experience,
        average: data.average ?? 0,
        bowlingStyle: data.bowlingStyle,
        avgBallSpeed: data.avgBallSpeed,
        avgRpm: data.avgRpm,
        highScore: data.highScore ?? 0,
        strengths: data.strengths,
        weaknesses: data.weaknesses,
        notes: data.notes,
      };
    });

    return { status: "ok", members };
  } catch (error) {
    console.error("[getMemberScores] Firestore 조회 실패:", error);
    return { status: "error" };
  }
}

export async function upsertMember({ id, ...data }: MemberInput): Promise<void> {
  const collection = getAdminFirestore().collection(COLLECTION);

  if (id) {
    await collection.doc(id).set(data, { merge: true });
  } else {
    await collection.add(data);
  }
}

export async function deleteMember(id: string): Promise<void> {
  await getAdminFirestore().collection(COLLECTION).doc(id).delete();
}

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
    const snapshot = await getAdminFirestore().collection(COLLECTION).get();

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
        order: data.order,
      };
    });

    // 관리자가 수동으로 지정한 order가 있으면 그 순서를 우선하고,
    // 지정되지 않은 회원은 에버리지 내림차순으로 뒤에 배치
    members.sort((a, b) => {
      const orderA = a.order ?? Number.MAX_SAFE_INTEGER;
      const orderB = b.order ?? Number.MAX_SAFE_INTEGER;
      if (orderA !== orderB) return orderA - orderB;
      return b.average - a.average;
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

// orderedIds는 원하는 표시 순서대로 나열된 회원 id 목록 — 각 회원의 order를 배열 인덱스로 갱신
export async function reorderMembers(orderedIds: string[]): Promise<void> {
  const collection = getAdminFirestore().collection(COLLECTION);
  const batch = getAdminFirestore().batch();

  orderedIds.forEach((id, index) => {
    batch.update(collection.doc(id), { order: index });
  });

  await batch.commit();
}

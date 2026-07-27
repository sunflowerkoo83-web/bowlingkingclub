import "server-only";
import { FieldValue } from "firebase-admin/firestore";
import { getAdminFirestore } from "./admin";

const COLLECTION = "visitStats";

export function visitDateKey(date: Date = new Date()): string {
  // YYYY-MM-DD, 한국 시간 기준 (자정 넘어가면 다음날로 집계)
  return date.toLocaleDateString("sv-SE", { timeZone: "Asia/Seoul" });
}

export async function recordVisit(dateKey: string): Promise<void> {
  await getAdminFirestore()
    .collection(COLLECTION)
    .doc(dateKey)
    .set({ count: FieldValue.increment(1) }, { merge: true });
}

export type DailyVisit = { date: string; count: number };

export async function getRecentVisitStats(days: number): Promise<DailyVisit[]> {
  const db = getAdminFirestore();
  const today = new Date();
  const keys: string[] = [];
  for (let i = days - 1; i >= 0; i -= 1) {
    const date = new Date(today);
    date.setDate(date.getDate() - i);
    keys.push(visitDateKey(date));
  }

  // 날짜 키를 미리 알고 있으므로 orderBy 대신 직접 문서를 조회해 색인 없이 동작
  const refs = keys.map((key) => db.collection(COLLECTION).doc(key));
  const docs = await db.getAll(...refs);

  return docs.map((doc, i) => ({
    date: keys[i],
    count: (doc.data()?.count as number) ?? 0,
  }));
}

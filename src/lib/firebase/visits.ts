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
  const snapshot = await getAdminFirestore()
    .collection(COLLECTION)
    .orderBy("__name__", "desc")
    .limit(days)
    .get();

  const byDate = new Map(
    snapshot.docs.map((doc) => [doc.id, (doc.data().count as number) ?? 0])
  );

  const result: DailyVisit[] = [];
  const today = new Date();
  for (let i = days - 1; i >= 0; i -= 1) {
    const date = new Date(today);
    date.setDate(date.getDate() - i);
    const key = visitDateKey(date);
    result.push({ date: key, count: byDate.get(key) ?? 0 });
  }
  return result;
}

import "server-only";
import { cert, getApps, initializeApp, type App } from "firebase-admin/app";
import { getFirestore, type Firestore } from "firebase-admin/firestore";

function getAdminApp(): App {
  const existing = getApps();
  if (existing.length > 0) {
    return existing[0];
  }

  const projectId = process.env.FIREBASE_PROJECT_ID;
  const clientEmail = process.env.FIREBASE_CLIENT_EMAIL;
  const privateKey = process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, "\n");

  if (!projectId || !clientEmail || !privateKey) {
    throw new Error(
      "Firebase 환경변수(FIREBASE_PROJECT_ID, FIREBASE_CLIENT_EMAIL, FIREBASE_PRIVATE_KEY)가 설정되지 않았습니다."
    );
  }

  return initializeApp({
    credential: cert({ projectId, clientEmail, privateKey }),
  });
}

let firestore: Firestore | undefined;

export function getAdminFirestore(): Firestore {
  if (!firestore) {
    firestore = getFirestore(getAdminApp());
    // gamesPlayed 등 선택 필드가 비어있을 때 undefined로 전달되므로 허용
    firestore.settings({ ignoreUndefinedProperties: true });
  }
  return firestore;
}

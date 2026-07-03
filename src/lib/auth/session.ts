import "server-only";
import { createHmac, timingSafeEqual } from "node:crypto";

export const ADMIN_SESSION_COOKIE = "admin_session";
const SESSION_PAYLOAD = "bowlingking-admin";

function getSessionSecret(): string {
  const secret = process.env.ADMIN_SESSION_SECRET;
  if (!secret) {
    throw new Error("ADMIN_SESSION_SECRET 환경변수가 설정되지 않았습니다.");
  }
  return secret;
}

export function createSessionToken(): string {
  return createHmac("sha256", getSessionSecret())
    .update(SESSION_PAYLOAD)
    .digest("hex");
}

export function isValidSessionToken(token: string | undefined): boolean {
  if (!token) return false;

  const expected = Buffer.from(createSessionToken());
  const actual = Buffer.from(token);

  if (expected.length !== actual.length) {
    return false;
  }

  return timingSafeEqual(expected, actual);
}

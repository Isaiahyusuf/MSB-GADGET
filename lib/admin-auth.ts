import { createHmac, timingSafeEqual } from "node:crypto";
import { cookies } from "next/headers";

const cookieName = "msb_admin_session";
const sessionLifetimeSeconds = 60 * 60 * 12;

function secret() {
  return process.env.ADMIN_SESSION_SECRET || process.env.ADMIN_PASSWORD || "";
}

function signature(timestamp: string) {
  return createHmac("sha256", secret()).update(timestamp).digest("hex");
}

export function isValidAdminPassword(password: string) {
  const configuredPassword = process.env.ADMIN_PASSWORD;
  return Boolean(configuredPassword && password === configuredPassword);
}

export function createAdminSession() {
  const timestamp = String(Date.now());
  return `${timestamp}.${signature(timestamp)}`;
}

export function isValidAdminSession(value: string | undefined) {
  if (!value || !secret()) return false;

  const [timestamp, providedSignature] = value.split(".");
  const timestampNumber = Number(timestamp);

  if (
    !timestamp ||
    !providedSignature ||
    !Number.isFinite(timestampNumber) ||
    Date.now() - timestampNumber > sessionLifetimeSeconds * 1000 ||
    timestampNumber > Date.now()
  ) {
    return false;
  }

  const expectedBuffer = Buffer.from(signature(timestamp));
  const providedBuffer = Buffer.from(providedSignature);

  return (
    providedBuffer.length === expectedBuffer.length &&
    timingSafeEqual(providedBuffer, expectedBuffer)
  );
}

export async function isAdminAuthenticated() {
  const cookieStore = await cookies();
  return isValidAdminSession(cookieStore.get(cookieName)?.value);
}

export { cookieName, sessionLifetimeSeconds };
import { createHash, randomBytes, scrypt as nodeScrypt, timingSafeEqual } from "node:crypto";
import { promisify } from "node:util";
import { cookies } from "next/headers";
import { db } from "@/lib/db";

const scrypt = promisify(nodeScrypt);
const cookieName = "msb_customer_session";
const sessionLifetimeSeconds = 60 * 60 * 24 * 30;

export type Customer = {
  id: string;
  email: string;
  name: string;
  phone: string | null;
  role: string;
};

export async function hashPassword(password: string) {
  const salt = randomBytes(16).toString("hex");
  const derivedKey = (await scrypt(password, salt, 64)) as Buffer;
  return `${salt}:${derivedKey.toString("hex")}`;
}

export async function verifyPassword(password: string, storedHash: string) {
  const [salt, key] = storedHash.split(":");
  if (!salt || !key) return false;
  const derivedKey = (await scrypt(password, salt, 64)) as Buffer;
  const expectedKey = Buffer.from(key, "hex");
  return derivedKey.length === expectedKey.length && timingSafeEqual(derivedKey, expectedKey);
}

function hashToken(token: string) {
  return createHash("sha256").update(token).digest("hex");
}

export async function createCustomerSession(userId: string) {
  const token = randomBytes(32).toString("hex");
  await db.orm.public.Session.create({
    tokenHash: hashToken(token),
    userId,
    expiresAt: new Date(Date.now() + sessionLifetimeSeconds * 1000),
  });
  return token;
}

export async function getCurrentCustomer(): Promise<Customer | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get(cookieName)?.value;
  if (!token) return null;

  const session = await db.orm.public.Session.where({ tokenHash: hashToken(token) }).first();
  if (!session || new Date(session.expiresAt).getTime() <= Date.now()) return null;

  const user = await db.orm.public.User.where({ id: session.userId }).first();
  if (!user) return null;
  return { id: user.id, email: user.email, name: user.name, phone: user.phone, role: user.role };
}

export function sessionCookie(token: string, maxAge = sessionLifetimeSeconds) {
  return `${cookieName}=${token}; Path=/; HttpOnly; Secure; SameSite=Lax; Max-Age=${maxAge}`;
}

export { cookieName };
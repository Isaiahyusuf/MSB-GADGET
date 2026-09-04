import { createHash } from "node:crypto";
import { db } from "@/lib/db";
import { hashPassword } from "@/lib/customer-auth";
import { passwordError } from "@/lib/password-policy";

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  const token = typeof body?.token === "string" ? body.token : "";
  const password = typeof body?.password === "string" ? body.password : "";
  const issue = passwordError(password, typeof body?.confirmation === "string" ? body.confirmation : undefined);
  if (!token || issue) return Response.json({ error: issue || "Reset token is required." }, { status: 400 });

  const tokenHash = createHash("sha256").update(token).digest("hex");
  const resetToken = await db.orm.public.PasswordResetToken.where({ tokenHash }).first();
  if (!resetToken || resetToken.usedAt || new Date(resetToken.expiresAt).getTime() <= Date.now()) return Response.json({ error: "This reset link is invalid or expired." }, { status: 400 });

  await db.orm.public.User.where({ id: resetToken.userId }).update({ passwordHash: await hashPassword(password) });
  await db.orm.public.PasswordResetToken.where({ id: resetToken.id }).update({ usedAt: new Date() });
  return Response.json({ message: "Password updated. You can now sign in." });
}
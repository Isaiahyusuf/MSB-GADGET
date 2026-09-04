import { createHash, randomBytes } from "node:crypto";
import { db } from "@/lib/db";

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  const email = typeof body?.email === "string" ? body.email.trim().toLowerCase() : "";
  const genericResponse = { message: "If an account exists for that email, a reset link has been prepared." };
  if (!email.includes("@")) return Response.json(genericResponse);

  const user = await db.orm.public.User.where({ email }).first();
  if (!user) return Response.json(genericResponse);

  const token = randomBytes(32).toString("hex");
  await db.orm.public.PasswordResetToken.create({
    tokenHash: createHash("sha256").update(token).digest("hex"),
    userId: user.id,
    expiresAt: new Date(Date.now() + 60 * 60 * 1000),
  });

  const resetUrl = `${new URL(request.url).origin}/reset-password?token=${token}`;
  console.info("PASSWORD RESET LINK:", { email, resetUrl });
  return Response.json(genericResponse);
}
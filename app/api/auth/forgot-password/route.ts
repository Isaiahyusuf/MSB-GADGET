import { createHash, randomBytes } from "node:crypto";
import { Resend } from "resend";
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
  const resendApiKey = process.env.RESEND_API_KEY;
  const emailFrom = process.env.EMAIL_FROM;

  if (!resendApiKey || !emailFrom) {
    console.error("PASSWORD RESET EMAIL CONFIGURATION MISSING");
    return Response.json({ error: "Password reset email is not configured." }, { status: 503 });
  }

  const resend = new Resend(resendApiKey);
  const { error } = await resend.emails.send({
    from: emailFrom,
    to: email,
    subject: "Reset your MSB Marketplace password",
    html: `<p>We received a request to reset your MSB Marketplace password.</p><p><a href="${resetUrl}">Reset your password</a></p><p>This link expires in one hour. If you did not request this, you can ignore this email.</p>`,
  });

  if (error) {
    console.error("PASSWORD RESET EMAIL ERROR:", error);
    return Response.json({ error: "Unable to send password reset email." }, { status: 502 });
  }

  return Response.json(genericResponse);
}
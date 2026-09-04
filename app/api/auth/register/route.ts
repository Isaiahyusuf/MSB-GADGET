import { createCustomerSession, hashPassword, sessionCookie } from "@/lib/customer-auth";
import { db } from "@/lib/db";

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  const name = typeof body?.name === "string" ? body.name.trim() : "";
  const email = typeof body?.email === "string" ? body.email.trim().toLowerCase() : "";
  const phone = typeof body?.phone === "string" ? body.phone.trim() : null;
  const password = typeof body?.password === "string" ? body.password : "";

  if (!name || !email.includes("@") || password.length < 8) {
    return Response.json({ error: "Name, valid email, and an 8-character password are required." }, { status: 400 });
  }

  try {
    const existing = await db.orm.public.User.where({ email }).first();
    if (existing) return Response.json({ error: "An account with this email already exists." }, { status: 409 });
    const user = await db.orm.public.User.create({ name, email, phone, passwordHash: await hashPassword(password) });
    const response = Response.json({ user: { id: user.id, name: user.name, email: user.email } }, { status: 201 });
    response.headers.append("Set-Cookie", sessionCookie(await createCustomerSession(user.id)));
    return response;
  } catch (error) {
    console.error("REGISTER ERROR:", error);
    return Response.json({ error: "Unable to create account." }, { status: 500 });
  }
}
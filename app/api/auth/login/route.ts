import { createCustomerSession, sessionCookie, verifyPassword } from "@/lib/customer-auth";
import { db } from "@/lib/db";

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  const email = typeof body?.email === "string" ? body.email.trim().toLowerCase() : "";
  const password = typeof body?.password === "string" ? body.password : "";
  const user = email ? await db.orm.public.User.where({ email }).first() : null;

  if (!user || !(await verifyPassword(password, user.passwordHash))) {
    return Response.json({ error: "Invalid email or password." }, { status: 401 });
  }

  const response = Response.json({ user: { id: user.id, name: user.name, email: user.email } });
  response.headers.append("Set-Cookie", sessionCookie(await createCustomerSession(user.id)));
  return response;
}
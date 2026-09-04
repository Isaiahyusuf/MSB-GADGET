import {
  cookieName,
  createAdminSession,
  isValidAdminPassword,
  sessionLifetimeSeconds,
} from "@/lib/admin-auth";

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);

  if (!body || typeof body.password !== "string" || !isValidAdminPassword(body.password)) {
    return Response.json({ error: "Invalid password" }, { status: 401 });
  }

  const response = Response.json({ ok: true });
  response.headers.append(
    "Set-Cookie",
    `${cookieName}=${createAdminSession()}; Path=/; HttpOnly; Secure; SameSite=Lax; Max-Age=${sessionLifetimeSeconds}`
  );
  return response;
}

export async function DELETE() {
  const response = Response.json({ ok: true });
  response.headers.append(
    "Set-Cookie",
    `${cookieName}=; Path=/; HttpOnly; Secure; SameSite=Lax; Max-Age=0`
  );
  return response;
}
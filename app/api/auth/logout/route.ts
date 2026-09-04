import { cookieName, sessionCookie } from "@/lib/customer-auth";

export async function POST() {
  const response = Response.json({ ok: true });
  response.headers.append("Set-Cookie", sessionCookie("", 0).replace(`${cookieName}=`, `${cookieName}=`));
  return response;
}
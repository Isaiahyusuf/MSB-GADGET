import { isAdminAuthenticated } from "@/lib/admin-auth";
import { db } from "@/lib/db";

export async function GET() {
  if (!(await isAdminAuthenticated())) return Response.json({ error: "Unauthorized" }, { status: 401 });
  return Response.json(await db.orm.public.Order.include("items").all());
}
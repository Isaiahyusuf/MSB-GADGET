import { getCurrentCustomer } from "@/lib/customer-auth";
import { db } from "@/lib/db";

export async function GET(_request: Request, { params }: { params: Promise<{ id: string }> }) {
  const user = await getCurrentCustomer();
  if (!user) return Response.json({ error: "Sign in required" }, { status: 401 });
  const order = await db.orm.public.Order.where({ id: (await params).id, userId: user.id }).include("items").first();
  if (!order) return Response.json({ error: "Order not found" }, { status: 404 });
  return Response.json(order);
}

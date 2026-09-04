import { isAdminAuthenticated } from "@/lib/admin-auth";
import { db } from "@/lib/db";

export async function PATCH(request: Request, { params }: { params: Promise<{ id: string }> }) {
  if (!(await isAdminAuthenticated())) return Response.json({ error: "Unauthorized" }, { status: 401 });
  const body = await request.json().catch(() => null);
  const update: { orderStatus?: string; paymentStatus?: string } = {};
  if (typeof body?.orderStatus === "string") update.orderStatus = body.orderStatus;
  if (typeof body?.paymentStatus === "string") update.paymentStatus = body.paymentStatus;
  if (!Object.keys(update).length) return Response.json({ error: "No valid changes supplied." }, { status: 400 });
  const orderId = (await params).id;
  const current = await db.orm.public.Order.where({ id: orderId }).include("items").first();
  if (!current) return Response.json({ error: "Order not found." }, { status: 404 });
  if (update.paymentStatus === "PAYMENT_CONFIRMED" && current.paymentStatus !== "PAYMENT_CONFIRMED") {
    const items = current.items.map((item) => ({ listingId: String(item.listingId), quantity: Number(item.quantity), title: String(item.title) }));
    for (const item of items) {
      const listing = await db.orm.public.Listing.where({ id: item.listingId }).first();
      if (!listing || listing.quantity < item.quantity) return Response.json({ error: `Insufficient stock for ${item.title}.` }, { status: 409 });
    }
    for (const item of items) {
      const listing = await db.orm.public.Listing.where({ id: item.listingId }).first();
      if (listing) await db.orm.public.Listing.where({ id: listing.id }).update({ quantity: listing.quantity - item.quantity, status: listing.quantity - item.quantity === 0 ? "SOLD" : listing.status });
    }
  }
  const order = await db.orm.public.Order.where({ id: orderId }).update(update);
  return Response.json(order);
}
import { getCurrentCustomer } from "@/lib/customer-auth";
import { db } from "@/lib/db";

export async function POST(request: Request) {
  const user = await getCurrentCustomer();
  if (!user) return Response.json({ error: "Sign in required" }, { status: 401 });
  const body = await request.json().catch(() => null);
  const rawItems = Array.isArray(body?.items) ? body.items : [];
  const items = rawItems.filter((item: unknown): item is { id: string; quantity: number } => typeof item === "object" && item !== null && typeof (item as { id?: unknown }).id === "string" && Number.isInteger((item as { quantity?: unknown }).quantity) && Number((item as { quantity: number }).quantity) > 0);
  if (!items.length) return Response.json({ error: "Cart is empty" }, { status: 400 });

  try {
    const listings = await db.orm.public.Listing.where({ status: "AVAILABLE" }).all();
    const verified = items.map((item: { id: string; quantity: number }) => {
      const listing = listings.find((candidate) => candidate.id === item.id);
      if (!listing || item.quantity > listing.quantity) throw new Error("One or more listings are unavailable.");
      return { listing, quantity: item.quantity, unitPrice: listing.price };
    });
    const totalAmount = verified.reduce((sum: number, item: { unitPrice: number; quantity: number }) => sum + item.unitPrice * item.quantity, 0);
    const account = await db.orm.public.PaymentAccount.where({ active: true }).first();
    const order = await db.orm.public.Order.create({ userId: user.id, fullName: user.name, email: user.email, phone: user.phone || String(body.phone || ""), deliveryAddress: typeof body.address === "string" ? body.address : null, totalAmount, paymentAccountId: account?.id || null });
    for (const item of verified) await db.orm.public.OrderItem.create({ orderId: order.id, listingId: item.listing.id, title: item.listing.title, quantity: item.quantity, unitPrice: item.unitPrice });
    return Response.json({ orderId: order.id, totalAmount, paymentAccount: account }, { status: 201 });
  } catch (error) {
    console.error("CREATE ORDER ERROR:", error);
    return Response.json({ error: error instanceof Error ? error.message : "Unable to create order." }, { status: 400 });
  }
}

export async function GET() {
  const user = await getCurrentCustomer();
  if (!user) return Response.json({ error: "Sign in required" }, { status: 401 });
  const orders = await db.orm.public.Order.where({ userId: user.id }).include("items").all();
  return Response.json(orders);
}

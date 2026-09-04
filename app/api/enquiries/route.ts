import { db } from "@/lib/db";

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  if (!body?.name || !body?.phone || !body?.message || !body?.listingId) return Response.json({ error: "Name, phone, message, and listing are required." }, { status: 400 });
  const listing = await db.orm.public.Listing.where({ id: body.listingId }).first();
  if (!listing) return Response.json({ error: "Listing not found." }, { status: 404 });
  const enquiry = await db.orm.public.Enquiry.create({ name: body.name.trim(), email: body.email || null, phone: body.phone.trim(), message: body.message.trim(), listingId: listing.id });
  return Response.json(enquiry, { status: 201 });
}
import { db } from "@/lib/db";

export async function GET(_request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const listing = await db.orm.public.Listing.include("images").where({ id, status: "AVAILABLE" }).first();
  if (!listing) return Response.json({ error: "Listing not found" }, { status: 404 });
  return Response.json(listing);
}
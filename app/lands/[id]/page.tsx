import { notFound } from "next/navigation";
import ListingDetail from "@/components/ListingDetail";
import { db } from "@/lib/db";

export default async function LandDetail({ params }: { params: Promise<{ id: string }> }) {
  const listing = await db.orm.public.Listing.include("images").where({ id: (await params).id, status: "AVAILABLE", type: "LAND" }).first();
  if (!listing) notFound();
  return <ListingDetail listing={{ ...listing, images: listing.images.map((image) => ({ id: String(image.id), url: String(image.url) })) }} />;
}

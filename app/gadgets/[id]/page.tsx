import { notFound } from "next/navigation";
import ListingDetail from "@/components/ListingDetail";
import { db } from "@/lib/db";

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
  const listing = await db.orm.public.Listing.where({ id: (await params).id }).first();
  return { title: listing ? `${listing.title} | MSB` : "Listing | MSB" };
}

export default async function GadgetDetail({ params }: { params: Promise<{ id: string }> }) {
  const listing = await db.orm.public.Listing.include("images").where({ id: (await params).id, status: "AVAILABLE", type: "GADGET" }).first();
  if (!listing) notFound();
  return <ListingDetail listing={{ ...listing, images: listing.images.map((image) => ({ id: String(image.id), url: String(image.url) })) }} />;
}

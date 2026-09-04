import ListingCard from "@/components/ListingCard";
import { db } from "@/lib/db";

export default async function FeaturedListings() {
  const listings = await db.orm.public.Listing.include("images").where({ status: "AVAILABLE", featured: true }).all();
  const visible = listings.slice(0, 6).map((listing) => ({ ...listing, images: listing.images.map((image) => ({ id: String(image.id), url: String(image.url) })) }));
  if (!visible.length) return <div className="rounded-2xl border border-dashed border-gray-300 bg-white p-12 text-center text-gray-500">New products will appear here soon.</div>;
  return <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">{visible.map((listing) => <ListingCard key={listing.id} listing={listing} />)}</div>;
}
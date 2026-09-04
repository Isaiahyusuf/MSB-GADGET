import Link from "next/link";
import ImageCarousel from "@/components/ImageCarousel";
import { formatNaira } from "@/lib/format";
import type { Listing } from "@/types/marketplace";

export default function ListingCard({ listing }: { listing: Listing }) {
  const path = listing.type === "CAR" ? "cars" : listing.type === "LAND" ? "lands" : "gadgets";
  return <article className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-xl"><Link href={`/${path}/${listing.id}`}><ImageCarousel images={listing.images.map((image) => image.url)} alt={listing.title} /><div className="p-5"><p className="text-xs font-bold uppercase tracking-widest text-blue-600">{listing.type}</p><h3 className="mt-2 text-lg font-black text-gray-950">{listing.title}</h3><p className="mt-2 text-sm text-gray-500">{listing.location}{listing.condition ? ` · ${listing.condition}` : ""}</p><p className="mt-4 text-xl font-black text-gray-950">{formatNaira(listing.price)}</p></div></Link></article>;
}
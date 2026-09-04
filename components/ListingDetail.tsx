"use client";

import Link from "next/link";
import { useState } from "react";
import ImageCarousel from "@/components/ImageCarousel";
import { useCart } from "@/components/CartProvider";
import { formatNaira, whatsappUrl } from "@/lib/format";
import type { Listing } from "@/types/marketplace";

export default function ListingDetail({ listing }: { listing: Listing }) {
  const { add } = useCart();
  const [added, setAdded] = useState(false);
  const path = listing.type === "CAR" ? "cars" : listing.type === "LAND" ? "lands" : "gadgets";
  const details = listing.type === "CAR" ? [["Year", listing.year], ["Mileage", listing.mileage ? `${listing.mileage.toLocaleString()} km` : null], ["Transmission", listing.transmission], ["Fuel", listing.fuelType]] : listing.type === "LAND" ? [["Property size", listing.propertySize], ["Title document", listing.titleDocument]] : [["Brand", listing.brand], ["Model", listing.model], ["Storage", listing.storage], ["Condition", listing.condition]];

  return <main className="mx-auto min-h-screen max-w-7xl px-6 py-10"><Link href={`/${path}`} className="text-sm font-bold text-blue-600">← Back to {path}</Link><div className="mt-8 grid gap-10 lg:grid-cols-2"><div className="overflow-hidden rounded-2xl bg-gray-100"><ImageCarousel images={listing.images.map((image) => image.url)} alt={listing.title} /></div><div><p className="text-sm font-bold uppercase tracking-widest text-blue-600">{listing.type}</p><h1 className="mt-3 text-4xl font-black text-gray-950">{listing.title}</h1><p className="mt-4 text-3xl font-black text-gray-950">{formatNaira(listing.price)}</p><p className="mt-3 text-gray-500">{listing.location} · {listing.quantity} available</p><p className="mt-8 whitespace-pre-wrap leading-7 text-gray-600">{listing.description || "Contact MSB for more details about this listing."}</p><div className="mt-8 grid grid-cols-2 gap-3">{details.map(([label, value]) => value && <div key={label} className="rounded-xl bg-gray-50 p-4"><p className="text-xs font-bold uppercase text-gray-400">{label}</p><p className="mt-1 font-bold text-gray-900">{value}</p></div>)}</div><div className="mt-8 flex flex-wrap gap-3"><button type="button" onClick={() => { add(listing); setAdded(true); }} className="rounded-xl bg-blue-600 px-6 py-3 font-bold text-white">{added ? "Added to cart" : "Add to cart"}</button><Link href="/cart" className="rounded-xl border border-gray-300 px-6 py-3 font-bold text-gray-900">View cart</Link><a target="_blank" rel="noreferrer" href={whatsappUrl(process.env.NEXT_PUBLIC_WHATSAPP_NUMBER, `Hello MSB, I would like to ask about ${listing.title} (${listing.id}).`)} className="rounded-xl bg-green-600 px-6 py-3 font-bold text-white">Chat about this product</a></div></div></div></main>;
}

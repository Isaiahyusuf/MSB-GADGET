"use client";

import { useEffect, useState } from "react";
import ListingCard from "@/components/ListingCard";
import type { Listing } from "@/types/marketplace";

export default function MarketplaceBrowser({ type, title }: { type?: string; title: string }) {
  const [listings, setListings] = useState<Listing[]>([]);
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState("featured");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(async () => {
      setLoading(true);
      const search = new URLSearchParams({ ...(type ? { type } : {}), ...(query ? { q: query } : {}), sort });
      const response = await fetch(`/api/listings?${search}`);
      setListings(await response.json());
      setLoading(false);
    }, 250);
    return () => clearTimeout(timer);
  }, [query, sort, type]);

  return <main className="min-h-screen bg-gray-50"><section className="bg-gray-950 px-6 py-14 text-white"><div className="mx-auto max-w-7xl"><p className="text-sm font-bold uppercase tracking-widest text-blue-400">MSB Marketplace</p><h1 className="mt-3 text-4xl font-black md:text-6xl">{title}</h1><div className="mt-8 flex max-w-3xl flex-col gap-3 sm:flex-row"><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search products, brands, locations..." className="w-full rounded-xl px-5 py-4 text-gray-950 outline-none" /><select value={sort} onChange={(event) => setSort(event.target.value)} className="rounded-xl px-4 py-4 text-gray-950"><option value="featured">Featured</option><option value="newest">Newest</option><option value="price-low">Price low to high</option><option value="price-high">Price high to low</option></select></div></div></section><section className="mx-auto max-w-7xl px-6 py-12"><div className="mb-6 flex items-center justify-between"><h2 className="text-2xl font-black text-gray-950">Available listings</h2><span className="text-sm text-gray-500">{listings.length} found</span></div>{loading ? <div className="py-16 text-center text-gray-500">Loading listings...</div> : listings.length ? <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">{listings.map((listing) => <ListingCard key={listing.id} listing={listing} />)}</div> : <div className="rounded-2xl border border-dashed border-gray-300 bg-white p-16 text-center text-gray-500">No listings match your search.</div>}</section></main>;
}

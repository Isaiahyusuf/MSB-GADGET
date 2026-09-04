import { db } from "@/lib/db";

export async function GET(request: Request) {
  const params = new URL(request.url).searchParams;
  const type = params.get("type")?.toUpperCase();
  const query = params.get("q")?.trim().toLowerCase();
  const location = params.get("location")?.trim().toLowerCase();
  const sort = params.get("sort") || "featured";
  const listings = await db.orm.public.Listing.include("images").where({ status: "AVAILABLE" }).all();
  const filtered = listings.filter((listing) => {
    const searchable = [listing.title, listing.description, listing.brand, listing.model, listing.location, listing.type].filter(Boolean).join(" ").toLowerCase();
    return (!type || listing.type === type) && (!query || searchable.includes(query)) && (!location || listing.location.toLowerCase().includes(location));
  });
  filtered.sort((first, second) => {
    if (sort === "price-low") return first.price - second.price;
    if (sort === "price-high") return second.price - first.price;
    if (sort === "newest") return new Date(second.createdAt).getTime() - new Date(first.createdAt).getTime();
    return Number(second.featured) - Number(first.featured);
  });
  return Response.json(filtered);
}
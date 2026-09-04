import { db } from "@/lib/db";
import { isAdminAuthenticated } from "@/lib/admin-auth";

export async function POST(request: Request) {
  if (!(await isAdminAuthenticated())) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await request.json();
    const imageUrls = Array.isArray(body.images)
      ? body.images.filter(
          (image: unknown): image is string =>
            typeof image === "string" && image.startsWith("https://")
        )
      : [];

    if (!body.title || !body.type || !body.location || !Number.isFinite(Number(body.price))) {
      return Response.json(
        { error: "Title, type, location, and a valid price are required." },
        { status: 400 }
      );
    }

    const listing = await db.orm.public.Listing.create({
      title: body.title,
      description: body.description || null,
      type: body.type,
      price: Number(body.price),
      location: body.location,
      condition: body.condition || null,
      status: body.status || "AVAILABLE",
      featured: Boolean(body.featured),
      quantity: Number(body.quantity || 1),

      brand: body.brand || null,
      model: body.model || null,
      storage: body.storage || null,

      year: body.year ? Number(body.year) : null,
      mileage: body.mileage ? Number(body.mileage) : null,
      transmission: body.transmission || null,
      fuelType: body.fuelType || null,

      propertySize: body.propertySize || null,
      titleDocument: body.titleDocument || null,
    });

    for (const url of imageUrls) {
      await db.orm.public.ListingImage.create({
        url,
        listingId: listing.id,
      });
    }

    return Response.json(listing, { status: 201 });
  } catch (error) {
    console.error("CREATE LISTING ERROR:", error);

    return Response.json(
      { error: "Failed to create listing" },
      { status: 500 }
    );
  }
}

export async function GET() {
  if (!(await isAdminAuthenticated())) return Response.json({ error: "Unauthorized" }, { status: 401 });
  return Response.json(await db.orm.public.Listing.include("images").all());
}

export async function PATCH(request: Request) {
  if (!(await isAdminAuthenticated())) return Response.json({ error: "Unauthorized" }, { status: 401 });
  const body = await request.json().catch(() => null);
  if (typeof body?.id !== "string") return Response.json({ error: "Listing id is required." }, { status: 400 });
  const update: Record<string, unknown> = {};
  for (const field of ["title", "description", "location", "condition", "status", "brand", "model", "storage", "transmission", "fuelType", "propertySize", "titleDocument"]) if (typeof body[field] === "string") update[field] = body[field];
  for (const field of ["price", "quantity", "year", "mileage"]) if (body[field] !== undefined && Number.isFinite(Number(body[field]))) update[field] = Number(body[field]);
  if (typeof body.featured === "boolean") update.featured = body.featured;
  return Response.json(await db.orm.public.Listing.where({ id: body.id }).update(update));
}

export async function DELETE(request: Request) {
  if (!(await isAdminAuthenticated())) return Response.json({ error: "Unauthorized" }, { status: 401 });
  const id = new URL(request.url).searchParams.get("id");
  if (!id) return Response.json({ error: "Listing id is required." }, { status: 400 });
  await db.orm.public.Listing.where({ id }).delete();
  return Response.json({ ok: true });
}
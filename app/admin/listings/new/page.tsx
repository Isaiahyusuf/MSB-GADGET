"use client";

import Image from "next/image";
import { FormEvent, useEffect, useMemo, useState } from "react";

export default function NewListingPage() {
  const [type, setType] = useState("GADGET");
  const [images, setImages] = useState<File[]>([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const previews = useMemo(
    () => images.map((image) => URL.createObjectURL(image)),
    [images]
  );

  useEffect(() => {
    return () => {
      previews.forEach((url) => URL.revokeObjectURL(url));
    };
  }, [previews]);

  function addImages(event: React.ChangeEvent<HTMLInputElement>) {
    const selectedFiles = Array.from(event.target.files || []);

    if (selectedFiles.length === 0) {
      return;
    }

    const remainingSlots = 3 - images.length;

    if (remainingSlots <= 0) {
      setMessage("❌ You can upload a maximum of 3 images.");
      return;
    }

    const filesToAdd = selectedFiles.slice(0, remainingSlots);

    setImages((previous) => [...previous, ...filesToAdd]);

    if (selectedFiles.length > remainingSlots) {
      setMessage("❌ Maximum of 3 images allowed.");
    } else {
      setMessage("");
    }

    // Allows the same image to be selected again later
    event.target.value = "";
  }

  function removeImage(index: number) {
    setImages((previous) =>
      previous.filter((_, imageIndex) => imageIndex !== index)
    );

    setMessage("");
  }

  async function uploadImages(): Promise<string[]> {
    const cloudName =
      process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;

    const uploadPreset =
      process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET;

    if (!cloudName) {
      throw new Error(
        "Cloudinary cloud name is missing. Check your .env file."
      );
    }

    if (!uploadPreset) {
      throw new Error(
        "Cloudinary upload preset is missing. Check your .env file."
      );
    }

    const uploadedUrls: string[] = [];

    for (let index = 0; index < images.length; index++) {
      const image = images[index];

      setMessage(
        `⏳ Uploading image ${index + 1} of ${images.length}...`
      );

      const uploadData = new FormData();

      uploadData.append("file", image);
      uploadData.append("upload_preset", uploadPreset);

      const response = await fetch(
        `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
        {
          method: "POST",
          body: uploadData,
        }
      );

      const result = await response.json();

      if (!response.ok) {
        console.error("CLOUDINARY ERROR:", result);

        throw new Error(
          result?.error?.message ||
            "Cloudinary rejected the image upload."
        );
      }

      if (!result.secure_url) {
        throw new Error(
          "Cloudinary uploaded the image but did not return a URL."
        );
      }

      uploadedUrls.push(result.secure_url);
    }

    return uploadedUrls;
  }

  async function handleSubmit(
    event: FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();

    const form = event.currentTarget;

    setLoading(true);
    setMessage("");

    if (images.length === 0) {
      setMessage("❌ Please add at least one product image.");
      setLoading(false);
      return;
    }

    if (images.length > 3) {
      setMessage("❌ You can upload a maximum of 3 images.");
      setLoading(false);
      return;
    }

    try {
      // Upload images to Cloudinary
      const imageUrls = await uploadImages();

      setMessage("⏳ Saving listing...");

      const formData = new FormData(form);

      const payload = {
        title: formData.get("title"),
        description: formData.get("description"),
        type,
        price: formData.get("price"),
        location: formData.get("location"),
        condition: formData.get("condition"),
        status: formData.get("status"),
        featured: formData.get("featured") === "on",
        quantity: formData.get("quantity"),

        brand: formData.get("brand"),
        model: formData.get("model"),
        storage: formData.get("storage"),

        year: formData.get("year"),
        mileage: formData.get("mileage"),
        transmission: formData.get("transmission"),
        fuelType: formData.get("fuelType"),

        propertySize: formData.get("propertySize"),
        titleDocument: formData.get("titleDocument"),

        images: imageUrls,
      };

      const response = await fetch("/api/admin/listings", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(
          result.error || "Failed to create listing."
        );
      }

      setMessage("✅ Listing added successfully!");

      form.reset();
      setType("GADGET");
      setImages([]);
    } catch (error) {
      console.error("LISTING ERROR:", error);

      setMessage(
        error instanceof Error
          ? `❌ ${error.message}`
          : "❌ Failed to add listing."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-gray-50 px-6 py-12">
      <div className="mx-auto max-w-4xl">

        {/* HEADER */}
        <div className="mb-8">
          <p className="text-sm font-bold uppercase tracking-widest text-blue-600">
            MSB Admin
          </p>

          <h1 className="mt-2 text-4xl font-black text-gray-950">
            Add New Listing
          </h1>

          <p className="mt-2 text-gray-500">
            Add a gadget, car, or land listing to the marketplace.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="space-y-8 rounded-3xl border border-gray-200 bg-white p-6 shadow-sm md:p-8"
        >

          {/* BASIC INFORMATION */}
          <section>
            <h2 className="text-xl font-black text-gray-950">
              Basic Information
            </h2>

            <div className="mt-5 grid gap-5 md:grid-cols-2">

              <div className="md:col-span-2">
                <label className="mb-2 block text-sm font-bold text-gray-800">
                  Listing Title
                </label>

                <input
                  name="title"
                  required
                  placeholder="e.g. iPhone 16 Pro Max"
                  className="w-full rounded-xl border border-gray-300 px-4 py-3 text-gray-950 outline-none focus:border-blue-600"
                />
              </div>

              {/* TYPE */}
              <div>
                <label className="mb-2 block text-sm font-bold text-gray-800">
                  Type
                </label>

                <select
                  value={type}
                  onChange={(event) =>
                    setType(event.target.value)
                  }
                  className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-gray-950 outline-none focus:border-blue-600"
                >
                  <option value="GADGET">Gadget</option>
                  <option value="CAR">Car</option>
                  <option value="LAND">Land</option>
                </select>
              </div>

              {/* PRICE */}
              <div>
                <label className="mb-2 block text-sm font-bold text-gray-800">
                  Price
                </label>

                <input
                  name="price"
                  type="number"
                  min="0"
                  required
                  placeholder="2000000"
                  className="w-full rounded-xl border border-gray-300 px-4 py-3 text-gray-950 outline-none focus:border-blue-600"
                />
              </div>

              {/* LOCATION */}
              <div>
                <label className="mb-2 block text-sm font-bold text-gray-800">
                  Location
                </label>

                <input
                  name="location"
                  required
                  placeholder="Abuja"
                  className="w-full rounded-xl border border-gray-300 px-4 py-3 text-gray-950 outline-none focus:border-blue-600"
                />
              </div>

              {/* CONDITION */}
              <div>
                <label className="mb-2 block text-sm font-bold text-gray-800">
                  Condition
                </label>

                <input
                  name="condition"
                  placeholder="Brand New"
                  className="w-full rounded-xl border border-gray-300 px-4 py-3 text-gray-950 outline-none focus:border-blue-600"
                />
              </div>

              {/* DESCRIPTION */}
              <div className="md:col-span-2">
                <label className="mb-2 block text-sm font-bold text-gray-800">
                  Description
                </label>

                <textarea
                  name="description"
                  rows={5}
                  placeholder="Describe the product..."
                  className="w-full rounded-xl border border-gray-300 px-4 py-3 text-gray-950 outline-none focus:border-blue-600"
                />
              </div>
            </div>
          </section>

          {/* IMAGES */}
          <section className="border-t border-gray-200 pt-8">
            <div className="flex items-center justify-between gap-4">
              <div>
                <h2 className="text-xl font-black text-gray-950">
                  Product Images
                </h2>

                <p className="mt-1 text-sm text-gray-500">
                  Add 1–3 images. The first image is the main image.
                </p>
              </div>

              <div className="rounded-full bg-blue-50 px-3 py-1 text-sm font-bold text-blue-600">
                {images.length}/3
              </div>
            </div>

            {/* IMAGE PREVIEWS */}
            {images.length > 0 && (
              <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-3">
                {images.map((image, index) => (
                  <div
                    key={`${image.name}-${index}`}
                    className="relative overflow-hidden rounded-2xl border border-gray-200 bg-gray-50"
                  >
                    <div className="relative h-48 w-full">
                      {previews[index] && (
                        <Image
                          src={previews[index]}
                          alt={`Product image ${index + 1}`}
                          fill
                          unoptimized
                          className="object-cover"
                        />
                      )}
                    </div>

                    <div className="flex items-center justify-between gap-2 p-3">
                      <div className="min-w-0">
                        {index === 0 && (
                          <p className="text-xs font-black uppercase text-blue-600">
                            Main Image
                          </p>
                        )}

                        <p className="mt-1 truncate text-xs text-gray-500">
                          {image.name}
                        </p>
                      </div>

                      <button
                        type="button"
                        onClick={() => removeImage(index)}
                        disabled={loading}
                        className="shrink-0 rounded-lg bg-red-50 px-3 py-2 text-xs font-bold text-red-600 hover:bg-red-100"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* ADD IMAGE BUTTON */}
            {images.length < 3 && (
              <label className="mt-5 flex cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed border-gray-300 bg-gray-50 px-6 py-10 text-center transition hover:border-blue-500 hover:bg-blue-50">
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-blue-100 text-3xl text-blue-600">
                  +
                </div>

                <p className="mt-4 font-black text-gray-950">
                  {images.length === 0
                    ? "Add Product Images"
                    : "Add More Images"}
                </p>

                <p className="mt-1 text-sm text-gray-500">
                  {images.length === 0
                    ? "Click here to select your first image"
                    : `You can add ${
                        3 - images.length
                      } more image${
                        3 - images.length === 1 ? "" : "s"
                      }`}
                </p>

                <input
                  type="file"
                  accept="image/jpeg,image/png,image/webp"
                  multiple
                  onChange={addImages}
                  className="hidden"
                />
              </label>
            )}

            {images.length === 3 && (
              <div className="mt-5 rounded-xl bg-green-50 px-4 py-3 text-sm font-bold text-green-700">
                ✓ Maximum of 3 images selected.
              </div>
            )}

            {images.length === 0 && (
              <p className="mt-3 text-sm font-semibold text-red-600">
                At least one image is required.
              </p>
            )}
          </section>

          {/* GADGET DETAILS */}
          {type === "GADGET" && (
            <section className="border-t border-gray-200 pt-8">
              <h2 className="text-xl font-black text-gray-950">
                Gadget Details
              </h2>

              <div className="mt-5 grid gap-5 md:grid-cols-2">
                <input
                  name="brand"
                  placeholder="Brand"
                  className="rounded-xl border border-gray-300 px-4 py-3 text-gray-950 outline-none focus:border-blue-600"
                />

                <input
                  name="model"
                  placeholder="Model"
                  className="rounded-xl border border-gray-300 px-4 py-3 text-gray-950 outline-none focus:border-blue-600"
                />

                <input
                  name="storage"
                  placeholder="Storage / Variant"
                  className="rounded-xl border border-gray-300 px-4 py-3 text-gray-950 outline-none focus:border-blue-600"
                />
              </div>
            </section>
          )}

          {/* CAR DETAILS */}
          {type === "CAR" && (
            <section className="border-t border-gray-200 pt-8">
              <h2 className="text-xl font-black text-gray-950">
                Car Details
              </h2>

              <div className="mt-5 grid gap-5 md:grid-cols-2">
                <input
                  name="year"
                  type="number"
                  placeholder="Year"
                  className="rounded-xl border border-gray-300 px-4 py-3 text-gray-950 outline-none focus:border-blue-600"
                />

                <input
                  name="mileage"
                  type="number"
                  placeholder="Mileage"
                  className="rounded-xl border border-gray-300 px-4 py-3 text-gray-950 outline-none focus:border-blue-600"
                />

                <input
                  name="transmission"
                  placeholder="Transmission"
                  className="rounded-xl border border-gray-300 px-4 py-3 text-gray-950 outline-none focus:border-blue-600"
                />

                <input
                  name="fuelType"
                  placeholder="Fuel Type"
                  className="rounded-xl border border-gray-300 px-4 py-3 text-gray-950 outline-none focus:border-blue-600"
                />
              </div>
            </section>
          )}

          {/* LAND DETAILS */}
          {type === "LAND" && (
            <section className="border-t border-gray-200 pt-8">
              <h2 className="text-xl font-black text-gray-950">
                Property Details
              </h2>

              <div className="mt-5 grid gap-5 md:grid-cols-2">
                <input
                  name="propertySize"
                  placeholder="Property Size"
                  className="rounded-xl border border-gray-300 px-4 py-3 text-gray-950 outline-none focus:border-blue-600"
                />

                <input
                  name="titleDocument"
                  placeholder="Title Document"
                  className="rounded-xl border border-gray-300 px-4 py-3 text-gray-950 outline-none focus:border-blue-600"
                />
              </div>
            </section>
          )}

          {/* INVENTORY */}
          <section className="border-t border-gray-200 pt-8">
            <h2 className="text-xl font-black text-gray-950">
              Inventory
            </h2>

            <div className="mt-5 grid gap-5 md:grid-cols-2">
              <div>
                <label className="mb-2 block text-sm font-bold text-gray-800">
                  Quantity
                </label>

                <input
                  name="quantity"
                  type="number"
                  min="1"
                  defaultValue="1"
                  className="w-full rounded-xl border border-gray-300 px-4 py-3 text-gray-950 outline-none focus:border-blue-600"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-bold text-gray-800">
                  Status
                </label>

                <select
                  name="status"
                  defaultValue="AVAILABLE"
                  className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-gray-950 outline-none focus:border-blue-600"
                >
                  <option value="AVAILABLE">Available</option>
                  <option value="SOLD">Sold</option>
                  <option value="RESERVED">Reserved</option>
                  <option value="HIDDEN">Hidden</option>
                </select>
              </div>
            </div>

            <label className="mt-5 flex items-center gap-3 text-sm font-bold text-gray-800">
              <input
                name="featured"
                type="checkbox"
                className="h-5 w-5"
              />
              Featured Listing
            </label>
          </section>

          {/* MESSAGE */}
          {message && (
            <div className="rounded-xl bg-gray-100 px-4 py-3 text-sm font-bold text-gray-800">
              {message}
            </div>
          )}

          {/* SUBMIT */}
          <button
            type="submit"
            disabled={loading || images.length === 0}
            className="w-full rounded-2xl bg-blue-600 px-6 py-4 font-black text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {loading
              ? "Uploading & Saving..."
              : "Add Listing"}
          </button>
        </form>
      </div>
    </main>
  );
}

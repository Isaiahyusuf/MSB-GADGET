"use client";

import { useState } from "react";
import Link from "next/link";

type ListingType = "gadget" | "car" | "land";

export default function AddListingPage() {
  const [listingType, setListingType] = useState<ListingType>("gadget");

  return (
    <main className="min-h-screen bg-gray-100">
      <div className="mx-auto max-w-6xl px-6 py-10">

        {/* HEADER */}
        <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <Link
              href="/admin"
              className="text-sm font-semibold text-blue-600 hover:text-blue-700"
            >
              ← Back to Dashboard
            </Link>

            <h1 className="mt-3 text-3xl font-black text-gray-950 md:text-4xl">
              Add New Listing
            </h1>

            <p className="mt-2 text-gray-500">
              Add a new gadget, car or land/property to your marketplace.
            </p>
          </div>

          <div className="rounded-xl bg-white px-4 py-3 text-sm font-semibold text-gray-600 shadow-sm">
            MSB Admin
          </div>
        </div>

        {/* LISTING TYPE */}
        <section className="mt-8 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
          <h2 className="text-lg font-black text-gray-950">
            What are you listing?
          </h2>

          <p className="mt-1 text-sm text-gray-500">
            Select the category that best describes your listing.
          </p>

          <div className="mt-6 grid gap-4 md:grid-cols-3">

            {/* GADGET */}
            <button
              type="button"
              onClick={() => setListingType("gadget")}
              className={`rounded-2xl border p-5 text-left transition ${
                listingType === "gadget"
                  ? "border-blue-600 bg-blue-50 ring-2 ring-blue-600"
                  : "border-gray-200 hover:border-blue-300 hover:bg-gray-50"
              }`}
            >
              <div className="text-4xl">📱</div>

              <h3 className="mt-4 font-black text-gray-950">
                Gadget
              </h3>

              <p className="mt-1 text-sm text-gray-500">
                Phones, laptops, tablets, gaming, audio and more.
              </p>
            </button>

            {/* CAR */}
            <button
              type="button"
              onClick={() => setListingType("car")}
              className={`rounded-2xl border p-5 text-left transition ${
                listingType === "car"
                  ? "border-blue-600 bg-blue-50 ring-2 ring-blue-600"
                  : "border-gray-200 hover:border-blue-300 hover:bg-gray-50"
              }`}
            >
              <div className="text-4xl">🚗</div>

              <h3 className="mt-4 font-black text-gray-950">
                Car
              </h3>

              <p className="mt-1 text-sm text-gray-500">
                Cars, SUVs, trucks and other vehicles.
              </p>
            </button>

            {/* LAND */}
            <button
              type="button"
              onClick={() => setListingType("land")}
              className={`rounded-2xl border p-5 text-left transition ${
                listingType === "land"
                  ? "border-blue-600 bg-blue-50 ring-2 ring-blue-600"
                  : "border-gray-200 hover:border-blue-300 hover:bg-gray-50"
              }`}
            >
              <div className="text-4xl">🏡</div>

              <h3 className="mt-4 font-black text-gray-950">
                Land / Property
              </h3>

              <p className="mt-1 text-sm text-gray-500">
                Land, residential and commercial properties.
              </p>
            </button>

          </div>
        </section>

        {/* FORM */}
        <form className="mt-8 space-y-8">

          {/* BASIC INFORMATION */}
          <section className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">

            <h2 className="text-xl font-black text-gray-950">
              Basic Information
            </h2>

            <p className="mt-1 text-sm text-gray-500">
              Enter the main information about this listing.
            </p>

            <div className="mt-6 grid gap-6 md:grid-cols-2">

              {/* NAME */}
              <div className="md:col-span-2">
                <label className="text-sm font-bold text-gray-700">
                  {listingType === "gadget"
                    ? "Product Name"
                    : listingType === "car"
                    ? "Car Name"
                    : "Property Title"}
                </label>

                <input
                  type="text"
                  placeholder={
                    listingType === "gadget"
                      ? "e.g. iPhone 16 Pro Max"
                      : listingType === "car"
                      ? "e.g. Toyota Land Cruiser"
                      : "e.g. Premium Residential Land"
                  }
                  className="mt-2 w-full rounded-xl border border-gray-200 px-4 py-3 outline-none transition focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
                />
              </div>

              {/* CATEGORY */}
              <div>
                <label className="text-sm font-bold text-gray-700">
                  Category
                </label>

                <select className="mt-2 w-full rounded-xl border border-gray-200 bg-white px-4 py-3 outline-none focus:border-blue-600">
                  {listingType === "gadget" && (
                    <>
                      <option>Phones</option>
                      <option>Laptops</option>
                      <option>Tablets</option>
                      <option>Audio</option>
                      <option>Smartwatches</option>
                      <option>Gaming</option>
                      <option>Cameras</option>
                      <option>Accessories</option>
                      <option>TVs & Monitors</option>
                      <option>Power & Charging</option>
                      <option>Smart Home</option>
                      <option>Networking</option>
                      <option>Other Gadgets</option>
                    </>
                  )}

                  {listingType === "car" && (
                    <>
                      <option>Sedan</option>
                      <option>SUV</option>
                      <option>Truck</option>
                      <option>Coupe</option>
                      <option>Van</option>
                      <option>Other Vehicle</option>
                    </>
                  )}

                  {listingType === "land" && (
                    <>
                      <option>Residential Land</option>
                      <option>Commercial Land</option>
                      <option>Residential Property</option>
                      <option>Commercial Property</option>
                      <option>Other Property</option>
                    </>
                  )}
                </select>
              </div>

              {/* PRICE */}
              <div>
                <label className="text-sm font-bold text-gray-700">
                  Price (₦)
                </label>

                <input
                  type="number"
                  placeholder="Enter price"
                  className="mt-2 w-full rounded-xl border border-gray-200 px-4 py-3 outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
                />
              </div>

              {/* CONDITION */}
              {listingType !== "land" && (
                <div>
                  <label className="text-sm font-bold text-gray-700">
                    Condition
                  </label>

                  <select className="mt-2 w-full rounded-xl border border-gray-200 bg-white px-4 py-3 outline-none focus:border-blue-600">
                    <option>Brand New</option>
                    <option>UK Used</option>
                    <option>Nigerian Used</option>
                    <option>Refurbished</option>
                  </select>
                </div>
              )}

              {/* LOCATION */}
              <div>
                <label className="text-sm font-bold text-gray-700">
                  Location
                </label>

                <input
                  type="text"
                  placeholder="e.g. Abuja, Nigeria"
                  className="mt-2 w-full rounded-xl border border-gray-200 px-4 py-3 outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
                />
              </div>

            </div>
          </section>

          {/* GADGET DETAILS */}
          {listingType === "gadget" && (
            <section className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
              <h2 className="text-xl font-black text-gray-950">
                Gadget Details
              </h2>

              <div className="mt-6 grid gap-6 md:grid-cols-2">

                <div>
                  <label className="text-sm font-bold text-gray-700">
                    Brand
                  </label>

                  <input
                    type="text"
                    placeholder="e.g. Apple"
                    className="mt-2 w-full rounded-xl border border-gray-200 px-4 py-3 outline-none focus:border-blue-600"
                  />
                </div>

                <div>
                  <label className="text-sm font-bold text-gray-700">
                    Model
                  </label>

                  <input
                    type="text"
                    placeholder="e.g. iPhone 16 Pro Max"
                    className="mt-2 w-full rounded-xl border border-gray-200 px-4 py-3 outline-none focus:border-blue-600"
                  />
                </div>

                <div>
                  <label className="text-sm font-bold text-gray-700">
                    Storage
                  </label>

                  <input
                    type="text"
                    placeholder="e.g. 256GB"
                    className="mt-2 w-full rounded-xl border border-gray-200 px-4 py-3 outline-none focus:border-blue-600"
                  />
                </div>

                <div>
                  <label className="text-sm font-bold text-gray-700">
                    Quantity
                  </label>

                  <input
                    type="number"
                    placeholder="Available quantity"
                    className="mt-2 w-full rounded-xl border border-gray-200 px-4 py-3 outline-none focus:border-blue-600"
                  />
                </div>

              </div>
            </section>
          )}

          {/* CAR DETAILS */}
          {listingType === "car" && (
            <section className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
              <h2 className="text-xl font-black text-gray-950">
                Vehicle Details
              </h2>

              <div className="mt-6 grid gap-6 md:grid-cols-2">

                <div>
                  <label className="text-sm font-bold text-gray-700">
                    Make
                  </label>

                  <input
                    type="text"
                    placeholder="e.g. Toyota"
                    className="mt-2 w-full rounded-xl border border-gray-200 px-4 py-3 outline-none focus:border-blue-600"
                  />
                </div>

                <div>
                  <label className="text-sm font-bold text-gray-700">
                    Model
                  </label>

                  <input
                    type="text"
                    placeholder="e.g. Land Cruiser"
                    className="mt-2 w-full rounded-xl border border-gray-200 px-4 py-3 outline-none focus:border-blue-600"
                  />
                </div>

                <div>
                  <label className="text-sm font-bold text-gray-700">
                    Year
                  </label>

                  <input
                    type="number"
                    placeholder="e.g. 2024"
                    className="mt-2 w-full rounded-xl border border-gray-200 px-4 py-3 outline-none focus:border-blue-600"
                  />
                </div>

                <div>
                  <label className="text-sm font-bold text-gray-700">
                    Mileage
                  </label>

                  <input
                    type="text"
                    placeholder="e.g. 35,000 km"
                    className="mt-2 w-full rounded-xl border border-gray-200 px-4 py-3 outline-none focus:border-blue-600"
                  />
                </div>

                <div>
                  <label className="text-sm font-bold text-gray-700">
                    Transmission
                  </label>

                  <select className="mt-2 w-full rounded-xl border border-gray-200 bg-white px-4 py-3 outline-none focus:border-blue-600">
                    <option>Automatic</option>
                    <option>Manual</option>
                  </select>
                </div>

                <div>
                  <label className="text-sm font-bold text-gray-700">
                    Fuel Type
                  </label>

                  <select className="mt-2 w-full rounded-xl border border-gray-200 bg-white px-4 py-3 outline-none focus:border-blue-600">
                    <option>Petrol</option>
                    <option>Diesel</option>
                    <option>Hybrid</option>
                    <option>Electric</option>
                  </select>
                </div>

              </div>
            </section>
          )}

          {/* LAND DETAILS */}
          {listingType === "land" && (
            <section className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
              <h2 className="text-xl font-black text-gray-950">
                Property Details
              </h2>

              <div className="mt-6 grid gap-6 md:grid-cols-2">

                <div>
                  <label className="text-sm font-bold text-gray-700">
                    Property Size
                  </label>

                  <input
                    type="text"
                    placeholder="e.g. 500 sqm"
                    className="mt-2 w-full rounded-xl border border-gray-200 px-4 py-3 outline-none focus:border-blue-600"
                  />
                </div>

                <div>
                  <label className="text-sm font-bold text-gray-700">
                    Title Document
                  </label>

                  <select className="mt-2 w-full rounded-xl border border-gray-200 bg-white px-4 py-3 outline-none focus:border-blue-600">
                    <option>C of O</option>
                    <option>Governor&apos;s Consent</option>
                    <option>Deed of Assignment</option>
                    <option>Survey Plan</option>
                    <option>Other</option>
                  </select>
                </div>

                <div className="md:col-span-2">
                  <label className="text-sm font-bold text-gray-700">
                    Exact Area / Address
                  </label>

                  <input
                    type="text"
                    placeholder="Enter property location"
                    className="mt-2 w-full rounded-xl border border-gray-200 px-4 py-3 outline-none focus:border-blue-600"
                  />
                </div>

              </div>
            </section>
          )}

          {/* DESCRIPTION */}
          <section className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
            <h2 className="text-xl font-black text-gray-950">
              Description
            </h2>

            <textarea
              rows={7}
              placeholder="Describe this listing in detail..."
              className="mt-5 w-full resize-none rounded-xl border border-gray-200 px-4 py-3 outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
            />
          </section>

          {/* IMAGES */}
          <section className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
            <h2 className="text-xl font-black text-gray-950">
              Listing Images
            </h2>

            <p className="mt-1 text-sm text-gray-500">
              Upload clear, high-quality images of the listing.
            </p>

            <div className="mt-5 rounded-2xl border-2 border-dashed border-gray-300 p-10 text-center">
              <div className="text-5xl">📸</div>

              <h3 className="mt-4 font-black text-gray-950">
                Upload Images
              </h3>

              <p className="mt-2 text-sm text-gray-500">
                Image uploading will be connected to cloud storage later.
              </p>

              <button
                type="button"
                className="mt-5 rounded-xl border border-gray-200 px-5 py-3 text-sm font-bold text-gray-700 hover:bg-gray-50"
              >
                Choose Images
              </button>
            </div>
          </section>

          {/* ACTIONS */}
          <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">

            <Link
              href="/admin"
              className="rounded-xl border border-gray-200 bg-white px-7 py-4 text-center font-bold text-gray-700 hover:bg-gray-50"
            >
              Cancel
            </Link>

            <button
              type="button"
              className="rounded-xl bg-blue-600 px-7 py-4 font-bold text-white transition hover:bg-blue-700"
            >
              Publish Listing
            </button>

          </div>

        </form>
      </div>
    </main>
  );
}
import Link from "next/link";
import AdminListings from "./AdminListings";

export default function ListingsPage() {
  return <main className="min-h-screen bg-gray-100 p-6 lg:p-10"><div className="mx-auto max-w-6xl"><div className="flex flex-wrap items-end justify-between gap-4"><div><h1 className="text-3xl font-black text-gray-900">Listings</h1><p className="mt-2 text-gray-600">Manage inventory visibility and availability.</p></div><Link href="/admin/listings/new" className="rounded-xl bg-blue-600 px-5 py-3 font-bold text-white">Add listing</Link></div><AdminListings /></div></main>;
}

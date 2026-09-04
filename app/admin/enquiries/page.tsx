import { db } from "@/lib/db";
import { isAdminAuthenticated } from "@/lib/admin-auth";

export default async function EnquiriesPage() {
  if (!(await isAdminAuthenticated())) return null;
  const enquiries = await db.orm.public.Enquiry.all();
  return <main className="min-h-screen bg-gray-100 p-6 lg:p-10"><div className="mx-auto max-w-6xl"><h1 className="text-3xl font-black">Enquiries</h1><div className="mt-8 space-y-3">{enquiries.map((enquiry) => <article key={enquiry.id} className="rounded-2xl border bg-white p-5"><p className="font-black">{enquiry.name} · {enquiry.phone}</p><p className="mt-2 text-gray-600">{enquiry.message}</p><p className="mt-2 text-xs text-gray-400">Listing: {enquiry.listingId}</p></article>)}{!enquiries.length && <p className="rounded-2xl border border-dashed bg-white p-12 text-center text-gray-500">No enquiries yet.</p>}</div></div></main>;
}
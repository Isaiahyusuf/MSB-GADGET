import { db } from "@/lib/db";
import { isAdminAuthenticated } from "@/lib/admin-auth";

export default async function CustomersPage() {
  if (!(await isAdminAuthenticated())) return null;
  const users = await db.orm.public.User.all();
  return <main className="min-h-screen bg-gray-100 p-6 lg:p-10"><div className="mx-auto max-w-6xl"><h1 className="text-3xl font-black">Customers</h1><div className="mt-8 space-y-3">{users.map((user) => <article key={user.id} className="rounded-2xl border bg-white p-5"><p className="font-black">{user.name}</p><p className="text-sm text-gray-500">{user.email}{user.phone ? ` · ${user.phone}` : ""}</p></article>)}{!users.length && <p className="rounded-2xl border border-dashed bg-white p-12 text-center text-gray-500">No customers yet.</p>}</div></div></main>;
}
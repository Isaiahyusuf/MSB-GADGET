import { redirect } from "next/navigation";
import Link from "next/link";
import { getCurrentCustomer } from "@/lib/customer-auth";

export default async function AccountPage() {
  const user = await getCurrentCustomer();
  if (!user) redirect("/login?next=/account");

  return (
    <main className="mx-auto min-h-screen max-w-5xl px-6 py-12">
      <p className="text-sm font-bold uppercase tracking-widest text-blue-600">My account</p>
      <h1 className="mt-2 text-4xl font-black text-gray-950">Welcome, {user.name}</h1>
      <p className="mt-3 text-gray-500">{user.email}</p>
      <Link href="/account/orders" className="mt-8 inline-block rounded-xl bg-gray-950 px-5 py-3 font-bold text-white">View order history</Link>
    </main>
  );
}
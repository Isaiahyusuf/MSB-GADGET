import Link from "next/link";
import { redirect } from "next/navigation";
import { getCurrentCustomer } from "@/lib/customer-auth";
import { db } from "@/lib/db";
import { formatNaira } from "@/lib/format";

export default async function OrdersPage() {
  const user = await getCurrentCustomer();
  if (!user) redirect("/login?next=/account/orders");
  const orders = await db.orm.public.Order.where({ userId: user.id }).all();
  return <main className="mx-auto min-h-screen max-w-5xl px-6 py-12"><Link href="/account" className="text-sm font-bold text-blue-600">← Account</Link><h1 className="mt-4 text-4xl font-black">Order history</h1>{orders.length ? <div className="mt-8 space-y-4">{orders.map((order) => <Link href={`/account/orders/${order.id}`} key={order.id} className="block rounded-2xl border border-gray-200 bg-white p-6 transition hover:border-blue-500"><div className="flex flex-wrap justify-between gap-3"><div><p className="font-black">Order {order.id}</p><p className="mt-1 text-sm text-gray-500">{new Date(order.createdAt).toLocaleDateString("en-NG")}</p></div><div className="text-right"><p className="font-black">{formatNaira(order.totalAmount)}</p><p className="mt-1 text-sm font-bold text-blue-600">{order.paymentStatus}</p></div></div></Link>)}</div> : <div className="mt-8 rounded-2xl border border-dashed p-12 text-center text-gray-500">You have no orders yet.</div>}</main>;
}

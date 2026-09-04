import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { getCurrentCustomer } from "@/lib/customer-auth";
import { db } from "@/lib/db";
import { formatNaira } from "@/lib/format";

export default async function OrderDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const user = await getCurrentCustomer();
  if (!user) redirect(`/login?next=/account/orders/${(await params).id}`);
  const order = await db.orm.public.Order.where({ id: (await params).id, userId: user.id }).include("items").first();
  if (!order) notFound();
  return <main className="mx-auto min-h-screen max-w-4xl px-6 py-12"><Link href="/account/orders" className="text-sm font-bold text-blue-600">← Order history</Link><div className="mt-5 flex flex-wrap justify-between gap-4"><div><h1 className="text-3xl font-black">Order details</h1><p className="mt-2 text-sm text-gray-500">{order.id} · {new Date(order.createdAt).toLocaleString("en-NG")}</p></div><div className="text-right"><p className="font-bold">{order.orderStatus}</p><p className="text-sm font-bold text-blue-600">{order.paymentStatus}</p></div></div><section className="mt-8 rounded-2xl border bg-white p-6"><h2 className="text-xl font-black">Items</h2><div className="mt-5 divide-y">{order.items.map((item) => <div key={String(item.id)} className="flex justify-between gap-4 py-4"><div><p className="font-bold">{String(item.title)}</p><p className="text-sm text-gray-500">Quantity: {String(item.quantity)}</p></div><p className="font-bold">{formatNaira(Number(item.unitPrice) * Number(item.quantity))}</p></div>)}</div><div className="mt-5 flex justify-between border-t pt-5 text-lg"><span>Total</span><strong>{formatNaira(order.totalAmount)}</strong></div></section>{order.paymentStatus === "PAYMENT_REJECTED" && <p className="mt-5 rounded-xl bg-red-50 p-4 text-sm font-bold text-red-700">Payment was rejected. Please contact MSB support.</p>}</main>;
}

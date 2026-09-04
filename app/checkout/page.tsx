"use client";

import Link from "next/link";
import { FormEvent, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useCart } from "@/components/CartProvider";
import { formatNaira, whatsappUrl } from "@/lib/format";

export default function CheckoutPage() {
  const router = useRouter();
  const { items, total } = useCart();
  const [user, setUser] = useState<{ name: string; email: string } | null>(null);
  const [form, setForm] = useState({ phone: "", address: "" });
  const [error, setError] = useState("");
  const [order, setOrder] = useState<{ orderId: string; totalAmount: number; paymentAccount?: { bankName: string; accountName: string; accountNumber: string; instructions: string | null } | null } | null>(null);

  useEffect(() => { fetch("/api/auth/me").then((response) => response.json()).then((result) => setUser(result.user)); }, []);
  async function submit(event: FormEvent) {
    event.preventDefault(); setError("");
    if (!user) { router.push("/register?next=/checkout"); return; }
    const response = await fetch("/api/orders", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ items: items.map((item) => ({ id: item.id, quantity: item.cartQuantity })), ...form }) });
    const result = await response.json();
    if (!response.ok) { setError(result.error || "Unable to create order."); return; }
    setOrder(result);
  }
  if (!items.length && !order) return <main className="mx-auto max-w-4xl px-6 py-16 text-center"><h1 className="text-3xl font-black">Your cart is empty</h1><Link href="/gadgets" className="mt-5 inline-block font-bold text-blue-600">Continue shopping</Link></main>;
  return <main className="mx-auto min-h-screen max-w-5xl px-6 py-12"><p className="text-sm font-bold uppercase tracking-widest text-blue-600">Checkout</p><h1 className="mt-2 text-4xl font-black">Complete your order</h1>{order ? <section className="mt-10 rounded-2xl border border-green-200 bg-green-50 p-8"><h2 className="text-2xl font-black text-green-900">Order created</h2><p className="mt-2 text-green-800">Order ID: {order.orderId}</p><p className="mt-1 font-black text-green-900">Amount: {formatNaira(order.totalAmount)}</p>{order.paymentAccount ? <div className="mt-6 rounded-xl bg-white p-5"><p><strong>Bank:</strong> {order.paymentAccount.bankName}</p><p><strong>Account name:</strong> {order.paymentAccount.accountName}</p><p><strong>Account number:</strong> {order.paymentAccount.accountNumber}</p>{order.paymentAccount.instructions && <p className="mt-3">{order.paymentAccount.instructions}</p>}</div> : <p className="mt-5 text-green-800">Payment instructions will be provided by support.</p>}<a target="_blank" rel="noreferrer" href={whatsappUrl(process.env.NEXT_PUBLIC_WHATSAPP_NUMBER, `Payment evidence for MSB order ${order.orderId}. Customer: ${user?.name || "Customer"}. Amount: ${formatNaira(order.totalAmount)}. I will send my transfer receipt here.`)} className="mt-6 inline-block rounded-xl bg-green-600 px-5 py-3 font-bold text-white">Send Payment Evidence on WhatsApp</a></section> : <form onSubmit={submit} className="mt-10 max-w-xl space-y-5"><p className="text-gray-600">{user ? `Checking out as ${user.email}` : "Create an account or sign in at checkout. Your guest cart will remain intact."}</p><input placeholder="Phone number" required value={form.phone} onChange={(event) => setForm({ ...form, phone: event.target.value })} className="w-full rounded-xl border px-4 py-3" /><textarea placeholder="Delivery or contact address" value={form.address} onChange={(event) => setForm({ ...form, address: event.target.value })} className="min-h-28 w-full rounded-xl border px-4 py-3" />{error && <p className="text-sm font-bold text-red-600">{error}</p>}<div className="flex items-center justify-between border-t pt-5"><strong>{formatNaira(total)}</strong><button className="rounded-xl bg-blue-600 px-6 py-3 font-bold text-white">{user ? "Place order" : "Create account to checkout"}</button></div></form>}</main>;
}
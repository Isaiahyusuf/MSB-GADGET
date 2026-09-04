"use client";

import { useState } from "react";

export default function OrderActions({ id, paymentStatus, orderStatus }: { id: string; paymentStatus: string; orderStatus: string }) {
  const [state, setState] = useState({ paymentStatus, orderStatus });
  const [message, setMessage] = useState("");
  async function update(values: Partial<typeof state>) { const response = await fetch(`/api/admin/orders/${id}`, { method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify(values) }); const result = await response.json(); setMessage(response.ok ? "Updated" : result.error || "Update failed"); if (response.ok) setState({ ...state, ...values }); }
  return <div className="flex flex-wrap items-center gap-2"><button type="button" onClick={() => update({ paymentStatus: "PAYMENT_CONFIRMED" })} disabled={state.paymentStatus === "PAYMENT_CONFIRMED"} className="rounded-lg bg-green-600 px-3 py-2 text-xs font-bold text-white disabled:opacity-40">Confirm payment</button><button type="button" onClick={() => update({ paymentStatus: "PAYMENT_REJECTED" })} disabled={state.paymentStatus === "PAYMENT_REJECTED"} className="rounded-lg bg-red-600 px-3 py-2 text-xs font-bold text-white disabled:opacity-40">Reject payment</button><select value={state.orderStatus} onChange={(event) => update({ orderStatus: event.target.value })} className="rounded-lg border px-2 py-2 text-xs"><option>PENDING</option><option>PROCESSING</option><option>CONFIRMED</option><option>COMPLETED</option><option>CANCELLED</option></select>{message && <span className="text-xs text-gray-500">{message}</span>}</div>;
}
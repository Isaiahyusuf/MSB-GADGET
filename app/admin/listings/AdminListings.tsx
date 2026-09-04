"use client";

import { useEffect, useState } from "react";
import { formatNaira } from "@/lib/format";

type Row = { id: string; title: string; type: string; price: number; quantity: number; status: string; featured: boolean };

export default function AdminListings() {
  const [rows, setRows] = useState<Row[]>([]);
  const [message, setMessage] = useState("");
  async function load() { const response = await fetch("/api/admin/listings"); if (response.ok) setRows(await response.json()); }
  useEffect(() => {
    const timer = window.setTimeout(() => { void load(); }, 0);
    return () => window.clearTimeout(timer);
  }, []);
  async function update(id: string, values: Record<string, unknown>) { const response = await fetch("/api/admin/listings", { method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ id, ...values }) }); setMessage(response.ok ? "Listing updated." : "Update failed."); load(); }
  async function remove(id: string) { if (!window.confirm("Delete this listing?")) return; const response = await fetch(`/api/admin/listings?id=${id}`, { method: "DELETE" }); setMessage(response.ok ? "Listing deleted." : "Delete failed."); load(); }
  return <div className="mt-8 space-y-4">{message && <p className="text-sm font-bold text-green-700">{message}</p>}{rows.map((row) => <article key={row.id} className="rounded-2xl border border-gray-200 bg-white p-5"><div className="flex flex-wrap items-center justify-between gap-4"><div><p className="text-xs font-bold uppercase text-blue-600">{row.type}</p><h2 className="font-black">{row.title}</h2><p className="text-sm text-gray-500">{formatNaira(row.price)} · {row.quantity} in stock · {row.status}</p></div><div className="flex flex-wrap gap-2"><button type="button" onClick={() => update(row.id, { status: row.status === "HIDDEN" ? "AVAILABLE" : "HIDDEN" })} className="rounded-lg border px-3 py-2 text-sm font-bold">{row.status === "HIDDEN" ? "Publish" : "Hide"}</button><button type="button" onClick={() => update(row.id, { status: row.status === "SOLD" ? "AVAILABLE" : "SOLD" })} className="rounded-lg border px-3 py-2 text-sm font-bold">{row.status === "SOLD" ? "Mark available" : "Mark sold"}</button><button type="button" onClick={() => remove(row.id)} className="rounded-lg bg-red-600 px-3 py-2 text-sm font-bold text-white">Delete</button></div></div></article>)}{!rows.length && <p className="rounded-2xl border border-dashed p-12 text-center text-gray-500">No listings yet.</p>}</div>;
}

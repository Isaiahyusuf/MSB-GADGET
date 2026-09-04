"use client";

import { FormEvent, useState } from "react";

export default function PaymentAccountForm() {
  const [form, setForm] = useState({ bankName: "", accountName: "", accountNumber: "", instructions: "", active: false });
  const [message, setMessage] = useState("");
  async function submit(event: FormEvent) {
    event.preventDefault();
    const response = await fetch("/api/admin/payment-accounts", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(form) });
    setMessage(response.ok ? "Payment account added." : "Unable to add payment account.");
    if (response.ok) setForm({ bankName: "", accountName: "", accountNumber: "", instructions: "", active: false });
  }
  return <form onSubmit={submit} className="mt-8 grid gap-3 rounded-2xl border bg-white p-5 md:grid-cols-2"><h2 className="md:col-span-2 text-xl font-black">Add account</h2>{(["bankName", "accountName", "accountNumber", "instructions"] as const).map((field) => <input key={field} required={field !== "instructions"} placeholder={field.replace(/([A-Z])/g, " $1")} value={form[field]} onChange={(event) => setForm({ ...form, [field]: event.target.value })} className="rounded-xl border px-4 py-3" />)}<label className="flex items-center gap-2 text-sm"><input type="checkbox" checked={form.active} onChange={(event) => setForm({ ...form, active: event.target.checked })} /> Set active</label><button className="rounded-xl bg-blue-600 px-5 py-3 font-bold text-white">Add payment account</button>{message && <p className="md:col-span-2 text-sm font-bold text-green-700">{message}</p>}</form>;
}

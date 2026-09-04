"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
  const router = useRouter();
  const [form, setForm] = useState({ name: "", email: "", phone: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function submit(event: FormEvent) {
    event.preventDefault();
    setLoading(true);
    setError("");
    const response = await fetch("/api/auth/register", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(form) });
    if (!response.ok) {
      const result = await response.json();
      setError(result.error || "Unable to create account.");
      setLoading(false);
      return;
    }
    router.push("/account");
    router.refresh();
  }

  return (
    <main className="flex min-h-[calc(100vh-5rem)] items-center justify-center bg-gray-50 px-6 py-12">
      <form onSubmit={submit} className="w-full max-w-md rounded-2xl border border-gray-200 bg-white p-8 shadow-sm">
        <p className="text-sm font-bold uppercase tracking-widest text-blue-600">MSB Marketplace</p>
        <h1 className="mt-3 text-3xl font-black text-gray-950">Create your account</h1>
        <p className="mt-2 text-gray-500">Your cart stays ready while you complete checkout.</p>
        {(["name", "email", "phone", "password"] as const).map((field) => (
          <label key={field} className="mt-4 block text-sm font-bold capitalize text-gray-800">
            {field}
            <input type={field === "password" ? "password" : field === "email" ? "email" : "text"} required={field !== "phone"} value={form[field]} onChange={(event) => setForm({ ...form, [field]: event.target.value })} className="mt-2 w-full rounded-xl border border-gray-300 px-4 py-3 text-gray-950 outline-none focus:border-blue-600" />
          </label>
        ))}
        {error && <p className="mt-3 text-sm font-semibold text-red-600">{error}</p>}
        <button type="submit" disabled={loading} className="mt-6 w-full rounded-xl bg-blue-600 px-5 py-3 font-bold text-white disabled:opacity-60">{loading ? "Creating account..." : "Create account"}</button>
        <p className="mt-5 text-center text-sm text-gray-500">Already registered? <Link href="/login" className="font-bold text-blue-600">Sign in</Link></p>
      </form>
    </main>
  );
}

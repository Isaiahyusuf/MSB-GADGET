"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export default function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setError("");
    const response = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    if (!response.ok) {
      setError("Invalid email or password.");
      setLoading(false);
      return;
    }
    router.push(searchParams.get("next") || "/account");
    router.refresh();
  }

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-md rounded-2xl border border-gray-200 bg-white p-8 shadow-sm">
      <p className="text-sm font-bold uppercase tracking-widest text-blue-600">MSB Marketplace</p>
      <h1 className="mt-3 text-3xl font-black text-gray-950">Welcome back</h1>
      <p className="mt-2 text-gray-500">Sign in to view your orders and check out.</p>
      <label className="mt-8 block text-sm font-bold text-gray-800" htmlFor="email">Email</label>
      <input id="email" type="email" value={email} onChange={(event) => setEmail(event.target.value)} required className="mt-2 w-full rounded-xl border border-gray-300 px-4 py-3 text-gray-950 outline-none focus:border-blue-600" />
      <label className="mt-4 block text-sm font-bold text-gray-800" htmlFor="password">Password</label>
      <input id="password" type="password" value={password} onChange={(event) => setPassword(event.target.value)} required className="mt-2 w-full rounded-xl border border-gray-300 px-4 py-3 text-gray-950 outline-none focus:border-blue-600" />
      {error && <p className="mt-3 text-sm font-semibold text-red-600">{error}</p>}
      <button type="submit" disabled={loading} className="mt-6 w-full rounded-xl bg-blue-600 px-5 py-3 font-bold text-white disabled:opacity-60">{loading ? "Signing in..." : "Sign in"}</button>
      <p className="mt-5 text-center text-sm text-gray-500">New here? <Link href="/register" className="font-bold text-blue-600">Create an account</Link></p>
    </form>
  );
}

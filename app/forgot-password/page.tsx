"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const response = await fetch("/api/auth/forgot-password", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ email }) });
    const result = await response.json();
    setMessage(result.message || "If an account exists, reset instructions are ready.");
  }

  return <main className="flex min-h-[calc(100vh-5rem)] items-center justify-center bg-gray-50 px-6 py-12"><form onSubmit={submit} className="w-full max-w-md rounded-2xl border border-gray-200 bg-white p-8 shadow-sm"><p className="text-sm font-bold uppercase tracking-widest text-blue-600">MSB Marketplace</p><h1 className="mt-3 text-3xl font-black">Forgot password?</h1><p className="mt-2 text-gray-500">Enter your email and we&apos;ll prepare a secure reset link.</p><label className="mt-8 block text-sm font-bold" htmlFor="email">Email</label><input id="email" type="email" required value={email} onChange={(event) => setEmail(event.target.value)} className="mt-2 w-full rounded-xl border px-4 py-3" />{message && <p className="mt-4 rounded-xl bg-blue-50 p-4 text-sm text-blue-800">{message}</p>}<button className="mt-6 w-full rounded-xl bg-blue-600 px-5 py-3 font-bold text-white">Prepare reset link</button><Link href="/login" className="mt-5 block text-center text-sm font-bold text-blue-600">Back to sign in</Link></form></main>;
}
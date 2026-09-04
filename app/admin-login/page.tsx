"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminLoginPage() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    const response = await fetch("/api/admin/auth", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    });
    if (!response.ok) {
      setError("Invalid administrator password.");
      return;
    }
    router.push("/admin");
    router.refresh();
  }

  return (
    <main className="flex min-h-[calc(100vh-5rem)] items-center justify-center bg-gray-50 px-6 py-12">
      <form onSubmit={submit} className="w-full max-w-md rounded-2xl border border-gray-200 bg-white p-8 shadow-sm">
        <p className="text-sm font-bold uppercase tracking-widest text-blue-600">MSB Admin</p>
        <h1 className="mt-3 text-3xl font-black text-gray-950">Administrator sign in</h1>
        <label className="mt-8 block text-sm font-bold text-gray-800" htmlFor="admin-password">Password</label>
        <input id="admin-password" type="password" required value={password} onChange={(event) => setPassword(event.target.value)} className="mt-2 w-full rounded-xl border border-gray-300 px-4 py-3 text-gray-950 outline-none focus:border-blue-600" />
        {error && <p className="mt-3 text-sm font-semibold text-red-600">{error}</p>}
        <button type="submit" className="mt-6 w-full rounded-xl bg-blue-600 px-5 py-3 font-bold text-white">Sign in</button>
      </form>
    </main>
  );
}
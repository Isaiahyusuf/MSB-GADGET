"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";
import { useSearchParams } from "next/navigation";
import { passwordRequirements } from "@/lib/password-policy";

export default function ResetPasswordForm() {
  const params = useSearchParams();
  const [password, setPassword] = useState("");
  const [confirmation, setConfirmation] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault(); setError(""); setMessage("");
    const response = await fetch("/api/auth/reset-password", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ token: params.get("token"), password, confirmation }) });
    const result = await response.json();
    if (!response.ok) { setError(result.error || "Unable to reset password."); return; }
    setMessage(result.message);
  }

  return <form onSubmit={submit} className="w-full max-w-md rounded-2xl border border-gray-200 bg-white p-8 shadow-sm"><p className="text-sm font-bold uppercase tracking-widest text-blue-600">MSB Marketplace</p><h1 className="mt-3 text-3xl font-black">Set a new password</h1><label className="mt-8 block text-sm font-bold" htmlFor="password">New password</label><input id="password" type="password" required value={password} onChange={(event) => setPassword(event.target.value)} className="mt-2 w-full rounded-xl border px-4 py-3" /><label className="mt-4 block text-sm font-bold" htmlFor="confirmation">Confirm password</label><input id="confirmation" type="password" required value={confirmation} onChange={(event) => setConfirmation(event.target.value)} className="mt-2 w-full rounded-xl border px-4 py-3" /><ul className="mt-4 space-y-1 text-xs text-gray-500">{passwordRequirements.map((requirement) => <li key={requirement}>• {requirement}</li>)}</ul>{error && <p className="mt-4 text-sm font-bold text-red-600">{error}</p>}{message && <p className="mt-4 text-sm font-bold text-green-700">{message} <Link href="/login" className="underline">Sign in</Link></p>}<button className="mt-6 w-full rounded-xl bg-blue-600 px-5 py-3 font-bold text-white">Update password</button></form>;
}

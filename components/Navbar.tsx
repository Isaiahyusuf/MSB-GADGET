"use client";

import Link from "next/link";
import { useState } from "react";
import { useCart } from "@/components/CartProvider";

export default function Navbar() {
  const { count } = useCart();
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-50 border-b border-gray-200 bg-white/95 backdrop-blur">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6">

        {/* LOGO */}
        <Link href="/" className="flex flex-col">
          <span className="text-xl font-black tracking-tight text-gray-950">
            MSB
          </span>

          <span className="-mt-1 text-[10px] font-bold tracking-[0.2em] text-blue-600">
            ALL ROUND SERVICE
          </span>
        </Link>

        {/* DESKTOP NAVIGATION */}
        <nav className="hidden items-center gap-8 md:flex">

          <Link
            href="/"
            className="text-sm font-semibold text-gray-900 transition hover:text-blue-600"
          >
            Home
          </Link>

          <Link
            href="/gadgets"
            className="text-sm font-semibold text-gray-600 transition hover:text-blue-600"
          >
            Gadgets
          </Link>

        </nav>

        {/* RIGHT SIDE */}
        <div className="flex items-center gap-3">

          <button
            aria-label="Search"
            className="hidden rounded-full p-2 text-gray-600 transition hover:bg-gray-100 hover:text-blue-600 sm:block"
          >
            🔍
          </button>

          <Link
            href="/login"
            className="rounded-xl border border-gray-200 px-4 py-2.5 text-sm font-bold text-gray-900 transition hover:border-blue-600 hover:text-blue-600"
          >
            Login
          </Link>

          <Link href="/account" className="hidden text-sm font-bold text-gray-700 sm:block">
            Account
          </Link>

          <Link href="/cart" className="rounded-xl bg-gray-950 px-4 py-2.5 text-sm font-bold text-white">
            Cart{count > 0 ? ` (${count})` : ""}
          </Link>

          <button type="button" aria-label="Open menu" onClick={() => setOpen(!open)} className="rounded-xl border border-gray-200 px-3 py-2 text-xl md:hidden">
            {open ? "×" : "☰"}
          </button>

        </div>

      </div>
      {open && <nav className="border-t border-gray-200 bg-white px-6 py-4 md:hidden"><div className="mx-auto flex max-w-7xl flex-col gap-3 text-sm font-bold"><Link onClick={() => setOpen(false)} href="/">Home</Link><Link onClick={() => setOpen(false)} href="/gadgets">Gadgets</Link><Link onClick={() => setOpen(false)} href="/cars">Cars</Link><Link onClick={() => setOpen(false)} href="/lands">Lands & Properties</Link><Link onClick={() => setOpen(false)} href="/account">Account</Link></div></nav>}
    </header>
  );
}
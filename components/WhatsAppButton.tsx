"use client";

import { whatsappUrl } from "@/lib/format";

export default function WhatsAppButton({ message = "Hello MSB, I need help with your marketplace." }: { message?: string }) {
  return <a href={whatsappUrl(process.env.NEXT_PUBLIC_WHATSAPP_NUMBER, message)} target="_blank" rel="noreferrer" aria-label="Contact MSB on WhatsApp" className="fixed bottom-5 right-5 z-40 rounded-full bg-green-600 px-5 py-3 font-bold text-white shadow-lg transition hover:bg-green-700">WhatsApp</a>;
}
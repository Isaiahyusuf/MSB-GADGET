import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import { CartProvider } from "@/components/CartProvider";
import WhatsAppButton from "@/components/WhatsAppButton";

export const metadata: Metadata = {
  title: "MSB All Round Service",
  description:
    "MSB All Round Service — Your trusted destination for gadgets, cars, lands and more.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-white text-gray-950 antialiased">
        <CartProvider>
          <Navbar />
          {children}
          <WhatsAppButton />
        </CartProvider>
      </body>
    </html>
  );
}
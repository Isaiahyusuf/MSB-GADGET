export function formatNaira(value: number) {
  return new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
    maximumFractionDigits: 0,
  }).format(value);
}

export function whatsappUrl(number: string | undefined, message: string) {
  const normalized = (number || "").replace(/\D/g, "");
  return `https://wa.me/${normalized}?text=${encodeURIComponent(message)}`;
}
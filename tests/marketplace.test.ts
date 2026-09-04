import { describe, expect, it } from "vitest";
import { formatNaira, whatsappUrl } from "@/lib/format";

describe("marketplace utilities", () => {
  it("formats Nigerian prices without decimals", () => {
    expect(formatNaira(2000000)).toBe("₦2,000,000");
  });

  it("encodes WhatsApp support messages", () => {
    expect(whatsappUrl("234 800 123 4567", "Order MSB 123")).toBe("https://wa.me/2348001234567?text=Order%20MSB%20123");
  });
});

describe("deployment smoke test", () => {
  it("serves public listings and rejects unauthenticated admin writes", async () => {
    const baseUrl = process.env.TEST_BASE_URL;
    if (!baseUrl) return;
    const listings = await fetch(`${baseUrl}/api/listings`);
    expect(listings.status).toBe(200);
    const admin = await fetch(`${baseUrl}/api/admin/listings`, { method: "POST", headers: { "content-type": "application/json" }, body: "{}" });
    expect(admin.status).toBe(401);
  });
});

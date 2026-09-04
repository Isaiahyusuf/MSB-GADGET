import { getCurrentCustomer } from "@/lib/customer-auth";

export async function GET() {
  return Response.json({ user: await getCurrentCustomer() });
}
import { isAdminAuthenticated } from "@/lib/admin-auth";
import { db } from "@/lib/db";

export async function GET() {
  if (!(await isAdminAuthenticated())) return Response.json({ error: "Unauthorized" }, { status: 401 });
  return Response.json(await db.orm.public.PaymentAccount.all());
}

export async function POST(request: Request) {
  if (!(await isAdminAuthenticated())) return Response.json({ error: "Unauthorized" }, { status: 401 });
  const body = await request.json().catch(() => null);
  if (!body?.bankName || !body?.accountName || !body?.accountNumber) return Response.json({ error: "Bank name, account name, and account number are required." }, { status: 400 });
  if (body.active) await db.orm.public.PaymentAccount.where({ active: true }).update({ active: false });
  const account = await db.orm.public.PaymentAccount.create({ bankName: body.bankName, accountName: body.accountName, accountNumber: body.accountNumber, instructions: body.instructions || null, active: Boolean(body.active) });
  return Response.json(account, { status: 201 });
}

export async function PATCH(request: Request) {
  if (!(await isAdminAuthenticated())) return Response.json({ error: "Unauthorized" }, { status: 401 });
  const body = await request.json().catch(() => null);
  if (typeof body?.id !== "string") return Response.json({ error: "Account id is required." }, { status: 400 });
  if (body.active) await db.orm.public.PaymentAccount.where({ active: true }).update({ active: false });
  const update: Record<string, unknown> = {};
  for (const field of ["bankName", "accountName", "accountNumber", "instructions"]) if (typeof body[field] === "string") update[field] = body[field];
  if (typeof body.active === "boolean") update.active = body.active;
  return Response.json(await db.orm.public.PaymentAccount.where({ id: body.id }).update(update));
}

export async function DELETE(request: Request) {
  if (!(await isAdminAuthenticated())) return Response.json({ error: "Unauthorized" }, { status: 401 });
  const id = new URL(request.url).searchParams.get("id");
  if (!id) return Response.json({ error: "Account id is required." }, { status: 400 });
  await db.orm.public.PaymentAccount.where({ id }).delete();
  return Response.json({ ok: true });
}
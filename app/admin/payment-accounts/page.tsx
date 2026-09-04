import { db } from "@/lib/db";
import PaymentAccountForm from "./PaymentAccountForm";

export default async function PaymentAccountsPage() {
  const accounts = await db.orm.public.PaymentAccount.all();
  return <main className="min-h-screen bg-gray-100 p-6 lg:p-10"><div className="mx-auto max-w-5xl"><h1 className="text-3xl font-black">Payment accounts</h1><p className="mt-2 text-gray-500">Manage the bank details customers see after checkout.</p><PaymentAccountForm /><div className="mt-8 space-y-4">{accounts.map((account) => <article key={account.id} className="rounded-2xl border bg-white p-5"><div className="flex flex-wrap justify-between gap-3"><div><h2 className="font-black">{account.bankName}</h2><p className="text-sm text-gray-600">{account.accountName} · {account.accountNumber}</p></div><span className={account.active ? "font-bold text-green-600" : "text-gray-400"}>{account.active ? "Active" : "Inactive"}</span></div></article>)}</div></div></main>;
}

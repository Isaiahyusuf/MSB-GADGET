import { isAdminAuthenticated } from "@/lib/admin-auth";
import { db } from "@/lib/db";
import { formatNaira } from "@/lib/format";
import OrderActions from "./OrderActions";

export default async function AdminOrdersPage() {
  if (!(await isAdminAuthenticated())) return null;
  const orders = await db.orm.public.Order.all();
  return <main className="min-h-screen bg-gray-100 p-6 lg:p-10"><div className="mx-auto max-w-6xl"><h1 className="text-3xl font-black">Orders</h1><div className="mt-8 overflow-x-auto rounded-2xl border bg-white"><table className="w-full text-left text-sm"><thead className="border-b bg-gray-50"><tr><th className="p-4">Order</th><th className="p-4">Customer</th><th className="p-4">Total</th><th className="p-4">Payment</th><th className="p-4">Actions</th></tr></thead><tbody>{orders.map((order) => <tr key={order.id} className="border-b last:border-0"><td className="p-4 font-bold">{order.id}</td><td className="p-4">{order.fullName}<br />{order.email}</td><td className="p-4 font-bold">{formatNaira(order.totalAmount)}</td><td className="p-4">{order.paymentStatus}</td><td className="p-4"><OrderActions id={order.id} paymentStatus={order.paymentStatus} orderStatus={order.orderStatus} /></td></tr>)}</tbody></table>{!orders.length && <p className="p-12 text-center text-gray-500">No orders yet.</p>}</div></div></main>;
}
import Link from "next/link";
import { db } from "@/lib/db";

export default async function AdminDashboard() {
  const [listings, orders, users] = await Promise.all([
    db.orm.public.Listing.all(),
    db.orm.public.Order.all(),
    db.orm.public.User.all(),
  ]);
  const stats = [
    { title: "Total Listings", value: listings.length, description: "All listings", icon: "📦" },
    { title: "Available", value: listings.filter((listing) => listing.status === "AVAILABLE").length, description: "Published listings", icon: "✓" },
    { title: "Orders", value: orders.length, description: "Customer orders", icon: "🧾" },
    { title: "Customers", value: users.length, description: "Registered customers", icon: "👥" },
  ];
const menuItems = [
  {
    title: "Dashboard",
    icon: "▦",
    href: "/admin",
  },
  {
    title: "Gadgets",
    icon: "📱",
    href: "/admin/listings",
  },
  {
    title: "Cars",
    icon: "🚗",
    href: "/admin/listings",
  },
  {
    title: "Lands & Properties",
    icon: "🏡",
    href: "/admin/listings",
  },
  {
    title: "Add Listing",
    icon: "＋",
    href: "/admin/add-listing",
  },
  {
    title: "Enquiries",
    icon: "💬",
    href: "/admin/enquiries",
  },
  {
    title: "Customers",
    icon: "👥",
    href: "/admin/customers",
  },
  {
    title: "Settings",
    icon: "⚙️",
    href: "/admin/payment-accounts",
  },
];

// Dashboard markup follows the live counts declared above.
  return (
    <main className="min-h-screen bg-gray-100">
      <div className="flex min-h-screen">
        {/* SIDEBAR */}
        <aside className="hidden w-72 flex-col bg-gray-950 text-white lg:flex">
          <div className="border-b border-white/10 px-7 py-7">
            <Link href="/" className="block">
              <h1 className="text-xl font-black tracking-tight">
                MSB
              </h1>

              <p className="mt-1 text-[10px] font-bold tracking-[0.2em] text-blue-500">
                ALL ROUND SERVICE
              </p>
            </Link>

            <div className="mt-7 rounded-2xl bg-white/5 p-4">
              <p className="text-xs font-semibold uppercase tracking-wider text-gray-500">
                Admin Panel
              </p>

              <p className="mt-1 text-sm font-bold text-white">
                Management Dashboard
              </p>
            </div>
          </div>

          <nav className="flex-1 space-y-1 px-4 py-6">
            {menuItems.map((item, index) => (
              <Link
                key={item.title}
                href={item.href}
                className={`flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold transition ${
                  index === 0
                    ? "bg-blue-600 text-white"
                    : "text-gray-400 hover:bg-white/5 hover:text-white"
                }`}
              >
                <span className="flex w-6 justify-center">
                  {item.icon}
                </span>

                {item.title}
              </Link>
            ))}
          </nav>

          <div className="border-t border-white/10 p-5">
            <Link
              href="/"
              className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold text-gray-400 transition hover:bg-white/5 hover:text-white"
            >
              <span>←</span>
              View Website
            </Link>
          </div>
        </aside>

        {/* MAIN CONTENT */}
        <div className="flex-1">
          {/* TOP BAR */}
          <header className="border-b border-gray-200 bg-white">
            <div className="flex h-20 items-center justify-between px-6 lg:px-10">
              <div>
                <p className="text-sm font-medium text-gray-500">
                  Welcome back
                </p>

                <h2 className="text-xl font-black text-gray-950">
                  Admin Dashboard
                </h2>
              </div>

              <div className="flex items-center gap-4">
                <button className="rounded-xl border border-gray-200 p-3 text-gray-600 transition hover:bg-gray-50">
                  🔔
                </button>

                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-600 font-black text-white">
                    A
                  </div>

                  <div className="hidden sm:block">
                    <p className="text-sm font-bold text-gray-950">
                      Administrator
                    </p>

                    <p className="text-xs text-gray-500">
                      MSB Admin
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </header>

          {/* DASHBOARD */}
          <div className="p-6 lg:p-10">
            {/* PAGE TITLE */}
            <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
              <div>
                <p className="font-bold uppercase tracking-widest text-blue-600">
                  Overview
                </p>

                <h1 className="mt-2 text-3xl font-black text-gray-950 md:text-4xl">
                  Business Dashboard
                </h1>

                <p className="mt-2 text-gray-500">
                  Manage your gadgets, cars, lands and customer enquiries.
                </p>
              </div>

              <Link
                href="/admin/add-listing"
                className="inline-flex items-center justify-center rounded-xl bg-blue-600 px-6 py-3 font-bold text-white transition hover:bg-blue-700"
              >
                + Add Listing
              </Link>
            </div>

            {/* STATS */}
            <div className="mt-8 grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
              {stats.map((stat) => (
                <div
                  key={stat.title}
                  className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm"
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="text-sm font-semibold text-gray-500">
                        {stat.title}
                      </p>

                      <p className="mt-3 text-3xl font-black text-gray-950">
                        {stat.value}
                      </p>
                    </div>

                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-2xl">
                      {stat.icon}
                    </div>
                  </div>

                  <p className="mt-4 text-xs font-medium text-gray-400">
                    {stat.description}
                  </p>
                </div>
              ))}
            </div>

            {/* QUICK ACTIONS */}
            <section className="mt-8">
              <h2 className="text-xl font-black text-gray-950">
                Quick Actions
              </h2>

              <div className="mt-5 grid gap-5 md:grid-cols-3">
                <Link
                  href="/admin/add-listing"
                  className="group rounded-2xl border border-gray-200 bg-white p-6 transition hover:-translate-y-1 hover:border-blue-500 hover:shadow-xl"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-2xl">
                    ＋
                  </div>

                  <h3 className="mt-5 font-black text-gray-950">
                    Add New Listing
                  </h3>

                  <p className="mt-2 text-sm leading-6 text-gray-500">
                    Add a gadget, car or land/property listing.
                  </p>

                  <p className="mt-4 text-sm font-bold text-blue-600">
                    Create listing →
                  </p>
                </Link>

                <Link
                  href="/admin/listings"
                  className="group rounded-2xl border border-gray-200 bg-white p-6 transition hover:-translate-y-1 hover:border-blue-500 hover:shadow-xl"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gray-100 text-2xl">
                    📦
                  </div>

                  <h3 className="mt-5 font-black text-gray-950">
                    Manage Inventory
                  </h3>

                  <p className="mt-2 text-sm leading-6 text-gray-500">
                    View and manage everything currently listed.
                  </p>

                  <p className="mt-4 text-sm font-bold text-blue-600">
                    Manage listings →
                  </p>
                </Link>

                <Link
                  href="/admin/enquiries"
                  className="group rounded-2xl border border-gray-200 bg-white p-6 transition hover:-translate-y-1 hover:border-blue-500 hover:shadow-xl"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gray-100 text-2xl">
                    💬
                  </div>

                  <h3 className="mt-5 font-black text-gray-950">
                    Customer Enquiries
                  </h3>

                  <p className="mt-2 text-sm leading-6 text-gray-500">
                    Respond to customers interested in your listings.
                  </p>

                  <p className="mt-4 text-sm font-bold text-blue-600">
                    View enquiries →
                  </p>
                </Link>
              </div>
            </section>

            {/* RECENT ACTIVITY */}
            <section className="mt-8 rounded-2xl border border-gray-200 bg-white">
              <div className="flex items-center justify-between border-b border-gray-100 p-6">
                <div>
                  <h2 className="font-black text-gray-950">
                    Recent Activity
                  </h2>

                  <p className="mt-1 text-sm text-gray-500">
                    Your latest business activity will appear here.
                  </p>
                </div>
              </div>

              <div className="p-10 text-center">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-gray-100 text-3xl">
                  📊
                </div>

                <h3 className="mt-5 font-black text-gray-950">
                  No activity yet
                </h3>

                <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-gray-500">
                  Once you start adding listings and receiving customer
                  enquiries, your activity will appear here.
                </p>

                <Link
                  href="/admin/add-listing"
                  className="mt-5 inline-block rounded-xl bg-gray-950 px-6 py-3 text-sm font-bold text-white transition hover:bg-gray-800"
                >
                  Add Your First Listing
                </Link>
              </div>
            </section>
          </div>
        </div>
      </div>
    </main>
  );
}
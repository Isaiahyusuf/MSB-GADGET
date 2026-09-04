import Link from "next/link";
import FeaturedListings from "@/components/FeaturedListings";

const categories = [
  {
    title: "Gadgets",
    description:
      "Phones, laptops, tablets, accessories and the latest technology.",
    icon: "📱",
    href: "/gadgets",
  },
  {
    title: "Cars",
    description:
      "Find quality cars and vehicles for personal and business use.",
    icon: "🚗",
    href: "/cars",
  },
  {
    title: "Lands",
    description:
      "Discover land and property opportunities in strategic locations.",
    icon: "🏡",
    href: "/lands",
  },
];

export default function Home() {
  return (
    <main>
      {/* HERO */}
      <section className="relative overflow-hidden bg-gray-950 text-white">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(37,99,235,0.25),transparent_40%)]" />

        <div className="relative mx-auto grid max-w-7xl items-center gap-14 px-6 py-24 md:grid-cols-2 md:py-32">
          <div>
            <div className="mb-6 inline-flex items-center rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-semibold text-blue-400">
              Your Trusted All-Round Service
            </div>

            <h1 className="max-w-3xl text-5xl font-black leading-[1.05] tracking-tight md:text-7xl">
              Everything You Need,
              <span className="block text-blue-500">
                All In One Place.
              </span>
            </h1>

            <p className="mt-7 max-w-xl text-lg leading-8 text-gray-300">
              Discover quality gadgets, reliable cars and valuable land
              opportunities through MSB All Round Service.
            </p>

            <div className="mt-9 flex flex-wrap gap-4">
              <Link
                href="#categories"
                className="rounded-xl bg-blue-600 px-7 py-4 font-bold transition hover:bg-blue-700"
              >
                Explore Services
              </Link>

              <Link
                href="mailto:contact@msbservice.com"
                className="rounded-xl border border-white/20 px-7 py-4 font-bold transition hover:bg-white/10"
              >
                Contact Us
              </Link>
            </div>
          </div>

          {/* HERO VISUAL */}
          <div className="relative">
            <div className="rounded-[2rem] border border-white/10 bg-white/5 p-4 shadow-2xl backdrop-blur">
              <div className="grid grid-cols-2 gap-4">
                <div className="flex h-48 items-center justify-center rounded-2xl bg-white/10 text-7xl">
                  📱
                </div>

                <div className="flex h-48 items-center justify-center rounded-2xl bg-white/10 text-7xl">
                  🚗
                </div>

                <div className="col-span-2 flex h-40 items-center justify-center rounded-2xl bg-blue-600 text-7xl">
                  🏡
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CATEGORIES */}
      <section id="categories" className="mx-auto max-w-7xl px-6 py-24">
        <div className="max-w-2xl">
          <p className="font-bold uppercase tracking-widest text-blue-600">
            What We Offer
          </p>

          <h2 className="mt-3 text-4xl font-black tracking-tight md:text-5xl">
            Explore Our Services
          </h2>

          <p className="mt-5 text-lg leading-8 text-gray-500">
            From the latest technology to vehicles and property, MSB All
            Round Service connects you with what you need.
          </p>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {categories.map((category) => (
            <Link
              key={category.title}
              href={category.href}
              className="group rounded-3xl border border-gray-200 bg-white p-8 transition duration-300 hover:-translate-y-2 hover:border-blue-500 hover:shadow-2xl"
            >
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gray-100 text-4xl transition group-hover:bg-blue-50">
                {category.icon}
              </div>

              <h3 className="mt-7 text-2xl font-black">
                {category.title}
              </h3>

              <p className="mt-3 leading-7 text-gray-500">
                {category.description}
              </p>

              <div className="mt-7 font-bold text-blue-600">
                Explore {category.title} →
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="bg-gray-50 px-6 py-20">
        <div className="mx-auto max-w-7xl">
          <p className="font-bold uppercase tracking-widest text-blue-600">Shop now</p>
          <h2 className="mt-3 text-4xl font-black tracking-tight">Featured listings</h2>
          <div className="mt-8"><FeaturedListings /></div>
        </div>
      </section>

      {/* TRUST SECTION */}
      <section className="bg-gray-50">
        <div className="mx-auto max-w-7xl px-6 py-20">
          <div className="grid gap-10 md:grid-cols-4">
            <div>
              <p className="text-4xl font-black">01</p>

              <h3 className="mt-3 font-bold">Quality</h3>

              <p className="mt-2 text-sm leading-6 text-gray-500">
                We focus on quality products and opportunities.
              </p>
            </div>

            <div>
              <p className="text-4xl font-black">02</p>

              <h3 className="mt-3 font-bold">Trust</h3>

              <p className="mt-2 text-sm leading-6 text-gray-500">
                Transparent service built around customer confidence.
              </p>
            </div>

            <div>
              <p className="text-4xl font-black">03</p>

              <h3 className="mt-3 font-bold">Variety</h3>

              <p className="mt-2 text-sm leading-6 text-gray-500">
                Gadgets, cars, lands and more under one brand.
              </p>
            </div>

            <div>
              <p className="text-4xl font-black">04</p>

              <h3 className="mt-3 font-bold">Support</h3>

              <p className="mt-2 text-sm leading-6 text-gray-500">
                We&apos;re here to help you make the right choice.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-7xl px-6 py-24">
        <div className="rounded-[2rem] bg-blue-600 px-8 py-16 text-center text-white md:px-20">
          <h2 className="text-4xl font-black md:text-5xl">
            Looking for something specific?
          </h2>

          <p className="mx-auto mt-5 max-w-2xl text-lg text-blue-100">
            Get in touch with MSB All Round Service and let us help you find
            exactly what you&apos;re looking for.
          </p>

          <Link
            href="mailto:contact@msbservice.com"
            className="mt-8 inline-block rounded-xl bg-white px-8 py-4 font-bold text-blue-600 transition hover:bg-gray-100"
          >
            Contact MSB
          </Link>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-gray-950 text-white">
        <div className="mx-auto flex max-w-7xl flex-col gap-6 px-6 py-12 md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="text-xl font-black">
              MSB ALL ROUND SERVICE
            </h2>

            <p className="mt-2 text-sm text-gray-400">
              Connecting you to what matters.
            </p>
          </div>

          <p className="text-sm text-gray-500">
            © 2026 MSB All Round Service. All rights reserved.
          </p>
        </div>
      </footer>
    </main>
  );
}
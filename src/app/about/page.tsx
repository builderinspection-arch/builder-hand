import type { Metadata } from 'next';
import Link from 'next/link';
import { SiteStats, TestimonialsSection } from '@/components/PublicSections';

export const metadata: Metadata = {
  title: 'About Us | Builder Hand - Transparent Construction Marketplace',
  description:
    'Learn how Builder Hand is transforming construction quotes and contractor bidding across Australia with transparency, competitive pricing, and verified quality.',
  keywords: [
    'reverse auction construction',
    'hire tradies Melbourne',
    'building inspection',
    'flooring installation',
    'construction marketplace',
  ],
  openGraph: {
    title: 'About Us | Builder Hand - Transparent Construction Marketplace',
    description:
      'Discover how Builder Hand makes construction projects more transparent, competitive, and manageable for homeowners and tradies.',
    type: 'website',
  },
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <header className="border-b border-white/10 bg-slate-950/90 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-6 sm:px-6 lg:px-8">
          <Link href="/" className="text-xl font-semibold tracking-tight text-white">
            Builder Hand
          </Link>
          <nav aria-label="About page navigation" className="flex gap-4 text-sm font-medium text-slate-300">
            <Link href="/about" className="transition hover:text-orange-400">About</Link>
            <Link href="/how-it-works" className="transition hover:text-orange-400">How It Works</Link>
            <Link href="/for-contractors" className="transition hover:text-orange-400">For Contractors</Link>
          </nav>
        </div>
      </header>

      <main>
        <section className="mx-auto grid max-w-7xl gap-10 px-4 py-16 sm:px-6 lg:grid-cols-[1.1fr_0.9fr] lg:px-8 lg:py-24">
          <div className="max-w-2xl">
            <p className="mb-4 text-sm font-semibold uppercase tracking-[0.3em] text-orange-400">
              About Builder Hand
            </p>
            <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl">
              Revolutionizing How Projects Get Built
            </h1>
            <p className="mt-6 text-lg leading-8 text-slate-300">
              Empowering homeowners with true market pricing while giving quality tradies direct access to real, qualified construction jobs.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/inquiry" className="rounded-full bg-orange-500 px-5 py-3 font-semibold text-white transition hover:bg-orange-400">
                Post a Project
              </Link>
              <Link href="/for-contractors" className="rounded-full border border-white/20 px-5 py-3 font-semibold text-slate-100 transition hover:border-orange-400 hover:text-orange-400">
                Join as a Contractor
              </Link>
            </div>
          </div>

          <div className="overflow-hidden rounded-3xl border border-white/10 shadow-2xl shadow-black/20">
            <img
              src="https://images.unsplash.com/photo-1541888946425-d0fbb186a5b7?auto=format&fit=crop&q=80&w=1200"
              alt="Modern home construction project with architectural plans"
              className="h-full w-full object-cover"
            />
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 lg:px-8">
          <div className="grid gap-8 lg:grid-cols-3">
            <article className="rounded-3xl border border-white/10 bg-white/5 p-8">
              <h2 className="text-2xl font-semibold text-white">Our Mission</h2>
              <p className="mt-4 text-slate-300">
                Bringing structural transparency to residential construction and trade work so every project starts with a clear, fair process.
              </p>
            </article>
            <article className="rounded-3xl border border-white/10 bg-white/5 p-8">
              <h2 className="text-2xl font-semibold text-white">Why Reverse Bidding Wins</h2>
              <p className="mt-4 text-slate-300">
                Reverse auctions floor prices protect homeowner budgets while preserving contractor sustainability, creating a better outcome for everyone involved.
              </p>
            </article>
            <article className="rounded-3xl border border-white/10 bg-white/5 p-8">
              <h2 className="text-2xl font-semibold text-white">Core Pillars</h2>
              <ul className="mt-4 space-y-2 text-slate-300">
                <li>• Verified compliance</li>
                <li>• Dynamic performance scoring</li>
                <li>• Price floor safeguards</li>
              </ul>
            </article>
          </div>
        </section>

        <SiteStats />
        <TestimonialsSection />
      </main>

      <footer className="border-t border-white/10 bg-slate-900/80 px-4 py-6 text-sm text-slate-400">
        <div className="mx-auto flex max-w-7xl flex-col gap-3 px-4 sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:px-8">
          <div className="flex flex-wrap items-center gap-4">
            <p>Builder Hand © 2026</p>
            <Link href="/privacy-policy" className="transition hover:text-orange-400">Privacy Policy</Link>
            <Link href="/terms-and-conditions" className="transition hover:text-orange-400">Terms & Conditions</Link>
          </div>
          <p className="font-medium text-orange-400">Have questions? Call our support team at 1300 352 914.</p>
        </div>
      </footer>
    </div>
  );
}

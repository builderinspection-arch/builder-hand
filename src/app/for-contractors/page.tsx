import type { Metadata } from 'next';
import Link from 'next/link';
import { SiteStats, TestimonialsSection } from '@/components/PublicSections';

export const metadata: Metadata = {
  title: 'For Contractors & Tradies | Grow Your Business | Builder Hand',
  description:
    'Access pre-vetted local construction leads, compete in fair reverse auctions, and build your reputation with zero wasted ad spend.',
  keywords: ['reverse auction construction', 'hire tradies Melbourne', 'building inspection', 'flooring installation', 'contractor marketplace'],
  openGraph: {
    title: 'For Contractors & Tradies | Grow Your Business | Builder Hand',
    description: 'Join Builder Hand to win real work, protect your margins, and grow your reputation.',
    type: 'website',
  },
};

export default function ForContractorsPage() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <header className="border-b border-white/10 bg-slate-950/90 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-6 sm:px-6 lg:px-8">
          <Link href="/" className="text-xl font-semibold tracking-tight text-white">
            Builder Hand
          </Link>
          <nav aria-label="Contractor landing navigation" className="flex gap-4 text-sm font-medium text-slate-300">
            <Link href="/about" className="transition hover:text-orange-400">About</Link>
            <Link href="/how-it-works" className="transition hover:text-orange-400">How It Works</Link>
            <Link href="/for-contractors" className="transition hover:text-orange-400">For Contractors</Link>
          </nav>
        </div>
      </header>

      <main>
        <section className="mx-auto grid max-w-7xl gap-10 px-4 py-16 sm:px-6 lg:grid-cols-[1.1fr_0.9fr] lg:px-8 lg:py-24">
          <div>
            <p className="mb-4 text-sm font-semibold uppercase tracking-[0.3em] text-orange-400">For Contractors</p>
            <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl">
              Stop Paying for Dead Leads. Start Winning Real Work.
            </h1>
            <p className="mt-6 text-lg leading-8 text-slate-300">
              Join Australia&apos;s premier reverse-auction network for verified contractors, inspectors, and specialist trades.
            </p>
            <div className="mt-8">
              <Link href="/contractor/register" className="inline-flex rounded-full bg-orange-500 px-6 py-3 font-semibold text-white transition hover:bg-orange-400">
                Submit Application for Fast Verification
              </Link>
            </div>
          </div>

          <div className="overflow-hidden rounded-3xl border border-white/10 shadow-2xl shadow-black/20">
            <img
              src="https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&q=80&w=1200"
              alt="Professional tradesperson on a job site with safety equipment"
              className="h-full w-full object-cover"
            />
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 lg:px-8">
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            <article className="rounded-3xl border border-white/10 bg-white/5 p-6">
              <h2 className="text-xl font-semibold text-white">100% Pre-Vetted Homeowners</h2>
              <p className="mt-3 text-slate-300">No tire-kickers; all posted jobs have defined budgets and scopes.</p>
            </article>
            <article className="rounded-3xl border border-white/10 bg-white/5 p-6">
              <h2 className="text-xl font-semibold text-white">Performance Score Edge</h2>
              <p className="mt-3 text-slate-300">Your high ratings and completed jobs increase your winning score in reverse auctions.</p>
            </article>
            <article className="rounded-3xl border border-white/10 bg-white/5 p-6">
              <h2 className="text-xl font-semibold text-white">Protected Profit Margins</h2>
              <p className="mt-3 text-slate-300">Floor price thresholds prevent race-to-the-bottom undercutting.</p>
            </article>
            <article className="rounded-3xl border border-white/10 bg-white/5 p-6">
              <h2 className="text-xl font-semibold text-white">Zero Lead Fees</h2>
              <p className="mt-3 text-slate-300">Bid directly without paying per click or lead.</p>
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

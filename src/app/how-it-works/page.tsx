import type { Metadata } from 'next';
import Link from 'next/link';
import { SiteStats, TestimonialsSection } from '@/components/PublicSections';

export const metadata: Metadata = {
  title: 'How It Works | Reverse Auctions for Construction & Tradies',
  description:
    'See how homeowners post jobs and verified contractors place competitive reverse bids in real-time on Builder Hand.',
  keywords: ['reverse auction construction', 'hire tradies Melbourne', 'building inspection', 'flooring installation', 'construction quotes'],
  openGraph: {
    title: 'How It Works | Reverse Auctions for Construction & Tradies',
    description: 'Learn how Builder Hand helps homeowners and contractors transact with clarity and speed.',
    type: 'website',
  },
};

export default function HowItWorksPage() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <header className="border-b border-white/10 bg-slate-950/90 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-6 sm:px-6 lg:px-8">
          <Link href="/" className="text-xl font-semibold tracking-tight text-white">
            Builder Hand
          </Link>
          <nav aria-label="How it works navigation" className="flex gap-4 text-sm font-medium text-slate-300">
            <Link href="/about" className="transition hover:text-orange-400">About</Link>
            <Link href="/how-it-works" className="transition hover:text-orange-400">How It Works</Link>
            <Link href="/for-contractors" className="transition hover:text-orange-400">For Contractors</Link>
          </nav>
        </div>
      </header>

      <main>
        <section className="mx-auto grid max-w-7xl gap-10 px-4 py-16 sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:px-8 lg:py-24">
          <div>
            <p className="mb-4 text-sm font-semibold uppercase tracking-[0.3em] text-orange-400">How It Works</p>
            <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl">
              Simple, Transparent, and Built for Fair Value
            </h1>
            <p className="mt-6 text-lg leading-8 text-slate-300">
              From initial project scope to live contractor bidding, see how our reverse auction model secures your optimal quote.
            </p>
          </div>

          <div className="overflow-hidden rounded-3xl border border-white/10 shadow-2xl shadow-black/20">
            <img
              src="https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&q=80&w=1200"
              alt="Construction team collaborating over blueprints on site"
              className="h-full w-full object-cover"
            />
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 lg:px-8">
          <div className="grid gap-8 lg:grid-cols-2">
            <article className="rounded-3xl border border-white/10 bg-white/5 p-8">
              <h2 className="text-2xl font-semibold text-white">For Homeowners</h2>
              <div className="mt-6 space-y-5">
                <div>
                  <h3 className="text-lg font-semibold text-orange-400">1. Post Your Project Scope</h3>
                  <p className="mt-2 text-slate-300">Define scope, target budget, and timeframe so qualified contractors can respond with precision.</p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-orange-400">2. Live Reverse Auction</h3>
                  <p className="mt-2 text-slate-300">Verified tradies bid downward toward your protected floor price in real time.</p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-orange-400">3. Review & Award</h3>
                  <p className="mt-2 text-slate-300">Compare final bids alongside contractor performance scores to choose with confidence.</p>
                </div>
              </div>
            </article>

            <article className="rounded-3xl border border-white/10 bg-white/5 p-8">
              <h2 className="text-2xl font-semibold text-white">For Contractors</h2>
              <div className="mt-6 space-y-5">
                <div>
                  <h3 className="text-lg font-semibold text-orange-400">1. Complete Verification</h3>
                  <p className="mt-2 text-slate-300">Fast-track your license and document review so you can start bidding sooner.</p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-orange-400">2. Browse & Place Bids</h3>
                  <p className="mt-2 text-slate-300">Access local jobs and place real-time bids with full visibility into project expectations.</p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-orange-400">3. Win & Build</h3>
                  <p className="mt-2 text-slate-300">Gain direct client connections while avoiding wasted ad spend and low-value lead noise.</p>
                </div>
              </div>
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

import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Terms & Conditions | Builder Hand',
  description:
    'Builder Hand terms and conditions for homeowners, contractors, and platform users operating under Australian consumer law and fair marketplace rules.',
  keywords: ['terms and conditions', 'builder hand', 'reverse auction', 'construction marketplace'],
  openGraph: {
    title: 'Terms & Conditions | Builder Hand',
    description: 'Understand your responsibilities and protections when using Builder Hand.',
    type: 'website',
  },
};

export default function TermsAndConditionsPage() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <header className="border-b border-white/10 bg-slate-950/90 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-6 sm:px-6 lg:px-8">
          <Link href="/" className="text-xl font-semibold tracking-tight text-white">
            Builder Hand
          </Link>
          <nav aria-label="Terms navigation" className="flex gap-4 text-sm font-medium text-slate-300">
            <Link href="/about" className="transition hover:text-orange-400">About</Link>
            <Link href="/privacy-policy" className="transition hover:text-orange-400">Privacy</Link>
          </nav>
        </div>
      </header>

      <main className="mx-auto flex max-w-5xl flex-col gap-10 px-4 py-16 sm:px-6 lg:px-8">
        <section>
          <p className="mb-4 text-sm font-semibold uppercase tracking-[0.3em] text-orange-400">Terms & Conditions</p>
          <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl">Fair use, clear obligations, and dependable dispute support</h1>
          <p className="mt-6 text-lg leading-8 text-slate-300">
            These terms govern your use of Builder Hand. By posting jobs, bidding, or using the platform, you agree to act honestly, comply with applicable law, and engage in good faith.
          </p>
        </section>

        <section className="rounded-3xl border border-white/10 bg-white/5 p-8">
          <h2 className="text-2xl font-semibold text-white">Homeowners (Clients)</h2>
          <p className="mt-4 text-slate-300">
            Homeowners may post project details, budgets, timeframes, and scope requirements. You agree to provide accurate information, avoid misleading specifications, and make award decisions based on the platform&apos;s available bid information. Builder Hand does not guarantee a contractor will accept an award, and any contract for work remains between the homeowner and the selected contractor.
          </p>
        </section>

        <section className="rounded-3xl border border-white/10 bg-white/5 p-8">
          <h2 className="text-2xl font-semibold text-white">Contractors (Tradies)</h2>
          <p className="mt-4 text-slate-300">
            Contractors must hold the appropriate licenses, registrations, and insurance where required by law or project scope. Bids must be submitted truthfully, in good faith, and may be binding where the platform or project terms specify such a requirement. Builder Hand&apos;s floor price protections and performance score systems are designed to encourage fair competition and prevent destructive undercutting.
          </p>
        </section>

        <section className="rounded-3xl border border-white/10 bg-white/5 p-8">
          <h2 className="text-2xl font-semibold text-white">Liability Limitations</h2>
          <p className="mt-4 text-slate-300">
            Builder Hand provides a marketplace and communications platform. We are not a builder, insurer, or guarantor of workmanship. Except to the extent prohibited by law, Builder Hand excludes liability for indirect, consequential, or incidental loss arising from use of the platform or any project outcome.
          </p>
        </section>

        <section className="rounded-3xl border border-white/10 bg-white/5 p-8">
          <h2 className="text-2xl font-semibold text-white">Dispute Support</h2>
          <p className="mt-4 text-slate-300">
            Where a dispute arises between a homeowner and a contractor, Builder Hand may assist with platform-based dispute support and review of relevant project communications. For urgent assistance, contact our support team on 1300 352 914.
          </p>
        </section>
      </main>

      <footer className="border-t border-white/10 bg-slate-900/80 px-4 py-6 text-sm text-slate-400">
        <div className="mx-auto flex max-w-7xl flex-col gap-3 px-4 sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:px-8">
          <p>Builder Hand © 2026</p>
          <p className="font-medium text-orange-400">Have questions? Call our support team at 1300 352 914.</p>
        </div>
      </footer>
    </div>
  );
}

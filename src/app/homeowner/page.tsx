import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Homeowner Jobs | Builder Hand',
  description: 'Post a job and hire verified tradies in Melbourne for construction, flooring installation, building inspection, and more through Builder Hand.',
  keywords: ['reverse auction construction', 'hire tradies Melbourne', 'building inspection', 'flooring installation', 'homeowner construction jobs'],
  openGraph: {
    title: 'Homeowner Jobs | Builder Hand',
    description: 'Find quality tradies and manage your project from quote to completion with Builder Hand.',
    type: 'website',
  },
};

export default function HomeownerLandingPage() {
  return (
    <div className="min-h-screen bg-white text-slate-900 flex flex-col">
      <header className="bg-white border-b border-slate-200">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-6 sm:px-6 lg:px-8">
          <Link href="/" className="text-xl font-bold text-slate-900">Builder Hand</Link>
          <nav className="flex gap-4 text-sm font-medium text-slate-700">
            <Link href="/about" className="hover:text-orange-600">About</Link>
            <Link href="/how-it-works" className="hover:text-orange-600">How It Works</Link>
            <Link href="/contractor" className="hover:text-orange-600">For Contractors</Link>
            <Link href="/homeowner" className="hover:text-orange-600">For Homeowners</Link>
          </nav>
        </div>
      </header>

      <main className="flex-grow">
        <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold tracking-tight text-slate-900">Hire dependable tradies for your next project</h1>
          <p className="mt-4 max-w-3xl text-lg text-slate-600">Builder Hand helps homeowners in Melbourne compare quotes for flooring installation, building inspection, renovations, and other construction work.</p>
        </section>
      </main>

      <footer className="border-t border-slate-200 bg-slate-50 px-4 py-6 text-sm text-slate-600">
        <div className="mx-auto max-w-7xl">Builder Hand © 2026</div>
      </footer>
    </div>
  );
}

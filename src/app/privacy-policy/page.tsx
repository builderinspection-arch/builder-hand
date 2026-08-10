import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Privacy Policy | Builder Hand',
  description:
    'Builder Hand privacy policy outlining how we collect, use, store, and protect personal information in line with the Privacy Act 1988 and Australian Privacy Principles.',
  keywords: ['privacy policy', 'Privacy Act 1988', 'Australian Privacy Principles', 'builder hand'],
  openGraph: {
    title: 'Privacy Policy | Builder Hand',
    description: 'Learn how Builder Hand handles personal information and contractor documentation safely and responsibly.',
    type: 'website',
  },
};

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <header className="border-b border-white/10 bg-slate-950/90 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-6 sm:px-6 lg:px-8">
          <Link href="/" className="text-xl font-semibold tracking-tight text-white">
            Builder Hand
          </Link>
          <nav aria-label="Privacy policy navigation" className="flex gap-4 text-sm font-medium text-slate-300">
            <Link href="/about" className="transition hover:text-orange-400">About</Link>
            <Link href="/terms-and-conditions" className="transition hover:text-orange-400">Terms</Link>
          </nav>
        </div>
      </header>

      <main className="mx-auto flex max-w-5xl flex-col gap-10 px-4 py-16 sm:px-6 lg:px-8">
        <section>
          <p className="mb-4 text-sm font-semibold uppercase tracking-[0.3em] text-orange-400">Privacy Policy</p>
          <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl">Privacy, protection, and responsible data handling</h1>
          <p className="mt-6 text-lg leading-8 text-slate-300">
            Builder Hand is committed to protecting personal information in accordance with the Privacy Act 1988 (Cth), the Australian Privacy Principles (APPs), and Australian Consumer Law.
          </p>
        </section>

        <section className="rounded-3xl border border-white/10 bg-white/5 p-8">
          <h2 className="text-2xl font-semibold text-white">Information Collection</h2>
          <p className="mt-4 text-slate-300">
            We collect personal information such as your name, contact details, job-related information, account credentials, and, where relevant, contractor compliance documents. We only collect information necessary to facilitate project posting, bid submission, account verification, and customer support.
          </p>
        </section>

        <section className="rounded-3xl border border-white/10 bg-white/5 p-8">
          <h2 className="text-2xl font-semibold text-white">How Information Is Used</h2>
          <p className="mt-4 text-slate-300">
            Personal information is used to operate the Builder Hand platform, verify account ownership, coordinate project communication, manage contractor onboarding, improve service quality, and respond to support requests. We may share information with authorised service providers only where required to provide platform services.
          </p>
        </section>

        <section className="rounded-3xl border border-white/10 bg-white/5 p-8">
          <h2 className="text-2xl font-semibold text-white">Data Protection & Storage</h2>
          <p className="mt-4 text-slate-300">
            Builder Hand uses reasonable administrative, technical, and physical safeguards to protect personal information from misuse, interference, loss, unauthorised access, modification, or disclosure. Information is stored securely and retained only for as long as necessary to fulfil the purpose for which it was collected, or as required by law.
          </p>
        </section>

        <section className="rounded-3xl border border-white/10 bg-white/5 p-8">
          <h2 className="text-2xl font-semibold text-white">Contractor Document Safety</h2>
          <p className="mt-4 text-slate-300">
            Contractor licenses, insurance certificates, registrations, and supporting documents are treated as sensitive information. We apply enhanced protections to such materials, limit access to authorised personnel, and require secure handling procedures throughout onboarding and review.
          </p>
        </section>

        <section className="rounded-3xl border border-white/10 bg-white/5 p-8">
          <h2 className="text-2xl font-semibold text-white">Australian Privacy Principles (APPs) Compliance</h2>
          <p className="mt-4 text-slate-300">
            We aim to comply with the APPs by handling personal information lawfully and transparently, giving individuals access to their information where appropriate, and providing a mechanism to raise privacy concerns. If you wish to access, correct, or ask about your personal information, please contact us on 1300 352 914 or at hello@builderhand.com.au.
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

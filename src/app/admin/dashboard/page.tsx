'use client';

import Link from 'next/link';

export default function AdminDashboardPage() {
  const stats = [
    { label: 'New Inquiries', value: '12', change: '+3 today', color: 'text-orange-600' },
    { label: 'Pending Tradies', value: '5', change: 'Awaiting Verification', color: 'text-amber-600' },
    { label: 'Live Auctions', value: '3', change: 'Active 15m Timers', color: 'text-emerald-600' },
    { label: 'Jobs In Progress', value: '18', change: 'On Site Execution', color: 'text-blue-600' },
  ];

  const pendingContractors = [
    { id: 'TRADIE-101', name: 'John Doe', company: 'Apex Plumbing Pty Ltd', trade: 'Plumbing' },
  ];

  return (
    <div className="min-h-screen bg-slate-100 text-slate-900 flex flex-col">
      <header className="bg-slate-900 text-white py-4 px-6 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <Link href="/" className="font-bold text-lg text-white">Builder Hand Admin</Link>
          <span className="text-xs text-slate-400">Control Panel</span>
        </div>
      </header>

      <main className="max-w-7xl w-full mx-auto p-6 space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
          {stats.map((s) => (
            <div key={s.label} className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
              <span className="text-xs text-slate-500 uppercase font-semibold block">{s.label}</span>
              <span className={`text-3xl font-extrabold ${s.color}`}>{s.value}</span>
            </div>
          ))}
        </div>

        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
          <h2 className="text-base font-bold text-slate-900 mb-4">Pending Contractor Verifications</h2>
          {pendingContractors.map((c) => (
            <div key={c.id} className="p-4 border border-slate-200 rounded-lg bg-slate-50 flex justify-between items-center">
              <div>
                <h3 className="text-sm font-semibold">{c.company}</h3>
                <p className="text-xs text-slate-500">{c.name} • {c.trade}</p>
              </div>
              <Link
                href={`/admin/contractors/${c.id}`}
                className="bg-orange-600 text-white text-xs font-semibold px-3 py-1.5 rounded-md hover:bg-orange-700"
              >
                Review Licenses
              </Link>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
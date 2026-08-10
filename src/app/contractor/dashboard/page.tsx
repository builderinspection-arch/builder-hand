'use client';

import Link from 'next/link';

export default function ContractorDashboardPage() {
  const contractor = {
    company: 'Apex Plumbing & Electrical',
    name: 'John Doe',
    points: 74,
    maxPoints: 110,
    status: 'APPROVED',
    radius: '25 km',
    category: 'Electrical & Plumbing',
  };

  const localAuctions = [
    {
      id: 'JOB-901',
      title: 'Switchboard Upgrade & Solar Prep',
      location: 'Tarneit, VIC (4.2 km away)',
      floorPrice: '$1,080.00',
      currentLowest: '$1,250.00',
      timeLeft: '14m 52s',
      status: 'Live Now',
    },
    {
      id: 'JOB-904',
      title: 'EV Charger Installation',
      location: 'Werribee, VIC (8.1 km away)',
      floorPrice: '$750.00',
      currentLowest: '$920.00',
      timeLeft: '08m 10s',
      status: 'Live Now',
    },
  ];

  const pointsHistory = [
    { reason: 'Starting Score (Onboarding Approved)', change: '+50 pts', date: '01 Aug 2026' },
    { reason: 'Completed Job #JOB-812 On Time', change: '+10 pts', date: '03 Aug 2026' },
    { reason: '5-Star Homeowner Review', change: '+5 pts', date: '05 Aug 2026' },
    { reason: 'Completed Job #JOB-880 On Time', change: '+9 pts', date: '07 Aug 2026' },
  ];

  return (
    <div className="min-h-screen bg-slate-900 text-white flex flex-col">
      {/* Top Header */}
      <header className="bg-slate-950 border-b border-slate-800 py-4 px-6 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-3">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-8 h-8 bg-orange-600 rounded-lg flex items-center justify-center font-bold text-white">
                B
              </div>
              <span className="font-bold text-lg text-white">Builder Hand</span>
            </Link>
            <span className="hidden sm:inline text-xs bg-slate-800 text-slate-300 px-2.5 py-1 rounded-full border border-slate-700">
              Contractor Hub
            </span>
          </div>

          <div className="flex items-center gap-4 text-xs">
            <span className="text-slate-400 hidden sm:inline">
              Status: <strong className="text-emerald-400">{contractor.status}</strong>
            </span>
            <Link href="/" className="bg-slate-800 hover:bg-slate-700 text-slate-300 px-3 py-1.5 rounded-md border border-slate-700 transition-colors">
              Sign Out
            </Link>
          </div>
        </div>
      </header>

      <main className="flex-grow max-w-7xl w-full mx-auto p-4 sm:p-6 space-y-6">
        
        {/* Profile & Points Overview Ribbon */}
        <div className="bg-slate-800 border border-slate-700 rounded-2xl p-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-6 shadow-xl">
          <div>
            <span className="text-xs font-semibold text-orange-400 uppercase tracking-wider block mb-1">
              {contractor.category}
            </span>
            <h1 className="text-2xl font-bold text-white">{contractor.company}</h1>
            <p className="text-xs text-slate-400 mt-1">
              Contact: {contractor.name} | Service Radius: {contractor.radius}
            </p>
          </div>

          <div className="bg-slate-900 border border-slate-700/80 rounded-xl p-4 flex items-center gap-4 w-full md:w-auto justify-between">
            <div>
              <span className="text-[10px] text-slate-400 uppercase font-semibold tracking-wider block">
                Performance Score
              </span>
              <div className="flex items-baseline gap-1 mt-0.5">
                <span className="text-3xl font-extrabold text-orange-500">{contractor.points}</span>
                <span className="text-xs text-slate-400">/ {contractor.maxPoints} pts</span>
              </div>
            </div>
            <span className="text-[11px] bg-orange-950 text-orange-300 border border-orange-600/40 px-2.5 py-1 rounded-lg font-medium">
              Tier: Tier 2 Priority
            </span>
          </div>
        </div>

        {/* Live Local Auctions Feed */}
        <div className="bg-slate-800 border border-slate-700 rounded-2xl p-6 shadow-xl">
          <div className="flex justify-between items-center mb-4">
            <div>
              <h2 className="text-lg font-bold text-white">Live Reverse Auctions</h2>
              <p className="text-xs text-slate-400">Jobs matching your trade and radius</p>
            </div>
            <span className="text-xs bg-emerald-950 text-emerald-400 border border-emerald-600/40 px-2.5 py-1 rounded-full font-semibold animate-pulse">
              ● Active Feeds
            </span>
          </div>

          <div className="space-y-3">
            {localAuctions.map((auction) => (
              <div
                key={auction.id}
                className="bg-slate-900/80 border border-slate-700/60 rounded-xl p-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 hover:border-orange-500/50 transition-colors"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs font-bold text-orange-400">{auction.id}</span>
                    <span className="text-xs bg-orange-600/20 text-orange-300 border border-orange-500/30 px-2 py-0.5 rounded font-medium">
                      ⏱️ {auction.timeLeft}
                    </span>
                  </div>
                  <h3 className="text-sm font-bold text-white">{auction.title}</h3>
                  <p className="text-xs text-slate-400">📍 {auction.location}</p>
                </div>

                <div className="flex items-center gap-6 w-full sm:w-auto justify-between sm:justify-end border-t sm:border-t-0 border-slate-800 pt-3 sm:pt-0">
                  <div className="text-right">
                    <span className="text-[10px] text-slate-400 block">Floor Price</span>
                    <span className="text-sm font-bold text-slate-200">{auction.floorPrice}</span>
                  </div>
                  <Link
                    href={`/contractor/auctions/job-901`}
                    className="bg-orange-600 hover:bg-orange-700 text-white text-xs font-bold px-4 py-2.5 rounded-xl transition-colors shadow-lg shadow-orange-600/20"
                  >
                    Enter Auction
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Performance Score Audit History */}
        <div className="bg-slate-800 border border-slate-700 rounded-2xl p-6 shadow-xl">
          <h2 className="text-base font-bold text-white mb-4">Performance Points Audit Log</h2>
          <div className="space-y-2">
            {pointsHistory.map((item, index) => (
              <div
                key={index}
                className="bg-slate-900/50 border border-slate-700/50 rounded-lg p-3 flex justify-between items-center text-xs"
              >
                <div>
                  <p className="font-medium text-slate-200">{item.reason}</p>
                  <p className="text-[10px] text-slate-500 mt-0.5">{item.date}</p>
                </div>
                <span className="font-bold text-emerald-400 font-mono text-sm">{item.change}</span>
              </div>
            ))}
          </div>
        </div>

      </main>
    </div>
  );
}
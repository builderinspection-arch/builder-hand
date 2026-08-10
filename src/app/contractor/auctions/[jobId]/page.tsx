'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function LiveBiddingRoomPage() {
  const [timeLeft, setTimeLeft] = useState(892); // 14m 52s in seconds
  const [userBid, setUserBid] = useState('');
  const [bidError, setBidError] = useState('');

  // Mock Job Data
  const jobDetails = {
    id: 'JOB-901',
    title: 'Switchboard Upgrade & Solar Prep',
    location: 'Tarneit, VIC 3029',
    tradeCategory: 'Electrical',
    homeownerQuote: '$2,400.00',
    bidFloor: 1080, // Minimum allowed bid ($1,080.00)
    currentLowestBid: 1250,
  };

  // Mock Bidders Leaderboard (Anonymized)
  const [leaderboard, setLeaderboard] = useState([
    { rank: 1, name: 'M****l S****h', points: 90, bidAmount: 1250, score: 88.4, isUser: false },
    { rank: 2, name: 'J****n T****r', points: 70, bidAmount: 1300, score: 82.1, isUser: false },
    { rank: 3, name: 'YOU (Apex Electrical)', points: 74, bidAmount: 1400, score: 79.5, isUser: true },
  ]);

  // Countdown Timer Logic
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleBidSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const numericBid = parseFloat(userBid);

    if (isNaN(numericBid)) {
      setBidError('Please enter a valid dollar amount.');
      return;
    }

    if (numericBid < jobDetails.bidFloor) {
      setBidError(`Bid cannot be lower than the floor price ($${jobDetails.bidFloor.toFixed(2)}).`);
      return;
    }

    setBidError('');
    
    // Simulate updating user's bid on leaderboard
    setLeaderboard((prev) =>
      prev.map((item) =>
        item.isUser
          ? { ...item, bidAmount: numericBid, score: Number((85 + (jobDetails.bidFloor / numericBid) * 10).toFixed(1)) }
          : item
      ).sort((a, b) => b.score - a.score).map((item, index) => ({ ...item, rank: index + 1 }))
    );

    alert(`Bid of $${numericBid.toFixed(2)} submitted successfully! Leaderboard updated.`);
    setUserBid('');
  };

  return (
    <div className="min-h-screen bg-slate-900 text-white flex flex-col">
      {/* Header Bar */}
      <header className="bg-slate-950 border-b border-slate-800 py-4 px-6">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-3">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-8 h-8 bg-orange-600 rounded-lg flex items-center justify-center font-bold text-white">
                B
              </div>
              <span className="font-bold text-lg text-white">Builder Hand</span>
            </Link>
            <span className="hidden sm:inline text-xs bg-slate-800 text-slate-300 px-2.5 py-1 rounded-full border border-slate-700">
              Live Reverse Auction
            </span>
          </div>

          {/* Countdown Clock */}
          <div className="flex items-center gap-3 bg-orange-950/80 border border-orange-600/50 px-4 py-1.5 rounded-xl">
            <span className="w-2 h-2 rounded-full bg-orange-500 animate-pulse"></span>
            <span className="text-xs font-semibold text-orange-300 uppercase tracking-wider">Time Left:</span>
            <span className="font-mono text-xl font-bold text-orange-400">{formatTime(timeLeft)}</span>
          </div>
        </div>
      </header>

      {/* Main Content Layout */}
      <main className="flex-grow max-w-7xl w-full mx-auto p-4 sm:p-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left 2 Columns: Job Brief & Masked Leaderboard */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Job Overview Card */}
          <div className="bg-slate-800 border border-slate-700 rounded-2xl p-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 mb-4">
              <div>
                <span className="text-xs font-semibold text-orange-400 uppercase tracking-wider">{jobDetails.tradeCategory}</span>
                <h1 className="text-2xl font-bold text-white">{jobDetails.title}</h1>
                <p className="text-xs text-slate-400 mt-1">📍 Location: {jobDetails.location} | Ref: {jobDetails.id}</p>
              </div>
              <div className="text-right">
                <span className="text-xs text-slate-400 block">Homeowner Quote</span>
                <span className="text-lg font-bold text-emerald-400">{jobDetails.homeownerQuote}</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 bg-slate-900/60 p-4 rounded-xl border border-slate-700/50 text-xs">
              <div>
                <span className="text-slate-400 block mb-1">Protected Bid Floor Price</span>
                <span className="text-base font-bold text-orange-400">${jobDetails.bidFloor.toFixed(2)}</span>
                <p className="text-[10px] text-slate-500 mt-0.5">Bids lower than floor price are rejected.</p>
              </div>
              <div>
                <span className="text-slate-400 block mb-1">Current Lowest Bid</span>
                <span className="text-base font-bold text-white">${jobDetails.currentLowestBid.toFixed(2)}</span>
                <p className="text-[10px] text-slate-500 mt-0.5">Note: Lowest price does not automatically win.</p>
              </div>
            </div>
          </div>

          {/* Anonymized Leaderboard */}
          <div className="bg-slate-800 border border-slate-700 rounded-2xl p-6">
            <h2 className="text-lg font-bold text-white mb-4 flex items-center justify-between">
              <span>Live Auction Leaderboard</span>
              <span className="text-xs text-slate-400 font-normal">Anonymized for Privacy</span>
            </h2>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-slate-700 text-slate-400">
                    <th className="py-2.5 px-3">Rank</th>
                    <th className="py-2.5 px-3">Contractor</th>
                    <th className="py-2.5 px-3">Points</th>
                    <th className="py-2.5 px-3">Current Bid</th>
                    <th className="py-2.5 px-3 text-right">Winning Score</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-700/50">
                  {leaderboard.map((row) => (
                    <tr
                      key={row.name}
                      className={row.isUser ? 'bg-orange-950/40 font-semibold text-orange-200' : 'text-slate-300'}
                    >
                      <td className="py-3 px-3">
                        <span className={`w-6 h-6 rounded-full inline-flex items-center justify-center font-bold text-xs ${
                          row.rank === 1 ? 'bg-amber-500 text-slate-950' : 'bg-slate-700 text-white'
                        }`}>
                          #{row.rank}
                        </span>
                      </td>
                      <td className="py-3 px-3">{row.name}</td>
                      <td className="py-3 px-3">
                        <span className="bg-slate-700 text-slate-200 px-2 py-0.5 rounded text-[11px]">
                          {row.points} pts
                        </span>
                      </td>
                      <td className="py-3 px-3 font-mono text-sm text-white">${row.bidAmount.toFixed(2)}</td>
                      <td className="py-3 px-3 text-right font-bold text-orange-400">{row.score}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Right 1 Column: Interactive Bidding Console */}
        <div className="space-y-6">
          <div className="bg-slate-800 border border-slate-700 rounded-2xl p-6 sticky top-24">
            <h3 className="text-base font-bold text-white mb-2">Place Your Competitive Bid</h3>
            <p className="text-xs text-slate-400 mb-6">
              Winning score combines your **Bid Price** + **Contractor Performance Score (74 pts)**.
            </p>

            <form onSubmit={handleBidSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Your Bid Amount ($)</label>
                <div className="relative">
                  <span className="absolute left-3 top-2.5 text-slate-500 font-bold">$</span>
                  <input
                    type="number"
                    step="5"
                    min={jobDetails.bidFloor}
                    placeholder={`Min $${jobDetails.bidFloor}`}
                    value={userBid}
                    onChange={(e) => setUserBid(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl pl-8 pr-3 py-2.5 text-sm font-mono text-white focus:outline-none focus:border-orange-500"
                  />
                </div>
                {bidError && <p className="text-xs text-red-400 mt-1.5">{bidError}</p>}
              </div>

              {/* Quick Adjustment Buttons */}
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => setUserBid('1200')}
                  className="bg-slate-700 hover:bg-slate-600 text-xs py-2 rounded-lg text-slate-200 transition-colors"
                >
                  Quick Bid $1,200
                </button>
                <button
                  type="button"
                  onClick={() => setUserBid('1150')}
                  className="bg-slate-700 hover:bg-slate-600 text-xs py-2 rounded-lg text-slate-200 transition-colors"
                >
                  Quick Bid $1,150
                </button>
              </div>

              <button
                type="submit"
                className="w-full bg-orange-600 hover:bg-orange-700 text-white font-bold py-3 rounded-xl transition-colors shadow-lg shadow-orange-600/20 text-sm"
              >
                SUBMIT BID
              </button>
            </form>

            <div className="mt-6 pt-4 border-t border-slate-700/60 text-[11px] text-slate-400 space-y-1">
              <p>✔️ Floor Price enforced at $1,080.00.</p>
              <p>✔️ Terms & Conditions accepted automatically upon winning.</p>
            </div>
          </div>
        </div>

      </main>
    </div>
  );
}
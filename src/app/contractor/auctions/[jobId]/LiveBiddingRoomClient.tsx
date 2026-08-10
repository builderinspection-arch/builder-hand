'use client';

import { useState, useEffect, FormEvent } from 'react';
import Link from 'next/link';
import { isSupabaseConfigured, supabase } from '@/lib/supabaseClient';

type LiveBiddingRoomClientProps = {
  jobId: string;
};

type BidRecord = {
  id?: string;
  job_id?: string | null;
  amount?: number | string | null;
  contractor_name?: string | null;
  created_at?: string | null;
};

type LeaderboardRow = {
  rank: number;
  name: string;
  points: number;
  bidAmount: number;
  score: number;
  isUser: boolean;
};

const BID_FLOOR = 1080;
const USER_BIDDER_NAME = 'YOU (Apex Electrical)';
const FALLBACK_INITIAL_BIDS: BidRecord[] = [
  { amount: 1250, contractor_name: 'M****l S****h' },
  { amount: 1300, contractor_name: 'J****n T****r' },
  { amount: 1400, contractor_name: USER_BIDDER_NAME },
];

function buildLeaderboard(bids: BidRecord[], bidFloor: number) {
  const rows = bids
    .map((bid, index) => {
      const amount = Number(bid.amount ?? 0);
      const name = bid.contractor_name?.trim() || `Contractor ${index + 1}`;
      return {
        name,
        points: Math.max(60, 95 - index * 3),
        bidAmount: Number.isFinite(amount) ? amount : 0,
        score: Number((85 + (bidFloor / Math.max(amount, 1)) * 10).toFixed(1)),
        isUser: name === USER_BIDDER_NAME,
      };
    })
    .sort((a, b) => b.bidAmount - a.bidAmount)
    .map((row, index) => ({ ...row, rank: index + 1 }));

  return rows as LeaderboardRow[];
}

export default function LiveBiddingRoomClient({ jobId }: LiveBiddingRoomClientProps) {
  const [timeLeft, setTimeLeft] = useState(892); // 14m 52s in seconds
  const [userBid, setUserBid] = useState('');
  const [bidError, setBidError] = useState('');
  const [leaderboard, setLeaderboard] = useState<LeaderboardRow[]>(() => buildLeaderboard(FALLBACK_INITIAL_BIDS, BID_FLOOR));
  const [isLoadingBids, setIsLoadingBids] = useState(false);
  const [isUsingLocalMode, setIsUsingLocalMode] = useState(false);

  const jobDetails = {
    id: jobId,
    title: 'Switchboard Upgrade & Solar Prep',
    location: 'Tarneit, VIC 3029',
    tradeCategory: 'Electrical',
    homeownerQuote: '$2,400.00',
    bidFloor: BID_FLOOR,
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    let ignore = false;
    const canUseSupabase = isSupabaseConfigured;

    const loadBids = async () => {
      if (!canUseSupabase) {
        setIsUsingLocalMode(true);
        setLeaderboard(buildLeaderboard(FALLBACK_INITIAL_BIDS, BID_FLOOR));
        setIsLoadingBids(false);
        return;
      }

      setIsLoadingBids(true);
      try {
        const { data, error } = await supabase
          .from('bids')
          .select('*')
          .eq('job_id', jobId)
          .order('created_at', { ascending: false });

        if (!ignore) {
          if (error) {
            throw error;
          }

          setIsUsingLocalMode(false);
          setLeaderboard(buildLeaderboard((data ?? []) as BidRecord[], BID_FLOOR));
          setIsLoadingBids(false);
        }
      } catch (error) {
        if (!ignore) {
          console.error('Unable to load bids', error);
          setIsUsingLocalMode(true);
          setLeaderboard(buildLeaderboard(FALLBACK_INITIAL_BIDS, BID_FLOOR));
          setIsLoadingBids(false);
        }
      }
    };

    loadBids();

    if (!canUseSupabase) {
      return () => {
        ignore = true;
      };
    }

    try {
      const channel = supabase.channel(`bids:${jobId}`)
        .on(
          'postgres_changes',
          {
            event: 'INSERT',
            schema: 'public',
            table: 'bids',
            filter: `job_id=eq.${jobId}`,
          },
          (payload: { new?: BidRecord }) => {
            const newBid = payload.new as BidRecord;
            setLeaderboard((prev) => {
              const existing = prev.some((row) => row.name === newBid.contractor_name);
              if (existing) {
                return prev;
              }

              return buildLeaderboard([...(prev as unknown as BidRecord[]), newBid], BID_FLOOR);
            });
          },
        )
        .subscribe();

      return () => {
        ignore = true;
        supabase.removeChannel(channel);
      };
    } catch (error) {
      console.error('Unable to subscribe to bids', error);
      return () => {
        ignore = true;
      };
    }
  }, [jobId]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const currentLowestBid = leaderboard.length > 0
    ? Math.min(...leaderboard.map((row) => row.bidAmount))
    : jobDetails.bidFloor;

  const handleBidSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const numericBid = parseFloat(userBid);

    if (Number.isNaN(numericBid)) {
      setBidError('Please enter a valid dollar amount.');
      return;
    }

    if (numericBid < jobDetails.bidFloor) {
      setBidError(`Bid cannot be lower than the floor price ($${jobDetails.bidFloor.toFixed(2)}).`);
      return;
    }

    setBidError('');

    if (!isSupabaseConfigured) {
      setLeaderboard((prev) => {
        const existingBidRecords = prev.length > 0
          ? prev.map((row) => ({ amount: row.bidAmount, contractor_name: row.name }))
          : FALLBACK_INITIAL_BIDS;

        return buildLeaderboard(
          [...existingBidRecords, { amount: numericBid, contractor_name: USER_BIDDER_NAME }],
          BID_FLOOR,
        );
      });
      setUserBid('');
      setIsUsingLocalMode(true);
      return;
    }

    try {
      const { error } = await supabase.from('bids').insert([
        {
          job_id: jobId,
          amount: numericBid,
          contractor_name: USER_BIDDER_NAME,
        },
      ]);

      if (error) {
        throw error;
      }

      setUserBid('');
      setIsUsingLocalMode(false);
    } catch (error) {
      console.error('Unable to save bid', error);
      setLeaderboard((prev) => {
        const existingBidRecords = prev.length > 0
          ? prev.map((row) => ({ amount: row.bidAmount, contractor_name: row.name }))
          : FALLBACK_INITIAL_BIDS;

        return buildLeaderboard(
          [...existingBidRecords, { amount: numericBid, contractor_name: USER_BIDDER_NAME }],
          BID_FLOOR,
        );
      });
      setUserBid('');
      setIsUsingLocalMode(true);
      setBidError('Saved locally because the live connection is unavailable.');
    }
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
                <span className="text-base font-bold text-white">${currentLowestBid.toFixed(2)}</span>
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
                  {isLoadingBids ? (
                    <tr>
                      <td colSpan={5} className="py-3 px-3 text-slate-400">Loading bids...</td>
                    </tr>
                  ) : leaderboard.length === 0 ? (
                    <tr>
                      <td colSpan={5} className="py-3 px-3 text-slate-400">No bids yet. Be the first to place one.</td>
                    </tr>
                  ) : (
                    leaderboard.map((row) => (
                      <tr
                        key={`${row.name}-${row.bidAmount}`}
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
                    ))
                  )}
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
              {isUsingLocalMode ? <p>🟡 Running in local/demo mode while Supabase is unavailable.</p> : null}
            </div>
          </div>
        </div>

      </main>
    </div>
  );
}

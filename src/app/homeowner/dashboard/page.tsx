'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function HomeownerDashboardPage() {
  const [jobState, setJobState] = useState({
    id: 'JOB-901',
    title: 'Switchboard Upgrade & Solar Prep',
    location: '123 Main Street, Tarneit VIC 3029',
    category: 'Electrical',
    quoteAmount: 2400.0,
    depositAmount: 240.0,
    quoteAccepted: true,
    depositPaid: true,
    workCompleted: false,
    ratingGiven: 0,
    assignedTradie: 'Apex Plumbing & Electrical (Verified)',
  });

  const [rating, setRating] = useState(0);
  const [feedback, setFeedback] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  // 15-Step Job Lifecycle Progress
  const lifecycleSteps = [
    { label: 'Inquiry Submitted', done: true },
    { label: 'Site Visit Scheduled', done: true },
    { label: 'Site Inspection Complete', done: true },
    { label: 'Quote Issued', done: true },
    { label: 'Quote Accepted', done: jobState.quoteAccepted },
    { label: '10% Deposit Paid', done: jobState.depositPaid },
    { label: 'Reverse Auction Live', done: true },
    { label: 'Tradie Matched', done: true },
    { label: 'Pre-Start Check', done: true },
    { label: 'Work In Progress', done: !jobState.workCompleted },
    { label: 'Work Completed', done: jobState.workCompleted },
    { label: 'Homeowner Sign-Off', done: jobState.workCompleted },
    { label: 'Final Payment Released', done: jobState.workCompleted },
    { label: 'Contractor Rated', done: isSubmitted },
    { label: 'Job Closed', done: isSubmitted },
  ];

  const handleApproveWork = () => {
    setJobState((prev) => ({ ...prev, workCompleted: true }));
    alert('Job completion approved! Final payment released to the contractor.');
  };

  const handleRatingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (rating === 0) {
      alert('Please select a star rating.');
      return;
    }
    setIsSubmitted(true);
    alert('Thank you! Your rating and feedback have been submitted.');
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col">
      {/* Header Bar */}
      <header className="bg-white border-b border-slate-200 py-4 px-6 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-orange-600 rounded-lg flex items-center justify-center font-bold text-white">
              B
            </div>
            <span className="font-bold text-lg text-slate-900">Builder Hand</span>
          </Link>

          <div className="flex items-center gap-4 text-xs font-semibold">
            <span className="text-slate-500">Welcome, Jane Smith</span>
            <Link
              href="/"
              className="bg-slate-100 hover:bg-slate-200 text-slate-700 px-3 py-1.5 rounded-lg border border-slate-300 transition-colors"
            >
              Sign Out
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow max-w-7xl w-full mx-auto p-4 sm:p-6 space-y-6">
        
        {/* Active Project Header Card */}
        <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6 pb-6 border-b border-slate-100">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xs font-bold text-orange-600 uppercase tracking-wider">{jobState.id}</span>
                <span className="text-[11px] bg-orange-50 text-orange-700 border border-orange-200 px-2 py-0.5 rounded-full font-semibold">
                  {jobState.category}
                </span>
              </div>
              <h1 className="text-2xl font-bold text-slate-900">{jobState.title}</h1>
              <p className="text-xs text-slate-500 mt-1">📍 {jobState.location}</p>
            </div>

            <div className="text-left sm:text-right">
              <span className="text-xs text-slate-400 block">Fixed Builder Hand Quote</span>
              <span className="text-2xl font-extrabold text-slate-900">${jobState.quoteAmount.toFixed(2)}</span>
            </div>
          </div>

          {/* Assigned Contractor Details */}
          <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 text-xs mb-6">
            <div>
              <span className="text-slate-400 block mb-0.5">Assigned Tradie</span>
              <span className="font-bold text-slate-900 text-sm">{jobState.assignedTradie}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="bg-emerald-100 text-emerald-800 text-[11px] font-bold px-2.5 py-1 rounded-full">
                ✓ Background Checked & Insured
              </span>
            </div>
          </div>

          {/* Action Hub */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            
            {/* Deposit Status Card */}
            <div className="p-4 border border-slate-200 rounded-xl bg-slate-50 flex justify-between items-center text-xs">
              <div>
                <span className="font-semibold text-slate-700 block">10% Deposit Protection</span>
                <span className="text-slate-500">${jobState.depositAmount.toFixed(2)} Escrow Deposit</span>
              </div>
              <span className="bg-emerald-600 text-white font-bold px-3 py-1.5 rounded-lg">
                ✓ Deposit Escrowed
              </span>
            </div>

            {/* Approval / Sign-off Card */}
            <div className="p-4 border border-slate-200 rounded-xl bg-slate-50 flex justify-between items-center text-xs">
              <div>
                <span className="font-semibold text-slate-700 block">Final Completion Sign-Off</span>
                <span className="text-slate-500">
                  {jobState.workCompleted ? 'Work Signed Off' : 'Approve once work is finished'}
                </span>
              </div>
              {jobState.workCompleted ? (
                <span className="bg-emerald-100 text-emerald-800 font-bold px-3 py-1.5 rounded-lg">
                  ✓ Approved & Closed
                </span>
              ) : (
                <button
                  onClick={handleApproveWork}
                  className="bg-orange-600 hover:bg-orange-700 text-white font-bold px-3.5 py-2 rounded-lg transition-colors shadow-sm"
                >
                  Approve Completion
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Contractor Rating & Feedback Form (Active when completed) */}
        {jobState.workCompleted && !isSubmitted && (
          <div className="bg-orange-50/80 border border-orange-200 rounded-2xl p-6 shadow-sm">
            <h2 className="text-base font-bold text-slate-900 mb-2">Rate Your Contractor</h2>
            <p className="text-xs text-slate-600 mb-4">
              Your honest review helps maintain high quality standards across the Builder Hand network.
            </p>

            <form onSubmit={handleRatingSubmit} className="space-y-4 max-w-xl">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-2">Overall Satisfaction</label>
                <div className="flex gap-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setRating(star)}
                      className={`w-10 h-10 rounded-lg font-bold text-sm transition-all ${
                        rating >= star
                          ? 'bg-amber-500 text-white scale-105'
                          : 'bg-white border border-slate-300 text-slate-400 hover:bg-slate-100'
                      }`}
                    >
                      ★ {star}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Feedback / Notes</label>
                <textarea
                  rows={3}
                  value={feedback}
                  onChange={(e) => setFeedback(e.target.value)}
                  placeholder="Share details about the quality of work, punctuality, and cleanliness..."
                  className="w-full bg-white border border-slate-300 rounded-xl p-3 text-xs focus:outline-none focus:border-orange-500"
                />
              </div>

              <button
                type="submit"
                className="bg-orange-600 hover:bg-orange-700 text-white font-bold text-xs px-5 py-2.5 rounded-xl transition-colors shadow-sm"
              >
                Submit Review & Close Job
              </button>
            </form>
          </div>
        )}

        {/* Job Lifecycle Step Tracker */}
        <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
          <h2 className="text-base font-bold text-slate-900 mb-4">15-Stage Project Tracker</h2>
          
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
            {lifecycleSteps.map((step, index) => (
              <div
                key={step.label}
                className={`p-3 rounded-xl border text-xs flex flex-col justify-between ${
                  step.done
                    ? 'bg-emerald-50 border-emerald-200 text-emerald-900 font-semibold'
                    : 'bg-slate-50 border-slate-200 text-slate-400'
                }`}
              >
                <span className="text-[10px] uppercase tracking-wider text-slate-400 mb-1 block">
                  Stage {index + 1}
                </span>
                <span className="text-xs">{step.label}</span>
                <span className="mt-2 text-[10px] font-bold self-end">
                  {step.done ? '✓ Done' : 'Pending'}
                </span>
              </div>
            ))}
          </div>
        </div>

      </main>
    </div>
  );
}
'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { isSupabaseConfigured, supabase } from '@/lib/supabaseClient';

type JobRecord = {
  id: number;
  title: string;
  description: string;
  status: string;
  budget_estimate: number;
  floor_price: number;
  customer_name: string;
  customer_email: string;
  customer_phone: string;
  location: string;
};

export default function AdminDashboardPage() {
  const [jobs, setJobs] = useState<JobRecord[]>([]);
  const [isLoadingJobs, setIsLoadingJobs] = useState(true);
  const [jobsError, setJobsError] = useState('');

  const stats = [
    { label: 'New Inquiries', value: '12', change: '+3 today', color: 'text-orange-600' },
    { label: 'Pending Tradies', value: '5', change: 'Awaiting Verification', color: 'text-amber-600' },
    { label: 'Live Auctions', value: '3', change: 'Active 15m Timers', color: 'text-emerald-600' },
    { label: 'Jobs In Progress', value: '18', change: 'On Site Execution', color: 'text-blue-600' },
  ];

  const pendingContractors = [
    { id: 'TRADIE-101', name: 'John Doe', company: 'Apex Plumbing Pty Ltd', trade: 'Plumbing' },
  ];

  useEffect(() => {
    async function fetchJobs() {
      setIsLoadingJobs(true);
      setJobsError('');

      if (!isSupabaseConfigured) {
        setJobsError('Supabase is not configured. Unable to load jobs.');
        setJobs([]);
        setIsLoadingJobs(false);
        return;
      }

      const { data, error } = await supabase
        .from('jobs')
        .select(
          'id, title, description, status, budget_estimate, floor_price, customer_name, customer_email, customer_phone, location'
        )
        .order('created_at', { ascending: false });

      if (error) {
        setJobsError('Unable to fetch jobs from Supabase.');
        console.error('Supabase fetch jobs error:', error);
        setJobs([]);
      } else {
        setJobs(data ?? []);
      }

      setIsLoadingJobs(false);
    }

    fetchJobs();
  }, []);

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
          <h2 className="text-base font-bold text-slate-900 mb-4">Recent Job Submissions</h2>

          {isLoadingJobs ? (
            <p className="text-sm text-slate-500">Loading jobs...</p>
          ) : jobsError ? (
            <p className="text-sm text-red-600">{jobsError}</p>
          ) : jobs.length === 0 ? (
            <p className="text-sm text-slate-500">No job submissions found.</p>
          ) : (
            <div className="space-y-4">
              {jobs.map((job) => (
                <div key={job.id} className="rounded-2xl border border-slate-200 bg-slate-50 p-5 shadow-sm">
                  <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                    <div>
                      <h3 className="text-lg font-bold text-slate-900">{job.title}</h3>
                      <p className="text-sm text-slate-500">{job.location}</p>
                    </div>
                    <span className="rounded-full bg-slate-200 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-slate-700">
                      {job.status ?? 'Unknown'}
                    </span>
                  </div>

                  <p className="mt-3 text-sm leading-6 text-slate-700">{job.description}</p>

                  <div className="mt-4 grid gap-3 sm:grid-cols-3">
                    <div className="rounded-2xl bg-white p-3 border border-slate-200">
                      <p className="text-xs uppercase text-slate-500">Budget estimate</p>
                      <p className="mt-1 text-sm font-semibold text-slate-900">${job.budget_estimate?.toLocaleString() ?? '—'}</p>
                    </div>
                    <div className="rounded-2xl bg-white p-3 border border-slate-200">
                      <p className="text-xs uppercase text-slate-500">Floor price</p>
                      <p className="mt-1 text-sm font-semibold text-slate-900">${job.floor_price?.toLocaleString() ?? '—'}</p>
                    </div>
                    <div className="rounded-2xl bg-white p-3 border border-slate-200">
                      <p className="text-xs uppercase text-slate-500">Location</p>
                      <p className="mt-1 text-sm font-semibold text-slate-900">{job.location || '—'}</p>
                    </div>
                  </div>

                  <div className="mt-4 rounded-2xl bg-white p-4 border border-slate-200">
                    <p className="text-xs uppercase text-slate-500">Client contact details</p>
                    <div className="mt-2 space-y-2 text-sm text-slate-700">
                      <p><span className="font-semibold text-slate-900">Name:</span> {job.customer_name || '—'}</p>
                      <p><span className="font-semibold text-slate-900">Email:</span> {job.customer_email || '—'}</p>
                      <p><span className="font-semibold text-slate-900">Phone:</span> {job.customer_phone || '—'}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
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
'use client';

import { FormEvent, useState } from 'react';
import { useRouter } from 'next/navigation';
import { isSupabaseConfigured, supabase } from '@/lib/supabaseClient';

export default function HomeownerPostJobPage() {
  const router = useRouter();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [location, setLocation] = useState('');
  const [budgetEstimate, setBudgetEstimate] = useState('');
  const [floorPrice, setFloorPrice] = useState('');
  const [customerName, setCustomerName] = useState('');
  const [customerEmail, setCustomerEmail] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState('');

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsSubmitting(true);
    setMessage('');

    try {
      if (!isSupabaseConfigured) {
        setMessage('Saved locally for now. Connect Supabase to persist jobs remotely.');
        router.push('/homeowner/dashboard');
        return;
      }

      const { error } = await supabase.from('jobs').insert([
        {
          title,
          description,
          category,
          location,
          budget_estimate: Number(budgetEstimate),
          floor_price: Number(floorPrice),
          customer_name: customerName,
          customer_email: customerEmail,
          customer_phone: customerPhone,
        },
      ]);

      if (error) {
        throw error;
      }

      router.push('/homeowner/dashboard');
    } catch (error) {
      console.error('Unable to create job', error);
      setMessage('Unable to save job right now. Please try again later.');
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <main className="min-h-screen bg-slate-100 px-4 py-10 text-slate-900">
      <div className="mx-auto max-w-3xl rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
        <h1 className="text-2xl font-bold">Post a new job</h1>
        <p className="mt-2 text-sm text-slate-600">Share your project details and publish it to the Builder Hand marketplace.</p>

        <form onSubmit={handleSubmit} className="mt-8 space-y-4">
          <div>
            <label className="mb-1 block text-sm font-semibold">Job title</label>
            <input
              required
              value={title}
              onChange={(event) => setTitle(event.target.value)}
              className="w-full rounded-lg border border-slate-300 px-3 py-2"
              placeholder="e.g. Bathroom Renovation"
            />
          </div>

          <div>
            <label className="mb-1 block text-sm font-semibold">Description</label>
            <textarea
              required
              rows={4}
              value={description}
              onChange={(event) => setDescription(event.target.value)}
              className="w-full rounded-lg border border-slate-300 px-3 py-2"
              placeholder="Describe the scope of work"
            />
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <label className="mb-1 block text-sm font-semibold">Category</label>
              <input
                required
                value={category}
                onChange={(event) => setCategory(event.target.value)}
                className="w-full rounded-lg border border-slate-300 px-3 py-2"
                placeholder="e.g. Plumbing"
              />
            </div>
            <div>
              <label className="mb-1 block text-sm font-semibold">Location</label>
              <input
                required
                value={location}
                onChange={(event) => setLocation(event.target.value)}
                className="w-full rounded-lg border border-slate-300 px-3 py-2"
                placeholder="e.g. Melbourne, VIC"
              />
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <label className="mb-1 block text-sm font-semibold">Full name</label>
              <input
                required
                value={customerName}
                onChange={(event) => setCustomerName(event.target.value)}
                className="w-full rounded-lg border border-slate-300 px-3 py-2"
                placeholder="e.g. Jane Doe"
              />
            </div>
            <div>
              <label className="mb-1 block text-sm font-semibold">Email address</label>
              <input
                required
                type="email"
                value={customerEmail}
                onChange={(event) => setCustomerEmail(event.target.value)}
                className="w-full rounded-lg border border-slate-300 px-3 py-2"
                placeholder="e.g. jane@example.com"
              />
            </div>
          </div>

          <div>
            <label className="mb-1 block text-sm font-semibold">Phone number</label>
            <input
              required
              type="tel"
              value={customerPhone}
              onChange={(event) => setCustomerPhone(event.target.value)}
              className="w-full rounded-lg border border-slate-300 px-3 py-2"
              placeholder="e.g. +61 400 000 000"
            />
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <label className="mb-1 block text-sm font-semibold">Budget estimate</label>
              <input
                required
                type="number"
                min="0"
                value={budgetEstimate}
                onChange={(event) => setBudgetEstimate(event.target.value)}
                className="w-full rounded-lg border border-slate-300 px-3 py-2"
                placeholder="5000"
              />
            </div>
            <div>
              <label className="mb-1 block text-sm font-semibold">Floor price</label>
              <input
                required
                type="number"
                min="0"
                value={floorPrice}
                onChange={(event) => setFloorPrice(event.target.value)}
                className="w-full rounded-lg border border-slate-300 px-3 py-2"
                placeholder="4500"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="rounded-lg bg-orange-600 px-4 py-2 font-semibold text-white transition hover:bg-orange-700 disabled:cursor-not-allowed disabled:bg-orange-300"
          >
            {isSubmitting ? 'Posting...' : 'Post job'}
          </button>

          {message ? <p className="text-sm text-slate-600">{message}</p> : null}
        </form>
      </div>
    </main>
  );
}

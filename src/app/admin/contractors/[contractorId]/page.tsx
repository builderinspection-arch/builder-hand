'use client';

import Link from 'next/link';

export default function AdminContractorApprovalPage() {
  const contractor = {
    id: 'TRADIE-101',
    name: 'John Doe',
    company: 'Apex Plumbing Pty Ltd',
    documents: ['White Card', 'Driver Licence', 'Trade Licence', 'Public Liability ($10M)', 'Police Check'],
  };

  return (
    <div className="min-h-screen bg-slate-100 text-slate-900 flex flex-col p-6">
      <div className="max-w-4xl mx-auto w-full bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
        <Link href="/admin/dashboard" className="text-xs text-orange-600 font-semibold mb-4 inline-block">
          ← Back to Admin Dashboard
        </Link>
        <h1 className="text-2xl font-bold mb-2">{contractor.company}</h1>
        <p className="text-xs text-slate-500 mb-6">Contact: {contractor.name} | ID: {contractor.id}</p>

        <h3 className="text-sm font-bold mb-3">Compliance Documents</h3>
        <div className="space-y-2 mb-6">
          {contractor.documents.map((doc) => (
            <div key={doc} className="p-3 border rounded-lg bg-slate-50 text-xs flex justify-between font-semibold">
              <span>{doc}</span>
              <span className="text-emerald-600">✓ Uploaded & Verified</span>
            </div>
          ))}
        </div>

        <div className="flex gap-4">
          <button
            onClick={() => alert('Contractor Approved!')}
            className="flex-1 bg-emerald-600 text-white font-bold py-3 rounded-xl text-xs hover:bg-emerald-700"
          >
            APPROVE TRADIE
          </button>
          <button
            onClick={() => alert('Rejected')}
            className="flex-1 bg-red-600 text-white font-bold py-3 rounded-xl text-xs hover:bg-red-700"
          >
            REJECT
          </button>
        </div>
      </div>
    </div>
  );
}
'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function ContractorRegistrationPage() {
  const [formData, setFormData] = useState({
    fullName: '',
    companyName: '',
    abnAcn: '',
    mobileNumber: '',
    email: '',
    tradeCategory: '',
    experienceLevel: '',
    businessAddress: '',
    postcode: '',
    serviceRadiusKm: '25',
  });

  const [documents, setDocuments] = useState({
    whiteCard: null as File | null,
    driverLicence: null as File | null,
    tradeLicence: null as File | null,
    publicLiability: null as File | null,
    policeCheck: null as File | null,
  });

  const tradeCategories = [
    'Plumbing',
    'Electrical',
    'Carpentry & Framing',
    'Concreting & Paving',
    'Roofing',
    'Tiling & Waterproofing',
    'Plastering & Painting',
    'Landscaping',
    'General Building',
  ];

  const handleFileChange = (docType: keyof typeof documents, file: File | null) => {
    setDocuments((prev) => ({ ...prev, [docType]: file }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert(
      'Application Submitted! Your account is currently in "Pending" status. Our team will review your compliance documents within 24 hours.'
    );
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col">
      {/* Header */}
      <header className="bg-slate-900 border-b border-slate-800 py-4 text-white">
        <div className="max-w-4xl mx-auto px-4 flex justify-between items-center">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-orange-600 rounded-lg flex items-center justify-center font-bold text-white text-lg">
              B
            </div>
            <span className="text-lg font-bold tracking-tight">
              Builder <span className="text-orange-600">Hand</span>
            </span>
          </Link>
          <span className="text-xs font-semibold text-orange-400 uppercase tracking-wider">
            Contractor Portal Onboarding
          </span>
        </div>
      </header>

      <main className="flex-grow py-12 px-4">
        <div className="max-w-3xl mx-auto bg-white border border-slate-200 rounded-2xl p-6 sm:p-10 shadow-sm">
          <div className="mb-8 pb-6 border-b border-slate-200">
            <h1 className="text-2xl font-bold text-slate-900">Tradie Registration & Compliance</h1>
            <p className="text-sm text-slate-600 mt-1">
              Join the Builder Hand trade network. Approved contractors gain access to 15-minute live reverse auctions.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Section 1: Personal & Business Info */}
            <div>
              <h2 className="text-base font-bold text-slate-900 uppercase tracking-wider text-xs bg-slate-100 p-2 rounded mb-4">
                1. Business & Contact Information
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Full Name</label>
                  <input
                    type="text"
                    required
                    className="w-full border border-slate-300 rounded-lg p-2.5 text-sm focus:ring-2 focus:ring-orange-500 focus:outline-none"
                    placeholder="e.g. John Doe"
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Company Name</label>
                  <input
                    type="text"
                    required
                    className="w-full border border-slate-300 rounded-lg p-2.5 text-sm focus:ring-2 focus:ring-orange-500 focus:outline-none"
                    placeholder="e.g. Apex Plumbing Pty Ltd"
                    value={formData.companyName}
                    onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">ABN / ACN</label>
                  <input
                    type="text"
                    required
                    className="w-full border border-slate-300 rounded-lg p-2.5 text-sm focus:ring-2 focus:ring-orange-500 focus:outline-none"
                    placeholder="11 222 333 444"
                    value={formData.abnAcn}
                    onChange={(e) => setFormData({ ...formData, abnAcn: e.target.value })}
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Mobile Number</label>
                  <input
                    type="tel"
                    required
                    className="w-full border border-slate-300 rounded-lg p-2.5 text-sm focus:ring-2 focus:ring-orange-500 focus:outline-none"
                    placeholder="0400 000 000"
                    value={formData.mobileNumber}
                    onChange={(e) => setFormData({ ...formData, mobileNumber: e.target.value })}
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Email Address</label>
                  <input
                    type="email"
                    required
                    className="w-full border border-slate-300 rounded-lg p-2.5 text-sm focus:ring-2 focus:ring-orange-500 focus:outline-none"
                    placeholder="john@apexplumbing.com.au"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  />
                </div>
              </div>
            </div>

            {/* Section 2: Trade & Coverage */}
            <div>
              <h2 className="text-base font-bold text-slate-900 uppercase tracking-wider text-xs bg-slate-100 p-2 rounded mb-4">
                2. Trade Category & Service Area
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Trade Category</label>
                  <select
                    required
                    className="w-full border border-slate-300 rounded-lg p-2.5 text-sm focus:ring-2 focus:ring-orange-500 focus:outline-none"
                    value={formData.tradeCategory}
                    onChange={(e) => setFormData({ ...formData, tradeCategory: e.target.value })}
                  >
                    <option value="">-- Select Trade --</option>
                    {tradeCategories.map((t) => (
                      <option key={t} value={t}>{t}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Experience Level</label>
                  <select
                    required
                    className="w-full border border-slate-300 rounded-lg p-2.5 text-sm focus:ring-2 focus:ring-orange-500 focus:outline-none"
                    value={formData.experienceLevel}
                    onChange={(e) => setFormData({ ...formData, experienceLevel: e.target.value })}
                  >
                    <option value="">-- Select Experience --</option>
                    <option value="1-3 years">1 - 3 Years</option>
                    <option value="3-5 years">3 - 5 Years</option>
                    <option value="5-10 years">5 - 10 Years</option>
                    <option value="10+ years">10+ Years Master Tradesperson</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Business Address</label>
                  <input
                    type="text"
                    required
                    className="w-full border border-slate-300 rounded-lg p-2.5 text-sm focus:ring-2 focus:ring-orange-500 focus:outline-none"
                    placeholder="Street Address"
                    value={formData.businessAddress}
                    onChange={(e) => setFormData({ ...formData, businessAddress: e.target.value })}
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Postcode & Radius (KM)</label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      required
                      className="w-1/2 border border-slate-300 rounded-lg p-2.5 text-sm focus:ring-2 focus:ring-orange-500 focus:outline-none"
                      placeholder="Postcode"
                      value={formData.postcode}
                      onChange={(e) => setFormData({ ...formData, postcode: e.target.value })}
                    />
                    <select
                      className="w-1/2 border border-slate-300 rounded-lg p-2.5 text-sm focus:ring-2 focus:ring-orange-500 focus:outline-none"
                      value={formData.serviceRadiusKm}
                      onChange={(e) => setFormData({ ...formData, serviceRadiusKm: e.target.value })}
                    >
                      <option value="15">15 KM Radius</option>
                      <option value="25">25 KM Radius</option>
                      <option value="50">50 KM Radius</option>
                      <option value="100">100 KM Radius</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>

            {/* Section 3: Mandatory Document Uploads */}
            <div>
              <h2 className="text-base font-bold text-slate-900 uppercase tracking-wider text-xs bg-slate-100 p-2 rounded mb-1">
                3. Mandatory Compliance Document Uploads
              </h2>
              <p className="text-xs text-slate-500 mb-4">
                All 5 documents are strictly required for account verification before bidding on jobs.
              </p>

              <div className="space-y-3">
                {[
                  { key: 'whiteCard', label: 'White Card (Construction Induction)' },
                  { key: 'driverLicence', label: 'Driver Licence (Front & Back)' },
                  { key: 'tradeLicence', label: 'Trade Licence Card / Certificate' },
                  { key: 'publicLiability', label: 'Public Liability Insurance Policy ($10M+)' },
                  { key: 'policeCheck', label: 'National Police Check (Issued within 12 months)' },
                ].map((doc) => (
                  <div key={doc.key} className="flex flex-col sm:flex-row sm:items-center justify-between p-3 border border-slate-200 rounded-lg bg-slate-50 gap-2">
                    <span className="text-xs font-semibold text-slate-800">{doc.label}</span>
                    <input
                      type="file"
                      required
                      accept=".pdf,.png,.jpg,.jpeg"
                      onChange={(e) => handleFileChange(doc.key as keyof typeof documents, e.target.files?.[0] || null)}
                      className="text-xs text-slate-500 file:mr-3 file:py-1.5 file:px-3 file:rounded-md file:border-0 file:text-xs file:font-semibold file:bg-orange-600 file:text-white hover:file:bg-orange-700 cursor-pointer"
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Section 4: Performance Points Info */}
            <div className="bg-slate-900 text-white rounded-xl p-4">
              <div className="flex justify-between items-center mb-2">
                <span className="text-xs font-bold text-orange-400 uppercase tracking-wider">Starting Performance Score</span>
                <span className="bg-orange-600 text-white text-xs font-bold px-2.5 py-1 rounded-full">50 / 110 Points</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                All new approved tradies start with 50 points. Earn +10 points per completed job and +5 for 5-star reviews to increase your winning score in reverse auctions!
              </p>
            </div>

            {/* Form Actions */}
            <div className="pt-4 flex items-center justify-between border-t border-slate-200">
              <Link href="/" className="text-xs font-semibold text-slate-600 hover:text-slate-900">
                Cancel & Return Home
              </Link>
              <button
                type="submit"
                className="bg-orange-600 hover:bg-orange-700 text-white font-semibold text-sm px-8 py-3 rounded-lg shadow-sm transition-colors"
              >
                Submit Registration Application
              </button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}
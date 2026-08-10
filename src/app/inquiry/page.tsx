'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function HomeownerInquiryPage() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    tradeCategory: '',
    address: '',
    postcode: '',
    description: '',
    preferredStartDate: '',
    photos: [] as string[],
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
    'General Building / Renovation',
  ];

  const handleNext = () => {
    if (step < 3) setStep(step + 1);
  };

  const handleBack = () => {
    if (step > 1) setStep(step - 1);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Inquiry submitted successfully! A Builder Hand manager will contact you to schedule a site inspection.');
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 py-4">
        <div className="max-w-4xl mx-auto px-4 flex justify-between items-center">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-orange-600 rounded-lg flex items-center justify-center font-bold text-white text-lg">
              B
            </div>
            <span className="text-lg font-bold text-slate-900">
              Builder <span className="text-orange-600">Hand</span>
            </span>
          </Link>
          <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
            Homeowner Job Inquiry
          </span>
        </div>
      </header>

      <main className="flex-grow py-12 px-4">
        <div className="max-w-2xl mx-auto bg-white border border-slate-200 rounded-2xl p-6 sm:p-10 shadow-sm">
          
          {/* Progress Indicator */}
          <div className="mb-8">
            <div className="flex justify-between text-xs font-semibold text-slate-500 mb-2">
              <span>Step {step} of 3</span>
              <span>
                {step === 1 && 'Job Details & Trade'}
                {step === 2 && 'Location & Timing'}
                {step === 3 && 'Photos & Review'}
              </span>
            </div>
            <div className="w-full bg-slate-100 rounded-full h-2">
              <div
                className="bg-orange-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${(step / 3) * 100}%` }}
              ></div>
            </div>
          </div>

          <form onSubmit={handleSubmit}>
            {/* STEP 1: Trade & Details */}
            {step === 1 && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-xl font-bold text-slate-900 mb-1">Select Trade Required</h2>
                  <p className="text-xs text-slate-500 mb-4">Choose the primary trade service you need.</p>
                  
                  <select
                    className="w-full border border-slate-300 rounded-lg p-3 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
                    value={formData.tradeCategory}
                    onChange={(e) => setFormData({ ...formData, tradeCategory: e.target.value })}
                    required
                  >
                    <option value="">-- Select a Trade Category --</option>
                    {tradeCategories.map((trade) => (
                      <option key={trade} value={trade}>
                        {trade}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-900 mb-1">
                    Describe Your Job Scope
                  </label>
                  <textarea
                    rows={4}
                    className="w-full border border-slate-300 rounded-lg p-3 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
                    placeholder="Provide as much detail as possible (e.g., dimensions, materials required, current state of site)..."
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    required
                  />
                </div>
              </div>
            )}

            {/* STEP 2: Location & Schedule */}
            {step === 2 && (
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-semibold text-slate-900 mb-1">
                    Property Address
                  </label>
                  <input
                    type="text"
                    className="w-full border border-slate-300 rounded-lg p-3 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 mb-4"
                    placeholder="123 Example Street, Suburb"
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    required
                  />

                  <label className="block text-sm font-semibold text-slate-900 mb-1">
                    Postcode
                  </label>
                  <input
                    type="text"
                    className="w-full border border-slate-300 rounded-lg p-3 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
                    placeholder="e.g. 3000"
                    value={formData.postcode}
                    onChange={(e) => setFormData({ ...formData, postcode: e.target.value })}
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-900 mb-1">
                    Preferred Start Date
                  </label>
                  <input
                    type="date"
                    className="w-full border border-slate-300 rounded-lg p-3 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
                    value={formData.preferredStartDate}
                    onChange={(e) => setFormData({ ...formData, preferredStartDate: e.target.value })}
                  />
                </div>
              </div>
            )}

            {/* STEP 3: Photos & Submission */}
            {step === 3 && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-xl font-bold text-slate-900 mb-1">Upload Site Photos (Optional)</h2>
                  <p className="text-xs text-slate-500 mb-4">Photos help us accurately scope your quote during site inspection.</p>

                  <div className="border-2 border-dashed border-slate-300 rounded-xl p-8 text-center bg-slate-50 hover:bg-slate-100 transition-colors cursor-pointer">
                    <p className="text-sm font-medium text-slate-700">Drag and drop site photos here</p>
                    <p className="text-xs text-slate-400 mt-1">PNG, JPG or WEBP up to 10MB</p>
                  </div>
                </div>

                <div className="bg-orange-50 border border-orange-200 rounded-xl p-4">
                  <h4 className="text-xs font-bold text-orange-900 uppercase tracking-wider mb-1">
                    Next Steps After Submission:
                  </h4>
                  <ul className="text-xs text-orange-800 space-y-1">
                    <li>1. A Builder Hand site manager reviews your inquiry.</li>
                    <li>2. We schedule a site visit to formulate an official quote.</li>
                    <li>3. Upon quote approval, your job is dispatched for competitive tradie bidding.</li>
                  </ul>
                </div>
              </div>
            )}

            {/* Form Controls */}
            <div className="flex justify-between items-center mt-8 pt-6 border-t border-slate-200">
              {step > 1 ? (
                <button
                  type="button"
                  onClick={handleBack}
                  className="px-5 py-2.5 rounded-lg border border-slate-300 text-sm font-semibold text-slate-700 hover:bg-slate-50 transition-colors"
                >
                  Back
                </button>
              ) : (
                <Link
                  href="/"
                  className="px-5 py-2.5 rounded-lg border border-slate-300 text-sm font-semibold text-slate-700 hover:bg-slate-50 transition-colors"
                >
                  Cancel
                </Link>
              )}

              {step < 3 ? (
                <button
                  type="button"
                  onClick={handleNext}
                  className="px-6 py-2.5 rounded-lg bg-orange-600 hover:bg-orange-700 text-white text-sm font-semibold transition-colors shadow-sm"
                >
                  Next Step
                </button>
              ) : (
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-lg bg-orange-600 hover:bg-orange-700 text-white text-sm font-semibold transition-colors shadow-sm"
                >
                  Submit Inquiry
                </button>
              )}
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}
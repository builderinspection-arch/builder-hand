import Link from 'next/link';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white text-slate-900 flex flex-col">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-2">
              <Link href="/" className="flex items-center gap-2">
                <div className="w-9 h-9 bg-orange-600 rounded-lg flex items-center justify-center font-bold text-white text-xl">
                  B
                </div>
                <span className="text-xl font-bold text-slate-900 tracking-tight">
                  Builder <span className="text-orange-600">Hand</span>
                </span>
              </Link>
            </div>

            <nav className="hidden md:flex items-center space-x-8 text-sm font-medium text-slate-700">
              <Link href="/" className="hover:text-orange-600 transition-colors">Home</Link>
              <Link href="/about" className="hover:text-orange-600 transition-colors">About Us</Link>
              <Link href="/services" className="hover:text-orange-600 transition-colors">Services</Link>
              <Link href="/contact" className="hover:text-orange-600 transition-colors">Contact Us</Link>
            </nav>

            <div className="flex items-center gap-4">
              <Link href="/login" className="text-sm font-medium text-slate-700 hover:text-slate-900 transition-colors">
                Sign In
              </Link>
              <Link href="/inquiry" className="bg-orange-600 hover:bg-orange-700 text-white font-medium text-sm px-4 py-2 rounded-lg transition-colors shadow-sm">
                Post a Job
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <main className="flex-grow">
        <section className="bg-slate-900 text-white py-20 lg:py-28 relative overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <span className="inline-block bg-orange-600/20 text-orange-400 text-xs font-semibold uppercase tracking-wider px-3 py-1 rounded-full mb-4 border border-orange-500/30">
                  Managed Trade Marketplace
                </span>
                <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight leading-tight mb-6">
                  Quality Trades. <br />
                  <span className="text-orange-500">Transparent Pricing.</span> <br />
                  Managed Execution.
                </h1>
                <p className="text-slate-300 text-lg mb-8 max-w-xl leading-relaxed">
                  Builder Hand handles the site inspection and upfront quoting. Top-rated, verified local tradies compete in reverse auctions to complete your job with guaranteed performance.
                </p>

                <div className="flex flex-col sm:flex-row gap-4">
                  <Link href="/inquiry" className="bg-orange-600 hover:bg-orange-700 text-white font-semibold text-center px-6 py-3.5 rounded-lg transition-colors shadow-lg shadow-orange-600/20">
                    Post a Job Today
                  </Link>
                  <Link href="/register/contractor" className="bg-slate-800 hover:bg-slate-700 text-white font-semibold text-center px-6 py-3.5 rounded-lg border border-slate-700 transition-colors">
                    Join as a Contractor
                  </Link>
                </div>
              </div>

              {/* Status Card */}
              <div className="bg-slate-800/80 border border-slate-700 rounded-2xl p-6 sm:p-8 backdrop-blur shadow-2xl">
                <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-emerald-500 inline-block"></span>
                  Active Marketplace Status
                </h3>

                <div className="space-y-4">
                  <div className="bg-slate-900/60 p-4 rounded-xl border border-slate-700/50 flex justify-between items-center">
                    <div>
                      <p className="text-xs text-slate-400">Average Tradie Rating</p>
                      <p className="text-lg font-bold text-white">4.9 / 5.0 Stars</p>
                    </div>
                    <span className="text-orange-400 font-semibold text-sm">Verified</span>
                  </div>

                  <div className="bg-slate-900/60 p-4 rounded-xl border border-slate-700/50 flex justify-between items-center">
                    <div>
                      <p className="text-xs text-slate-400">Reverse Auction Savings</p>
                      <p className="text-lg font-bold text-white">15% – 25% Average</p>
                    </div>
                    <span className="text-emerald-400 font-semibold text-sm">Fair Floor Price</span>
                  </div>

                  <div className="bg-slate-900/60 p-4 rounded-xl border border-slate-700/50 flex justify-between items-center">
                    <div>
                      <p className="text-xs text-slate-400">Vetting Standards</p>
                      <p className="text-lg font-bold text-white">5-Point Compliance Check</p>
                    </div>
                    <span className="text-orange-400 font-semibold text-sm">Strict Oversight</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
const stats = [
  {
    value: '100% Verified Tradies',
    label: 'Every contractor is screened for compliance and quality.',
  },
  {
    value: 'Protected Floor Prices',
    label: 'Fair bidding protects homeowner budgets and tradie margins.',
  },
  {
    value: 'Support 1300 352 914',
    label: 'Fast human assistance for clients and contractors alike.',
  },
];

const testimonials = [
  {
    quote:
      'Saved $850 on our switchboard upgrade! Verified tradies bid live and the job was completed smoothly.',
    author: 'Sarah M.',
    location: 'Tarneit, VIC',
    role: 'Homeowner',
  },
  {
    quote:
      'Fast building & pest inspection turnaround. Clear pricing and hassle-free.',
    author: 'David K.',
    location: 'Point Cook, VIC',
    role: 'Homeowner',
  },
  {
    quote:
      'No wasted lead fees. Real jobs with defined scopes and transparent reverse bidding.',
    author: 'Marcus T.',
    location: 'Apex Electrical',
    role: 'Contractor',
  },
];

export function SiteStats() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="grid gap-6 md:grid-cols-3">
        {stats.map((stat) => (
          <div key={stat.value} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <p className="text-2xl font-semibold text-slate-900">{stat.value}</p>
            <p className="mt-2 text-sm leading-6 text-slate-600">{stat.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export function TestimonialsSection() {
  return (
    <section className="mx-auto max-w-7xl px-4 pb-20 sm:px-6 lg:px-8">
      <div className="mb-8 flex items-end justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-orange-500">What Our Users Say</p>
          <h2 className="mt-2 text-3xl font-semibold text-slate-900">Trusted by homeowners and tradies across Victoria.</h2>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {testimonials.map((item) => (
          <article key={`${item.author}-${item.location}`} className="rounded-3xl border border-slate-200 bg-slate-50 p-7 shadow-sm">
            <p className="text-lg leading-8 text-slate-700">“{item.quote}”</p>
            <div className="mt-6">
              <p className="font-semibold text-slate-900">{item.author}</p>
              <p className="text-sm text-slate-600">{item.location}</p>
              <p className="text-sm font-medium text-orange-600">{item.role}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

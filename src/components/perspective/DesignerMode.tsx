const PLANS = [
  { title: "Date night", meta: "Sat, May 24 · 2 people", people: 2 },
  { title: "Girls dinner", meta: "Fri, May 30 · 4 people", people: 3 },
  { title: "Birthday dinner", meta: "Sat, Jun 7 · 6 people", people: 3 },
];

function PhoneMockup() {
  return (
    <div className="w-[240px] shrink-0 rounded-[2.4rem] border-[6px] border-neutral-900 bg-white shadow-2xl">
      <div className="flex h-full flex-col overflow-hidden rounded-[2rem] px-4 pb-3 pt-2 text-neutral-900">
        <div className="flex items-center justify-between text-[10px] font-semibold">
          <span>9:41</span>
          <span className="h-4 w-16 rounded-full bg-neutral-900" />
          <span className="tracking-tight">●●●</span>
        </div>

        <p className="mt-2 text-[15px] font-bold">My Plans</p>

        <div className="mt-2 flex flex-col gap-1.5">
          {PLANS.map((plan) => (
            <div key={plan.title} className="rounded-xl bg-neutral-100 px-2.5 py-2">
              <p className="text-[11px] font-semibold">{plan.title}</p>
              <p className="text-[9px] text-neutral-500">{plan.meta}</p>
              <div className="mt-1 flex -space-x-1.5">
                {Array.from({ length: plan.people }).map((_, i) => (
                  <span
                    key={i}
                    className="h-4 w-4 rounded-full border border-white bg-gradient-to-br from-neutral-300 to-neutral-400"
                  />
                ))}
              </div>
            </div>
          ))}
        </div>

        <p className="mt-2.5 text-[11px] font-bold">Explore Collections</p>
        <div className="relative mt-1.5 h-16 overflow-hidden rounded-xl bg-gradient-to-br from-neutral-800 to-neutral-950 p-2">
          <p className="text-[11px] font-bold text-white">Infatuation</p>
          <p className="text-[9px] text-neutral-300">Top 50 in NYC</p>
          <span className="absolute bottom-1.5 left-2 rounded-full bg-black/60 px-1.5 py-0.5 text-[8px] text-white">
            ◉ 24
          </span>
        </div>

        <div className="mt-2 flex items-center justify-around border-t border-neutral-100 pt-1.5 text-[8px] text-neutral-400">
          <span>Updates</span>
          <span className="font-semibold text-neutral-900">Plans</span>
          <span>Collections</span>
        </div>
      </div>
    </div>
  );
}

export default function DesignerMode() {
  return (
    <div className="flex h-full items-center gap-8 bg-gradient-to-br from-[#efeaff] to-[#e3dbfd] px-8 dark:from-[#221d38] dark:to-[#1b1730]">
      <div className="min-w-0 flex-1">
        <p className="text-4xl font-bold tracking-tight text-neutral-900 dark:text-white">
          Snagr
        </p>
        <p className="mt-4 text-lg leading-snug text-neutral-700 dark:text-neutral-300">
          Create a plan.
          <br />
          We&rsquo;ll watch for you.
        </p>
        <div className="mt-6 flex flex-col items-start gap-2.5">
          <span className="rounded-xl bg-accent px-5 py-2.5 text-sm font-medium text-white">
            Create Plan
          </span>
          <span className="rounded-xl border border-neutral-300 bg-white/60 px-5 py-2.5 text-sm font-medium text-neutral-700 dark:border-ink-line dark:bg-white/10 dark:text-neutral-300">
            Browse Collections
          </span>
        </div>
      </div>
      <PhoneMockup />
    </div>
  );
}

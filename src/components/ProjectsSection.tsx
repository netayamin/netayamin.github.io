function StatusBar({ dark }: { dark?: boolean }) {
  const color = dark ? "text-white" : "text-neutral-900";
  return (
    <div className={`flex items-center justify-between px-5 pt-3 text-[11px] font-medium ${color}`}>
      <span>9:41</span>
      <span aria-hidden>📶 🔋</span>
    </div>
  );
}

const PROJECTS = [
  {
    name: "Snagr",
    description: "Live watchlists for the hardest restaurant reservations.",
    mockup: (
      <div className="flex h-full flex-col bg-neutral-950 text-white">
        <StatusBar dark />
        <div className="mt-4 px-5">
          <p className="text-sm font-medium text-white">Live dining watchlists</p>
          <p className="mt-5 text-xs tracking-wide text-neutral-400">Upcoming</p>
          <div className="mt-2 space-y-2">
            <div className="rounded-2xl bg-white/5 p-3.5">
              <p className="text-sm font-medium">Date night</p>
              <p className="mt-0.5 text-xs text-neutral-400">Fri, May 24 · West Village</p>
            </div>
            <div className="rounded-2xl bg-white/5 p-3.5">
              <p className="text-sm font-medium">Girls dinner</p>
              <p className="mt-0.5 text-xs text-neutral-400">Sat, May 25 · Soho</p>
            </div>
          </div>
        </div>
      </div>
    ),
  },
  {
    name: "Clarity",
    description: "A simple planning app that helps you focus on what matters.",
    mockup: (
      <div className="flex h-full flex-col bg-[#f4f1ea] text-neutral-900">
        <StatusBar />
        <div className="mt-4 px-5">
          <p className="text-sm font-medium">Your space, organized</p>
          <p className="mt-5 text-xs tracking-wide text-neutral-400">Today</p>
          <div className="mt-2 space-y-2">
            <div className="flex items-center gap-2.5 rounded-2xl bg-white p-3.5 shadow-sm">
              <span className="h-4 w-4 shrink-0 rounded border border-neutral-300" />
              <div>
                <p className="text-sm font-medium">Design review</p>
                <p className="mt-0.5 text-xs text-neutral-400">10:00 AM</p>
              </div>
            </div>
            <div className="flex items-center gap-2.5 rounded-2xl bg-white p-3.5 shadow-sm">
              <span className="h-4 w-4 shrink-0 rounded border border-neutral-300" />
              <div>
                <p className="text-sm font-medium">User interview</p>
                <p className="mt-0.5 text-xs text-neutral-400">1:30 PM</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    ),
  },
];

export default function ProjectsSection() {
  return (
    <section id="work" className="border-t border-neutral-200 px-6 py-20 md:px-10">
      <h2 className="text-3xl font-semibold text-neutral-900">Projects</h2>

      <div className="mt-8 grid gap-6 md:grid-cols-2">
        {PROJECTS.map((project) => (
          <article
            key={project.name}
            className="flex items-center gap-6 rounded-3xl border border-neutral-200 bg-white p-6"
          >
            <div className="h-[260px] w-[140px] shrink-0 overflow-hidden rounded-[2rem] border-[6px] border-neutral-900 bg-neutral-900 shadow-sm">
              {project.mockup}
            </div>

            <div>
              <h3 className="text-xl font-semibold text-neutral-900">{project.name}</h3>
              <p className="mt-2 max-w-[220px] text-sm text-neutral-500">{project.description}</p>
              <a
                href="#"
                className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-neutral-900"
              >
                View project
                <span aria-hidden>→</span>
              </a>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

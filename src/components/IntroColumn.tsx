import { ArrowRight, FileText, FlaskConical, Mail } from "lucide-react";
import { LinkedInIcon } from "./BrandIcons";

type Project = {
  name: string;
  status?: { label: string; tone: "live" | "wip" };
  description: string;
  tags: string[];
  icon: React.ReactNode;
};

const PROJECTS: Project[] = [
  {
    name: "Snagr",
    status: { label: "Live", tone: "live" },
    description: "Restaurant planning for people who never know where they'll eat.",
    tags: ["iOS", "SwiftUI", "AI", "Supabase"],
    icon: (
      <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-[#9d7bff] to-[#6a45f0] text-xl font-bold text-white">
        S
      </span>
    ),
  },
  {
    name: "Peel",
    status: { label: "In Development", tone: "wip" },
    description: "AI-native commercial real estate search for brokers.",
    tags: ["Web", "React", "Design System"],
    icon: (
      <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#f5efe4] text-xl font-bold text-neutral-800">
        P
      </span>
    ),
  },
  {
    name: "Experiments",
    description: "Components, interactions and random ideas.",
    tags: ["Design System", "Animations", "Components"],
    icon: (
      <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-accent-soft text-accent">
        <FlaskConical size={22} strokeWidth={1.75} />
      </span>
    ),
  },
];

const CONTACT = [
  { label: "Resume", href: "#", icon: <FileText size={15} /> },
  { label: "LinkedIn", href: "https://www.linkedin.com/", icon: <LinkedInIcon size={15} /> },
  { label: "Email", href: "#", icon: <Mail size={15} /> },
];

export default function IntroColumn() {
  return (
    <div className="flex h-full min-h-0 flex-col">
      <h1 className="text-[clamp(1.9rem,3.2vw,2.9rem)] font-bold leading-[1.12] tracking-tight">
        I design and build
        <br />
        products from 0{" "}
        <ArrowRight className="inline h-[0.8em] w-[0.8em] text-accent" strokeWidth={2.5} />{" "}
        1.
      </h1>
      <p className="mt-4 max-w-sm text-[15px] leading-relaxed text-muted">
        I care about clean interfaces, thoughtful interactions, and shipping
        real things.
      </p>

      <p className="mt-7 text-[11px] font-semibold uppercase tracking-[0.14em] text-muted">
        Featured Work
      </p>

      <div className="mt-3 flex min-h-0 flex-col gap-3 overflow-hidden">
        {PROJECTS.map((project) => (
          <a
            key={project.name}
            href="#"
            className="group flex items-center gap-4 rounded-2xl border border-line bg-card p-4 transition-colors hover:border-fg/20"
          >
            {project.icon}
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-2">
                <span className="text-[17px] font-semibold">{project.name}</span>
                {project.status && (
                  <span
                    className={`rounded-full px-2 py-0.5 text-[11px] font-medium ${
                      project.status.tone === "live"
                        ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
                        : "bg-amber-500/10 text-amber-600 dark:text-amber-400"
                    }`}
                  >
                    {project.status.label}
                  </span>
                )}
              </div>
              <p className="mt-0.5 truncate text-[13px] text-muted">
                {project.description}
              </p>
              <div className="mt-2 flex flex-wrap gap-1.5">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-md border border-line px-2 py-0.5 text-[11px] text-muted"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
            <ArrowRight
              size={17}
              className="shrink-0 text-muted transition-transform group-hover:translate-x-0.5 group-hover:text-fg"
            />
          </a>
        ))}
      </div>

      <div className="mt-auto pt-5">
        <div className="flex items-center gap-6 text-sm text-fg/80">
          {CONTACT.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="flex items-center gap-1.5 transition-colors hover:text-fg"
            >
              {item.icon}
              {item.label}
            </a>
          ))}
        </div>
        <p className="mt-3 text-[13px] text-muted">New York, NY</p>
      </div>
    </div>
  );
}

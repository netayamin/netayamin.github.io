"use client";

import { Camera, Dumbbell, Plane, BookOpen } from "lucide-react";
import MazalSlot from "./MazalSlot";
import { useMazalContext } from "@/context/MazalContext";

const EXPERIENCE = [
  { company: "TIFIN", role: "Frontend Engineer", period: "May 2025 – Present" },
  { company: "Copyleaks", role: "Frontend Engineer", period: "Jan 2025 – May 2025" },
  { company: "Comet ML", role: "Full Stack Engineer", period: "Jun 2021 – Jan 2025" },
  { company: "Monroe College", role: "MS in Computer Science", period: "Apr 2025 – May 2026" },
];

const INTERESTS = [
  { icon: Camera, label: "Photography" },
  { icon: TennisBallIcon, label: "Tennis" },
  { icon: Dumbbell, label: "Fitness" },
  { icon: Plane, label: "Travel" },
  { icon: BookOpen, label: "Reading" },
];

function TennisBallIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} strokeWidth={1.75} stroke="currentColor">
      <circle cx="12" cy="12" r="9" />
      <path d="M6 4.5C7.5 7 8.5 9.5 8.5 12s-1 5-2.5 7.5" />
      <path d="M18 4.5C16.5 7 15.5 9.5 15.5 12s1 5 2.5 7.5" />
    </svg>
  );
}

export default function AboutMeSection() {
  const { outfit, setOutfit } = useMazalContext();

  return (
    <section id="about" className="border-t border-neutral-200 px-6 py-20 md:px-10">
      <div className="flex flex-col gap-12 md:flex-row md:items-start md:justify-between md:gap-16">
        <div className="flex-1">
          <h2 className="text-3xl font-semibold text-neutral-900">About Me</h2>

          <p className="mt-4 max-w-lg text-lg leading-relaxed font-normal tracking-tight text-neutral-500">
            I&apos;m a product designer with a background in engineering. I love turning complex
            problems into intuitive solutions people actually enjoy using.
          </p>

          <div className="mt-12">
            <p className="text-xs font-medium tracking-wide text-neutral-400">
              WHERE I&apos;VE WORKED
            </p>

            <ul className="mt-6 space-y-8">
              {EXPERIENCE.map((item, index) => (
                <li key={item.company} className="relative flex gap-4 pl-6">
                  <span className="absolute top-1.5 left-0 h-2 w-2 rounded-full bg-neutral-900" />
                  {index < EXPERIENCE.length - 1 && (
                    <span className="absolute top-4 left-[3px] h-[calc(100%+1.5rem)] w-px bg-neutral-200" />
                  )}

                  <div>
                    <p className="text-sm font-semibold text-neutral-900">
                      {item.role} · {item.company}
                    </p>
                    <p className="mt-0.5 text-xs text-neutral-400">{item.period}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="flex shrink-0 flex-col items-center">
          <p className="text-xs font-medium tracking-wide text-neutral-400">
            A FEW THINGS ABOUT ME
          </p>
          <p className="mt-1 text-[11px] text-neutral-400">Tap one to dress Mazal up.</p>

          <MazalSlot
            id="about"
            pose="sit"
            message="Officially I'm here for emotional support. Unofficially, I'm auditing this portfolio's whitespace."
            className="mt-8 h-[220px] w-[220px] shrink-0"
          />

          <div className="mt-10 flex items-center justify-center gap-2">
            {INTERESTS.map(({ icon: Icon, label }) => {
              const isSelected = outfit === label;
              return (
                <button
                  key={label}
                  type="button"
                  aria-pressed={isSelected}
                  onClick={() => setOutfit(isSelected ? null : label)}
                  className={`flex cursor-pointer flex-col items-center gap-1.5 rounded-2xl border px-3 py-2.5 text-neutral-500 shadow-sm transition hover:-translate-y-0.5 hover:border-neutral-900 hover:text-neutral-900 hover:shadow-md active:translate-y-0 ${
                    isSelected
                      ? "border-neutral-900 bg-neutral-900 text-white shadow-md"
                      : "border-neutral-200 bg-white"
                  }`}
                >
                  <Icon className="h-4 w-4" strokeWidth={1.75} />
                  <span className="text-[10px] font-medium">{label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

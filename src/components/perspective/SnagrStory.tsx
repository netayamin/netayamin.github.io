"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Formatted, mdSlug } from "./MarkdownDoc";
import { CASE_STUDY } from "./case-study-content";
import { TECH_NOTES } from "./snagr-tech-content";
import SnagrBoard from "./SnagrBoard";

// The Snagr case study as steps: each scroll stop shows one section on
// the left (nothing else competing for attention) while the board camera
// flies to the matching frames on the right.
type Step = { slug: string; heading: string | null; md: string };

function splitSteps(source: string): Step[] {
  const lines = source.split("\n");
  const steps: Step[] = [];
  let current: Step = { slug: "intro", heading: null, md: "" };
  for (const line of lines) {
    if (line.startsWith("## ")) {
      steps.push(current);
      current = { slug: mdSlug(line.slice(3)), heading: line.slice(3), md: "" };
    } else if (line.startsWith("# ")) {
      current.heading = line.slice(2);
    } else {
      current.md += line + "\n";
    }
  }
  steps.push(current);
  return steps;
}

export default function SnagrStory() {
  const trackRef = useRef<HTMLDivElement>(null);
  const [mode, setMode] = useState<"design" | "eng">("design");
  const [idx, setIdx] = useState(0);

  const designSteps = useMemo(() => splitSteps(CASE_STUDY), []);
  const engSteps = useMemo(() => splitSteps(TECH_NOTES), []);
  const steps = mode === "design" ? designSteps : engSteps;
  const step = steps[Math.min(idx, steps.length - 1)];

  useEffect(() => {
    const track = trackRef.current;
    const scroller = track?.closest("[data-stage-scroll]") as HTMLElement | null;
    if (!track || !scroller) return;
    const onScroll = () => {
      const stepH = scroller.clientHeight;
      const next = Math.max(
        0,
        Math.min(steps.length - 1, Math.floor((scroller.scrollTop + stepH * 0.4) / stepH)),
      );
      setIdx(next);
    };
    onScroll();
    scroller.addEventListener("scroll", onScroll, { passive: true });
    return () => scroller.removeEventListener("scroll", onScroll);
  }, [steps.length]);

  const switchMode = (next: "design" | "eng") => {
    setMode(next);
    const scroller = trackRef.current?.closest("[data-stage-scroll]");
    scroller?.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div ref={trackRef} style={{ height: `calc((100dvh - 5rem) * ${steps.length})` }}>
      <div className="sticky top-0 grid h-[calc(100dvh-5rem)] grid-cols-2">
        {/* the story, one step at a time */}
        <div className="relative flex min-w-0 flex-col bg-[#f0f0f3] dark:bg-[#2c2c2e]">
          <div className="flex items-center justify-between px-10 pt-6">
            <div className="flex overflow-hidden rounded-md border border-line text-[10px] dark:border-white/15">
              <button
                type="button"
                onClick={() => switchMode("design")}
                className={`px-2 py-1 ${mode === "design" ? "bg-accent-soft font-medium text-accent" : "text-muted hover:text-fg"}`}
              >
                Design
              </button>
              <button
                type="button"
                onClick={() => switchMode("eng")}
                className={`px-2 py-1 ${mode === "eng" ? "bg-accent-soft font-medium text-accent" : "text-muted hover:text-fg"}`}
              >
                Engineering
              </button>
            </div>
            <span className="font-mono text-[11px] text-muted">
              {String(idx + 1).padStart(2, "0")} / {String(steps.length).padStart(2, "0")}
            </span>
          </div>

          <div className="flex min-h-0 flex-1 items-center px-10">
            <div
              key={`${mode}-${idx}`}
              className="story-step max-h-full w-full max-w-[560px] overflow-y-auto rounded-xl border border-black/5 bg-white/60 p-7 dark:border-white/10 dark:bg-white/[0.04]"
            >
              {step.slug === "intro" ? (
                <h1 className="mb-4 font-[family-name:var(--font-serif)] text-[30px] font-semibold italic leading-[1.15] tracking-tight">
                  {step.heading}
                </h1>
              ) : (
                <h2 className="mb-4 text-[20px] font-bold tracking-tight">{step.heading}</h2>
              )}
              <Formatted source={step.md} />
            </div>
          </div>

          <p className="px-10 pb-4 text-[11px] text-muted">
            {idx < steps.length - 1 ? "scroll to continue ↓" : "the end · scroll up to revisit"}
          </p>
        </div>

        {/* the board, camera driven by the active step */}
        <SnagrBoard section={step.slug} />
      </div>
    </div>
  );
}

"use client";

import { useEffect, useRef, useState } from "react";
import Draggable from "./Draggable";

const FIGMA_BLUE = "#0d99ff";

// Camera board for the Reddit Marketing Manager story: the console
// header (the whole IA), a triage card, the AI pipeline with its human
// gate, and the guardrails.
type Region = { x: number; y: number; w: number; h: number };

const CANVAS = { w: 1340, h: 1000 };

const REGIONS: Record<string, Region> = {
  overview: { x: 10, y: 10, w: 1320, h: 980 },
  brand: { x: 20, y: 20, w: 480, h: 190 },
  flow: { x: 520, y: 20, w: 560, h: 210 },
  triage: { x: 20, y: 250, w: 560, h: 500 },
  pipeline: { x: 600, y: 250, w: 450, h: 620 },
  guardrails: { x: 1060, y: 250, w: 270, h: 440 },
};

const SECTION_TO_REGION: Record<string, string> = {
  intro: "overview",
  "the-problem": "brand",
  "the-product": "flow",
  "multi-operator-by-design": "flow",
  "the-ai-pipeline-and-its-guardrails": "pipeline",
  "design-engineering-details-i-care-about": "triage",
  outcome: "overview",
};

function FrameLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="mb-1.5 text-[11px] font-medium" style={{ color: FIGMA_BLUE }}>
      {children}
    </p>
  );
}

function BrandFrame() {
  return (
    <Draggable>
      <FrameLabel>Brand</FrameLabel>
      <div className="flex w-[440px] items-center gap-4 rounded-2xl bg-white p-4 shadow-sm dark:bg-[#1f1f22]">
        <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#7f1d1d] text-[26px] shadow-sm">
          📣
        </span>
        <div>
          <p className="text-xl font-bold text-neutral-900 dark:text-white">
            Reddit Marketing Manager
          </p>
          <p className="text-[12px] text-neutral-500 dark:text-neutral-400">
            Snagr Marketing Console · human-in-the-loop AI
          </p>
        </div>
      </div>
    </Draggable>
  );
}

// The console header: the whole app's information architecture.
function FlowFrame() {
  const steps = [
    { n: "①", name: "Review", badge: "34", active: true },
    { n: "②", name: "Ready", badge: "6", active: false },
    { n: "③", name: "Posted", badge: "128", active: false },
  ];
  return (
    <Draggable>
      <FrameLabel>The header is the IA · ① → ② → ③</FrameLabel>
      <div className="w-[520px] rounded-2xl bg-white p-4 shadow-sm dark:bg-[#1f1f22]">
        <div className="flex items-center gap-2">
          {steps.map((s, i) => (
            <div key={s.name} className="flex items-center gap-2">
              {i > 0 && <span className="text-neutral-300 dark:text-neutral-600">→</span>}
              <span
                className={`flex items-center gap-1.5 rounded-full px-3 py-1.5 text-[13px] font-medium ${
                  s.active
                    ? "bg-[#7f1d1d] text-white"
                    : "bg-fg/[0.05] text-neutral-600 dark:bg-white/[0.08] dark:text-neutral-300"
                }`}
              >
                {s.n} {s.name}
                <span
                  className={`rounded-full px-1.5 text-[10px] ${
                    s.active ? "bg-white/20" : "bg-fg/[0.06] dark:bg-white/10"
                  }`}
                >
                  {s.badge}
                </span>
              </span>
            </div>
          ))}
          <span className="ml-auto flex items-center gap-1.5 rounded-full border border-line px-2.5 py-1 text-[11px] text-neutral-600 dark:border-white/15 dark:text-neutral-300">
            Posting as <span className="font-semibold">maya</span>
            <span className="text-neutral-400">▾</span>
          </span>
        </div>
        <p className="mt-3 text-[11px] leading-relaxed text-neutral-500 dark:text-neutral-400">
          Three numbered steps replaced a sidebar-and-pages layout. One linear flow, a
          one-click operator switcher, no logins.
        </p>
      </div>
    </Draggable>
  );
}

// One triage card, the heart of Review.
function TriageFrame() {
  return (
    <Draggable>
      <FrameLabel>Review · one card at a time</FrameLabel>
      <div className="w-[520px] rounded-2xl bg-white p-5 shadow-sm dark:bg-[#1f1f22]">
        <div className="flex items-center gap-2 text-[11px] text-neutral-500 dark:text-neutral-400">
          <span className="font-semibold text-[#7f1d1d] dark:text-[#f87171]">r/FoodNYC</span>
          <span>·</span>
          <span>2h ago</span>
          <span>·</span>
          <span>41 comments</span>
          <span className="ml-auto rounded-full bg-emerald-500/10 px-2 py-0.5 font-semibold text-emerald-600 dark:text-emerald-400">
            score 87
          </span>
        </div>
        <p className="mt-2 text-[15px] font-semibold leading-snug text-neutral-900 dark:text-white">
          &ldquo;Impossible to get a table at any of the Eater 38 spots this month. Any
          tricks?&rdquo;
        </p>
        <div className="mt-3 rounded-lg bg-fg/[0.04] p-3 dark:bg-white/[0.06]">
          <p className="text-[11px] font-semibold uppercase tracking-wide text-neutral-500 dark:text-neutral-400">
            Why this matched
          </p>
          <ul className="mt-1.5 flex flex-col gap-1 text-[12px] text-neutral-700 dark:text-neutral-300">
            <li>· scout: &ldquo;asking exactly the problem Snagr answers, high intent&rdquo;</li>
            <li>· intent: reservation-seeking · recency: 2h · engagement: high</li>
          </ul>
        </div>
        <div className="mt-4 flex items-center gap-2">
          <span className="rounded-lg bg-fg/[0.05] px-3 py-1.5 text-[12px] font-medium text-neutral-600 dark:bg-white/[0.08] dark:text-neutral-300">
            S · Skip
          </span>
          <span className="rounded-lg bg-[#7f1d1d] px-3 py-1.5 text-[12px] font-medium text-white">
            A · Approve
          </span>
          <span className="ml-auto text-[11px] text-neutral-400">34 left to review</span>
        </div>
        <p className="mt-3 text-[11px] leading-relaxed text-neutral-500 dark:text-neutral-400">
          No reply is drafted during triage: model spend scales with accepted
          opportunities, not with everything the collector drags in.
        </p>
      </div>
    </Draggable>
  );
}

const STAGES = [
  { name: "Collector", note: "browser-resident sweep every 30 min, with heartbeat", cost: "free" },
  { name: "Keyword gate", note: "~70% of posts filtered before any model call", cost: "free" },
  { name: "LLM scout", note: "scores 0 to 100, few-shot from the team's own decisions", cost: "$" },
  { name: "Human gate", note: "an operator approves or skips, one card at a time", cost: "you" },
  { name: "Writer + reviewer", note: "drafts in the team voice, second pass checks quality", cost: "$" },
];

function PipelineFrame() {
  return (
    <Draggable>
      <FrameLabel>Pipeline · human gate in the middle</FrameLabel>
      <div className="w-[410px] rounded-2xl bg-white p-5 shadow-sm dark:bg-[#1f1f22]">
        <div className="flex flex-col">
          {STAGES.map((s, i) => (
            <div key={s.name}>
              {i > 0 && <div className="ml-4 h-4 w-px bg-neutral-300 dark:bg-neutral-600" />}
              <div
                className={`flex items-start gap-3 rounded-xl p-3 ${
                  s.cost === "you"
                    ? "border border-dashed border-[#7f1d1d]/50 bg-[#7f1d1d]/[0.04]"
                    : "bg-fg/[0.03] dark:bg-white/[0.05]"
                }`}
              >
                <span
                  className={`mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-[11px] font-bold ${
                    s.cost === "you"
                      ? "bg-[#7f1d1d] text-white"
                      : "bg-fg/[0.08] text-neutral-600 dark:bg-white/10 dark:text-neutral-300"
                  }`}
                >
                  {i + 1}
                </span>
                <div className="min-w-0">
                  <p className="text-[13px] font-semibold text-neutral-900 dark:text-white">
                    {s.name}
                    <span className="ml-2 text-[10px] font-medium uppercase tracking-wide text-neutral-400">
                      {s.cost}
                    </span>
                  </p>
                  <p className="text-[11.5px] leading-snug text-neutral-500 dark:text-neutral-400">
                    {s.note}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Draggable>
  );
}

function GuardrailsFrame() {
  return (
    <Draggable>
      <FrameLabel>Guardrails</FrameLabel>
      <div className="w-[240px] rotate-[1.5deg] rounded-sm bg-[#fff9c4] p-4 shadow-md dark:bg-[#f4ecae]">
        <p className="text-[13px] font-bold text-neutral-900">Code, not vibes</p>
        <ul className="mt-2 flex flex-col gap-2 text-[12px] leading-snug text-neutral-800">
          <li>· disclosure enforced by a post-processing backstop after every model stage</li>
          <li>· no auto-posting, one human click per reply</li>
          <li>· Playwright verifies the comment actually rendered</li>
          <li>· heartbeat + token spend always visible</li>
        </ul>
      </div>
    </Draggable>
  );
}

export default function RedditBoard() {
  const viewportRef = useRef<HTMLDivElement>(null);
  const view = useRef({ s: 0.5, x: 0, y: 0 });
  const activeRef = useRef("overview");
  const pan = useRef<{ sx: number; sy: number; x: number; y: number } | null>(null);
  const [transform, setTransform] = useState("");
  const [animate, setAnimate] = useState(true);
  const [tag, setTag] = useState<{ x: number; y: number } | null>(null);

  const fit = (name: string, withAnimation = true) => {
    const vp = viewportRef.current;
    const region = REGIONS[name];
    if (!vp || !region) return;
    const vw = vp.clientWidth;
    const vh = vp.clientHeight;
    const s = Math.min(1.4, Math.min(vw / region.w, vh / region.h) * 0.96);
    const x = (vw - region.w * s) / 2 - region.x * s;
    const y = (vh - region.h * s) / 2 - region.y * s;
    view.current = { s, x, y };
    setAnimate(withAnimation);
    setTransform(`translate(${x}px, ${y}px) scale(${s})`);
  };

  useEffect(() => {
    const vp = viewportRef.current;
    if (!vp) return;
    const scroller = vp.closest("[data-stage-scroll]") as HTMLElement | null;
    fit("overview", false);

    const onScroll = () => {
      if (!scroller) return;
      let section = "overview";
      if (scroller.scrollTop > 60) {
        const sRect = scroller.getBoundingClientRect();
        const threshold = scroller.clientHeight * 0.45;
        scroller.querySelectorAll("[data-md-anchor]").forEach((el) => {
          if (el.getBoundingClientRect().top - sRect.top < threshold) {
            section = (el as HTMLElement).dataset.mdAnchor ?? section;
          }
        });
      }
      const region = SECTION_TO_REGION[section] ?? "overview";
      if (region !== activeRef.current) {
        activeRef.current = region;
        fit(region);
      }
    };

    const onWheel = (e: WheelEvent) => {
      if (!e.ctrlKey && !e.metaKey) return;
      e.preventDefault();
      const rect = vp.getBoundingClientRect();
      const px = e.clientX - rect.left;
      const py = e.clientY - rect.top;
      const { s, x, y } = view.current;
      const next = Math.min(2.5, Math.max(0.2, s * Math.exp(-e.deltaY * 0.01)));
      const ux = (px - x) / s;
      const uy = (py - y) / s;
      view.current = { s: next, x: px - ux * next, y: py - uy * next };
      setAnimate(false);
      setTransform(`translate(${view.current.x}px, ${view.current.y}px) scale(${next})`);
    };
    const onResize = () => fit(activeRef.current, false);

    scroller?.addEventListener("scroll", onScroll, { passive: true });
    vp.addEventListener("wheel", onWheel, { passive: false });
    window.addEventListener("resize", onResize);
    return () => {
      scroller?.removeEventListener("scroll", onScroll);
      vp.removeEventListener("wheel", onWheel);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return (
    <div
      ref={viewportRef}
      className="figma-cursor relative h-full w-full overflow-hidden bg-[#f0f0f3] dark:bg-[#2c2c2e]"
      onPointerDown={(e) => {
        if (e.button !== 0) return;
        if ((e.target as HTMLElement).closest("[data-draggable],a,button")) return;
        pan.current = { sx: e.clientX, sy: e.clientY, x: view.current.x, y: view.current.y };
        e.currentTarget.setPointerCapture(e.pointerId);
      }}
      onPointerMove={(e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        setTag({ x: e.clientX - rect.left, y: e.clientY - rect.top });
        if (pan.current) {
          const x = pan.current.x + (e.clientX - pan.current.sx);
          const y = pan.current.y + (e.clientY - pan.current.sy);
          view.current = { ...view.current, x, y };
          setAnimate(false);
          setTransform(`translate(${x}px, ${y}px) scale(${view.current.s})`);
        }
      }}
      onPointerUp={() => (pan.current = null)}
      onPointerCancel={() => (pan.current = null)}
      onPointerLeave={() => setTag(null)}
      onDoubleClick={(e) => {
        if ((e.target as HTMLElement).closest("[data-draggable]")) return;
        activeRef.current = "overview";
        fit("overview");
      }}
    >
      {tag && (
        <span
          className="pointer-events-none absolute z-30 rounded-md bg-accent px-1.5 py-0.5 text-[10px] font-medium text-white"
          style={{ left: tag.x + 12, top: tag.y + 16 }}
        >
          Visitor
        </span>
      )}
      <div
        className={`absolute left-0 top-0 origin-top-left ${
          animate ? "transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]" : ""
        }`}
        style={{ width: CANVAS.w, height: CANVAS.h, transform }}
      >
        <div className="absolute" style={{ left: 40, top: 40 }}>
          <BrandFrame />
        </div>
        <div className="absolute" style={{ left: 540, top: 40 }}>
          <FlowFrame />
        </div>
        <div className="absolute" style={{ left: 40, top: 280 }}>
          <TriageFrame />
        </div>
        <div className="absolute" style={{ left: 620, top: 280 }}>
          <PipelineFrame />
        </div>
        <div className="absolute" style={{ left: 1080, top: 290 }}>
          <GuardrailsFrame />
        </div>
      </div>
    </div>
  );
}

"use client";

import { useEffect, useRef, useState } from "react";
import Draggable from "./Draggable";

const FIGMA_BLUE = "#0d99ff";
const BASE = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

// Camera board for the Heads Off story: brand, the guiding principle,
// the transformation mechanic drawn as tiles, the palette, and the
// home-screen mockup.
type Region = { x: number; y: number; w: number; h: number };

const CANVAS = { w: 1340, h: 1000 };

const REGIONS: Record<string, Region> = {
  overview: { x: 10, y: 10, w: 1320, h: 980 },
  brand: { x: 20, y: 20, w: 420, h: 200 },
  principle: { x: 470, y: 20, w: 430, h: 220 },
  mechanic: { x: 20, y: 250, w: 500, h: 430 },
  palette: { x: 20, y: 700, w: 500, h: 290 },
  home: { x: 940, y: 20, w: 380, h: 800 },
};

const SECTION_TO_REGION: Record<string, string> = {
  intro: "overview",
  "where-it-comes-from": "brand",
  "the-problem": "overview",
  "product-goal": "principle",
  research: "principle",
  "key-research-insight": "mechanic",
  "designing-the-core-interaction": "mechanic",
  "progressive-disclosure": "mechanic",
  "information-hierarchy": "home",
  "rethinking-the-two-riddles": "mechanic",
  "solo-vs-multiplayer": "home",
  "async-multiplayer": "home",
  "the-home-screen": "home",
  "visual-direction": "brand",
  "color-system": "palette",
  typography: "brand",
  "game-economy": "home",
  "product-principles": "principle",
  "core-user-flow": "overview",
};

function FrameLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="mb-1.5 text-[11px] font-medium" style={{ color: FIGMA_BLUE }}>
      {children}
    </p>
  );
}

// ── The mechanic, drawn as tiles ───────────────────────────────────
function Tile({ ch, doomed, gold }: { ch: string; doomed?: boolean; gold?: boolean }) {
  return (
    <span
      className={`relative flex h-10 w-10 items-center justify-center rounded-lg text-[20px] font-bold shadow-sm ${
        doomed ? "bg-[#a31621] text-[#f5ead8]" : "bg-[#f5ead8] text-[#1a1a1c]"
      } ${gold ? "ring-2 ring-[#c9a227]" : ""}`}
    >
      {ch}
      {doomed && <span className="absolute h-[2px] w-7 rotate-[-30deg] rounded bg-[#f5ead8]/90" />}
    </span>
  );
}

function MechanicFrame() {
  return (
    <Draggable>
      <FrameLabel>The mechanic · one transformation puzzle</FrameLabel>
      <div className="w-[470px] rounded-2xl bg-[#141416] p-6 shadow-sm">
        <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-[#c9a227]">Clue 1</p>
        <p className="mt-1 text-[15px] text-[#f5ead8]">A pointed throwing weapon</p>
        <div className="mt-3 flex gap-1.5">
          {["S", "P", "E", "A", "R"].map((ch, i) => (
            <Tile key={i} ch={ch} doomed={i === 0} />
          ))}
        </div>

        <div className="my-5 flex items-center gap-3">
          <span className="h-px flex-1 bg-[#f5ead8]/15" />
          <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#a31621]">
            Off with its head
          </span>
          <span className="h-px flex-1 bg-[#f5ead8]/15" />
        </div>

        <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-[#c9a227]">Clue 2</p>
        <p className="mt-1 text-[15px] text-[#f5ead8]">A fruit</p>
        <div className="mt-3 flex gap-1.5">
          {["P", "E", "A", "R"].map((ch, i) => (
            <Tile key={i} ch={ch} gold />
          ))}
        </div>

        <p className="mt-5 text-[12px] leading-relaxed text-[#f5ead8]/60">
          The interface demonstrates the rule instead of explaining it: solve, watch the first
          letter fall, solve again. The transition is the reward.
        </p>
      </div>
    </Draggable>
  );
}

function PrincipleFrame() {
  return (
    <Draggable>
      <FrameLabel>Product principle</FrameLabel>
      <div className="w-[400px] rotate-[-1deg] rounded-sm bg-[#fff9c4] p-5 shadow-md dark:bg-[#f4ecae]">
        <p className="font-[family-name:var(--font-serif)] text-[20px] font-semibold italic leading-snug text-neutral-900">
          Easy to understand.
          <br />
          Hard to solve.
          <br />
          Fun to send to someone else.
        </p>
        <p className="mt-3 text-[12px] leading-relaxed text-neutral-700">
          The growth loop: solve → challenge a friend → friend installs → friend challenges
          someone else.
        </p>
      </div>
    </Draggable>
  );
}

const SWATCHES = [
  { name: "Black", hex: "#0b0b0d", use: "primary background, premium contrast", light: false },
  { name: "Deep Red", hex: "#a31621", use: "primary actions, hearts, the Queen", light: false },
  { name: "Warm Cream", hex: "#f5ead8", use: "surfaces and typography, card stock", light: true },
  { name: "Gold", hex: "#c9a227", use: "borders, crowns, rewards, sparingly", light: true },
];

function PaletteFrame() {
  return (
    <Draggable>
      <FrameLabel>Color system</FrameLabel>
      <div className="w-[470px] rounded-2xl bg-white p-5 shadow-sm dark:bg-[#1f1f22]">
        <div className="flex flex-col gap-3">
          {SWATCHES.map((s) => (
            <div key={s.name} className="flex items-center gap-3">
              <span
                className="h-9 w-9 shrink-0 rounded-lg border border-black/10 dark:border-white/10"
                style={{ background: s.hex }}
              />
              <div className="min-w-0">
                <p className="text-[13px] font-semibold text-neutral-900 dark:text-white">
                  {s.name}
                  <span className="ml-2 font-mono text-[11px] font-normal text-neutral-400">
                    {s.hex}
                  </span>
                </p>
                <p className="truncate text-[11px] text-neutral-500 dark:text-neutral-400">
                  {s.use}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Draggable>
  );
}

export default function HeadsOffBoard() {
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
        {/* Brand */}
        <div className="absolute" style={{ left: 40, top: 40 }}>
          <Draggable>
            <FrameLabel>Brand</FrameLabel>
            <div className="flex w-[380px] items-center gap-4 rounded-2xl bg-white p-4 shadow-sm dark:bg-[#1f1f22]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={`${BASE}/headsoff/icon.png`}
                alt="Heads Off app icon"
                className="h-14 w-14 rounded-2xl shadow-sm"
              />
              <div>
                <p className="text-xl font-bold text-neutral-900 dark:text-white">Heads Off</p>
                <p className="text-[12px] text-neutral-500 dark:text-neutral-400">
                  iOS word game · in development
                </p>
              </div>
            </div>
          </Draggable>
        </div>

        {/* Principle sticky */}
        <div className="absolute" style={{ left: 490, top: 50 }}>
          <PrincipleFrame />
        </div>

        {/* Mechanic */}
        <div className="absolute" style={{ left: 40, top: 270 }}>
          <MechanicFrame />
        </div>

        {/* Palette */}
        <div className="absolute" style={{ left: 40, top: 720 }}>
          <PaletteFrame />
        </div>

        {/* Home screen mockup */}
        <div className="absolute" style={{ left: 960, top: 40 }}>
          <Draggable>
            <FrameLabel>Home · Solo, Friends, Your Turn</FrameLabel>
            <div className="w-[340px] overflow-hidden rounded-2xl bg-black shadow-sm">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={`${BASE}/headsoff/home.png`}
                alt="Heads Off home screen: Play Solo, Play Against Friends, and a Your Turn list"
                className="h-auto w-full"
              />
            </div>
          </Draggable>
        </div>
      </div>
    </div>
  );
}

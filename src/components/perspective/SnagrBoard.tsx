"use client";

import { useEffect, useRef, useState } from "react";
import Draggable from "./Draggable";

const FIGMA_BLUE = "#0d99ff";
const BASE = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

// The Snagr board is a fixed camera over a virtual canvas. At the top of
// the page it fits everything; each section of the case study flies the
// camera to its frame. Pinch (or Cmd/Ctrl + scroll) still zooms manually.
type Region = { x: number; y: number; w: number; h: number };

const CANVAS = { w: 1080, h: 1180 };

const REGIONS: Record<string, Region> = {
  overview: { x: 0, y: 0, w: 1060, h: 1160 },
  brand: { x: 10, y: 10, w: 380, h: 190 },
  watchlist: { x: 10, y: 190, w: 360, h: 260 },
  dropalert: { x: 10, y: 440, w: 360, h: 190 },
  groupplan: { x: 10, y: 620, w: 400, h: 170 },
  personas: { x: 370, y: 650, w: 710, h: 480 },
  home: { x: 400, y: 30, w: 320, h: 600 },
  collection: { x: 710, y: 30, w: 320, h: 600 },
};

// Which region each case-study section focuses.
const SECTION_TO_REGION: Record<string, string> = {
  "who-what-when-where-why-how": "brand",
  personas: "personas",
  "the-journey-before-snagr": "watchlist",
  "the-journey-with-snagr": "collection",
  "why-this-solution-and-what-i-rejected": "dropalert",
  "breaking-the-one-reservation-model": "home",
  "how-it-evolved-four-products-four-lessons": "overview",
  "research-honestly": "overview",
  "what-i-learned": "overview",
};

function FrameLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="mb-1.5 text-[11px] font-medium" style={{ color: FIGMA_BLUE }}>
      {children}
    </p>
  );
}

function DoodleAvatar({ variant }: { variant: "maya" | "dan" }) {
  return (
    <svg width="54" height="54" viewBox="0 0 54 54" fill="none" aria-hidden>
      <circle cx="27" cy="29" r="16" stroke="#3a3a3a" strokeWidth="2" strokeLinecap="round" />
      <circle cx="21" cy="27" r="1.6" fill="#3a3a3a" />
      <circle cx="33" cy="27" r="1.6" fill="#3a3a3a" />
      {variant === "maya" ? (
        <>
          <path d="M20 35 Q27 40 34 35" stroke="#3a3a3a" strokeWidth="2" strokeLinecap="round" />
          <circle cx="27" cy="10" r="6" stroke="#3a3a3a" strokeWidth="2" />
          <path d="M12 24 Q14 14 22 12" stroke="#3a3a3a" strokeWidth="2" strokeLinecap="round" />
          <path d="M42 24 Q40 14 32 12" stroke="#3a3a3a" strokeWidth="2" strokeLinecap="round" />
        </>
      ) : (
        <>
          <path d="M21 36 L33 36" stroke="#3a3a3a" strokeWidth="2" strokeLinecap="round" />
          <path d="M11 22 Q27 8 43 22 L43 18 Q27 4 11 18 Z" stroke="#3a3a3a" strokeWidth="2" strokeLinejoin="round" />
        </>
      )}
    </svg>
  );
}

function StickyNote({
  color,
  title,
  items,
  rotate,
}: {
  color: string;
  title: string;
  items: string[];
  rotate: string;
}) {
  return (
    <div
      className={`w-[135px] p-2.5 shadow-md ${rotate}`}
      style={{ backgroundColor: color }}
    >
      <p className="font-[family-name:var(--font-hand)] text-[13px] font-bold text-neutral-800">
        {title}
      </p>
      {items.map((item) => (
        <p key={item} className="font-[family-name:var(--font-hand)] text-[13px] leading-[1.25] text-neutral-700">
          · {item}
        </p>
      ))}
    </div>
  );
}

function PersonaSketch({
  variant,
  name,
  role,
  goals,
  frustrations,
  watches,
  quote,
  success,
  alerts,
  rotate,
}: {
  variant: "maya" | "dan";
  name: string;
  role: string;
  goals: string[];
  frustrations: string[];
  watches: string[];
  quote: string;
  success: string;
  alerts: string;
  rotate: string;
}) {
  return (
    <Draggable>
      <div className={`relative w-[330px] bg-white p-4 pb-4 shadow-lg dark:bg-[#ececec] ${rotate}`}>
        {/* tape */}
        <span className="absolute -top-2 left-1/2 h-5 w-16 -translate-x-1/2 rotate-[-3deg] bg-[#f7edc0]/80 shadow-sm" />
        <div className="flex items-center gap-3">
          <DoodleAvatar variant={variant} />
          <div>
            <p className="font-[family-name:var(--font-hand)] text-[23px] font-bold leading-none text-neutral-800">
              <span className="bg-gradient-to-t from-[#fff3a3] from-45% to-transparent to-45% px-0.5">
                {name}
              </span>
            </p>
            <p className="mt-0.5 font-[family-name:var(--font-hand)] text-[16px] uppercase tracking-wide text-neutral-500">
              {role}
            </p>
          </div>
        </div>
        <div className="mt-3 flex gap-2">
          <StickyNote color="#fff3a3" title="goals" items={goals} rotate="rotate-[-2deg]" />
          <StickyNote color="#ffd6df" title="pains" items={frustrations} rotate="rotate-[1.5deg]" />
          <StickyNote color="#cfe8ff" title="watches" items={watches} rotate="rotate-[-1deg]" />
        </div>
        <p className="mt-3 font-[family-name:var(--font-hand)] text-[16px] leading-snug text-neutral-700">
          &ldquo;{quote}&rdquo;
        </p>
        <p className="mt-1 font-[family-name:var(--font-hand)] text-[13px] text-neutral-500">
          success = <span className="font-bold text-neutral-700 underline decoration-[#3fa860] decoration-2 underline-offset-2">{success}</span>
        </p>
        <p className="font-[family-name:var(--font-hand)] text-[13px] text-neutral-500">
          alerts: <span className="font-bold text-neutral-700 underline decoration-[#e8506a] decoration-2 underline-offset-2">{alerts}</span>
        </p>
      </div>
    </Draggable>
  );
}

function Screen({ file, title, caption }: { file: string; title: string; caption?: string }) {
  return (
    <Draggable>
      <FrameLabel>{title}</FrameLabel>
      <div className="w-[240px] overflow-hidden rounded-[2rem] border-[5px] border-neutral-900 bg-neutral-900 shadow-xl">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={`${BASE}/snagr/screens/${file}`} alt={title} className="w-full rounded-[1.7rem]" />
      </div>
      {caption && (
        <p className="mt-1.5 max-w-[240px] text-[10px] leading-snug text-neutral-500 dark:text-neutral-400">
          {caption}
        </p>
      )}
    </Draggable>
  );
}

export default function SnagrBoard() {
  const viewportRef = useRef<HTMLDivElement>(null);
  const view = useRef({ s: 0.5, x: 0, y: 0 });
  const activeRef = useRef("overview");
  const [transform, setTransform] = useState("");
  const [animate, setAnimate] = useState(true);

  const fit = (name: string, withAnimation = true) => {
    const vp = viewportRef.current;
    const region = REGIONS[name];
    if (!vp || !region) return;
    const vw = vp.clientWidth;
    const vh = vp.clientHeight;
    const s = Math.min(1.4, Math.min(vw / region.w, vh / region.h) * 0.88);
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
      onDoubleClick={() => {
        activeRef.current = "overview";
        fit("overview");
      }}
    >
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
            <div className="flex w-[300px] items-center gap-4 rounded-2xl bg-white p-4 shadow-sm dark:bg-[#1f1f22]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={`${BASE}/snagr/icon.png`} alt="Snagr app icon" className="h-14 w-14 rounded-2xl shadow-sm" />
              <div>
                <p className="text-xl font-bold text-neutral-900 dark:text-white">Snagr</p>
                <a
                  href="https://apps.apple.com/us/app/snagr-live-dining-watchlists/id6783079978"
                  target="_blank"
                  rel="noreferrer"
                  className="mt-1 inline-block rounded-full bg-neutral-900 px-3 py-1 text-[10px] font-medium text-white hover:opacity-85 dark:bg-white dark:text-neutral-900"
                >
                  Live on the App Store ↗
                </a>
              </div>
            </div>
          </Draggable>
        </div>

        {/* Watchlist */}
        <div className="absolute" style={{ left: 40, top: 230 }}>
          <Draggable>
            <FrameLabel>Watchlist</FrameLabel>
            <div className="flex w-[280px] flex-col gap-1.5 rounded-2xl bg-white p-3.5 shadow-sm dark:bg-[#1f1f22]">
              {["Via Carota", "Don Angie", "4 Charles Prime Rib"].map((r) => (
                <div key={r} className="flex items-center justify-between rounded-lg bg-neutral-100 px-3 py-2 dark:bg-white/10">
                  <span className="text-[12px] font-medium text-neutral-800 dark:text-neutral-200">{r}</span>
                  <span className="h-2 w-2 rounded-full bg-accent" />
                </div>
              ))}
            </div>
          </Draggable>
        </div>

        {/* Drop alert */}
        <div className="absolute" style={{ left: 40, top: 480 }}>
          <Draggable>
            <FrameLabel>Drop alert</FrameLabel>
            <div className="w-[280px] rounded-2xl bg-white p-3.5 shadow-sm dark:bg-[#1f1f22]">
              <p className="text-[10px] font-semibold text-accent">SNAGR · now</p>
              <p className="mt-0.5 text-[13px] font-semibold text-neutral-900 dark:text-white">
                Table for 4 just opened
              </p>
              <p className="text-[11px] text-neutral-500 dark:text-neutral-400">
                Don Angie · Sat 8:00 PM
              </p>
            </div>
          </Draggable>
        </div>

        {/* Group plan */}
        <div className="absolute" style={{ left: 40, top: 660 }}>
          <Draggable>
            <FrameLabel>Group plan</FrameLabel>
            <div className="flex w-[300px] items-center justify-between rounded-2xl bg-white p-3.5 shadow-sm dark:bg-[#1f1f22]">
              <div className="flex -space-x-2">
                {[0, 1, 2, 3].map((i) => (
                  <span key={i} className="h-7 w-7 rounded-full border-2 border-white bg-gradient-to-br from-neutral-300 to-neutral-400 dark:border-neutral-800" />
                ))}
              </div>
              <span className="rounded-full bg-accent-soft px-2.5 py-1 text-[11px] font-medium text-accent">
                Sat, May 24 · everyone&rsquo;s in
              </span>
            </div>
          </Draggable>
        </div>

        {/* Real screens */}
        <div className="absolute" style={{ left: 430, top: 60 }}>
          <Screen
            file="home.png"
            title="Home · Plans"
            caption="Two plans quietly watching: 15 and 26 tables live."
          />
        </div>
        <div className="absolute" style={{ left: 740, top: 60 }}>
          <Screen
            file="collection.png"
            title="Collection · Declare"
            caption="Selection is creation: tick venues, three taps to a live plan."
          />
        </div>

        {/* Personas, straight off the whiteboard */}
        <div className="absolute" style={{ left: 410, top: 700 }}>
          <PersonaSketch
            variant="maya"
            name="Maya, 29"
            role="the planner · primary"
            goals={["fits the occasion", "flexible on venue"]}
            frustrations={["4 apps on rotation", "group goes quiet"]}
            watches={["many spots, wide net", "multi-date, shared"]}
            quote="I don't care which restaurant, we just want a great dinner."
            success="we got a reservation"
            alerts="gentle, please"
            rotate="rotate-[-1.5deg]"
          />
        </div>
        <div className="absolute" style={{ left: 745, top: 720 }}>
          <PersonaSketch
            variant="dan"
            name="Dan, 31"
            role="the chaser · secondary"
            goals={["THIS restaurant", "one date, one time"]}
            frustrations={["impossible to book", "checks constantly"]}
            watches={["1–3 spots only", "Torrisi · 4 Charles"]}
            quote="I want THIS restaurant."
            success="Bar Tizio at 7:30"
            alerts="wake me at 2am. I mean it."
            rotate="rotate-[1.5deg]"
          />
        </div>
      </div>
    </div>
  );
}

"use client";

import { useEffect, useRef, useState } from "react";
import Draggable from "./Draggable";

const FIGMA_BLUE = "#0d99ff";
const BASE = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

// The Snagr board is a fixed camera over a virtual canvas. At the top of
// the page it fits everything; each section of the case study flies the
// camera to its frame. Pinch (or Cmd/Ctrl + scroll) still zooms manually.
type Region = { x: number; y: number; w: number; h: number };

const CANVAS = { w: 1520, h: 1360 };

const REGIONS: Record<string, Region> = {
  overview: { x: 10, y: 10, w: 1500, h: 1290 },
  brand: { x: 20, y: 20, w: 340, h: 190 },
  journeymap: { x: 20, y: 220, w: 520, h: 390 },
  designsystem: { x: 20, y: 640, w: 480, h: 700 },
  personas: { x: 1140, y: 640, w: 370, h: 670 },
  main: { x: 550, y: 20, w: 270, h: 620 },
  missed: { x: 850, y: 20, w: 270, h: 620 },
  collection: { x: 1150, y: 20, w: 270, h: 620 },
  plan: { x: 550, y: 640, w: 270, h: 650 },
  planday: { x: 850, y: 640, w: 270, h: 650 },
};

// Which region each case-study section focuses.
const SECTION_TO_REGION: Record<string, string> = {
  intro: "overview",
  "who-what-when-where-why-how": "brand",
  personas: "personas",
  "the-journey-before-snagr": "journeymap",
  "the-journey-with-snagr": "collection",
  "why-this-solution-and-what-i-rejected": "main",
  "breaking-the-one-reservation-model": "plan",
  "how-it-evolved-four-products-four-lessons": "overview",
  "research-honestly": "missed",
  "what-i-learned": "overview",
  "stack-and-what-each-piece-bought": "designsystem",
  backend: "overview",
  "availability-acquisition-the-hard-part": "planday",
  "demand-is-the-scheduler": "plan",
  "notifications-engineered-as-suppression": "missed",
  infrastructure: "overview",
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

function Face({ cx, cy, happy }: { cx: number; cy: number; happy: boolean }) {
  return (
    <g stroke="#3a3a3a" strokeWidth="1.8" fill="none" strokeLinecap="round">
      <circle cx={cx} cy={cy} r="8" fill="#fff" />
      <circle cx={cx - 2.8} cy={cy - 2} r="0.9" fill="#3a3a3a" stroke="none" />
      <circle cx={cx + 2.8} cy={cy - 2} r="0.9" fill="#3a3a3a" stroke="none" />
      {happy ? (
        <path d={`M ${cx - 3.4} ${cy + 2} Q ${cx} ${cy + 5.4} ${cx + 3.4} ${cy + 2}`} />
      ) : (
        <path d={`M ${cx - 3.4} ${cy + 4.4} Q ${cx} ${cy + 1} ${cx + 3.4} ${cy + 4.4}`} />
      )}
    </g>
  );
}

function JourneyMap() {
  const stages = ["discover", "send to friends", "decide which", "try to book", "one by one"];
  const beforeY = [46, 58, 116, 136, 146];
  const withY = [58, 62, 30, 18];
  const bx = [34, 130, 226, 322, 418];
  const wx = [34, 162, 290, 418];
  const path = (xs: number[], ys: number[]) =>
    xs.map((x, i) => (i === 0 ? `M ${x} ${ys[i]}` : `Q ${(xs[i - 1] + x) / 2} ${ys[i - 1]}, ${x} ${ys[i]}`)).join(" ");
  return (
    <Draggable>
      <div className="relative w-[480px] rotate-[0.8deg] bg-white p-4 shadow-lg dark:bg-[#ececec]">
        <span className="absolute -top-2 left-10 h-5 w-14 rotate-[3deg] bg-[#f7edc0]/80 shadow-sm" />
        <span className="absolute -top-2 right-10 h-5 w-14 rotate-[-4deg] bg-[#f7edc0]/80 shadow-sm" />
        <p className="font-[family-name:var(--font-hand)] text-[22px] font-bold leading-none text-neutral-800">
          <span className="bg-gradient-to-t from-[#cfe8ff] from-45% to-transparent to-45% px-0.5">
            journey map
          </span>{" "}
          <span className="text-[15px] font-normal text-neutral-500">(how it feels)</span>
        </p>
        <svg width="448" height="200" viewBox="0 0 448 200" className="mt-2">
          {/* axis */}
          <line x1="20" y1="160" x2="436" y2="160" stroke="#c9c9c9" strokeWidth="1.5" strokeDasharray="4 4" />
          {/* before curve */}
          <path d={path(bx, beforeY)} stroke="#e8506a" strokeWidth="3" fill="none" strokeLinecap="round" />
          {bx.map((x, i) => (
            <circle key={i} cx={x} cy={beforeY[i]} r="3.2" fill="#e8506a" />
          ))}
          {/* with curve */}
          <path d={path(wx, withY)} stroke="#3fa860" strokeWidth="3" fill="none" strokeLinecap="round" strokeDasharray="1 0" />
          {wx.map((x, i) => (
            <circle key={i} cx={x} cy={withY[i]} r="3.2" fill="#3fa860" />
          ))}
          <Face cx={430} cy={146} happy={false} />
          <Face cx={430} cy={18} happy={true} />
          {/* stage labels */}
          {stages.map((stage, i) => (
            <text
              key={stage}
              x={bx[i]}
              y={178}
              textAnchor="middle"
              className="fill-neutral-500"
              fontFamily="var(--font-hand)"
              fontSize="14"
            >
              {stage}
            </text>
          ))}
          <text x={bx[0]} y={192} textAnchor="middle" fill="#a3a3a3" fontFamily="var(--font-hand)" fontSize="11">
            maps · infatuation · tiktok
          </text>
          <text x={bx[4]} y={192} textAnchor="middle" fill="#a3a3a3" fontFamily="var(--font-hand)" fontSize="11">
            each spot × date × time
          </text>
          {/* with labels */}
          {["declare", "wait", "act", "dinner!"].map((label, i) => (
            <text
              key={label}
              x={wx[i]}
              y={withY[i] - 10}
              textAnchor="middle"
              fill="#3fa860"
              fontFamily="var(--font-hand)"
              fontSize="14"
            >
              {label}
            </text>
          ))}
        </svg>
        <div className="mt-1 flex gap-5 font-[family-name:var(--font-hand)] text-[14px]">
          <span className="text-[#e8506a]">— before snagr</span>
          <span className="text-[#3fa860]">— with snagr</span>
        </div>
      </div>
    </Draggable>
  );
}

const DS_COLORS: Array<{ name: string; hex: string; note: string }> = [
  { name: "accent", hex: "#B3202A", note: "live / new / selected / CTA" },
  { name: "accentSurface", hex: "#FDE7E8", note: "active chips, selected day" },
  { name: "canvas", hex: "#FAFAFA", note: "the ONE background" },
  { name: "textPrimary", hex: "#14151A", note: "" },
  { name: "textSecondary", hex: "#6B6F76", note: "metadata" },
  { name: "available", hex: "#1FA463", note: "live tables" },
  { name: "warning", hex: "#9A7209", note: "aging / watching" },
];

function DesignSystemFrame() {
  return (
    <Draggable>
      <FrameLabel>Design system · SnagrColorPalette + SnagrTypography</FrameLabel>
      <div className="w-[440px] rounded-2xl bg-white p-5 shadow-sm dark:bg-[#1f1f22]">
        {/* color styles */}
        <div className="grid grid-cols-2 gap-x-4 gap-y-1">
          {DS_COLORS.map((c) => (
            <div key={c.name} className="flex items-center gap-2">
              <span
                className="h-3.5 w-3.5 shrink-0 rounded-full border border-black/10"
                style={{ backgroundColor: c.hex }}
              />
              <span className="min-w-0">
                <span className="block truncate font-mono text-[10px] font-semibold text-neutral-800 dark:text-neutral-200">
                  {c.name}
                </span>
                <span className="block truncate font-mono text-[9px] text-neutral-400">
                  {c.hex}{c.note ? ` · ${c.note}` : ""}
                </span>
              </span>
            </div>
          ))}
        </div>

        {/* type scale */}
        <div className="mt-4 border-t border-neutral-100 pt-3 dark:border-white/10">
          <p className="text-[19px] font-bold leading-tight text-neutral-900 dark:text-white">
            You&rsquo;re all set!
            <span className="ml-2 font-mono text-[9px] font-normal text-neutral-400">xl 28 / l 20 · bold</span>
          </p>
          <p className="mt-0.5 text-[13px] text-neutral-700 dark:text-neutral-300">
            We&rsquo;ll watch for openings and notify you.
            <span className="ml-2 font-mono text-[9px] text-neutral-400">m 15 · s 13</span>
          </p>
          <p className="mt-1 text-[8px] font-semibold uppercase tracking-[0.08em] text-neutral-500">
            Must try · 12 open <span className="ml-1 font-mono normal-case tracking-normal text-neutral-400">sm 9 · eyebrow</span>
          </p>
        </div>

        {/* radii + components */}
        <div className="mt-4 flex items-center gap-3 border-t border-neutral-100 pt-3 dark:border-white/10">
          {[
            ["10", "rounded-[10px]"],
            ["12", "rounded-[12px]"],
            ["14", "rounded-[14px]"],
            ["16", "rounded-2xl"],
          ].map(([r, cls]) => (
            <span
              key={r}
              className={`flex h-9 w-11 items-center justify-center border-[1.5px] border-[#9747FF]/70 font-mono text-[9px] text-neutral-500 ${cls}`}
            >
              {r}
            </span>
          ))}
          <span className="ml-auto font-mono text-[9px] text-neutral-400">radius: chip · thumb · button · card</span>
        </div>
        <div className="mt-3 flex items-center gap-2.5">
          <span className="flex h-9 items-center rounded-[14px] bg-[#B3202A] px-4 text-[12.5px] font-semibold text-white">
            View my plans
          </span>
          <span className="flex h-8 items-center rounded-[10px] bg-[#FDE7E8] px-3 text-[11.5px] font-semibold text-[#B3202A]">
            Sat, Aug 8
          </span>
          <span className="text-[10px] font-semibold text-[#1FA463]">Just opened</span>
        </div>

        {/* the ruling + link */}
        <div className="mt-4 flex items-center gap-3">
          <span className="rotate-[-1.5deg] bg-[#FFF3B8] px-2.5 py-2 font-[family-name:var(--font-hand)] text-[13px] leading-tight text-[#5C4E00] shadow-sm">
            red is a signal, not a paint
          </span>
        </div>
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
  const [tag, setTag] = useState<{ x: number; y: number } | null>(null);
  const pan = useRef<{ sx: number; sy: number; x: number; y: number } | null>(null);

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
      onPointerUp={() => {
        pan.current = null;
      }}
      onPointerCancel={() => {
        pan.current = null;
      }}
      onPointerLeave={() => setTag(null)}
      onDoubleClick={() => {
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

        

        

        

        {/* Real screens, straight from the simulator */}
        <div className="absolute" style={{ left: 560, top: 60 }}>
          <Screen
            file="main.png"
            title="Home · Plans"
            caption="Three plans quietly watching; 61 of 100 restaurants tracked."
          />
        </div>
        <div className="absolute" style={{ left: 860, top: 60 }}>
          <Screen
            file="missed.png"
            title="Home · Since your last visit"
            caption="What opened while you were away, before anything else."
          />
        </div>
        <div className="absolute" style={{ left: 1160, top: 60 }}>
          <Screen
            file="collection.png"
            title="Collection · Declare"
            caption="Selection is creation: tick venues straight from the guide."
          />
        </div>
        <div className="absolute" style={{ left: 560, top: 680 }}>
          <Screen
            file="plan.png"
            title="Plan · MUST TRY"
            caption="One plan, seven dates, 2 to 4 people: every live table as one answer."
          />
        </div>
        <div className="absolute" style={{ left: 860, top: 680 }}>
          <Screen
            file="plan-day.png"
            title="Plan · picking a day"
            caption="The date strip carries the counts: 12 open Thursday, none yet Sunday."
          />
        </div>

        {/* Design system */}
        <div className="absolute" style={{ left: 40, top: 680 }}>
          <DesignSystemFrame />
        </div>

        {/* Journey map, marker on whiteboard */}
        <div className="absolute" style={{ left: 40, top: 250 }}>
          <JourneyMap />
        </div>

        {/* Personas, straight off the whiteboard */}
        <div className="absolute" style={{ left: 1160, top: 680 }}>
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
        <div className="absolute" style={{ left: 1160, top: 1010 }}>
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

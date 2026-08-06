"use client";

import { useEffect, useRef, useState } from "react";
import { ChevronDown, ChevronRight, Link2, MessageCircle, Square } from "lucide-react";
import Draggable from "./Draggable";

const FIGMA_BLUE = "#0d99ff";
const BASE = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

// Camera board for the trace-spans story: the shipped screenshot, a
// working interactive rebuild of the component, and the context wall.
type Region = { x: number; y: number; w: number; h: number };

const CANVAS = { w: 1260, h: 1000 };

const REGIONS: Record<string, Region> = {
  overview: { x: 10, y: 10, w: 1240, h: 980 },
  context: { x: 20, y: 20, w: 440, h: 330 },
  screenshot: { x: 540, y: 20, w: 500, h: 440 },
  demo: { x: 20, y: 400, w: 640, h: 560 },
  workspace: { x: 670, y: 490, w: 570, h: 460 },
};

const SECTION_TO_REGION: Record<string, string> = {
  intro: "overview",
  "the-context": "context",
  "who-it-was-for": "context",
  "the-problem": "screenshot",
  "the-design": "demo",
  "what-made-it-hard": "workspace",
  "what-happened": "screenshot",
  "what-i-learned": "overview",
};

function FrameLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="mb-1.5 text-[11px] font-medium" style={{ color: FIGMA_BLUE }}>
      {children}
    </p>
  );
}

// ── The component itself, rebuilt live ─────────────────────────────
type Span = {
  id: string;
  name: string;
  type: "trace" | "chain" | "llm";
  start: number; // seconds from trace start
  dur: number;
  tokens?: number;
  children?: Span[];
};

const TRACE: Span = {
  id: "root",
  name: "generate_opik_story",
  type: "trace",
  start: 0,
  dur: 4.9,
  children: [
    {
      id: "chain",
      name: "generate_opik_story",
      type: "chain",
      start: 0,
      dur: 4.9,
      children: [
        {
          id: "topic",
          name: "generate_topic",
          type: "chain",
          start: 0,
          dur: 0.7,
          children: [
            { id: "cc1", name: "chat_completion_create", type: "llm", start: 0, dur: 0.7, tokens: 28 },
          ],
        },
        { id: "cc2", name: "chat_completion_create", type: "llm", start: 0.6, dur: 4.3, tokens: 321 },
      ],
    },
  ],
};

const TYPE_STYLE = {
  trace: { bar: "#8b5cf6", chip: "bg-violet-100 text-violet-600", icon: Square },
  chain: { bar: "#10b981", chip: "bg-emerald-100 text-emerald-600", icon: Link2 },
  llm: { bar: "#3b82f6", chip: "bg-blue-100 text-blue-600", icon: MessageCircle },
} as const;

function countSpans(span: Span): number {
  return 1 + (span.children?.reduce((n, c) => n + countSpans(c), 0) ?? 0);
}

function SpanRow({
  span,
  depth,
  total,
  collapsed,
  toggle,
}: {
  span: Span;
  depth: number;
  total: number;
  collapsed: Set<string>;
  toggle: (id: string) => void;
}) {
  const style = TYPE_STYLE[span.type];
  const Icon = style.icon;
  const hasKids = !!span.children?.length;
  const isCollapsed = collapsed.has(span.id);

  return (
    <div>
      <div className="group flex items-start rounded-lg px-2 py-1.5 hover:bg-neutral-50 dark:hover:bg-white/5">
        <div className="flex min-w-0 flex-1 items-center gap-1.5" style={{ paddingLeft: depth * 22 }}>
          {hasKids ? (
            <button
              type="button"
              onClick={() => toggle(span.id)}
              aria-label={isCollapsed ? "Expand" : "Collapse"}
              className="flex h-4 w-4 items-center justify-center rounded text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-200"
            >
              {isCollapsed ? <ChevronRight size={12} /> : <ChevronDown size={12} />}
            </button>
          ) : (
            <span className="w-4" />
          )}
          <span className={`flex h-5 w-5 items-center justify-center rounded ${style.chip}`}>
            <Icon size={11} />
          </span>
          <span className="truncate font-mono text-[11.5px] text-neutral-700 dark:text-neutral-300">
            {span.name}
          </span>
        </div>
        <div className="w-[38%] shrink-0 pt-1">
          <div className="relative h-[5px]">
            <span
              className="absolute top-0 h-full rounded-full"
              style={{
                left: `${(span.start / total) * 100}%`,
                width: `${Math.max(2, (span.dur / total) * 100)}%`,
                backgroundColor: style.bar,
              }}
            />
          </div>
          <p className="mt-1 font-mono text-[9.5px] text-neutral-400">
            ⏱ {span.dur}s{span.tokens !== undefined ? `   # ${span.tokens}` : ""}
          </p>
        </div>
      </div>
      {hasKids && !isCollapsed && (
        <div className="relative">
          <span
            className="absolute bottom-2 top-0 w-px bg-neutral-200 dark:bg-white/10"
            style={{ left: depth * 22 + 15 }}
          />
          {span.children!.map((child) => (
            <SpanRow
              key={child.id}
              span={child}
              depth={depth + 1}
              total={total}
              collapsed={collapsed}
              toggle={toggle}
            />
          ))}
        </div>
      )}
    </div>
  );
}

function TraceSpansDemo() {
  const [collapsed, setCollapsed] = useState<Set<string>>(new Set());
  const allParents = ["root", "chain", "topic"];
  const allCollapsed = allParents.every((id) => collapsed.has(id));

  const toggle = (id: string) =>
    setCollapsed((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });

  return (
    <div className="w-[600px] rounded-2xl bg-white p-5 shadow-sm dark:bg-[#1f1f22]">
      <div className="flex items-baseline gap-2">
        <p className="text-[16px] font-bold text-neutral-900 dark:text-white">Trace spans</p>
        <p className="text-[11px] text-neutral-400">{countSpans(TRACE)} spans</p>
        <button
          type="button"
          onClick={() => setCollapsed(allCollapsed ? new Set() : new Set(allParents))}
          className="ml-auto text-[11px] font-medium text-neutral-500 hover:text-neutral-800 dark:hover:text-neutral-200"
        >
          {allCollapsed ? "Expand all" : "Collapse all"}
        </button>
      </div>
      <div className="mt-3">
        <SpanRow span={TRACE} depth={0} total={TRACE.dur} collapsed={collapsed} toggle={toggle} />
      </div>
      <div className="mt-3 flex gap-4 border-t border-neutral-100 pt-2.5 text-[10px] text-neutral-500 dark:border-white/10">
        <span className="flex items-center gap-1.5"><span className="h-2 w-2 rounded-sm bg-[#8b5cf6]" /> trace</span>
        <span className="flex items-center gap-1.5"><span className="h-2 w-2 rounded-sm bg-[#10b981]" /> chain</span>
        <span className="flex items-center gap-1.5"><span className="h-2 w-2 rounded-sm bg-[#3b82f6]" /> LLM call</span>
        <span className="ml-auto italic">live rebuild · try the chevrons</span>
      </div>
    </div>
  );
}

// ── The board ──────────────────────────────────────────────────────
export default function TraceBoard() {
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
        {/* context wall */}
        <div className="absolute" style={{ left: 40, top: 50 }}>
          <Draggable>
            <FrameLabel>Context · 2023</FrameLabel>
            <div className="flex w-[400px] flex-wrap gap-4">
              <div className="w-[185px] rotate-[-1.5deg] bg-[#FFF3B8] p-3 font-[family-name:var(--font-hand)] text-[14px] leading-snug text-[#5C4E00] shadow-md">
                <b>LLM observability isn&rsquo;t a category yet.</b> no patterns, no prior art, no name for it
              </div>
              <div className="w-[185px] rotate-[1.2deg] bg-[#cfe8ff] p-3 font-[family-name:var(--font-hand)] text-[14px] leading-snug text-[#1e3a5c] shadow-md">
                a trace = a <b>tree</b> + a <b>timeline</b> + a <b>bill</b>, all at once
              </div>
              <div className="w-[185px] rotate-[0.8deg] bg-[#ffd6df] p-3 font-[family-name:var(--font-hand)] text-[14px] leading-snug text-[#6b2436] shadow-md">
                users debug 3 questions: <b>slow? wrong? expensive?</b>
              </div>
              <div className="w-[185px] rotate-[-0.8deg] bg-white p-3 font-[family-name:var(--font-hand)] text-[14px] leading-snug text-neutral-600 shadow-md">
                audience = ML engineers, <b>not</b> APM people. flame graphs are a foreign country
              </div>
            </div>
          </Draggable>
        </div>

        {/* the shipped screenshot */}
        <div className="absolute" style={{ left: 560, top: 50 }}>
          <Draggable>
            <FrameLabel>Shipped · the component in production</FrameLabel>
            <div className="w-[460px] overflow-hidden rounded-xl border border-black/5 bg-white shadow-lg dark:border-white/10">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={`${BASE}/comet/trace-spans.png`} alt="Trace spans in Opik" className="w-full" />
            </div>
          </Draggable>
        </div>

        {/* the component in its real habitat */}
        <div className="absolute" style={{ left: 690, top: 520 }}>
          <Draggable>
            <FrameLabel>In context · a sliver of a three-pane workspace</FrameLabel>
            <div className="w-[530px] overflow-hidden rounded-xl border border-black/5 bg-white shadow-lg dark:border-white/10">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={`${BASE}/comet/trace-context.png`} alt="Trace spans inside the full Opik workspace" className="w-full" />
            </div>
            <p className="mt-1.5 max-w-[530px] text-[10px] leading-snug text-neutral-500 dark:text-neutral-400">
              The spans column shares the screen with the trace list and the span detail pane. A few hundred pixels to show hierarchy, time, and cost.
            </p>
          </Draggable>
        </div>

        {/* the live rebuild */}
        <div className="absolute" style={{ left: 40, top: 430 }}>
          <Draggable>
            <FrameLabel>The component · rebuilt live, interactive</FrameLabel>
            <TraceSpansDemo />
          </Draggable>
        </div>
      </div>
    </div>
  );
}

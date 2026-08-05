"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import {
  Brush,
  ChevronLeft,
  ChevronRight,
  Code,
  Command,
  Layers,
  Smartphone,
  Sparkles,
} from "lucide-react";
import DesignerMode from "./DesignerMode";
import DeveloperMode from "./DeveloperMode";

const THINKING = [
  { label: "AI Interfaces", icon: <Sparkles size={14} /> },
  { label: "Design Systems", icon: <Layers size={14} /> },
  { label: "SwiftUI", icon: <Smartphone size={14} /> },
  { label: "Frontend Architecture", icon: <Code size={14} /> },
];

// `reveal` is the % of the panel showing Designer Mode: 100 = all designer,
// 0 = all developer, and the resting state is an even 50/50 split. The
// segmented control snaps it; the center handle drags it anywhere in
// between (the mockup's before/after divider).
export default function PerspectivePanel() {
  const [reveal, setReveal] = useState(50);
  const [dragging, setDragging] = useState(false);
  const stageRef = useRef<HTMLDivElement>(null);

  const designerActive = reveal >= 50;

  const toggle = useCallback(() => {
    setReveal((r) => (r >= 50 ? 0 : 100));
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "d") {
        e.preventDefault();
        toggle();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [toggle]);

  const onPointerDown = (e: React.PointerEvent<HTMLButtonElement>) => {
    e.currentTarget.setPointerCapture(e.pointerId);
    setDragging(true);
  };

  const onPointerMove = (e: React.PointerEvent<HTMLButtonElement>) => {
    if (!dragging || !stageRef.current) return;
    const rect = stageRef.current.getBoundingClientRect();
    const pct = ((e.clientX - rect.left) / rect.width) * 100;
    setReveal(Math.min(100, Math.max(0, pct)));
  };

  return (
    <section className="flex h-full min-h-0 flex-col">
      <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-muted">
        Perspective
      </p>

      <div className="mt-2 grid grid-cols-2 rounded-2xl border border-line bg-card p-1">
        {(
          [
            { key: "designer", label: "Designer Mode", icon: <Brush size={15} /> },
            { key: "developer", label: "Developer Mode", icon: <Code size={15} /> },
          ] as const
        ).map((mode) => {
          const active =
            mode.key === "designer" ? designerActive : !designerActive;
          return (
            <button
              key={mode.key}
              type="button"
              onClick={() => setReveal(mode.key === "designer" ? 100 : 0)}
              className={`flex items-center justify-center gap-2 rounded-xl py-2.5 text-sm font-medium transition-colors focus-visible:outline-2 focus-visible:outline-accent ${
                active
                  ? "bg-accent-soft text-accent"
                  : "text-muted hover:text-fg"
              }`}
            >
              {mode.icon}
              {mode.label}
            </button>
          );
        })}
      </div>

      <div className="mt-2 flex items-center justify-between text-[13px] text-muted">
        <span>Two lenses. Same product thinking.</span>
        <span className="flex items-center gap-1.5">
          Toggle to switch
          <kbd className="flex h-5 w-5 items-center justify-center rounded border border-line bg-card">
            <Command size={11} />
          </kbd>
          <kbd className="flex h-5 w-5 items-center justify-center rounded border border-line bg-card text-[11px]">
            D
          </kbd>
        </span>
      </div>

      <div
        ref={stageRef}
        className="relative mt-3 min-h-0 flex-1 overflow-hidden rounded-2xl border border-line"
      >
        <div className="absolute inset-0">
          <DeveloperMode />
        </div>
        <div
          className={`absolute inset-0 ${dragging ? "" : "transition-[clip-path] duration-500 ease-out"}`}
          style={{ clipPath: `inset(0 ${100 - reveal}% 0 0)` }}
          aria-hidden={!designerActive}
        >
          <DesignerMode />
        </div>

        <button
          type="button"
          aria-label="Drag to compare designer and developer views"
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={() => setDragging(false)}
          onPointerCancel={() => setDragging(false)}
          className={`absolute top-1/2 z-10 flex h-10 w-10 -translate-x-1/2 -translate-y-1/2 cursor-ew-resize items-center justify-center rounded-full border border-line bg-card text-muted shadow-lg focus-visible:outline-2 focus-visible:outline-accent ${
            dragging ? "" : "transition-[left] duration-500 ease-out"
          }`}
          style={{ left: `${reveal}%` }}
        >
          <ChevronLeft size={13} />
          <ChevronRight size={13} />
        </button>
      </div>

      <div className="mt-3 shrink-0">
        <p className="text-[13px] text-muted">Currently thinking about</p>
        <div className="mt-2 flex flex-wrap gap-2">
          {THINKING.map((chip) => (
            <span
              key={chip.label}
              className="flex items-center gap-2 rounded-xl border border-line bg-card px-3.5 py-2 text-[13px] font-medium text-fg/85"
            >
              {chip.icon}
              {chip.label}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

"use client";

import { useEffect, useRef, useState } from "react";

// Wraps a design-canvas layer: Figma arrow cursor, a "Visitor" tag on the
// viewer's cursor, and natural canvas zoom. Pinch (or Cmd/Ctrl + scroll)
// zooms toward the pointer, exactly like Figma; double-click on empty
// canvas or Esc resets to 100%.
export default function FigmaCanvas({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const rootRef = useRef<HTMLDivElement>(null);
  const view = useRef({ s: 1, x: 0, y: 0 });
  const [tag, setTag] = useState<{ x: number; y: number } | null>(null);
  const [transform, setTransform] = useState<string | null>(null);
  const [animate, setAnimate] = useState(false);

  const apply = (withAnimation = false) => {
    const { s, x, y } = view.current;
    setAnimate(withAnimation);
    setTransform(s === 1 && x === 0 && y === 0 ? null : `translate(${x}px, ${y}px) scale(${s})`);
  };

  const reset = () => {
    view.current = { s: 1, x: 0, y: 0 };
    apply(true);
  };

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const onWheel = (e: WheelEvent) => {
      // Trackpad pinch arrives as ctrlKey+wheel; Cmd+scroll also zooms.
      if (!e.ctrlKey && !e.metaKey) return;
      e.preventDefault();
      const rect = root.getBoundingClientRect();
      const px = e.clientX - rect.left;
      const py = e.clientY - rect.top;
      const { s, x, y } = view.current;
      const next = Math.min(2.5, Math.max(0.5, s * Math.exp(-e.deltaY * 0.01)));
      // keep the content under the pointer stationary
      const ux = (px - x) / s;
      const uy = (py - y) / s;
      view.current = { s: next, x: px - ux * next, y: py - uy * next };
      apply(false);
    };

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" && view.current.s !== 1) reset();
    };

    root.addEventListener("wheel", onWheel, { passive: false });
    window.addEventListener("keydown", onKey);
    return () => {
      root.removeEventListener("wheel", onWheel);
      window.removeEventListener("keydown", onKey);
    };
  }, []);

  return (
    <div
      ref={rootRef}
      className={`figma-cursor relative overflow-hidden ${className}`}
      onPointerMove={(e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        setTag({ x: e.clientX - rect.left, y: e.clientY - rect.top });
      }}
      onPointerLeave={() => setTag(null)}
      onDoubleClick={(e) => {
        if (e.target === e.currentTarget) reset();
      }}
    >
      <div
        className={`min-h-full origin-top-left ${
          animate ? "transition-transform duration-300 ease-out" : ""
        }`}
        style={transform ? { transform } : undefined}
      >
        {children}
      </div>
      {tag && (
        <span
          className="pointer-events-none absolute z-20 rounded-md bg-accent px-1.5 py-0.5 text-[10px] font-medium text-white"
          style={{ left: tag.x + 12, top: tag.y + 16 }}
        >
          Visitor
        </span>
      )}
    </div>
  );
}

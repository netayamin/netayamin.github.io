"use client";

import { createContext, useContext, useEffect, useRef, useState } from "react";

// Wraps a design-canvas layer: Figma arrow cursor, a "Visitor" tag on the
// viewer's cursor, and real canvas zoom — ZoomFrame children ask to be
// focused and the whole canvas smoothly scales/pans so that frame fills
// the visible right half. Esc or clicking the canvas zooms back out.
type ZoomApi = {
  zoomTo: (el: HTMLElement) => void;
  reset: () => void;
  zoomedEl: HTMLElement | null;
};

const ZoomContext = createContext<ZoomApi>({
  zoomTo: () => {},
  reset: () => {},
  zoomedEl: null,
});

export function useCanvasZoom() {
  return useContext(ZoomContext);
}

export default function FigmaCanvas({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const rootRef = useRef<HTMLDivElement>(null);
  const [tag, setTag] = useState<{ x: number; y: number } | null>(null);
  const [zoomedEl, setZoomedEl] = useState<HTMLElement | null>(null);
  const [transform, setTransform] = useState<string | null>(null);

  const reset = () => {
    setZoomedEl(null);
    setTransform(null);
  };

  const zoomTo = (el: HTMLElement) => {
    const root = rootRef.current;
    if (!root) return;
    const scroller = root.closest("[data-stage-scroll]") as HTMLElement | null;
    if (!scroller) return;

    // offset* coords are unaffected by the current transform, so this is
    // always computed against the untransformed canvas.
    let cx = el.offsetWidth / 2;
    let cy = el.offsetHeight / 2;
    let node: HTMLElement | null = el;
    while (node && node !== root) {
      cx += node.offsetLeft;
      cy += node.offsetTop;
      node = node.offsetParent as HTMLElement | null;
    }

    const W = root.offsetWidth;
    const viewH = scroller.clientHeight;
    const s = Math.min(
      2,
      Math.max(
        1.15,
        Math.min(((W / 2) * 0.8) / el.offsetWidth, (viewH * 0.8) / el.offsetHeight),
      ),
    );
    const tx = W * 0.75 - cx * s;
    const ty = scroller.scrollTop + viewH / 2 - cy * s;
    setZoomedEl(el);
    setTransform(`translate(${tx}px, ${ty}px) scale(${s})`);
  };

  useEffect(() => {
    if (!zoomedEl) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") reset();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [zoomedEl]);

  return (
    <ZoomContext.Provider value={{ zoomTo, reset, zoomedEl }}>
      <div
        ref={rootRef}
        className={`figma-cursor relative overflow-hidden ${className}`}
        onPointerMove={(e) => {
          const rect = e.currentTarget.getBoundingClientRect();
          setTag({ x: e.clientX - rect.left, y: e.clientY - rect.top });
        }}
        onPointerLeave={() => setTag(null)}
        onClick={() => {
          if (zoomedEl) reset();
        }}
      >
        <div
          className="min-h-full origin-top-left transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]"
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
    </ZoomContext.Provider>
  );
}

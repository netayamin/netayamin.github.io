"use client";

import { useEffect, useRef, useState } from "react";

// Pins a canvas frame at the same scroll position as its corresponding
// text section: finds the MD heading with the matching data-md-anchor in
// the shared scroll container and takes its vertical offset. The board
// then reads as annotations beside the story.
export default function AnchoredFrame({
  anchor,
  children,
  offset = 0,
}: {
  anchor: string;
  children: React.ReactNode;
  offset?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [top, setTop] = useState<number | null>(null);

  useEffect(() => {
    const measure = () => {
      const el = ref.current;
      if (!el) return;
      const scroller = el.closest("[data-stage-scroll]") as HTMLElement | null;
      const target = scroller?.querySelector(`[data-md-anchor="${anchor}"]`) as HTMLElement | null;
      if (!scroller || !target) return;
      const sRect = scroller.getBoundingClientRect();
      const tRect = target.getBoundingClientRect();
      setTop(tRect.top - sRect.top + scroller.scrollTop + offset);
    };
    measure();
    // fonts/images settle late; re-measure a few times
    const timers = [300, 900, 2000].map((ms) => setTimeout(measure, ms));
    window.addEventListener("resize", measure);
    return () => {
      timers.forEach(clearTimeout);
      window.removeEventListener("resize", measure);
    };
  }, [anchor, offset]);

  return (
    <div
      ref={ref}
      className="absolute left-[75%] w-max max-w-[46%] -translate-x-1/2"
      style={top !== null ? { top } : { top: 0, visibility: "hidden" }}
    >
      {children}
    </div>
  );
}

"use client";

import { useEffect, useRef, useState } from "react";
import { useMazalContext } from "@/context/MazalContext";
import MazalRive from "./MazalRive";
import type { MazalPose } from "@/types/mazal";

type Target = {
  top: number;
  left: number;
  width: number;
  height: number;
  pose: MazalPose;
  message: string;
  slotId: string;
};

export default function MazalCompanion() {
  const { getSlots, isBarking } = useMazalContext();
  const [target, setTarget] = useState<Target | null>(null);
  const activeIdRef = useRef<string | null>(null);

  useEffect(() => {
    const root = document.getElementById("page-root");
    if (!root) return;

    // Belt and suspenders: scroll/resize listeners are the efficient path
    // for real user scrolling, but some environments (programmatic
    // scrollTo, certain automation/webview contexts) don't reliably
    // dispatch native "scroll" events, and requestAnimationFrame throttles
    // or stops entirely in backgrounded/non-visible tabs — either gap
    // silently stops position updates. A plain setInterval poll isn't
    // subject to either limitation, so it's kept running as a fallback
    // alongside the event listeners.
    const update = () => {
      const slots = getSlots();
      if (slots.length === 0) return;

      const vh = window.innerHeight;
      let best: { id: string; ratio: number } | null = null;
      for (const slot of slots) {
        const r = slot.el.getBoundingClientRect();
        const visibleTop = Math.max(0, r.top);
        const visibleBottom = Math.min(vh, r.bottom);
        const visibleHeight = Math.max(0, visibleBottom - visibleTop);
        const ratio = r.height > 0 ? visibleHeight / r.height : 0;
        if (ratio > 0 && (!best || ratio > best.ratio)) {
          best = { id: slot.id, ratio };
        }
      }

      const activeId = best?.id ?? activeIdRef.current ?? slots[0].id;
      activeIdRef.current = activeId;

      const slot = slots.find((s) => s.id === activeId);
      if (slot) {
        const slotRect = slot.el.getBoundingClientRect();
        const rootRect = root.getBoundingClientRect();
        const next: Target = {
          top: slotRect.top - rootRect.top,
          left: slotRect.left - rootRect.left,
          width: slotRect.width,
          height: slotRect.height,
          pose: slot.pose,
          message: slot.message,
          slotId: slot.id,
        };
        setTarget((prev) =>
          prev &&
          prev.top === next.top &&
          prev.left === next.left &&
          prev.width === next.width &&
          prev.height === next.height &&
          prev.pose === next.pose &&
          prev.message === next.message &&
          prev.slotId === next.slotId
            ? prev
            : next,
        );
      }
    };

    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    const intervalId = window.setInterval(update, 250);

    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
      window.clearInterval(intervalId);
    };
  }, [getSlots]);

  if (!target) return null;

  return (
    <div
      data-testid="mazal-companion"
      className="pointer-events-none absolute z-20 transition-[top,left] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]"
      style={{ top: target.top, left: target.left, width: target.width, height: target.height }}
    >
      <div className="relative h-full w-full">
        <div className="pointer-events-auto h-full w-full">
          <MazalRive pose={target.pose} />
        </div>

        {isBarking && (
          // Appears instantly with no transition, slightly overlapping Mazal
          // — deliberately abrupt, since this is the joke "bad hover state"
          // reaction. Placeholder for a real bark sound/animation.
          <div className="pointer-events-none absolute top-2 right-0 rounded-lg bg-neutral-900 px-2 py-1 text-xs font-bold text-white">
            WOOF!! 🔊 (bark.mp3 placeholder)
          </div>
        )}
      </div>
    </div>
  );
}

"use client";

import { useEffect, useState } from "react";
import { X, ZoomIn } from "lucide-react";

// Figma-style frame focus: hover a canvas section to reveal a zoom
// button; clicking opens the section enlarged in an overlay. Esc, the ✕,
// or clicking the backdrop zooms back out. Interactive children (variant
// clicks, links) keep working inside the zoomed view.
export default function ZoomFrame({
  children,
  label,
  scale = 1.5,
}: {
  children: React.ReactNode;
  label: string;
  scale?: number;
}) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <div className="group/zoom relative">
      {children}
      <button
        type="button"
        aria-label={`Zoom into ${label}`}
        onClick={() => setOpen(true)}
        onPointerDown={(e) => e.stopPropagation()}
        className="absolute -right-2 -top-2 z-10 hidden h-7 w-7 items-center justify-center rounded-full border border-line bg-card text-muted shadow-sm transition-colors hover:text-fg group-hover/zoom:flex"
      >
        <ZoomIn size={14} />
      </button>

      {open && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/45 backdrop-blur-[2px]"
          onClick={() => setOpen(false)}
        >
          <button
            type="button"
            aria-label="Close zoom"
            className="absolute right-5 top-5 flex h-9 w-9 items-center justify-center rounded-full bg-white/15 text-white transition-colors hover:bg-white/25"
          >
            <X size={17} />
          </button>
          <span className="absolute left-5 top-5 rounded-md bg-white/15 px-2.5 py-1 text-[11px] font-medium text-white">
            {label} — 150%
          </span>
          <div onClick={(e) => e.stopPropagation()} style={{ transform: `scale(${scale})` }}>
            {children}
          </div>
        </div>
      )}
    </div>
  );
}

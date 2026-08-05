"use client";

import { useRef } from "react";
import { ZoomIn, ZoomOut } from "lucide-react";
import { useCanvasZoom } from "./FigmaCanvas";

// Figma-style frame focus: hover a canvas section to reveal a zoom
// button; clicking smoothly zooms the canvas itself onto this frame.
// Esc, the button, or clicking the canvas zooms back out.
export default function ZoomFrame({
  children,
  label,
}: {
  children: React.ReactNode;
  label: string;
  scale?: number; // kept for call-site compatibility; zoom is computed
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { zoomTo, reset, zoomedEl } = useCanvasZoom();
  const isZoomed = zoomedEl !== null && zoomedEl === ref.current;

  return (
    <div
      ref={ref}
      className="group/zoom relative"
      onClick={(e) => {
        // keep interactions inside the focused frame from resetting the zoom
        if (isZoomed) e.stopPropagation();
      }}
    >
      {children}
      <button
        type="button"
        aria-label={isZoomed ? `Zoom out of ${label}` : `Zoom into ${label}`}
        onPointerDown={(e) => e.stopPropagation()}
        onClick={(e) => {
          e.stopPropagation();
          if (isZoomed) reset();
          else if (ref.current) zoomTo(ref.current);
        }}
        className={`absolute -right-2 -top-2 z-10 h-7 w-7 items-center justify-center rounded-full border border-line bg-card text-muted shadow-sm transition-colors hover:text-fg ${
          isZoomed ? "flex" : "hidden group-hover/zoom:flex"
        }`}
      >
        {isZoomed ? <ZoomOut size={14} /> : <ZoomIn size={14} />}
      </button>
    </div>
  );
}

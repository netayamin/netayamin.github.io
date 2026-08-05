"use client";

import { useState } from "react";

// Wraps a design-canvas layer: applies the Figma arrow cursor and hangs a
// multiplayer-style "Visitor" name tag off the viewer's own cursor.
export default function FigmaCanvas({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const [tag, setTag] = useState<{ x: number; y: number } | null>(null);

  return (
    <div
      className={`figma-cursor relative ${className}`}
      onPointerMove={(e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        setTag({ x: e.clientX - rect.left, y: e.clientY - rect.top });
      }}
      onPointerLeave={() => setTag(null)}
    >
      {children}
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

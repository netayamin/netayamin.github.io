"use client";

import { useRef, useState } from "react";

// Makes a canvas element moveable like a Figma layer. The pointer is only
// captured once movement passes a small threshold, so plain clicks (links,
// buttons) inside the frame reach their real targets untouched.
export default function Draggable({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const drag = useRef<{
    startX: number;
    startY: number;
    baseX: number;
    baseY: number;
    active: boolean;
  } | null>(null);

  return (
    <div
      data-draggable
      className={`touch-none select-none ${className}`}
      style={pos.x || pos.y ? { transform: `translate(${pos.x}px, ${pos.y}px)` } : undefined}
      onPointerDown={(e) => {
        if (e.button !== 0) return;
        drag.current = {
          startX: e.clientX,
          startY: e.clientY,
          baseX: pos.x,
          baseY: pos.y,
          active: false,
        };
      }}
      onPointerMove={(e) => {
        const d = drag.current;
        if (!d) return;
        const dx = e.clientX - d.startX;
        const dy = e.clientY - d.startY;
        if (!d.active) {
          if (Math.abs(dx) < 4 && Math.abs(dy) < 4) return;
          d.active = true;
          e.currentTarget.setPointerCapture(e.pointerId);
        }
        setPos({ x: d.baseX + dx, y: d.baseY + dy });
      }}
      onPointerUp={() => {
        drag.current = null;
      }}
      onPointerCancel={() => {
        drag.current = null;
      }}
    >
      {children}
    </div>
  );
}

"use client";

import { useRef, useState } from "react";

// Makes a canvas element moveable like a Figma layer: drag anywhere on it
// to translate it. Child buttons keep working — we never preventDefault,
// so clicks pass through unless the pointer actually moved.
export default function Draggable({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const drag = useRef<{ startX: number; startY: number; baseX: number; baseY: number } | null>(null);

  return (
    <div
      className={`touch-none select-none ${className}`}
      style={pos.x || pos.y ? { transform: `translate(${pos.x}px, ${pos.y}px)` } : undefined}
      onPointerDown={(e) => {
        if (e.button !== 0) return;
        drag.current = { startX: e.clientX, startY: e.clientY, baseX: pos.x, baseY: pos.y };
        e.currentTarget.setPointerCapture(e.pointerId);
      }}
      onPointerMove={(e) => {
        if (!drag.current) return;
        setPos({
          x: drag.current.baseX + e.clientX - drag.current.startX,
          y: drag.current.baseY + e.clientY - drag.current.startY,
        });
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

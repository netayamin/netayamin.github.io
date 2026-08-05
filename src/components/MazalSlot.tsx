"use client";

import { useEffect, useRef } from "react";
import { useMazalContext } from "@/context/MazalContext";
import type { MazalPose } from "@/types/mazal";

type MazalSlotProps = {
  id: string;
  pose: MazalPose;
  message: string;
  className?: string;
};

// Invisible marker that reserves the layout space Mazal should occupy in
// this section. The actual dog is rendered once by <MazalCompanion />,
// which reads this slot's position/pose/message when it becomes active.
export default function MazalSlot({ id, pose, message, className }: MazalSlotProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { registerSlot } = useMazalContext();

  useEffect(() => {
    if (!ref.current) return;
    return registerSlot({ id, pose, message, el: ref.current });
  }, [id, pose, message, registerSlot]);

  return (
    <div
      ref={ref}
      data-mazal-slot={id}
      className={className ?? "h-[300px] w-[300px] shrink-0"}
    />
  );
}

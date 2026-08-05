"use client";

import { createContext, useCallback, useContext, useRef, useState } from "react";
import type { MazalPose } from "@/types/mazal";

export type MazalSlotEntry = {
  id: string;
  pose: MazalPose;
  message: string;
  el: HTMLElement;
};

type MazalContextValue = {
  registerSlot: (entry: MazalSlotEntry) => () => void;
  getSlots: () => MazalSlotEntry[];
  outfit: string | null;
  setOutfit: (outfit: string | null) => void;
  isBarking: boolean;
  setIsBarking: (isBarking: boolean) => void;
};

const MazalContext = createContext<MazalContextValue | null>(null);

export function MazalProvider({ children }: { children: React.ReactNode }) {
  const slotsRef = useRef<Map<string, MazalSlotEntry>>(new Map());
  const [outfit, setOutfit] = useState<string | null>(null);
  const [isBarking, setIsBarking] = useState(false);

  const registerSlot = useCallback((entry: MazalSlotEntry) => {
    slotsRef.current.set(entry.id, entry);
    return () => {
      slotsRef.current.delete(entry.id);
    };
  }, []);

  const getSlots = useCallback(() => Array.from(slotsRef.current.values()), []);

  return (
    <MazalContext.Provider
      value={{ registerSlot, getSlots, outfit, setOutfit, isBarking, setIsBarking }}
    >
      {children}
    </MazalContext.Provider>
  );
}

export function useMazalContext() {
  const ctx = useContext(MazalContext);
  if (!ctx) throw new Error("useMazalContext must be used within a MazalProvider");
  return ctx;
}

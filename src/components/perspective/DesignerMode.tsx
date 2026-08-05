"use client";

import { useState } from "react";
import AnchoredFrame from "./AnchoredFrame";
import Draggable from "./Draggable";
import FigmaCanvas from "./FigmaCanvas";
import ZoomFrame from "./ZoomFrame";

// The journey as visuals: one monogram tile per stop, no prose (the full
// story lives in Resume.md on the text side).
const JOURNEY_STOPS = [
  { monogram: "C", place: "Copyleaks", years: "2019–21", color: "#10b981" },
  { monogram: "C", place: "Comet ML", years: "2021–25", color: "#f97316" },
  { monogram: "T", place: "TIFIN", years: "2025–26", color: "#2563eb" },
  { monogram: "N", place: "Indie", years: "now", color: "#7c5cfc", current: true },
];

const FIGMA_BLUE = "#0d99ff";

// All the different Netas, shown Figma-style: one component set with every
// variant laid out inside the dashed purple boundary. Variants without a
// photo yet render an emoji placeholder — drop images into public/ and set
// `src` to light them up.
const VARIANTS: Array<{
  id: string;
  label: string;
  emoji: string;
  src?: string;
}> = [
  { id: "main", label: "Main", emoji: "🛠️", src: "/neta.jpg" },
  { id: "tennis", label: "Tennis", emoji: "🎾" },
  { id: "travel", label: "Travel", emoji: "✈️" },
  { id: "photography", label: "Photography", emoji: "📷" },
  { id: "friends", label: "Friends", emoji: "🫶" },
];

// Mazi's variant set — one funny caption per pose.
const MAZI_VARIANTS = [
  {
    id: "cmo",
    label: "CMO",
    caption: "Chief Morale Officer. Barks at bugs, approves all merges.",
    src: "/mazi.jpg",
  },
  {
    id: "sleep",
    label: "DND",
    caption: "Do Not Disturb — recharging after a long sprint of naps.",
    src: "/mazi/sleep.jpg",
  },
  {
    id: "vacation",
    label: "OOO",
    caption: "Out of office. Surveying her kingdom from the penthouse.",
    src: "/mazi/balcony.jpg",
  },
  {
    id: "hike",
    label: "Hiking",
    caption: "Trail QA lead. Inspects every cliff edge personally.",
    src: "/mazi/hike.jpg",
  },
  {
    id: "tennis",
    label: "Tennis",
    caption: "Ball girl on strike. The ball is hers now.",
    src: "/mazi/tennis.jpg",
  },
  {
    id: "camping",
    label: "Camping",
    caption: "Mazi camping. Glamping, actually — she has standards.",
    src: "/mazi/camping.jpg",
  },
];

function VariantCard({
  variant,
  selected,
  hero,
  onSelect,
}: {
  variant: (typeof VARIANTS)[number];
  selected: boolean;
  hero?: boolean;
  onSelect: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onSelect}
      className="relative shrink-0 text-left focus-visible:outline-2 focus-visible:outline-accent"
    >
      <div
        className={`overflow-hidden rounded-lg bg-white shadow-sm dark:bg-[#28282c] ${
          hero ? "h-[170px] w-[150px]" : "h-[94px] w-[84px]"
        } ${selected ? "ring-2" : "ring-1 ring-black/5 dark:ring-white/10"}`}
        style={selected ? ({ "--tw-ring-color": FIGMA_BLUE } as React.CSSProperties) : undefined}
      >
        {variant.src ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={`${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}${variant.src}`}
            alt=""
            className="h-full w-full object-cover object-top"
          />
        ) : (
          <div className={`flex h-full w-full items-center justify-center bg-accent-soft ${hero ? "text-4xl" : "text-2xl"}`}>
            {variant.emoji}
          </div>
        )}
      </div>
      <p
        className={`mt-1 text-[10px] ${selected ? "font-semibold" : "text-neutral-500 dark:text-neutral-400"}`}
        style={selected ? { color: FIGMA_BLUE } : undefined}
      >
        {variant.label}
      </p>
    </button>
  );
}

// The designer lens of Me: component set of Netas, the Mazi component, a
// bio text layer, and the journey timeline. Scrolls with the Xcode side.
export default function DesignerMode() {
  const [variantId, setVariantId] = useState(VARIANTS[0].id);
  const [maziId, setMaziId] = useState(MAZI_VARIANTS[0].id);
  const mazi = MAZI_VARIANTS.find((v) => v.id === maziId) ?? MAZI_VARIANTS[0];

  return (
    <FigmaCanvas className="min-h-full bg-[#f0f0f3] pb-16 dark:bg-[#2c2c2e]">
      <div className="relative min-h-full">
          {/* Me — component set with variants */}
          <AnchoredFrame anchor="summary" offset={0}><Draggable><ZoomFrame label="❖ Me" scale={1.4}>
            <p className="mb-1.5 flex items-center gap-1.5 text-[12px] font-medium text-accent">
              <span className="text-[10px]">❖</span> Me
            </p>
            {/* The set is wider than the canvas half — the fun variants
                deliberately run off-canvas, like a real Figma frame */}
            <div className="relative w-max rounded-sm border border-dashed border-accent/70 p-4">
              <span className="absolute -left-1 -top-1 h-2 w-2 border border-accent/70 bg-white" />
              <span className="absolute -bottom-1 -left-1 h-2 w-2 border border-accent/70 bg-white" />
              <div className="flex items-end gap-3">
                {VARIANTS.map((variant, i) => (
                  <VariantCard
                    key={variant.id}
                    variant={variant}
                    hero={i === 0}
                    selected={variant.id === variantId}
                    onSelect={() => setVariantId(variant.id)}
                  />
                ))}
              </div>
            </div>
          </ZoomFrame></Draggable></AnchoredFrame>

          {/* Journey — visual map: monogram tiles on a path */}
          <AnchoredFrame anchor="experience" offset={10}><Draggable><ZoomFrame label="Journey" scale={1.6}>
            <p className="mb-1.5 flex items-center gap-1.5 text-[12px] font-medium text-accent">
              <span className="text-[10px]">❖</span> Journey
            </p>
            <div className="relative w-max rounded-sm border border-dashed border-accent/70 p-4">
              <span className="absolute -left-1 -top-1 h-2 w-2 border border-accent/70 bg-white" />
              <span className="absolute -bottom-1 -left-1 h-2 w-2 border border-accent/70 bg-white" />
              <div className="flex items-start">
                {JOURNEY_STOPS.map((stop, i) => (
                  <div key={stop.place} className="flex items-start">
                    {i > 0 && (
                      <span className="mt-6 h-px w-7 bg-neutral-300 dark:bg-white/20" />
                    )}
                    <div className="flex w-[76px] flex-col items-center gap-1.5">
                      <span
                        className={`flex h-12 w-12 items-center justify-center rounded-xl text-lg font-bold text-white shadow-sm ${
                          stop.current ? "ring-2 ring-offset-2 ring-offset-[#f0f0f3] dark:ring-offset-[#2c2c2e]" : ""
                        }`}
                        style={{
                          backgroundColor: stop.color,
                          ...(stop.current
                            ? ({ "--tw-ring-color": FIGMA_BLUE } as React.CSSProperties)
                            : {}),
                        }}
                      >
                        {stop.monogram}
                      </span>
                      <p className="text-center text-[10px] font-semibold text-neutral-800 dark:text-neutral-200">
                        {stop.place}
                      </p>
                      <p className="-mt-1 text-[9px] text-neutral-400">{stop.years}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </ZoomFrame></Draggable></AnchoredFrame>

          {/* Mazi — component set with variants */}
          <AnchoredFrame anchor="sidekick" offset={10}><Draggable><ZoomFrame label="❖ My dog Mazi" scale={1.4}>
            <p className="mb-1.5 flex items-center gap-1.5 text-[12px] font-medium text-accent">
              <span className="text-[10px]">❖</span> My dog Mazi
            </p>
            <div className="relative rounded-sm border border-dashed border-accent/70 p-4">
              <span className="absolute -left-1 -top-1 h-2 w-2 border border-accent/70 bg-white" />
              <span className="absolute -bottom-1 -left-1 h-2 w-2 border border-accent/70 bg-white" />
              <div className="flex items-start gap-4">
                {/* hero: the selected variant */}
                <div className="w-[170px] shrink-0">
                  <div className="h-[185px] overflow-hidden rounded-lg bg-white shadow-sm dark:bg-[#28282c]">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={`${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}${mazi.src}`}
                      alt=""
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <p className="mt-1.5 text-[11px] font-semibold" style={{ color: FIGMA_BLUE }}>
                    Mazi / {mazi.label}
                  </p>
                  <p className="text-[10px] leading-snug text-neutral-500 dark:text-neutral-400">
                    {mazi.caption}
                  </p>
                </div>
                {/* variant grid */}
                <div className="grid grid-cols-3 gap-2.5">
                  {MAZI_VARIANTS.map((variant) => (
                    <button
                      key={variant.id}
                      type="button"
                      onClick={() => setMaziId(variant.id)}
                      className="text-left focus-visible:outline-2 focus-visible:outline-accent"
                    >
                      <div
                        className={`h-[74px] w-[68px] overflow-hidden rounded-md bg-white shadow-sm dark:bg-[#28282c] ${
                          variant.id === maziId ? "ring-2" : "ring-1 ring-black/5 dark:ring-white/10"
                        }`}
                        style={
                          variant.id === maziId
                            ? ({ "--tw-ring-color": FIGMA_BLUE } as React.CSSProperties)
                            : undefined
                        }
                      >
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={`${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}${variant.src}`}
                          alt=""
                          className="h-full w-full object-cover"
                        />
                      </div>
                      <p
                        className={`mt-0.5 text-[9px] ${
                          variant.id === maziId
                            ? "font-semibold"
                            : "text-neutral-500 dark:text-neutral-400"
                        }`}
                        style={variant.id === maziId ? { color: FIGMA_BLUE } : undefined}
                      >
                        {variant.label}
                      </p>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </ZoomFrame></Draggable></AnchoredFrame>
      </div>
    </FigmaCanvas>
  );
}

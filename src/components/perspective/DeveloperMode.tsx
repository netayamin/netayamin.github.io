import { PHONE_W, PHONE_H } from "./PhoneMockup";

const CODE: Array<Array<{ text: string; tone?: "kw" | "type" | "num" }>> = [
  [{ text: "HStack", tone: "type" }, { text: "(alignment: " }, { text: ".center", tone: "kw" }, { text: ") {" }],
  [{ text: "  Image", tone: "type" }, { text: "(avatar)" }],
  [{ text: "  VStack", tone: "type" }, { text: "(alignment: " }, { text: ".leading", tone: "kw" }, { text: ") {" }],
  [{ text: "    Text", tone: "type" }, { text: "(title)" }],
  [{ text: "    Text", tone: "type" }, { text: "(subtitle)" }],
  [{ text: "  }" }],
  [{ text: "  Spacer", tone: "type" }, { text: "()" }],
  [{ text: "}" }],
  [{ text: ".padding(.vertical, " }, { text: "12", tone: "num" }, { text: ")" }],
  [{ text: ".padding(.horizontal, " }, { text: "16", tone: "num" }, { text: ")" }],
  [{ text: ".background(.background)" }],
  [{ text: ".cornerRadius(" }, { text: "12", tone: "num" }, { text: ")" }],
];

const TONE_CLASS = {
  kw: "text-[#fc5fa3]",
  type: "text-[#5dd8ff]",
  num: "text-[#d0bf69]",
} as const;

// Rows of the wireframe twin: mirrors the phone's plan cards so the wipe
// reads as the same screen changing lenses.
const WIREFRAME_ROWS = [56, 56, 56];

// The developer lens: the same screen open in Xcode — jump bar, wireframe
// with redlines where the phone sits, SwiftUI source on the right.
export default function DeveloperMode() {
  return (
    <div className="relative h-full overflow-hidden bg-[#1f1f24] text-neutral-300">
      {/* Xcode window chrome */}
      <div className="relative z-10 flex items-center gap-3 border-b border-white/10 bg-[#28282e] px-4 py-2">
        <span className="flex gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
        </span>
        <span className="font-mono text-[11px] text-neutral-400">
          Snagr <span className="text-neutral-600">›</span> Views{" "}
          <span className="text-neutral-600">›</span>{" "}
          <span className="text-neutral-200">PlanRow.swift</span>
        </span>
        <span className="ml-auto rounded bg-white/10 px-1.5 py-0.5 text-[10px]">
          SwiftUI
        </span>
      </div>

      {/* Wireframe twin of the phone — same size, same center as the Figma
          layer so the wipe slices one continuous object */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="relative shrink-0" style={{ width: PHONE_W, height: PHONE_H }}>
          <span className="absolute -top-5 left-0 rounded bg-accent px-1.5 py-0.5 text-[10px] font-semibold text-white">
            Safe Area
          </span>
          <div className="h-full w-full rounded-[2.4rem] border-2 border-dashed border-accent/60 p-3">
            <div className="mt-8 space-y-2">
              {WIREFRAME_ROWS.map((height, i) => (
                <div
                  key={i}
                  className={`relative rounded-lg border ${
                    i === 0 ? "border-pink-400" : "border-accent/40"
                  }`}
                  style={{ height }}
                >
                  {i === 0 && (
                    <span className="absolute -right-2 top-1/2 -translate-y-1/2 translate-x-full rounded bg-pink-500/20 px-1 py-0.5 font-mono text-[9px] text-pink-300">
                      343 × 56
                    </span>
                  )}
                  <span className="absolute left-1.5 top-1/2 h-6 w-6 -translate-y-1/2 rounded-full border border-accent/40" />
                  <span className="absolute left-10 top-3 h-1.5 w-16 rounded bg-accent/30" />
                  <span className="absolute left-10 bottom-3 h-1.5 w-24 rounded bg-accent/15" />
                </div>
              ))}
            </div>
            {/* Redlines */}
            <div className="mt-3 flex justify-between px-1 font-mono text-[9px] text-[#5dd8ff]">
              <span>← 16 →</span>
              <span>↕ 12</span>
              <span>← 16 →</span>
            </div>
          </div>
        </div>
      </div>

      {/* Source, right rail */}
      <div className="absolute bottom-4 right-4 top-12 hidden w-[38%] min-w-[230px] flex-col overflow-hidden rounded-lg border border-white/10 bg-[#191920] p-3 md:flex">
        <pre className="min-h-0 flex-1 overflow-hidden font-mono text-[11px] leading-[1.6]">
          {CODE.map((line, i) => (
            <div key={i} className="flex">
              <span className="w-6 shrink-0 select-none text-right text-neutral-600">
                {i + 1}
              </span>
              <span className="pl-3">
                {line.map((seg, j) => (
                  <span key={j} className={seg.tone ? TONE_CLASS[seg.tone] : undefined}>
                    {seg.text}
                  </span>
                ))}
              </span>
            </div>
          ))}
        </pre>
        <div className="mt-2 flex flex-wrap gap-1.5 border-t border-white/10 pt-2">
          {["Reusable", "Accessible", "VoiceOver"].map((chip) => (
            <span
              key={chip}
              className="rounded border border-white/15 px-1.5 py-0.5 text-[10px] text-neutral-400"
            >
              {chip}
            </span>
          ))}
        </div>
      </div>

      {/* Token strip, bottom-left */}
      <div className="absolute bottom-4 left-4 flex flex-col gap-1.5 font-mono text-[10px] text-neutral-400">
        <span className="flex items-center gap-1.5">
          <span className="h-3 w-3 rounded bg-accent" /> Purple / 500
        </span>
        <span className="flex items-center gap-1.5">
          <span className="h-3 w-3 rounded bg-neutral-800 ring-1 ring-white/20" /> Gray / 900
        </span>
        <span>Title 17/22 · Body 15/20</span>
        <span>
          8pt grid: 8 12 <span className="rounded bg-accent px-1 text-white">16</span> 24 32
        </span>
      </div>
    </div>
  );
}

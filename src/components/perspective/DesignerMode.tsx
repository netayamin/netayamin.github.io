import { MousePointer2 } from "lucide-react";
import PhoneMockup, { PHONE_W, PHONE_H } from "./PhoneMockup";

const FIGMA_BLUE = "#0d99ff";

const LAYERS = [
  { name: "Home", active: false },
  { name: "My Plans", active: true },
  { name: "Collections", active: false },
  { name: "Plan Detail", active: false },
];

function Handle({ className }: { className: string }) {
  return (
    <span
      className={`absolute h-2 w-2 border bg-white ${className}`}
      style={{ borderColor: FIGMA_BLUE }}
    />
  );
}

// The designer lens: a Figma canvas with the phone as the selected frame.
export default function DesignerMode() {
  return (
    <div className="relative h-full overflow-hidden bg-[#f0f0f3] dark:bg-[#2c2c2e]">
      {/* Mini layers panel */}
      <div className="absolute left-4 top-4 w-36 rounded-lg border border-black/5 bg-white p-2 shadow-sm dark:border-white/10 dark:bg-[#1f1f22]">
        <p className="px-1 pb-1 text-[9px] font-semibold uppercase tracking-wide text-neutral-400">
          Layers
        </p>
        {LAYERS.map((layer) => (
          <div
            key={layer.name}
            className={`flex items-center gap-1.5 rounded px-1.5 py-1 text-[11px] ${
              layer.active
                ? "bg-[#e5f3ff] font-medium text-[#0d78c9] dark:bg-[#0d99ff]/20 dark:text-[#6cc2ff]"
                : "text-neutral-500 dark:text-neutral-400"
            }`}
          >
            <span
              className="h-2.5 w-2.5 rounded-[2px] border"
              style={{ borderColor: layer.active ? FIGMA_BLUE : "currentColor" }}
            />
            {layer.name}
          </div>
        ))}
      </div>

      {/* Selected frame: the phone with Figma selection chrome */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="relative" style={{ width: PHONE_W, height: PHONE_H }}>
          <span
            className="absolute -top-5 left-0 text-[11px] font-medium"
            style={{ color: FIGMA_BLUE }}
          >
            My Plans · iPhone 16
          </span>
          <div
            className="absolute -inset-1 border"
            style={{ borderColor: FIGMA_BLUE }}
          >
            <Handle className="-left-1 -top-1" />
            <Handle className="-right-1 -top-1" />
            <Handle className="-left-1 -bottom-1" />
            <Handle className="-right-1 -bottom-1" />
          </div>
          <PhoneMockup />
          <span
            className="absolute -bottom-6 left-1/2 -translate-x-1/2 rounded px-1.5 py-0.5 text-[10px] font-medium text-white"
            style={{ backgroundColor: FIGMA_BLUE }}
          >
            240 × 420
          </span>
        </div>
      </div>

      {/* Multiplayer cursor */}
      <div className="absolute bottom-[22%] right-[14%]">
        <MousePointer2 size={16} className="fill-accent text-accent" />
        <span className="ml-3 rounded-md bg-accent px-1.5 py-0.5 text-[10px] font-medium text-white">
          Neta
        </span>
      </div>
    </div>
  );
}

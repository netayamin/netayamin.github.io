const CODE: Array<Array<{ text: string; tone?: "kw" | "type" | "num" | "str" }>> = [
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
  [{ text: ".background(Color(.systemBackground))" }],
  [{ text: ".cornerRadius(" }, { text: "12", tone: "num" }, { text: ")" }],
];

const TONE_CLASS = {
  kw: "text-[#c792ea]",
  type: "text-[#82aaff]",
  num: "text-[#f78c6c]",
  str: "text-[#c3e88d]",
} as const;

const SPACING = [8, 12, 16, 24, 32, 48];

export default function DeveloperMode() {
  return (
    <div className="flex h-full flex-col gap-4 overflow-hidden bg-ink px-7 py-6 text-neutral-300">
      <div className="flex items-center gap-3">
        <span className="rounded-md bg-accent px-2 py-0.5 text-[10px] font-semibold text-white">
          Safe Area
        </span>
        <span className="text-xl font-bold text-white">My Plans</span>
        <span className="rounded-md bg-pink-500/20 px-2 py-0.5 font-mono text-[10px] text-pink-300">
          343 × 56
        </span>
      </div>

      <div className="min-h-0 flex-1 overflow-hidden rounded-xl border border-ink-line bg-ink-card p-4">
        <div className="mb-2 flex items-center justify-between">
          <span className="font-mono text-[11px] text-neutral-400">PlanRow</span>
          <span className="rounded bg-white/10 px-1.5 py-0.5 text-[10px] text-neutral-300">
            SwiftUI
          </span>
        </div>
        <pre className="font-mono text-[11.5px] leading-[1.55]">
          {CODE.map((line, i) => (
            <div key={i}>
              {line.map((seg, j) => (
                <span key={j} className={seg.tone ? TONE_CLASS[seg.tone] : undefined}>
                  {seg.text}
                </span>
              ))}
            </div>
          ))}
        </pre>
      </div>

      <div className="grid shrink-0 grid-cols-3 gap-6 text-[11px]">
        <div>
          <p className="mb-2 font-semibold uppercase tracking-wide text-neutral-500">
            Color Tokens
          </p>
          <div className="flex items-center gap-2 py-0.5">
            <span className="h-3.5 w-3.5 rounded bg-accent" />
            <span className="text-neutral-200">Purple / 500</span>
          </div>
          <div className="flex items-center gap-2 py-0.5">
            <span className="h-3.5 w-3.5 rounded bg-neutral-900 ring-1 ring-ink-line" />
            <span className="text-neutral-200">Gray / 900</span>
          </div>
        </div>
        <div>
          <p className="mb-2 font-semibold uppercase tracking-wide text-neutral-500">
            Typography
          </p>
          <p className="py-0.5">
            <span className="text-neutral-200">Title</span>{" "}
            <span className="text-neutral-500">17 / 22 Semibold</span>
          </p>
          <p className="py-0.5">
            <span className="text-neutral-200">Body</span>{" "}
            <span className="text-neutral-500">15 / 20 Regular</span>
          </p>
        </div>
        <div>
          <p className="mb-2 font-semibold uppercase tracking-wide text-neutral-500">
            Spacing (8pt grid)
          </p>
          <div className="flex flex-wrap gap-1">
            {SPACING.map((step) => (
              <span
                key={step}
                className={`rounded px-1.5 py-0.5 font-mono ${
                  step === 16
                    ? "bg-accent text-white"
                    : "bg-white/5 text-neutral-400"
                }`}
              >
                {step}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="shrink-0">
        <p className="mb-2 text-[11px] font-semibold uppercase tracking-wide text-neutral-500">
          Component Info
        </p>
        <div className="flex flex-wrap gap-1.5">
          {["Reusable", "Accessible", "Haptic Feedback", "VoiceOver"].map((chip) => (
            <span
              key={chip}
              className="rounded-md border border-ink-line px-2 py-1 text-[11px] text-neutral-300"
            >
              {chip}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

# Me Page Raw ASCII Journey Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the Me page Raw tab's highlighted markdown with a looping ASCII slideshow where characters scramble into scenes of Neta's journey.

**Architecture:** A new self-contained client component `JourneyRaw` renders a fixed 44x12 monospace character grid and drives a hold/morph loop with a single interval. `MarkdownDoc` gains an optional `rawView` prop rendered in place of the `<Raw>` source view; only `DeveloperMode` (the Me page) passes it. Snagr and Trace docs are untouched.

**Tech Stack:** React 19 client components, Tailwind 4 classes, no new dependencies.

## Global Constraints

- No new npm dependencies, no canvas (spec: "No new dependencies, no canvas. Plain React state plus one interval.")
- No em dashes in any user-visible copy (user preference).
- This repo has no unit-test runner; verification is `npx tsc --noEmit`, `npm run lint`, and manual checks in `npm run dev` (Node 20).
- Per AGENTS.md, this Next.js version may differ from training data; this plan touches only client components and needs no Next-specific APIs.
- Scene art may be hand-tuned for charm, but every art line must stay within 44 columns and every scene within 12 rows.

---

### Task 1: `rawView` prop on MarkdownDoc

**Files:**
- Modify: `src/components/perspective/MarkdownDoc.tsx:180-220`

**Interfaces:**
- Consumes: nothing new.
- Produces: `MarkdownDoc` accepts optional `rawView?: React.ReactNode`. When set and the Raw tab is active, it renders `rawView` instead of `<Raw source={rawBody} />`. All existing behavior (`source`, `rawSource`, tab labels, title extraction) is unchanged.

- [ ] **Step 1: Add the prop**

In `MarkdownDoc.tsx`, change the component signature and the raw branch:

```tsx
export default function MarkdownDoc({
  source,
  rawSource,
  rawView,
}: {
  source: string;
  rawSource?: string; // an alternate story for the raw tab (e.g. the engineering cut)
  rawView?: React.ReactNode; // a custom raw tab body (e.g. the Me page journey)
  icon?: string; // accepted but unused — docs are emoji-free
}) {
```

and at the bottom of the JSX, replace

```tsx
      {raw ? <Raw source={rawBody} /> : <Formatted source={body} />}
```

with

```tsx
      {raw ? (rawView ?? <Raw source={rawBody} />) : <Formatted source={body} />}
```

- [ ] **Step 2: Verify types and lint**

Run: `npx tsc --noEmit && npm run lint`
Expected: both exit 0 with no new warnings.

- [ ] **Step 3: Commit**

```bash
git add src/components/perspective/MarkdownDoc.tsx
git commit -m "Allow MarkdownDoc raw tab to render a custom view"
```

---

### Task 2: JourneyRaw component, static scenes

**Files:**
- Create: `src/components/perspective/JourneyRaw.tsx`
- Modify: `src/components/perspective/DeveloperMode.tsx:43`

**Interfaces:**
- Consumes: `MarkdownDoc`'s `rawView` prop from Task 1.
- Produces: default export `JourneyRaw()`, a client component with no props. Task 3 modifies its internals only.

- [ ] **Step 1: Create the component with scene data and static rendering**

Create `src/components/perspective/JourneyRaw.tsx`:

```tsx
"use client";

import { useState } from "react";

// The Me page's Raw tab: a looping ASCII slideshow of the journey.
// Each scene is a hand-drawn frame on a fixed 44x12 character grid.

export const COLS = 44;
export const ROWS = 12;

type Scene = { caption: string; art: string[] };

const SCENES: Scene[] = [
  {
    caption: "2021 · Tel Aviv · Comet ML, the full-stack years",
    art: [
      "                              \\ | /",
      "                             -- o --",
      "                              / | \\",
      "",
      "        ____      ________      ____",
      "    ___|  o |____|  o  o  |____| o  |___",
      "   |  o|  o |  o |  o  o  |  o | o  |o  |",
      "   |  o|  o |  o |  o  o  |  o | o  |o  |",
      "   |___|____|____|________|____|____|___|",
      "    ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~",
    ],
  },
  {
    caption: "2024 · the move · TLV to NYC",
    art: [
      "",
      "                 __",
      "                / _\\_________",
      "               <  \u2708  _______/",
      "                \\__/ /",
      "                   \\/",
      "",
      "      TLV - - - - - - - - - - ->  NYC",
      "",
      "     ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~",
    ],
  },
  {
    caption: "2025 · New York · TIFIN, design engineer",
    art: [
      "            _",
      "           | |      _",
      "        _  | |  _  | |    _",
      "       | | | | | | | |   | |",
      "       | |_| |_| |_| |_  | |",
      "       | |o| |o| |o| |o|_| |",
      "       | |o| |o| |o| |o| o |",
      "    ___| |o| |o| |o| |o| o |___",
      "   ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~",
    ],
  },
  {
    caption: "Snagr · idea to App Store",
    art: [
      "            ________",
      "           | ______ |",
      "           ||      ||    \u25cf table for 4",
      "           ||  \u25cf   ||      just opened",
      "           ||______||",
      "           |        |",
      "           | snagr  |",
      "           |________|",
    ],
  },
  {
    caption: "Mazi · Chief Morale Officer",
    art: [
      "              __",
      "         (\\__/  \\",
      "          |  o o |",
      "          \\  __  /_______",
      "           |            \\",
      "           |  mazi       |",
      "           |  _|      |_ |",
      "",
      "              woof.",
    ],
  },
];

// Pad a scene to a full ROWS x COLS grid of single characters.
function toGrid(art: string[]): string[][] {
  const rows: string[][] = [];
  for (let r = 0; r < ROWS; r++) {
    const line = art[r] ?? "";
    const row: string[] = [];
    for (let c = 0; c < COLS; c++) row.push(line[c] ?? " ");
    rows.push(row);
  }
  return rows;
}

// Glyphs that get an accent color when settled.
const ACCENT: Record<string, string> = {
  "\u2708": "text-[#0d78c9] dark:text-[#5dd8ff]",
  "\u25cf": "text-emerald-500",
};

export default function JourneyRaw() {
  const [display] = useState(() => toGrid(SCENES[0].art));
  const [sceneIdx] = useState(0);

  return (
    <div className="font-mono text-[12px] leading-[1.7]">
      <pre className="text-neutral-700 dark:text-neutral-300">
        {display.map((row, r) => (
          <div key={r}>
            {row.map((ch, c) => {
              const cls = ACCENT[ch];
              return cls ? (
                <span key={c} className={cls}>
                  {ch}
                </span>
              ) : (
                ch
              );
            })}
          </div>
        ))}
      </pre>
      <div className="mt-3 flex items-center text-[11px] text-neutral-400">
        <span>{SCENES[sceneIdx].caption}</span>
        <span className="ml-auto flex gap-1">
          {SCENES.map((s, i) => (
            <span
              key={s.caption}
              className={`h-1 w-1 rounded-full ${
                i === sceneIdx ? "bg-neutral-500" : "bg-neutral-300 dark:bg-neutral-600"
              }`}
            />
          ))}
        </span>
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Wire it into the Me page**

In `DeveloperMode.tsx`, import and pass it:

```tsx
import MarkdownDoc from "./MarkdownDoc";
import JourneyRaw from "./JourneyRaw";
```

and change the render to

```tsx
          <MarkdownDoc source={RESUME} rawView={<JourneyRaw />} icon="🧑‍🎨" />
```

- [ ] **Step 3: Verify types, lint, and static render**

Run: `npx tsc --noEmit && npm run lint`
Expected: both exit 0.

Run `npm run dev`, open the Me page, click the doc's Raw tab.
Expected: the Tel Aviv scene renders as monospace art with the caption and five dots below; Preview still shows the formatted resume; the Snagr page's Design/Engineering tabs behave exactly as before.

- [ ] **Step 4: Commit**

```bash
git add src/components/perspective/JourneyRaw.tsx src/components/perspective/DeveloperMode.tsx
git commit -m "Add static ASCII journey scenes to the Me page Raw tab"
```

---

### Task 3: Scramble-wave animation loop

**Files:**
- Modify: `src/components/perspective/JourneyRaw.tsx`

**Interfaces:**
- Consumes: `SCENES`, `toGrid`, `ROWS`, `COLS` from Task 2 (same file).
- Produces: no interface change; `JourneyRaw` still takes no props.

- [ ] **Step 1: Add the animation**

In `JourneyRaw.tsx`, add timing constants beside `COLS`/`ROWS`:

```tsx
const HOLD_MS = 3500; // how long a scene rests before morphing
const TICK_MS = 50;
const STAGGER_MS = 12; // per diagonal step of the wave
const SCRAMBLE_MS = 260; // how long one cell churns before settling
const GLYPHS = "abcdefghijklmnopqrstuvwxyz0123456789#*+=-:.";
```

Replace the component body's state with an animated loop (imports become `useEffect, useRef, useState`):

```tsx
export default function JourneyRaw() {
  const [display, setDisplay] = useState(() => toGrid(SCENES[0].art));
  const [sceneIdx, setSceneIdx] = useState(0);
  const anim = useRef({ scene: 0, mode: "hold" as "hold" | "morph", t: 0 });

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let id: number | undefined;

    const tick = () => {
      const s = anim.current;
      s.t += TICK_MS;

      if (s.mode === "hold") {
        if (s.t < HOLD_MS) return;
        s.t = 0;
        if (reduced) {
          // No scramble: cut straight to the next scene.
          s.scene = (s.scene + 1) % SCENES.length;
          setSceneIdx(s.scene);
          setDisplay(toGrid(SCENES[s.scene].art));
          return;
        }
        s.mode = "morph";
        return;
      }

      // Morph: a wave sweeps diagonally; each cell scrambles briefly,
      // then settles on the next frame's character. Blank-to-blank
      // cells stay blank so the gaps never turn to static.
      const from = toGrid(SCENES[s.scene].art);
      const to = toGrid(SCENES[(s.scene + 1) % SCENES.length].art);
      let done = true;
      const next = from.map((row, r) =>
        row.map((ch, c) => {
          const delay = (c + r * 2) * STAGGER_MS;
          if (s.t < delay) {
            done = false;
            return ch;
          }
          if (s.t < delay + SCRAMBLE_MS) {
            if (ch === " " && to[r][c] === " ") return " ";
            done = false;
            return GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
          }
          return to[r][c];
        }),
      );
      setDisplay(next);
      if (done) {
        s.scene = (s.scene + 1) % SCENES.length;
        s.mode = "hold";
        s.t = 0;
        setSceneIdx(s.scene);
      }
    };

    const start = () => {
      if (id === undefined) id = window.setInterval(tick, TICK_MS);
    };
    const stop = () => {
      if (id !== undefined) {
        clearInterval(id);
        id = undefined;
      }
    };
    const onVisibility = () => (document.hidden ? stop() : start());

    document.addEventListener("visibilitychange", onVisibility);
    start();
    return () => {
      stop();
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, []);
```

The returned JSX from Task 2 stays exactly as it is.

- [ ] **Step 2: Verify types and lint**

Run: `npx tsc --noEmit && npm run lint`
Expected: both exit 0.

- [ ] **Step 3: Verify in the browser**

Run `npm run dev`, open the Me page, switch to Raw. Expected:
- Each scene holds about 3.5s, then ripples into the next; a full loop covers all five scenes and repeats.
- The plane and notification dot render in accent colors once settled.
- The caption and active dot update when a morph completes.
- Blank regions stay blank during morphs (no full-screen static).
- With the OS set to reduce motion (or DevTools emulation), scenes cut with no scramble.
- Backgrounding the tab and returning does not fast-forward or stack scenes.
- Dark mode: art is legible, accents visible.

- [ ] **Step 4: Verify production build**

Run: `npm run build`
Expected: exits 0.

- [ ] **Step 5: Commit**

```bash
git add src/components/perspective/JourneyRaw.tsx
git commit -m "Animate the Me page journey with a scramble-wave loop"
```

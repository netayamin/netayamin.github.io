"use client";

import { useEffect, useRef, useState } from "react";

// The Me page's Raw tab: a looping ASCII slideshow of the journey.
// Each scene is a hand-drawn frame on a fixed 44x12 character grid.

const COLS = 44;
const ROWS = 12;

const HOLD_MS = 3500; // how long a scene rests before morphing
const TICK_MS = 50;
const STAGGER_MS = 12; // per diagonal step of the wave
const SCRAMBLE_MS = 260; // how long one cell churns before settling
const GLYPHS = "abcdefghijklmnopqrstuvwxyz0123456789#*+=-:.";

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
      "               <  ✈  _______/",
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
      "           ||      ||    ● table for 4",
      "           ||  ●   ||      just opened",
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
  "✈": "text-[#0d78c9] dark:text-[#5dd8ff]",
  "●": "text-emerald-500",
};

// Pre-derived grids for each scene, computed once at module load rather
// than re-derived on every 50ms morph tick.
const GRIDS = SCENES.map((s) => toGrid(s.art));

export default function JourneyRaw() {
  const [display, setDisplay] = useState(() => GRIDS[0]);
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
          setDisplay(GRIDS[s.scene]);
          return;
        }
        s.mode = "morph";
        return;
      }

      // Morph: a wave sweeps diagonally; each cell scrambles briefly,
      // then settles on the next frame's character. Blank-to-blank
      // cells stay blank so the gaps never turn to static.
      const from = GRIDS[s.scene];
      const to = GRIDS[(s.scene + 1) % SCENES.length];
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

  return (
    <div className="font-mono text-[12px] leading-[1.7]">
      <pre aria-hidden="true" className="overflow-x-auto text-neutral-700 dark:text-neutral-300">
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
      <div className="mt-3 flex items-center text-[11px] text-neutral-500">
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

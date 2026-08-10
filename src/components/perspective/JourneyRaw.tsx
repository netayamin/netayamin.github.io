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

"use client";

import { useEffect, useMemo, useState } from "react";

// The Me page's Raw tab: the journey as one keyboard-drawn cartoon.
// Not the resume again — the same years told as day-to-day life. A
// timeline rail runs down the left, each stop gets a small ASCII
// vignette, and the whole thing types itself out once. When the typing
// ends, a tiny walker sets off down the rail and keeps going.

const ART: string[] = [
  "o  2019 - the remote years",
  "|",
  "|      .--------------.",
  "|      |  __  __  __  |    working from the",
  "|      | |__||__||__| |    kitchen table,",
  "|      |  __  __  __  |    one component",
  "|      | |__||__||__| |    at a time",
  "|      '--------------'",
  "|",
  "o  2021 - tel aviv",
  "|",
  "|          \\ | /",
  "|         - (_) -          standup at ten,",
  "|          / | \\           beach by six",
  "|     ~ ~ ~ ~ ~ ~ ~ ~",
  "|",
  "o  2024 - packing light",
  "|",
  "|            ____",
  "|        ___|____|___",
  "|       |  ________  |     one bag,",
  "|       | | tlv    | |     one one-way",
  "|       | |  > nyc | |     ticket",
  "|       |_|________|_|",
  "|",
  "o  2025 - new york",
  "|",
  "|               ___",
  "|              |   |  ___",
  "|          ___ | : | |   |     new city,",
  "|         |   || : | | : |     same laptop,",
  "|         | : || : | | : |     bigger",
  "|        _|_:_||_:_|_|_:_|_    buildings",
  "|",
  "o  nights + weekends",
  "|",
  "|        .---------.",
  "|        |  snagr  |",
  "|        | ------- |       started as a",
  "|        | table   |       dinner problem,",
  "|        | for two |       ended up on the",
  "|        | [ snag ]|       app store",
  "|        '---------'",
  "|",
  "o  always",
  "|",
  "|             __",
  "|        (\\__/  \\",
  "|         |  o o |",
  "|         \\  __  /______",
  "|          |           \\       every deploy",
  "|          | mazi       |      supervised",
  "|          |  _|     |_ |",
  "|",
  "v  ...still walking",
];

// Two-frame walk cycle, drawn in a 4-column lane left of the rail so it
// never collides with the art or the stop labels.
const LANE = "    ";
const WALKER: string[][] = [
  [" o  ", "/|\\ ", "/ \\ "],
  [" o  ", "/|\\ ", " |  "],
];
const WALK_MS = 240;

const TICK_MS = 16;
const CHARS_PER_TICK = 14; // visible (non-space) characters revealed per tick

// A timeline stop ("o  2019 - ...") or the trailing "v ..." line.
function isNodeLine(line: string): boolean {
  return /^[ov]\s\s/.test(line);
}

// Slice each line to the revealed budget. Spaces are free so the typing
// pace feels even regardless of indentation.
function sliceLines(revealed: number, done: boolean) {
  let budget = revealed;
  return ART.map((line) => {
    if (budget <= 0) return { text: "", cursor: false };
    let shown = 0;
    let end = 0;
    while (end < line.length && shown < budget) {
      if (line[end] !== " ") shown++;
      end++;
    }
    budget -= shown;
    return { text: line.slice(0, end), cursor: !done && budget <= 0 };
  });
}

export default function JourneyRaw() {
  // Cumulative count of non-space characters at the end of each line,
  // so a single "revealed" counter maps back to per-line slices.
  const cumulative = useMemo(() => {
    const out: number[] = [];
    let total = 0;
    for (const line of ART) {
      total += line.replace(/\s/g, "").length;
      out.push(total);
    }
    return out;
  }, []);
  const totalChars = cumulative[cumulative.length - 1];

  const [revealed, setRevealed] = useState(0);
  const [walker, setWalker] = useState(-1); // top line of the walker, -1 while typing

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const id = window.setInterval(() => {
      setRevealed((n) => {
        const next = reduced ? totalChars : n + CHARS_PER_TICK;
        if (next >= totalChars) clearInterval(id);
        return Math.min(next, totalChars);
      });
    }, TICK_MS);
    return () => clearInterval(id);
  }, [totalChars]);

  const done = revealed >= totalChars;

  // Once the story is typed, the walker sets off down the rail on a loop.
  useEffect(() => {
    if (!done) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = window.setInterval(() => {
      setWalker((p) => (p + 1) % (ART.length - 2));
    }, WALK_MS);
    return () => clearInterval(id);
  }, [done]);

  const lines = sliceLines(revealed, done);

  return (
    <div className="font-mono text-[12px] leading-[1.55]">
      <p className="sr-only">
        The journey as a day-to-day story: 2019, the remote years, building one
        component at a time from the kitchen table. 2021, Tel Aviv, standup at ten
        and beach by six. 2024, packing one bag and a one-way ticket to New York.
        2025, new city, same laptop, bigger buildings. Nights and weekends, Snagr
        went from a dinner problem to the App Store. And always, Mazi the dog
        supervising every deploy. Still walking.
      </p>
      <pre aria-hidden="true" className="overflow-x-auto">
        {ART.map((line, i) => {
          const cls = isNodeLine(line)
            ? "font-semibold text-accent"
            : "text-neutral-600 dark:text-neutral-300";
          const row = walker >= 0 ? i - walker : -1;
          if (done && row >= 0 && row <= 2) {
            const fig = WALKER[walker % WALKER.length][row];
            return (
              <div key={i} className={cls}>
                <span className="font-semibold text-accent">{fig}</span>
                {line}
              </div>
            );
          }
          return (
            <div key={i} className={cls}>
              {LANE}
              {lines[i].text}
              {lines[i].cursor && <span className="text-accent">█</span>}
              {lines[i].text === "" && !lines[i].cursor ? " " : ""}
            </div>
          );
        })}
      </pre>
    </div>
  );
}

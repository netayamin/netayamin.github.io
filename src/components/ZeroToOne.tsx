"use client";

import { useEffect, useRef, useState } from "react";

// The tagline is a tiny game of word-theft: the pixel builder rips the
// "im" off "impossible" (leaving "…is possible"), hauls it to the build
// site and welds it onto a waiting word — improve, impress, impact — then
// hauls it back, restores "impossible", and starts over with the next
// word. And so on, and so on.
const CAP = "#7c5cfc";
const SKIN = "#f2c9a1";
const DARK = "#3f2a1d";
const OVERALLS = "#2e3f6e";
const BOOTS = "#5d4023";

const TICK_MS = 70;
const STEP = 3;
const RUNNER_W = 18;
const GRAB_TICKS = 5;
const BUILT_TICKS = 30; // savor the newly built word
const RESTORED_TICKS = 16;

const PRE = "Going from 0 to 1 is ";
const WORDS = ["prove", "press", "pact"];

function Body() {
  return (
    <>
      <rect x="3" y="0" width="6" height="1" fill={CAP} />
      <rect x="2" y="1" width="9" height="1" fill={CAP} />
      <rect x="2" y="2" width="2" height="1" fill={DARK} />
      <rect x="4" y="2" width="6" height="1" fill={SKIN} />
      <rect x="2" y="3" width="1" height="1" fill={DARK} />
      <rect x="3" y="3" width="4" height="1" fill={SKIN} />
      <rect x="7" y="3" width="1" height="1" fill={DARK} />
      <rect x="8" y="3" width="2" height="1" fill={SKIN} />
      <rect x="3" y="4" width="7" height="1" fill={SKIN} />
      <rect x="3" y="5" width="6" height="1" fill={CAP} />
      <rect x="1" y="6" width="1" height="1" fill={SKIN} />
      <rect x="2" y="6" width="8" height="1" fill={CAP} />
      <rect x="10" y="6" width="1" height="1" fill={SKIN} />
      <rect x="2" y="7" width="8" height="1" fill={OVERALLS} />
      <rect x="3" y="8" width="6" height="1" fill={OVERALLS} />
    </>
  );
}

function PixelRunner({ frame }: { frame: 0 | 1 }) {
  return (
    <svg width="18" height="16.5" viewBox="0 0 12 11" shapeRendering="crispEdges" aria-hidden>
      <Body />
      {frame === 0 ? (
        <>
          <rect x="3" y="9" width="2" height="1" fill={OVERALLS} />
          <rect x="7" y="9" width="2" height="1" fill={OVERALLS} />
          <rect x="2" y="10" width="3" height="1" fill={BOOTS} />
          <rect x="7" y="10" width="3" height="1" fill={BOOTS} />
        </>
      ) : (
        <>
          <rect x="4" y="9" width="2" height="1" fill={OVERALLS} />
          <rect x="6" y="9" width="2" height="1" fill={OVERALLS} />
          <rect x="4" y="10" width="2" height="1" fill={BOOTS} />
          <rect x="6" y="10" width="3" height="1" fill={BOOTS} />
        </>
      )}
    </svg>
  );
}

type Phase =
  | "grab" // at the "im", prying it loose
  | "carryRight" // hauling im to the site
  | "build" // im installed at the site — savor it
  | "reclaim" // prying im back off the built word
  | "carryLeft" // hauling im home
  | "restored"; // impossible restored — breather, next word

export default function ZeroToOne() {
  const imRef = useRef<HTMLSpanElement>(null);
  const siteRef = useRef<HTMLSpanElement>(null);
  const [running, setRunning] = useState(false);
  const [phase, setPhase] = useState<Phase>("grab");
  const [x, setX] = useState(0);
  const [imTaken, setImTaken] = useState(false);
  const [built, setBuilt] = useState(false);
  const [wordIdx, setWordIdx] = useState(0);
  const [score, setScore] = useState(0);

  useEffect(() => {
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setImTaken(true);
      setBuilt(true); // static: "…is possible." + "improve"
      return;
    }
    setRunning(true);

    let px: number | null = null;
    let ph: Phase = "grab";
    let wait = GRAB_TICKS;

    const imX = () => (imRef.current ? imRef.current.offsetLeft - RUNNER_W + 6 : 0);
    const siteX = () => (siteRef.current ? siteRef.current.offsetLeft - RUNNER_W + 6 : 120);

    const id = setInterval(() => {
      if (px === null) px = imX();

      if (ph === "grab") {
        if (--wait <= 0) {
          setImTaken(true);
          ph = "carryRight";
        }
      } else if (ph === "carryRight") {
        px += STEP;
        if (px >= siteX()) {
          px = siteX();
          setBuilt(true);
          setScore((s) => s + 1);
          ph = "build";
          wait = BUILT_TICKS;
        }
      } else if (ph === "build") {
        if (--wait <= 0) {
          ph = "reclaim";
          wait = GRAB_TICKS;
        }
      } else if (ph === "reclaim") {
        if (--wait <= 0) {
          setBuilt(false);
          ph = "carryLeft";
        }
      } else if (ph === "carryLeft") {
        px -= STEP;
        if (px <= imX()) {
          px = imX();
          setImTaken(false);
          setWordIdx((i) => (i + 1) % WORDS.length);
          ph = "restored";
          wait = RESTORED_TICKS;
        }
      } else {
        if (--wait <= 0) {
          ph = "grab";
          wait = GRAB_TICKS;
        }
      }
      setX(px);
      setPhase(ph);
    }, TICK_MS);

    return () => clearInterval(id);
  }, []);

  const frame = (running ? Math.floor(x / 6) % 2 : 0) as 0 | 1;
  const carrying = phase === "carryRight" || phase === "carryLeft";
  const facingLeft = phase === "carryLeft";
  const word = WORDS[wordIdx];

  return (
    <span className="zto-scene" aria-hidden>
      {PRE}
      {!imTaken && (
        <span ref={imRef} className={phase === "restored" ? "zto-im zto-pop" : "zto-im"}>
          im
        </span>
      )}
      <span className={imTaken ? "zto-possible zto-possible-on" : "zto-possible"}>
        possible.
      </span>

      {/* the build site: a word missing its prefix, waiting in a slot */}
      <span className="zto-site" ref={siteRef}>
        <span className={built ? "zto-slotbox zto-slotbox-built" : "zto-slotbox"}>
          {built ? (
            <span className="zto-built zto-pop">im</span>
          ) : (
            <span className="zto-gap">▯</span>
          )}
          <span className={built ? "zto-built" : "zto-site-word"}>{word}</span>
        </span>
        {built && (
          <span key={score} className="zto-plus">
            +1
          </span>
        )}
      </span>
      {score > 0 && <span className="zto-coins">🪙×{score}</span>}

      {running && (
        <span
          className="zto-player"
          style={{ left: x, transform: facingLeft ? "scaleX(-1)" : undefined }}
        >
          {carrying && <span className="zto-loot">im</span>}
          <PixelRunner frame={frame} />
        </span>
      )}
    </span>
  );
}

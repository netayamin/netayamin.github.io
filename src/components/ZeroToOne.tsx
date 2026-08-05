"use client";

import { useEffect, useRef, useState } from "react";

// The header is one sentence-sized platformer level:
//   "Going from 0 to 1 is impossible. So I ▯prove · ▯press · ▯pact"
// The builder rips the "im" off "impossible" (…is possible ✨), welds it
// into the next empty slot — improve, impress, impact stay built — and
// the "im" respawns like a coin. Build all three and the level clears.
const CAP = "#7c5cfc";
const SKIN = "#f2c9a1";
const DARK = "#3f2a1d";
const OVERALLS = "#2e3f6e";
const BOOTS = "#5d4023";

const TICK_MS = 70;
const STEP = 3;
const RUNNER_W = 18;
const GRAB_TICKS = 5;
const INSTALL_TICKS = 12;
const CLEAR_TICKS = 26;
const RESPAWN_TICKS = 6;

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

type Phase = "grab" | "carry" | "install" | "clear" | "back" | "respawn";

export default function ZeroToOne() {
  const imRef = useRef<HTMLSpanElement>(null);
  const slotRefs = useRef<Array<HTMLSpanElement | null>>([]);
  const [running, setRunning] = useState(false);
  const [x, setX] = useState(0);
  const [phase, setPhase] = useState<Phase>("grab");
  const [imTaken, setImTaken] = useState(false);
  const [builtSlots, setBuiltSlots] = useState<boolean[]>([false, false, false]);
  const [coins, setCoins] = useState(0);
  const [showClear, setShowClear] = useState(false);

  useEffect(() => {
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setImTaken(true);
      setBuiltSlots([true, true, true]); // static, fully-built sentence
      return;
    }
    setRunning(true);

    let px: number | null = null;
    let ph: Phase = "grab";
    let wait = GRAB_TICKS;
    let target = 0;

    const imX = () => (imRef.current ? imRef.current.offsetLeft - RUNNER_W + 6 : 0);
    const slotX = (i: number) => {
      const el = slotRefs.current[i];
      return el ? el.offsetLeft - RUNNER_W + 8 : 300;
    };

    const id = setInterval(() => {
      if (px === null) px = imX();

      if (ph === "grab") {
        if (--wait <= 0) {
          setImTaken(true);
          ph = "carry";
        }
      } else if (ph === "carry") {
        px += STEP;
        if (px >= slotX(target)) {
          px = slotX(target);
          const idx = target;
          setBuiltSlots((b) => b.map((v, i) => (i === idx ? true : v)));
          setCoins((c) => c + 1);
          ph = "install";
          wait = INSTALL_TICKS;
        }
      } else if (ph === "install") {
        if (--wait <= 0) {
          if (target === WORDS.length - 1) {
            setShowClear(true);
            setCoins((c) => c + 2); // level bonus
            ph = "clear";
            wait = CLEAR_TICKS;
          } else {
            target += 1;
            ph = "back";
          }
        }
      } else if (ph === "clear") {
        if (--wait <= 0) {
          setShowClear(false);
          setBuiltSlots([false, false, false]);
          target = 0;
          ph = "back";
        }
      } else if (ph === "back") {
        px -= STEP;
        if (px <= imX()) {
          px = imX();
          setImTaken(false); // the "im" respawns
          ph = "respawn";
          wait = RESPAWN_TICKS;
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
  const carrying = phase === "carry";
  const facingLeft = phase === "back";

  return (
    <span className="zto-scene zto-ground" aria-hidden>
      Going from 0 to 1 is{" "}
      {!imTaken && (
        <span ref={imRef} className={phase === "respawn" ? "zto-im zto-pop" : "zto-im"}>
          im
        </span>
      )}
      <span className={imTaken ? "zto-possible zto-possible-on" : "zto-possible"}>
        possible.
      </span>
      <span className="zto-soi"> So I</span>
      {WORDS.map((word, i) => (
        <span
          key={word}
          ref={(el) => {
            slotRefs.current[i] = el;
          }}
          className={builtSlots[i] ? "zto-slotbox zto-slotbox-built" : "zto-slotbox"}
        >
          {builtSlots[i] ? (
            <>
              <span className="zto-built zto-pop">im</span>
              <span className="zto-built">{word}</span>
            </>
          ) : (
            <>
              <span className="zto-gap">▯</span>
              <span className="zto-site-word">{word}</span>
            </>
          )}
        </span>
      ))}
      {coins > 0 && <span className="zto-coins">🪙×{coins}</span>}

      {showClear && <span className="zto-clear">LEVEL CLEAR!</span>}

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

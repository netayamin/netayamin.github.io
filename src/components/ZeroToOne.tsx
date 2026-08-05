"use client";

import { useEffect, useRef, useState } from "react";

// The header game, one sentence long: "Everything is impossible." Pixel
// Mazi rips the im tile out of the word, carries it in her mouth across
// the level — leaping the hazards of shipping — and dumps it in the
// trash can at the far right. The im respawns (they always do), and she
// goes again. Score ticks up with every im disposed of.
const TICK_MS = 70;
const STEP = 3;
const RUNNER_W = 24;
const GRAB_TICKS = 7; // one jump's worth — she leaps up to grab the tile
const DUNK_TICKS = 9;
const RESPAWN_TICKS = 8;
const JUMP_ARC = [6, 11, 16, 17, 17, 16, 11, 6];
const LONG_JUMP_ARC = [6, 11, 15, 17, 18, 18, 18, 17, 15, 11, 6]; // wide hazards

const FUR = "#1c1c1e";
const FUR_DARK = "#0f0f10";
const BEARD = "#6b6b70";
const EYE = "#b5651d";
const TAG = "#e0b13e";

function PixelBug() {
  return (
    <svg width="20" height="12" viewBox="0 0 13 8" shapeRendering="crispEdges" aria-hidden>
      <rect x="1" y="6" width="2" height="2" fill="#3f2a1d" />
      <rect x="5" y="6" width="2" height="2" fill="#3f2a1d" />
      <rect x="8" y="6" width="2" height="2" fill="#3f2a1d" />
      <rect x="1" y="2" width="9" height="4" fill="#c0392b" />
      <rect x="2" y="1" width="7" height="1" fill="#c0392b" />
      <rect x="3" y="3" width="1" height="1" fill="#3f2a1d" />
      <rect x="6" y="4" width="1" height="1" fill="#3f2a1d" />
      <rect x="10" y="2" width="2" height="3" fill="#7b241c" />
      <rect x="11" y="0" width="1" height="2" fill="#7b241c" />
    </svg>
  );
}

function PixelMeeting() {
  return (
    <svg width="18" height="15" viewBox="0 0 12 10" shapeRendering="crispEdges" aria-hidden>
      <rect x="0" y="1" width="12" height="9" fill="#e8e8ee" />
      <rect x="0" y="1" width="12" height="3" fill="#e74c3c" />
      <rect x="2" y="0" width="1" height="2" fill="#6d6d76" />
      <rect x="9" y="0" width="1" height="2" fill="#6d6d76" />
      <rect x="2" y="5" width="2" height="1" fill="#9a9aa2" />
      <rect x="5" y="5" width="2" height="1" fill="#9a9aa2" />
      <rect x="8" y="5" width="2" height="1" fill="#9a9aa2" />
      <rect x="2" y="7" width="2" height="1" fill="#9a9aa2" />
      <rect x="5" y="7" width="2" height="1" fill="#9a9aa2" />
    </svg>
  );
}

function PixelStar() {
  return (
    <svg width="17" height="15" viewBox="0 0 11 10" shapeRendering="crispEdges" aria-hidden>
      <rect x="5" y="0" width="1" height="2" fill="#f1c40f" />
      <rect x="4" y="2" width="3" height="2" fill="#f1c40f" />
      <rect x="0" y="3" width="11" height="2" fill="#f1c40f" />
      <rect x="2" y="5" width="7" height="2" fill="#f1c40f" />
      <rect x="1" y="7" width="3" height="2" fill="#f1c40f" />
      <rect x="7" y="7" width="3" height="2" fill="#f1c40f" />
    </svg>
  );
}

function PixelBlob() {
  return (
    <svg width="33" height="12" viewBox="0 0 22 8" shapeRendering="crispEdges" aria-hidden>
      <rect x="0" y="4" width="22" height="4" fill="#27ae60" />
      <rect x="2" y="2" width="6" height="2" fill="#2ecc71" />
      <rect x="11" y="1" width="7" height="3" fill="#2ecc71" />
      <rect x="5" y="3" width="1" height="1" fill="#145a32" />
      <rect x="14" y="2" width="1" height="1" fill="#145a32" />
    </svg>
  );
}

// The hazards of shipping a product, in order of appearance.
const OBSTACLES: Array<{ f: number; w: number; label: string; anim: string; sprite: React.ReactNode }> = [
  { f: 0.42, w: 20, label: "P0 bug", anim: "ob-jitter", sprite: <PixelBug /> },
  { f: 0.56, w: 33, label: "scope creep", anim: "ob-creep", sprite: <PixelBlob /> },
  { f: 0.7, w: 18, label: "\u201cquick sync\u201d (45 min)", anim: "ob-bob", sprite: <PixelMeeting /> },
  { f: 0.84, w: 17, label: "1\u2605 \u201capp no work\u201d", anim: "ob-blink", sprite: <PixelStar /> },
];

// Pixel Mazi: black wire-haired pup, gold tag, two-frame gallop.
function PixelMazi({ frame }: { frame: 0 | 1 }) {
  return (
    <svg width="24" height="16.5" viewBox="0 0 16 11" shapeRendering="crispEdges" aria-hidden>
      {/* tail */}
      <rect x="0" y="2" width="1" height="1" fill={FUR} />
      <rect x="1" y="3" width="1" height="2" fill={FUR} />
      {/* body */}
      <rect x="2" y="3" width="9" height="4" fill={FUR} />
      <rect x="3" y="7" width="7" height="1" fill={FUR} />
      {/* head + floppy ear */}
      <rect x="10" y="1" width="4" height="4" fill={FUR} />
      <rect x="10" y="1" width="2" height="3" fill={FUR_DARK} />
      {/* scruffy snout + beard */}
      <rect x="13" y="3" width="3" height="2" fill={BEARD} />
      <rect x="13" y="5" width="2" height="1" fill={BEARD} />
      <rect x="15" y="3" width="1" height="1" fill={FUR_DARK} />
      {/* eye */}
      <rect x="12" y="2" width="1" height="1" fill={EYE} />
      {/* gold tag */}
      <rect x="10" y="5" width="1" height="1" fill={TAG} />
      {/* legs: gallop frames */}
      {frame === 0 ? (
        <>
          <rect x="3" y="8" width="2" height="3" fill={FUR} />
          <rect x="9" y="8" width="2" height="3" fill={FUR} />
        </>
      ) : (
        <>
          <rect x="5" y="8" width="2" height="3" fill={FUR} />
          <rect x="7" y="8" width="2" height="3" fill={FUR} />
        </>
      )}
    </svg>
  );
}

function TrashCan({ open }: { open: boolean }) {
  return (
    <svg width="22" height="26" viewBox="0 0 11 13" shapeRendering="crispEdges" aria-hidden>
      <g className={open ? "zto-lid zto-lid-open" : "zto-lid"}>
        <rect x="0" y="2" width="11" height="1.5" fill="#6d6d76" />
        <rect x="4" y="0.5" width="3" height="1.5" fill="#6d6d76" />
      </g>
      <rect x="1" y="4" width="9" height="9" fill="#8a8a92" />
      <rect x="3" y="5.5" width="1" height="6" fill="#6d6d76" />
      <rect x="5" y="5.5" width="1" height="6" fill="#6d6d76" />
      <rect x="7" y="5.5" width="1" height="6" fill="#6d6d76" />
    </svg>
  );
}

type Phase = "grab" | "carry" | "dunk" | "back" | "respawn";

export default function ZeroToOne() {
  const sceneRef = useRef<HTMLDivElement>(null);
  const sentenceRef = useRef<HTMLSpanElement>(null);
  const imRef = useRef<HTMLSpanElement>(null);
  const [running, setRunning] = useState(false);
  const [x, setX] = useState(0);
  const [jumpY, setJumpY] = useState(0);
  const [phase, setPhase] = useState<Phase>("grab");
  const [imTaken, setImTaken] = useState(false);
  const [dunking, setDunking] = useState(false);
  const [coins, setCoins] = useState(0);

  useEffect(() => {
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    setRunning(true);

    let px: number | null = null;
    let ph: Phase = "grab";
    let wait = GRAB_TICKS;
    let jumpT = -1;
    let arc: number[] = JUMP_ARC;

    const sceneW = () => sceneRef.current?.offsetWidth ?? 900;
    const imX = () => {
      const s = sentenceRef.current;
      const im = imRef.current;
      return s && im ? s.offsetLeft + im.offsetLeft - RUNNER_W + 6 : 60;
    };
    const trashX = () => sceneW() - 52;
    const obstacleXs = () => OBSTACLES.map((ob) => ({ x: ob.f * sceneW(), w: ob.w }));

    const progressJump = () => {
      if (jumpT >= 0) {
        jumpT += 1;
        if (jumpT >= arc.length) jumpT = -1;
      }
    };

    const move = (dir: 1 | -1) => {
      px! += STEP * dir;
      if (jumpT >= 0) {
        progressJump();
      } else {
        for (const ob of obstacleXs()) {
          const gap = dir > 0 ? ob.x - (px! + RUNNER_W) : px! - (ob.x + ob.w);
          if (gap >= 0 && gap <= 3) {
            arc = ob.w > 24 ? LONG_JUMP_ARC : JUMP_ARC;
            jumpT = 0;
            break;
          }
        }
      }
    };

    const id = setInterval(() => {
      if (px === null) px = imX();

      if (ph === "grab") {
        if (wait === GRAB_TICKS) { arc = JUMP_ARC; jumpT = 0; } // leap for the tile
        progressJump();
        if (wait === GRAB_TICKS - 3) setImTaken(true); // snatched at the apex
        if (--wait <= 0) {
          jumpT = -1;
          ph = "carry";
        }
      } else if (ph === "carry") {
        move(1);
        if (px >= trashX()) {
          px = trashX();
          jumpT = -1;
          setDunking(true);
          setCoins((c) => c + 1);
          ph = "dunk";
          wait = DUNK_TICKS;
        }
      } else if (ph === "dunk") {
        if (--wait <= 0) {
          setDunking(false);
          setImTaken(false); // a new im pops in across the level — go get it
          ph = "back";
        }
      } else if (ph === "back") {
        move(-1);
        if (px <= imX()) {
          px = imX();
          jumpT = -1;
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
      setJumpY(jumpT >= 0 && jumpT < arc.length ? arc[jumpT] : 0);
      setPhase(ph);
    }, TICK_MS);

    return () => clearInterval(id);
  }, []);

  const frame = (running ? Math.floor(x / 6) % 2 : 0) as 0 | 1;
  const carrying = phase === "carry" && imTaken;
  const facingLeft = phase === "back";

  return (
    <div
      ref={sceneRef}
      role="img"
      aria-label="Everything is possible. (A tiny pixel builder keeps hauling the 'im' from 'impossible' to the trash.)"
      className="absolute inset-0"
    >
      <div aria-hidden className="absolute inset-0">
        {/* the sentence, floating mid-left — he jumps to grab the tile */}
        <span
          ref={sentenceRef}
          className="absolute left-5 top-1/2 -translate-y-1/2 whitespace-nowrap text-[13px] font-medium text-muted"
        >
          Everything is{" "}
          <span ref={imRef}>
            {imTaken ? (
              <span className="zto-hole">▯</span>
            ) : (
              <span className={phase === "back" ? "zto-im-tile zto-pop" : "zto-im-tile"}>
                im
              </span>
            )}
          </span>
          <span className={imTaken ? "zto-possible zto-possible-on" : "zto-possible"}>
            possible.
          </span>
        </span>

        {/* obstacles — the hazards of shipping */}
        {OBSTACLES.map((ob) => (
          <span key={ob.label} className="absolute bottom-[5px]" style={{ left: `${ob.f * 100}%` }}>
            <span className="absolute -top-[15px] left-1/2 -translate-x-1/2 whitespace-nowrap text-[8px] font-medium text-muted/80">
              {ob.label}
            </span>
            <span className={`block ${ob.anim}`}>{ob.sprite}</span>
          </span>
        ))}

        {/* the trash can */}
        <span className="absolute bottom-[5px] right-[30px]">
          <TrashCan open={dunking} />
          {dunking && <span className="zto-im-tile zto-toss">im</span>}
        </span>

        {/* HUD */}
        {coins > 0 && (
          <span className="absolute right-4 top-1.5 text-[10px] font-semibold text-muted">
            🗑️×{coins}
          </span>
        )}

        {/* runner */}
        {running && (
          <span
            className="zto-player"
            style={{
              left: x,
              bottom: 5 + jumpY,
              transform: facingLeft ? "scaleX(-1)" : undefined,
            }}
          >
            {carrying && <span className="zto-loot">im</span>}
            <PixelMazi frame={frame} />
          </span>
        )}
      </div>
    </div>
  );
}

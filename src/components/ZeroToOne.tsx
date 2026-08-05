"use client";

import { useEffect, useRef, useState } from "react";

// The header game, one sentence long: "Everything is impossible." The
// builder rips the im tile out of the word, carries it across the level
// — hopping the rocks in his way — and dumps it in the trash can at the
// far right. The im respawns (they always do), and he does it again.
// Score ticks up with every im disposed of.
const CAP = "#7c5cfc";
const SKIN = "#f2c9a1";
const DARK = "#3f2a1d";
const OVERALLS = "#2e3f6e";
const BOOTS = "#5d4023";

const TICK_MS = 70;
const STEP = 3;
const RUNNER_W = 18;
const GRAB_TICKS = 7; // one jump's worth — he leaps up to grab the tile
const DUNK_TICKS = 9;
const RESPAWN_TICKS = 8;
const JUMP_ARC = [5, 9, 13, 13, 9, 5];
const OB_W = 13;

function PixelBug() {
  return (
    <svg width="13" height="8" viewBox="0 0 13 8" shapeRendering="crispEdges" aria-hidden>
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
    <svg width="12" height="10" viewBox="0 0 12 10" shapeRendering="crispEdges" aria-hidden>
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
    <svg width="11" height="10" viewBox="0 0 11 10" shapeRendering="crispEdges" aria-hidden>
      <rect x="5" y="0" width="1" height="2" fill="#f1c40f" />
      <rect x="4" y="2" width="3" height="2" fill="#f1c40f" />
      <rect x="0" y="3" width="11" height="2" fill="#f1c40f" />
      <rect x="2" y="5" width="7" height="2" fill="#f1c40f" />
      <rect x="1" y="7" width="3" height="2" fill="#f1c40f" />
      <rect x="7" y="7" width="3" height="2" fill="#f1c40f" />
    </svg>
  );
}

// The hazards of shipping a product, in order of appearance.
const OBSTACLES: Array<{ f: number; label: string; sprite: React.ReactNode }> = [
  { f: 0.5, label: "bug", sprite: <PixelBug /> },
  { f: 0.66, label: "standup", sprite: <PixelMeeting /> },
  { f: 0.82, label: "1★ review", sprite: <PixelStar /> },
];

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

    const sceneW = () => sceneRef.current?.offsetWidth ?? 900;
    const imX = () => {
      const s = sentenceRef.current;
      const im = imRef.current;
      return s && im ? s.offsetLeft + im.offsetLeft - RUNNER_W + 6 : 60;
    };
    const trashX = () => sceneW() - 52;
    const obstacleXs = () => OBSTACLES.map((ob) => ob.f * sceneW());

    const progressJump = () => {
      if (jumpT >= 0) {
        jumpT += 1;
        if (jumpT >= JUMP_ARC.length) jumpT = -1;
      }
    };

    const move = (dir: 1 | -1) => {
      px! += STEP * dir;
      if (jumpT >= 0) {
        progressJump();
      } else {
        for (const obX of obstacleXs()) {
          const gap = dir > 0 ? obX - (px! + RUNNER_W) : px! - (obX + OB_W);
          if (gap >= 0 && gap <= 6) {
            jumpT = 0;
            break;
          }
        }
      }
    };

    const id = setInterval(() => {
      if (px === null) px = imX();

      if (ph === "grab") {
        if (wait === GRAB_TICKS) jumpT = 0; // leap for the tile
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
      setJumpY(jumpT >= 0 && jumpT < JUMP_ARC.length ? JUMP_ARC[jumpT] : 0);
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
            <span className="absolute -top-[13px] left-1/2 -translate-x-1/2 whitespace-nowrap text-[8px] font-medium text-muted/80">
              {ob.label}
            </span>
            {ob.sprite}
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
            <PixelRunner frame={frame} />
          </span>
        )}
      </div>
    </div>
  );
}

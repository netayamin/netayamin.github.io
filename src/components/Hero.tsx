"use client";

import MazalSlot from "./MazalSlot";
import { useMazalContext } from "@/context/MazalContext";

export default function Hero() {
  const { setIsBarking } = useMazalContext();

  return (
    <section
      id="intro"
      className="relative flex flex-1 flex-col justify-center gap-16 px-6 py-16 md:flex-row md:items-center md:justify-between md:gap-12 md:px-10"
    >
      <div className="max-w-xl">
        <h1 className="text-5xl font-semibold tracking-tight text-neutral-900 md:text-6xl">
          Neta Yamin
        </h1>

        <p
          className="mt-6 max-w-md text-lg leading-relaxed font-normal tracking-tight text-neutral-500"
          style={{
            fontFamily:
              "-apple-system, BlinkMacSystemFont, 'SF Pro Display', 'SF Pro Text', 'Helvetica Neue', Arial, sans-serif",
          }}
        >
          Design-minded engineer based in New York City, specializing in product design through
          systems thinking and technical execution.
        </p>

        <a
          href="#work"
          className="mt-8 inline-flex items-center gap-2 rounded-full bg-neutral-900 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-neutral-700"
        >
          View my work
          <span aria-hidden>→</span>
        </a>
      </div>

      <div className="relative shrink-0">
        <MazalSlot
          id="hero"
          pose="sit"
          message="I'm Mazal, Neta's beloved dog and Chief Happiness Officer. I don't design, but I do bark at bad hover states."
          className="h-[300px] w-[340px] shrink-0 md:h-[380px] md:w-[420px]"
        />

        <div className="absolute top-6 -right-24 z-30 hidden md:block">
          <p
            className="-rotate-2 text-lg text-neutral-500"
            style={{ fontFamily: "'Segoe Script', 'Bradley Hand', cursive" }}
          >
            hover me!
          </p>

          <svg aria-hidden viewBox="0 0 60 50" className="ml-6 h-10 w-12 text-neutral-400">
            <path
              d="M6 4 C 4 20, 14 34, 34 40"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeDasharray="1 7"
            />
            <path
              d="M22 38 L 34 40 L 28 28"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>

          <button
            type="button"
            onMouseEnter={() => setIsBarking(true)}
            onMouseLeave={() => setIsBarking(false)}
            className="group mt-1 rounded-full border border-neutral-200 bg-white px-3 py-1.5 text-xs font-medium text-neutral-700 shadow-sm transition
              hover:cursor-wait hover:rounded-none hover:border-4 hover:border-double hover:border-black
              hover:font-black
              hover:shadow-[3px_3px_0_0_#000,-3px_-3px_0_0_#000] hover:transition-none
              hover:[animation:bad-hover-jitter_0.12s_linear_infinite,bad-hover-bg_0.4s_linear_infinite]"
            style={{ fontFamily: "inherit" }}
            onMouseOver={(e) => {
              e.currentTarget.style.fontFamily = "'Comic Sans MS', cursive";
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.fontFamily = "inherit";
            }}
          >
            <span className="group-hover:animate-[bad-hover-blink_0.2s_steps(1)_infinite]">
              bad hover 🚨
            </span>
          </button>
        </div>
      </div>
    </section>
  );
}

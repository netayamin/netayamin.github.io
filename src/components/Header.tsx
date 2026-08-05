import ZeroToOne from "./ZeroToOne";

const TREE_GREENS = ["#3e8e41", "#57ab4a"];

function PixelTree({ size = 28 }: { size?: number }) {
  return (
    <svg
      width={size * (12 / 14)}
      height={size}
      viewBox="0 0 12 14"
      shapeRendering="crispEdges"
      aria-hidden
    >
      <rect x="5" y="10" width="2" height="4" fill="#7a5230" />
      <rect x="2" y="8" width="8" height="2" fill={TREE_GREENS[0]} />
      <rect x="3" y="6" width="6" height="2" fill={TREE_GREENS[1]} />
      <rect x="4" y="4" width="4" height="2" fill={TREE_GREENS[0]} />
      <rect x="5" y="2" width="2" height="2" fill={TREE_GREENS[1]} />
    </svg>
  );
}

function PixelCloud({ className = "" }: { className?: string }) {
  return (
    <svg
      width="34"
      height="12"
      viewBox="0 0 17 6"
      shapeRendering="crispEdges"
      aria-hidden
      className={className}
    >
      <rect x="2" y="2" width="13" height="3" fill="currentColor" />
      <rect x="0" y="4" width="17" height="2" fill="currentColor" />
      <rect x="5" y="0" width="5" height="2" fill="currentColor" />
    </svg>
  );
}

// The nav bar is a tiny platformer level: sky, clouds, sun, trees, and a
// grass floor. The game itself (sentence → rocks → trash can) lives in
// ZeroToOne, layered on top.
function Backdrop() {
  return (
    <div className="pointer-events-none absolute inset-0 z-0" aria-hidden>
      <span className="absolute right-24 top-1.5 h-3.5 w-3.5 rounded-[3px] bg-[#ffd23f] shadow-[0_0_10px_rgba(255,210,63,0.55)]" />
      <PixelCloud className="cloud-drift absolute left-[46%] top-1.5 text-[#e4e4ec] dark:text-white/10" />
      <PixelCloud className="cloud-drift-slow absolute left-[68%] top-5 scale-75 text-[#ececf2] dark:text-white/[0.07]" />
      <span className="absolute bottom-[5px] right-[10%]">
        <PixelTree size={30} />
      </span>
      <span className="absolute bottom-[5px] left-[58%] opacity-80">
        <PixelTree size={18} />
      </span>
      <span className="absolute bottom-[5px] left-[74%] opacity-90">
        <PixelTree size={23} />
      </span>
      {/* bush */}
      <svg
        className="absolute bottom-[5px] left-[40%]"
        width="22"
        height="8"
        viewBox="0 0 11 4"
        shapeRendering="crispEdges"
      >
        <rect x="1" y="2" width="9" height="2" fill="#57ab4a" />
        <rect x="3" y="0" width="5" height="2" fill="#6dc25e" />
      </svg>
      {/* grass strip */}
      <svg className="absolute inset-x-0 bottom-0 h-[6px] w-full" preserveAspectRatio="none">
        <defs>
          <pattern id="grass" width="12" height="6" patternUnits="userSpaceOnUse">
            <rect x="0" y="4" width="12" height="2" fill="#57ab4a" />
            <rect x="2" y="1" width="2" height="3" fill="#57ab4a" />
            <rect x="7" y="2" width="2" height="2" fill="#6dc25e" />
          </pattern>
        </defs>
        <rect width="100%" height="6" fill="url(#grass)" />
      </svg>
    </div>
  );
}

export default function Header() {
  return (
    <header className="relative h-14 shrink-0 overflow-hidden border-b border-line">
      <Backdrop />
      <ZeroToOne />
    </header>
  );
}

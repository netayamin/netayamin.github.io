import AnchoredFrame from "./AnchoredFrame";
import { SNAGR_SCREENS } from "./snagr-screens";
import Draggable from "./Draggable";
import FigmaCanvas from "./FigmaCanvas";
import ZoomFrame from "./ZoomFrame";

const FIGMA_BLUE = "#0d99ff";

function FrameLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="mb-1.5 text-[11px] font-medium" style={{ color: FIGMA_BLUE }}>
      {children}
    </p>
  );
}

const PLANS = [
  { title: "Date night", meta: "Sat, May 24 · 2 people", people: 2 },
  { title: "Girls dinner", meta: "Fri, May 30 · 4 people", people: 3 },
  { title: "Birthday dinner", meta: "Sat, Jun 7 · 6 people", people: 3 },
];

function Phone() {
  return (
    <div className="w-[210px] rounded-[2rem] border-[5px] border-neutral-900 bg-white shadow-xl">
      <div className="flex flex-col overflow-hidden rounded-[1.7rem] px-3.5 pb-3 pt-2 text-neutral-900">
        <div className="flex items-center justify-between text-[9px] font-semibold">
          <span>9:41</span>
          <span className="h-3.5 w-14 rounded-full bg-neutral-900" />
          <span>●●●</span>
        </div>
        <p className="mt-2 text-[14px] font-bold">My Plans</p>
        <div className="mt-2 flex flex-col gap-1.5">
          {PLANS.map((plan) => (
            <div key={plan.title} className="rounded-xl bg-neutral-100 px-2.5 py-2">
              <p className="text-[10.5px] font-semibold">{plan.title}</p>
              <p className="text-[8.5px] text-neutral-500">{plan.meta}</p>
              <div className="mt-1 flex -space-x-1.5">
                {Array.from({ length: plan.people }).map((_, i) => (
                  <span key={i} className="h-3.5 w-3.5 rounded-full border border-white bg-gradient-to-br from-neutral-300 to-neutral-400" />
                ))}
              </div>
            </div>
          ))}
        </div>
        <p className="mt-2.5 text-[10.5px] font-bold">Explore Collections</p>
        <div className="relative mt-1.5 h-14 overflow-hidden rounded-xl bg-gradient-to-br from-neutral-800 to-neutral-950 p-2">
          <p className="text-[10.5px] font-bold text-white">Infatuation</p>
          <p className="text-[8.5px] text-neutral-300">Top 50 in NYC</p>
        </div>
        <div className="mt-2 flex items-center justify-around border-t border-neutral-100 pt-1.5 text-[7.5px] text-neutral-400">
          <span>Updates</span>
          <span className="font-semibold text-neutral-900">Plans</span>
          <span>Collections</span>
        </div>
      </div>
    </div>
  );
}

// Snagr, designer lens: visuals only — the app itself. The research and
// product thinking live in SnagrStory.md on the Xcode side.
export default function SnagrDesigner() {
  return (
    <FigmaCanvas className="min-h-full bg-[#f0f0f3] pb-16 dark:bg-[#2c2c2e]">
      <div className="relative min-h-full">
          {/* Brand */}
          <AnchoredFrame anchor="who-what-when-where-why-how" offset={0}><Draggable><ZoomFrame label="Brand" scale={1.6}>
            <FrameLabel>Brand</FrameLabel>
            <div className="flex items-center gap-4 rounded-2xl bg-white p-4 shadow-sm dark:bg-[#1f1f22]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={`${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}/snagr/icon.png`}
                alt="Snagr app icon"
                className="h-14 w-14 rounded-2xl shadow-sm"
              />
              <div>
                <p className="text-xl font-bold text-neutral-900 dark:text-white">Snagr</p>
                <a
                  href="https://apps.apple.com/us/app/snagr-live-dining-watchlists/id6783079978"
                  target="_blank"
                  rel="noreferrer"
                  className="mt-1 inline-block rounded-full bg-neutral-900 px-3 py-1 text-[10px] font-medium text-white hover:opacity-85 dark:bg-white dark:text-neutral-900"
                >
                  Live on the App Store ↗
                </a>
              </div>
            </div>
          </ZoomFrame></Draggable></AnchoredFrame>

          {/* App screen */}
          <AnchoredFrame anchor="breaking-the-one-reservation-model" offset={10}><Draggable><ZoomFrame label="My Plans · iPhone 16" scale={1.25}>
            <FrameLabel>My Plans · iPhone 16</FrameLabel>
            <div className="flex justify-center rounded-2xl bg-gradient-to-br from-[#efeaff] to-[#e3dbfd] py-6 dark:from-[#221d38] dark:to-[#1b1730]">
              <Phone />
            </div>
          </ZoomFrame></Draggable></AnchoredFrame>

          {/* Drop alert */}
          <AnchoredFrame anchor="the-journey-with-snagr" offset={10}><Draggable><ZoomFrame label="Drop alert" scale={1.7}>
            <FrameLabel>Drop alert</FrameLabel>
            <div className="rounded-2xl bg-white p-3.5 shadow-sm dark:bg-[#1f1f22]">
              <p className="text-[10px] font-semibold text-accent">SNAGR · now</p>
              <p className="mt-0.5 text-[13px] font-semibold text-neutral-900 dark:text-white">
                Table for 4 just opened
              </p>
              <p className="text-[11px] text-neutral-500 dark:text-neutral-400">
                Don Angie · Sat 8:00 PM
              </p>
            </div>
          </ZoomFrame></Draggable></AnchoredFrame>

          {/* Watchlist */}
          <AnchoredFrame anchor="the-journey-before-snagr" offset={10}><Draggable><ZoomFrame label="Watchlist" scale={1.6}>
            <FrameLabel>Watchlist</FrameLabel>
            <div className="flex flex-col gap-1.5 rounded-2xl bg-white p-3.5 shadow-sm dark:bg-[#1f1f22]">
              {["Via Carota", "Don Angie", "4 Charles Prime Rib"].map((r) => (
                <div key={r} className="flex items-center justify-between rounded-lg bg-neutral-100 px-3 py-2 dark:bg-white/10">
                  <span className="text-[12px] font-medium text-neutral-800 dark:text-neutral-200">{r}</span>
                  <span className="h-2 w-2 rounded-full bg-accent" />
                </div>
              ))}
            </div>
          </ZoomFrame></Draggable></AnchoredFrame>

          {/* Plan card */}
          <AnchoredFrame anchor="personas" offset={10}><Draggable><ZoomFrame label="Group plan" scale={1.7}>
            <FrameLabel>Group plan</FrameLabel>
            <div className="flex items-center justify-between rounded-2xl bg-white p-3.5 shadow-sm dark:bg-[#1f1f22]">
              <div className="flex -space-x-2">
                {[0, 1, 2, 3].map((i) => (
                  <span key={i} className="h-7 w-7 rounded-full border-2 border-white bg-gradient-to-br from-neutral-300 to-neutral-400 dark:border-neutral-800" />
                ))}
              </div>
              <span className="rounded-full bg-accent-soft px-2.5 py-1 text-[11px] font-medium text-accent">
                Sat, May 24 · everyone&rsquo;s in
              </span>
            </div>
          </ZoomFrame></Draggable></AnchoredFrame>

          {/* Real app screens, straight from the simulator */}
          {SNAGR_SCREENS.map((screen) => (
            <AnchoredFrame key={screen.file} anchor={screen.anchor} offset={screen.offset ?? 20}>
              <Draggable><ZoomFrame label={screen.title} scale={1.4}>
                <FrameLabel>{screen.title}</FrameLabel>
                <div className="w-[230px] overflow-hidden rounded-[2rem] border-[5px] border-neutral-900 bg-neutral-900 shadow-xl">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={`${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}/snagr/screens/${screen.file}`}
                    alt={screen.title}
                    className="w-full rounded-[1.7rem]"
                  />
                </div>
                {screen.caption && (
                  <p className="mt-1.5 max-w-[230px] text-[10px] leading-snug text-neutral-500 dark:text-neutral-400">
                    {screen.caption}
                  </p>
                )}
              </ZoomFrame></Draggable>
            </AnchoredFrame>
          ))}
      </div>
    </FigmaCanvas>
  );
}

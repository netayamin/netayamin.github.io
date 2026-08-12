"use client";

import DesignerMode from "./DesignerMode";
import DeveloperMode from "./DeveloperMode";
import SnagrBoard from "./SnagrBoard";
import SnagrDeveloper from "./SnagrDeveloper";
import TraceBoard from "./TraceBoard";
import TraceDeveloper from "./TraceDeveloper";
import HeadsOffBoard from "./HeadsOffBoard";
import HeadsOffDeveloper from "./HeadsOffDeveloper";
import RedditBoard from "./RedditBoard";
import RedditDeveloper from "./RedditDeveloper";
import { usePage } from "@/context/PageContext";

// The stage. Me: a static half/half split, text lens left, Figma canvas
// right, both layers full-bleed with the canvas clipped to the right
// half. Snagr: the case study scrolls on the left while a sticky board
// on the right flies its camera between frames per section.
export default function PerspectivePanel() {
  const { page } = usePage();

  if (page === "tracespans") {
    return (
      <div className="relative h-full min-w-0 flex-1 overflow-hidden">
        <div data-stage-scroll className="absolute inset-0 overflow-x-hidden overflow-y-auto">
          <div className="grid min-h-full grid-cols-2">
            <TraceDeveloper />
            <div className="relative">
              <div className="sticky top-0 h-[calc(100dvh-5rem)]">
                <TraceBoard />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (page === "redditmanager") {
    return (
      <div className="relative h-full min-w-0 flex-1 overflow-hidden">
        <div data-stage-scroll className="absolute inset-0 overflow-x-hidden overflow-y-auto">
          <div className="grid min-h-full grid-cols-2">
            <RedditDeveloper />
            <div className="relative">
              <div className="sticky top-0 h-[calc(100dvh-5rem)]">
                <RedditBoard />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (page === "headsoff") {
    return (
      <div className="relative h-full min-w-0 flex-1 overflow-hidden">
        <div data-stage-scroll className="absolute inset-0 overflow-x-hidden overflow-y-auto">
          <div className="grid min-h-full grid-cols-2">
            <HeadsOffDeveloper />
            <div className="relative">
              <div className="sticky top-0 h-[calc(100dvh-5rem)]">
                <HeadsOffBoard />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (page === "snagr") {
    return (
      <div className="relative h-full min-w-0 flex-1 overflow-hidden">
        <div data-stage-scroll className="absolute inset-0 overflow-x-hidden overflow-y-auto">
          <div className="grid min-h-full grid-cols-2">
            <SnagrDeveloper />
            <div className="relative">
              <div className="sticky top-0 h-[calc(100dvh-5rem)]">
                <SnagrBoard />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative h-full min-w-0 flex-1 overflow-hidden">
      <div data-stage-scroll className="absolute inset-0 overflow-x-hidden overflow-y-auto">
        <div className="relative min-h-full">
          <DeveloperMode />
          <div className="absolute inset-0" style={{ clipPath: "inset(0 0 0 50%)" }}>
            <DesignerMode />
          </div>
        </div>
      </div>
    </div>
  );
}

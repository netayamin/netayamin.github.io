"use client";

import { useEffect, useRef } from "react";
import {
  useRive,
  useViewModelInstanceTrigger,
  useViewModelInstanceEnum,
} from "@rive-app/react-canvas";
import type { MazalPose } from "@/types/mazal";
import { useMazalContext } from "@/context/MazalContext";

const STATE_MACHINE = "idle";
const BLINK_MIN_INTERVAL_MS = 2500;
const BLINK_MAX_INTERVAL_MS = 6000;
const BARK_REPEAT_INTERVAL_MS = 1200;

// Single-pose companion: Mazal sits and reacts (tail-wag/bark trigger on
// click) rather than posing per-section. `pose` is accepted for
// compatibility with the scroll-slot system but currently unused since
// this rig only has one base pose. Eye tracking is disabled for now — the
// rig's mouseX/mouseY binding wasn't behaving reliably (wrong direction,
// and the eye would visually break at larger offsets).
export default function MazalRive({ pose: _pose }: { pose: MazalPose }) {
  const { rive, RiveComponent } = useRive({
    src: `${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}/rive/mazi-test.riv`,
    stateMachines: STATE_MACHINE,
    autoplay: true,
    autoBind: true,
  });

  const viewModelInstance = rive?.viewModelInstance ?? null;

  const tailTrigger = useViewModelInstanceTrigger("tailTrigger", viewModelInstance);
  const blinkTrigger = useViewModelInstanceTrigger("blinkTrigger", viewModelInstance);
  const barkTrigger = useViewModelInstanceTrigger("bark", viewModelInstance);
  // Not in the current .riv yet — the mini-game outfit buttons in
  // AboutMeSection set this via context, ready to drive an "outfit" Enum
  // property the moment it's added in Rive. No-ops safely until then.
  const outfitEnum = useViewModelInstanceEnum("outfit", viewModelInstance);
  const { outfit, isBarking } = useMazalContext();

  const blinkTriggerRef = useRef(blinkTrigger.trigger);
  const tailTriggerRef = useRef(tailTrigger.trigger);
  const barkTriggerRef = useRef(barkTrigger.trigger);
  blinkTriggerRef.current = blinkTrigger.trigger;
  tailTriggerRef.current = tailTrigger.trigger;
  barkTriggerRef.current = barkTrigger.trigger;

  // Autonomous blinking: fires on its own at a randomized interval rather
  // than being driven by user interaction. Scheduled via a ref (mount-only
  // effect) since the trigger object's identity changes every render, and
  // this timer must survive re-renders without resetting.
  useEffect(() => {
    let timeoutId: number;

    const scheduleNextBlink = () => {
      const delay =
        BLINK_MIN_INTERVAL_MS + Math.random() * (BLINK_MAX_INTERVAL_MS - BLINK_MIN_INTERVAL_MS);
      timeoutId = window.setTimeout(() => {
        blinkTriggerRef.current?.();
        scheduleNextBlink();
      }, delay);
    };

    scheduleNextBlink();
    return () => window.clearTimeout(timeoutId);
  }, []);

  const handleClick = () => {
    tailTrigger.trigger();
    barkTrigger.trigger();
  };

  useEffect(() => {
    outfitEnum.setValue?.(outfit ?? "None");
  }, [outfit, outfitEnum]);

  // "Bad hover state" reaction — keeps barking on a repeating interval for
  // as long as the cursor stays over the badge, not just once when the
  // hover starts. Fires immediately on entry, then every
  // BARK_REPEAT_INTERVAL_MS until isBarking goes false.
  useEffect(() => {
    if (!isBarking) return;

    tailTriggerRef.current?.();
    barkTriggerRef.current?.();

    const intervalId = window.setInterval(() => {
      tailTriggerRef.current?.();
      barkTriggerRef.current?.();
    }, BARK_REPEAT_INTERVAL_MS);

    return () => window.clearInterval(intervalId);
  }, [isBarking]);

  return (
    <div className="h-full w-full" onClick={handleClick}>
      <RiveComponent />
    </div>
  );
}

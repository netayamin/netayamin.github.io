"use client";

import { useEffect, useRef } from "react";

// A sidebar control that exists only for the Figma look. Clicking it
// escalates like a cartoon: an offended wiggle, then it comes loose and
// hangs crooked like a badly-mounted sign, then it tumbles off the
// sidebar, bounces on the floor, lies there a moment, and finally hops
// back up into its slot. The floor is marked by a [data-sidebar-floor]
// element inside the same <aside>.

const LIE_MS = 2600;
const CROOKED = "rotate(24deg) translateY(2px)";

export default function DecorativeButton({
  label,
  className,
  children,
}: {
  label: string;
  className?: string;
  children: React.ReactNode;
}) {
  const ref = useRef<HTMLButtonElement>(null);
  const clicks = useRef(0);
  const busy = useRef(false);
  const timer = useRef<number | undefined>(undefined);

  useEffect(() => () => window.clearTimeout(timer.current), []);

  const onClick = () => {
    const el = ref.current;
    if (!el || busy.current) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    clicks.current += 1;

    if (clicks.current === 1) {
      // Offended: puff up and shake it off.
      el.animate(
        {
          transform: [
            "none",
            "scale(1.35) rotate(-8deg)",
            "scale(1.35) rotate(8deg)",
            "scale(1.3) rotate(-6deg)",
            "scale(1.25) rotate(5deg)",
            "none",
          ],
        },
        { duration: 500, easing: "ease-in-out" },
      );
      return;
    }

    if (clicks.current === 2) {
      // A screw comes loose: swing past, then settle hanging crooked.
      // fill: "forwards" keeps the crooked pose until the fall replaces it.
      el.animate(
        {
          transform: [
            "none",
            "rotate(38deg) translateY(3px)",
            "rotate(12deg)",
            "rotate(30deg) translateY(2px)",
            CROOKED,
          ],
        },
        { duration: 700, easing: "cubic-bezier(0.34, 1.56, 0.64, 1)", fill: "forwards" },
      );
      return;
    }

    // Third strike: tumble off, double-bounce, and lie on the floor.
    const floor = el.closest("aside")?.querySelector("[data-sidebar-floor]");
    if (!floor) return;
    const drop = floor.getBoundingClientRect().top - el.getBoundingClientRect().bottom - 4;
    if (drop <= 0) return;

    busy.current = true;
    el.style.zIndex = "30";
    const down = `translateY(${drop}px)`;
    el.getAnimations().forEach((a) => a.cancel());
    el.animate(
      [
        { transform: CROOKED, offset: 0, easing: "cubic-bezier(0.5, 0, 1, 0.6)" },
        { transform: `${down} rotate(280deg)`, offset: 0.4, easing: "ease-out" },
        { transform: `translateY(${drop - 30}px) rotate(330deg)`, offset: 0.58, easing: "ease-in" },
        { transform: `${down} rotate(360deg)`, offset: 0.72, easing: "ease-out" },
        { transform: `translateY(${drop - 10}px) rotate(372deg)`, offset: 0.82, easing: "ease-in" },
        { transform: `${down} rotate(450deg)`, offset: 0.94 },
        { transform: `${down} rotate(450deg)`, offset: 1 },
      ],
      { duration: 1700, fill: "forwards" },
    );

    // After a nap: stand up with a hop, squat, and leap back into the slot.
    timer.current = window.setTimeout(() => {
      const up = el.animate(
        [
          { transform: `${down} rotate(450deg)`, offset: 0, easing: "ease-out" },
          { transform: `translateY(${drop - 26}px) rotate(400deg)`, offset: 0.14, easing: "ease-in" },
          { transform: `${down} rotate(360deg)`, offset: 0.26, easing: "ease-out" },
          { transform: `translateY(${drop - 30}px) rotate(360deg)`, offset: 0.38, easing: "ease-in" },
          { transform: `${down} rotate(360deg) scale(1.1, 0.75)`, offset: 0.5 },
          { transform: `${down} rotate(360deg) scale(1.1, 0.75)`, offset: 0.58, easing: "cubic-bezier(0.2, 0.6, 0.35, 1)" },
          { transform: "translateY(-12px) rotate(360deg)", offset: 0.86, easing: "ease-in" },
          { transform: "translateY(0) rotate(360deg) scale(1.15, 0.85)", offset: 0.94 },
          { transform: "translateY(0) rotate(360deg)", offset: 1 },
        ],
        { duration: 1400 },
      );
      up.addEventListener("finish", () => {
        el.getAnimations().forEach((a) => a.cancel());
        el.style.zIndex = "";
        busy.current = false;
        clicks.current = 0;
      });
    }, LIE_MS);
  };

  return (
    <button
      type="button"
      aria-label={label}
      onClick={onClick}
      ref={ref}
      className={`relative ${className ?? ""}`}
    >
      {children}
    </button>
  );
}

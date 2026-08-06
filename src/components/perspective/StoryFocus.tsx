"use client";

import { useEffect, useState } from "react";

// Reading spotlight + table-of-contents rail for the case study. The
// section nearest the reading line stays at full opacity (everything
// else dims via CSS), the rail tracks and jumps between sections, and
// eleven ticks tell visitors up front how deep the piece goes.
type Item = { slug: string; title: string };

export default function StoryFocus() {
  const [items, setItems] = useState<Item[]>([]);
  const [active, setActive] = useState("intro");

  useEffect(() => {
    const scroller = document.querySelector("[data-stage-scroll]") as HTMLElement | null;
    if (!scroller) return;

    const sectionEls = () =>
      Array.from(scroller.querySelectorAll<HTMLElement>(".spotlight-doc [data-md-section]"));

    const scan = () => {
      setItems(
        sectionEls().map((el) => ({
          slug: el.dataset.mdSection ?? "",
          title: el.querySelector("h2")?.textContent ?? "Intro",
        })),
      );
      update();
    };

    const update = () => {
      const els = sectionEls();
      if (!els.length) return;
      const sRect = scroller.getBoundingClientRect();
      const line = sRect.top + scroller.clientHeight * 0.42;
      let current = els[0];
      for (const el of els) {
        if (el.getBoundingClientRect().top <= line) current = el;
      }
      for (const el of els) {
        el.dataset.active = el === current ? "true" : "false";
      }
      setActive(current.dataset.mdSection ?? "intro");
    };

    scan();
    const observer = new MutationObserver(scan);
    observer.observe(scroller, { childList: true, subtree: true });
    scroller.addEventListener("scroll", update, { passive: true });
    return () => {
      observer.disconnect();
      scroller.removeEventListener("scroll", update);
    };
  }, []);

  if (items.length < 2) return null;

  return (
    <nav
      aria-label="Case study sections"
      className="absolute bottom-0 left-4 top-0 z-10 flex flex-col justify-center gap-2.5"
    >
      {items.map((item) => {
        const isActive = item.slug === active;
        return (
          <button
            key={item.slug}
            type="button"
            title={item.title}
            onClick={() => {
              document
                .querySelector(`[data-md-section="${item.slug}"]`)
                ?.scrollIntoView({ behavior: "smooth", block: "start" });
            }}
            className="group flex items-center gap-2"
          >
            <span
              className={`h-[3px] rounded-full transition-all ${
                isActive ? "w-5 bg-accent" : "w-3 bg-fg/20 group-hover:bg-fg/40"
              }`}
            />
            {isActive && (
              <span className="max-w-[120px] truncate text-left text-[10px] font-medium text-accent">
                {item.title}
              </span>
            )}
          </button>
        );
      })}
    </nav>
  );
}

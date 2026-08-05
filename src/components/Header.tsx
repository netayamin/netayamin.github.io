"use client";

import { Sun } from "lucide-react";

const NAV_ITEMS = [
  { href: "#intro", label: "Intro" },
  { href: "#about", label: "About Me" },
  { href: "#work", label: "Projects" },
  { href: "#resume", label: "Resume" },
];

export default function Header() {
  return (
    <header className="flex items-center justify-between px-6 py-8 md:px-10">
      <span className="text-base font-semibold tracking-tight text-neutral-900">NETA</span>

      <nav className="hidden items-center gap-8 md:flex">
        {NAV_ITEMS.map((item, index) => (
          <a
            key={item.href}
            href={item.href}
            className={`relative pb-3 text-sm transition hover:text-neutral-900 ${
              index === 0 ? "font-medium text-neutral-900" : "text-neutral-500"
            }`}
          >
            {item.label}
            {index === 0 && (
              <span className="absolute bottom-0 left-1/2 h-1 w-1 -translate-x-1/2 rounded-full bg-neutral-900" />
            )}
          </a>
        ))}
      </nav>

      <button
        type="button"
        aria-label="Toggle theme"
        className="flex h-9 w-9 items-center justify-center rounded-full text-neutral-500 transition hover:bg-neutral-100 hover:text-neutral-900"
      >
        <Sun className="h-4 w-4" strokeWidth={1.75} />
      </button>
    </header>
  );
}

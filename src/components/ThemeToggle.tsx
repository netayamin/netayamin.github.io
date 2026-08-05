"use client";

import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";

export default function ThemeToggle() {
  const [dark, setDark] = useState(false);

  useEffect(() => {
    setDark(document.documentElement.dataset.theme === "dark");
  }, []);

  const toggle = () => {
    const next = !dark;
    setDark(next);
    document.documentElement.dataset.theme = next ? "dark" : "";
    try {
      localStorage.setItem("theme", next ? "dark" : "light");
    } catch {
      // Private browsing — preference just won't persist.
    }
  };

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={dark ? "Switch to light theme" : "Switch to dark theme"}
      className="flex h-9 w-9 items-center justify-center rounded-full text-muted transition-colors hover:bg-card hover:text-fg focus-visible:outline-2 focus-visible:outline-accent"
    >
      {dark ? <Moon size={17} /> : <Sun size={17} />}
    </button>
  );
}

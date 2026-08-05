"use client";

import { ChevronDown, Mail, Plus, Search, SquarePen } from "lucide-react";
import { LinkedInIcon } from "./BrandIcons";
import ThemeToggle from "./ThemeToggle";
import { usePage, type PageId } from "@/context/PageContext";

const PAGES: Array<{ id: PageId; name: string }> = [{ id: "me", name: "Me" }];

const PROJECTS: Array<{
  emoji: string;
  name: string;
  page?: PageId;
  href?: string;
}> = [
  { emoji: "🍽️", name: "Snagr", page: "snagr" },
  { emoji: "📋", name: "Peel", href: "https://getpeel.co/" },
  { emoji: "🧪", name: "Experiments", href: "#" },
];

const LINKS = [
  { label: "LinkedIn", href: "https://www.linkedin.com/", icon: <LinkedInIcon size={15} /> },
  { label: "Email", href: "mailto:netayamin@gmail.com", icon: <Mail size={15} /> },
];

export default function FigmaSidebar() {
  const { page, setPage } = usePage();
  return (
    <aside className="flex w-64 shrink-0 flex-col border-r border-line bg-card">
      {/* Identity */}
      <div className="flex items-start gap-3 px-4 pb-4 pt-10">
        <span className="flex h-10 w-10 items-center justify-center rounded-lg border border-line bg-bg text-lg font-bold">
          N
        </span>
        <div className="min-w-0 flex-1">
          <p className="text-[14px] font-semibold leading-tight">Neta</p>
          <button
            type="button"
            className="mt-0.5 flex items-center gap-1 text-[12px] text-muted transition-colors hover:text-fg"
          >
            Design Engineer
            <ChevronDown size={12} />
          </button>
        </div>
        <button
          type="button"
          aria-label="Edit profile"
          className="mt-0.5 text-muted transition-colors hover:text-fg"
        >
          <SquarePen size={15} />
        </button>
      </div>

      {/* Search */}
      <div className="px-4 pb-5">
        <div className="flex items-center gap-2 rounded-lg bg-fg/[0.04] px-3 py-2 text-[13px] text-muted dark:bg-white/[0.06]">
          <Search size={14} />
          <span className="flex-1">Search</span>
          <kbd className="font-sans text-[11px] text-muted/70">⌘ /</kbd>
        </div>
      </div>

      {/* Pages */}
      <div className="px-4">
        <p className="px-1 pb-2 text-[13px] font-semibold">Pages</p>
        {PAGES.map((item) => (
          <button
            key={item.id}
            type="button"
            onClick={() => setPage(item.id)}
            className={`flex w-full items-center gap-2.5 rounded-lg py-1.5 pl-2 pr-2 text-left text-[13px] transition-colors ${
              page === item.id ? "font-semibold text-fg" : "text-muted hover:text-fg"
            }`}
          >
            <span className="flex w-2 justify-center">
              {page === item.id && <span className="h-1.5 w-1.5 rounded-full bg-fg" />}
            </span>
            {item.name}
          </button>
        ))}
      </div>

      <div className="mx-4 my-4 border-t border-line" />

      {/* Projects */}
      <div className="px-4">
        <div className="flex items-center justify-between px-1 pb-2">
          <p className="text-[13px] font-semibold">Projects</p>
          <button
            type="button"
            aria-label="Add project"
            className="text-muted transition-colors hover:text-fg"
          >
            <Plus size={15} />
          </button>
        </div>
        {PROJECTS.map((project) => {
          const classes = `mb-0.5 flex w-full items-center gap-2.5 rounded-lg px-2 py-1.5 text-left text-[13px] transition-colors ${
            project.page && page === project.page
              ? "bg-accent-soft font-medium text-fg"
              : "text-fg/80 hover:bg-fg/5"
          }`;
          return project.page ? (
            <button
              key={project.name}
              type="button"
              onClick={() => setPage(project.page!)}
              className={classes}
            >
              <span className="text-[15px] leading-none">{project.emoji}</span>
              {project.name}
            </button>
          ) : (
            <a
              key={project.name}
              href={project.href}
              target={project.href?.startsWith("http") ? "_blank" : undefined}
              rel="noreferrer"
              className={classes}
            >
              <span className="text-[15px] leading-none">{project.emoji}</span>
              {project.name}
            </a>
          );
        })}
      </div>

      <div className="flex-1" />

      {/* Links + theme */}
      <div className="border-t border-line px-4 py-4">
        {LINKS.map((link) => (
          <a
            key={link.label}
            href={link.href}
            target={link.href.startsWith("http") ? "_blank" : undefined}
            rel="noreferrer"
            className="flex items-center gap-2.5 rounded-lg px-2 py-1.5 text-[13px] text-fg/80 transition-colors hover:bg-fg/5 hover:text-fg"
          >
            {link.icon}
            {link.label}
          </a>
        ))}
        <div className="mt-2">
          <ThemeToggle />
        </div>
      </div>
    </aside>
  );
}

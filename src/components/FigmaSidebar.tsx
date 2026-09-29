"use client";

import { useState } from "react";
import { ChevronDown, FileText, Mail, Plus, SquarePen } from "lucide-react";
import { LinkedInIcon } from "./BrandIcons";
import ThemeToggle from "./ThemeToggle";
import { usePage, type PageId } from "@/context/PageContext";
import ResumeViewer from "./ResumeViewer";
import DecorativeButton from "./DecorativeButton";

const PAGES: Array<{ id: PageId; name: string }> = [{ id: "me", name: "Me" }];

const PROJECTS: Array<{
  name: string;
  page?: PageId;
  href?: string;
  soon?: boolean;
}> = [
  { name: "Snagr", page: "snagr" },
  { name: "Heads Off", page: "headsoff" },
  { name: "Trace spans", page: "tracespans" },
  { name: "Peel", soon: true },
  { name: "Experiments", soon: true },
];

const LINKS = [
  { label: "LinkedIn", href: "https://www.linkedin.com/in/neta-y/", icon: <LinkedInIcon size={15} /> },
  { label: "Email", href: "mailto:netayamin@gmail.com", icon: <Mail size={15} /> },
];

function navItemClasses(active: boolean): string {
  return `mb-0.5 flex w-full items-center gap-2.5 rounded-lg px-2 py-1.5 text-left text-[13px] transition-colors ${
    active ? "bg-accent-soft font-medium text-fg" : "text-fg/80 hover:bg-fg/5"
  }`;
}

function PageButton({ id, name }: { id: PageId; name: string }) {
  const { page, setPage } = usePage();
  return (
    <button type="button" onClick={() => setPage(id)} className={navItemClasses(page === id)}>
      {name}
    </button>
  );
}

export default function FigmaSidebar() {
  const [resumeOpen, setResumeOpen] = useState(false);
  return (
    <aside className="flex w-64 shrink-0 flex-col border-r border-line bg-card">
      {/* Identity */}
      <div className="flex items-start gap-3 px-4 pb-4 pt-6">
        <span className="flex h-10 w-10 items-center justify-center rounded-lg border border-line bg-bg text-lg font-bold">
          N
        </span>
        <div className="min-w-0 flex-1">
          <p className="text-[14px] font-semibold leading-tight">Neta</p>
          <DecorativeButton
            label="Change role"
            className="mt-0.5 flex items-center gap-1 text-[12px] text-muted transition-colors hover:text-fg"
          >
            Design Engineer
            <ChevronDown size={12} />
          </DecorativeButton>
        </div>
        <DecorativeButton
          label="Edit profile"
          className="mt-0.5 text-muted transition-colors hover:text-fg"
        >
          <SquarePen size={15} />
        </DecorativeButton>
      </div>

      {/* Pages */}
      <div className="px-4">
        <p className="px-1 pb-2 text-[13px] font-semibold">Pages</p>
        {PAGES.map((item) => (
          <PageButton key={item.id} id={item.id} name={item.name} />
        ))}
      </div>

      <div className="mx-4 my-4 border-t border-line" />

      {/* Projects */}
      <div className="px-4">
        <div className="flex items-center justify-between px-1 pb-2">
          <p className="text-[13px] font-semibold">Projects</p>
          <DecorativeButton
            label="Add project"
            className="text-muted transition-colors hover:text-fg"
          >
            <Plus size={15} />
          </DecorativeButton>
        </div>
        {PROJECTS.map((project) => {
          if (project.soon) {
            return (
              <div
                key={project.name}
                className="mb-0.5 flex w-full items-center gap-2.5 rounded-lg px-2 py-1.5 text-left text-[13px] text-muted/70"
              >
                {project.name}
                <span className="ml-auto rounded-full bg-fg/[0.05] px-1.5 py-0.5 text-[9px] font-medium text-muted dark:bg-white/[0.08]">
                  coming soon
                </span>
              </div>
            );
          }
          return project.page ? (
            <PageButton key={project.name} id={project.page} name={project.name} />
          ) : (
            <a
              key={project.name}
              href={project.href}
              target={project.href?.startsWith("http") ? "_blank" : undefined}
              rel="noreferrer"
              className={navItemClasses(false)}
            >
              {project.name}
            </a>
          );
        })}
      </div>

      <div className="flex-1" />

      {/* Links + theme */}
      <div data-sidebar-floor className="border-t border-line px-4 py-4">
        <button
          type="button"
          onClick={() => setResumeOpen(true)}
          className="flex w-full items-center gap-2.5 rounded-lg px-2 py-1.5 text-left text-[13px] text-fg/80 transition-colors hover:bg-fg/5 hover:text-fg"
        >
          <FileText size={15} />
          Resume
        </button>
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
      {resumeOpen && <ResumeViewer onClose={() => setResumeOpen(false)} />}
    </aside>
  );
}

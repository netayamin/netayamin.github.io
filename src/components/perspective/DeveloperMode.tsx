import MarkdownDoc from "./MarkdownDoc";

// The real resume, straight from the CV — the text lens of the Me page.
const RESUME = `# Neta Yamin — Design Engineer
*New York, NY · netayamin@gmail.com*

## Summary
Design-minded software engineer with 5+ years building intuitive products across iOS and web. Turns ambiguous ideas into polished, production-ready experiences by combining product strategy, interaction design, and engineering.

## Experience
### TIFIN · Frontend Software Engineer
*New York · May 2025 – Mar 2026*
- Owned the end-to-end product experience for advisor-facing wealth management tools
- Portfolio analysis with interactive visualizations, advanced search, and intelligent filtering
- Evolved the design system into a scalable UI foundation
- Built AI-assisted engineering workflows: agent instructions, prompting standards, dev playbooks

### Comet ML · Full-stack Engineer
*Tel Aviv → New York · Jun 2021 – Apr 2025*
- React, Redux, and Material-UI frontends; Spring REST APIs on the backend
- Led the TypeScript migration (−15% runtime errors) and the Redux → React Query migration
- Interactive Plotly charts for AI model insights; feature-toggle manager in Golang

### Copyleaks · Frontend Engineer
*Remote · Jan 2019 – Jun 2021*
- Designed and built a reusable Storybook design system adopted across multiple products
- Scalable frontend architecture and reusable UI components for enterprise web apps

## Projects
- **Snagr** — native SwiftUI, idea → App Store launch
- **Peel** — AI-powered commercial real estate · getpeel.co

## Sidekick
- Mazi 🐶 — Chief Morale Officer, barks at bugs`;

// The developer lens of Me: the actual resume as Resume.md.
export default function DeveloperMode() {
  return (
    <div className="relative min-h-full bg-card pb-16">
      {/* Editor window chrome */}
      <div className="sticky top-0 z-10 flex items-center gap-3 border-b border-line bg-bg px-4 py-2 dark:bg-[#28282e]">
        <span className="flex gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
        </span>
        <span className="font-mono text-[11px] text-neutral-500 dark:text-neutral-400">
          Portfolio <span className="text-neutral-400 dark:text-neutral-600">›</span>{" "}
          <span className="font-medium text-fg">Resume.md</span>
        </span>
      </div>

      <div className="w-1/2">
        <div className="mx-auto w-[94%] max-w-[560px] pt-10">
          <MarkdownDoc source={RESUME} />
        </div>
      </div>
    </div>
  );
}

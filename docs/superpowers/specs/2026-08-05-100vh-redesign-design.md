# 100vh Portfolio Redesign

Approved 2026-08-05. Source of truth: user's mockup screenshot (Apple-ish minimal, light theme, purple accent).

## Goal

Replace the current scrolling portfolio with a single-viewport (`100vh`, no scroll) page matching the mockup: identity + featured work on the left, an interactive "Perspective" showcase panel on the right.

## Layout

- Root: `h-screen overflow-hidden` grid — header row (~64px) + content row.
- Header: "Neta" wordmark + "Design Engineer" · nav (Work, About, Playground; no-op anchors v1) · theme toggle · GitHub button → github.com/netayamin.
- Content: two columns ~1:2.
  - Left: headline "I design and build products from 0 → 1." (purple arrow), subline, FEATURED WORK label, 3 project cards, footer links (Resume, LinkedIn, Email) + "New York, NY".
  - Right: Perspective panel.

## Project cards

Snagr (Live badge, purple S icon, iOS/SwiftUI/AI/Supabase tags) · Peel (In Development badge, P icon, Web/React/Design System tags) · Experiments (flask icon, Design System/Animations/Components tags). Real content as shown in mockup.

## Perspective panel

- Segmented control Designer Mode / Developer Mode, fully interactive, ⌘D shortcut, "Toggle to switch ⌘D" hint, "Two lenses. Same product thinking." caption.
- Designer Mode: Snagr splash (headline, Create Plan / Browse Collections buttons) + phone mockup of "My Plans" screen — all HTML/CSS, no images.
- Developer Mode: same content as dark inspector — SwiftUI snippet, spacing annotations, color/typography/spacing token rows, component info chips.
- Crossfade between modes. "Currently thinking about" chip row pinned at panel bottom.

## Theme

Real light/dark toggle (sun icon), CSS variables, light default. Geist type (already loaded), accent ~#7c5cfc.

## Out of scope / removals

- Mazal companion unmounted (components/assets kept in repo for later).
- Old Hero/About/Resume/Projects sections replaced.
- Nav destinations, Resume file, real links content — later.

## Constraints

- Static export (GitHub Pages) — client-only, no server features.
- Must fit 100vh on a typical laptop viewport; interior panels may clip/scale, page never scrolls.

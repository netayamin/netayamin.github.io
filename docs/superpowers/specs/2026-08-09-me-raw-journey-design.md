# Me Page Raw Tab: ASCII Journey Mode

Date: 2026-08-09
Status: Approved

## Goal

Make the Raw tab of the Me page resume doc a fun, animated ASCII journey instead of highlighted markdown source. Text characters scramble and reassemble into scenes that tell Neta's story. The real resume stays fully readable in the Preview tab.

## Scope

- Only the Me page (`DeveloperMode`) changes behavior. Snagr and Trace docs keep their existing Raw/Engineering tabs.
- No new dependencies, no canvas. Plain React state plus one interval.

## Components

### `JourneyRaw` (new, `src/components/perspective/JourneyRaw.tsx`)

A self-contained client component that renders a fixed monospace character grid (about 44 columns wide) and plays a looping slideshow of ASCII scenes.

Scenes, in order, each with a one-line caption in a corner:

1. Tel Aviv, 2021: rooftops and sun. Caption: "Comet ML · full-stack years"
2. The move: a plane over waves. Caption: "TLV → NYC"
3. NYC skyline. Caption: "TIFIN · design engineer"
4. A phone with a push notification popping. Caption: "Snagr · idea → App Store"
5. Mazi the dog. Caption: "Chief Morale Officer"

Scenes are stored as arrays of strings (one per row), padded to a uniform grid size.

### `MarkdownDoc` (modified)

New optional prop `rawView?: React.ReactNode`. When present and the Raw tab is active, render `rawView` instead of the `<Raw>` source view. Everything else (tabs, title, Preview rendering, `rawSource` behavior) is unchanged.

### `DeveloperMode` (modified)

Passes `rawView={<JourneyRaw />}` to its `MarkdownDoc`.

## Animation

- Each scene holds roughly 3.5 seconds.
- Transition: a staggered scramble wave sweeps across the grid. Each cell cycles through random glyphs for a few ticks, delayed by its position (diagonal stagger), then settles on the next frame's character. Whole transition lands in under a second.
- Loops forever.
- Driven by a single interval updating the character grid state; cleaned up on unmount.
- Pauses while the document is hidden (visibilitychange).
- `prefers-reduced-motion`: no scramble; scenes cut directly.

## Look

- Same doc card, mono font, and text size as the current Raw view.
- Mostly neutral text tones; one or two accent-colored glyphs per scene (e.g. the plane, the notification dot) using the existing tone palette so dark mode works without extra effort.

## Testing

- Type-check and lint clean.
- Manual check in the dev server: switch to Raw on the Me page, watch a full loop, verify Snagr/Trace tabs unchanged, verify dark mode and reduced motion.

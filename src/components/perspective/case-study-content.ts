// Condensed (~954 words) from /Users/netayamin/Desktop/snagr/docs/snagr-case-study.md
// — every fact and number comes from that doc. Edit freely.
export const CASE_STUDY = `# Snagr — Product Design Case Study

**A reservation-watching app for iOS.** Founder-designed, founder-built, shipped to TestFlight. Solo product design + engineering, April–August 2026 — 17 weeks, 1,030 commits, ~47k LOC Swift and ~45k LOC TypeScript.

## The problem

Getting a table at a restaurant people actually want is not a discovery problem. You know where you want to go. The problem is that inventory is released unpredictably and consumed within minutes — someone cancels a Saturday 8pm at Carbone, and it's gone before you'd have thought to look. The behavior Snagr replaces is a person opening four apps in rotation, several times a day, for a week. It's a polling task, and humans are structurally bad at polling.

Two consequences shaped everything:

- **Latency is the product.** If Snagr is 15 minutes slow, it's a worse version of refreshing Resy yourself.
- **A false positive is catastrophic.** Tapping a "live" slot that's already gone is worse than saying nothing. A missed notification is recoverable; a burned one is not.

## The solution

You make a **plan** — these restaurants, these nights, this party size, this time range — and Snagr polls the reservation platforms (Resy, OpenTable, SevenRooms, Zenchef) and pushes you the moment a matching table opens. That's the whole product.

"Plans" is an architecture decision as much as a product one: polling cost scales as venues × dates × party sizes, which is financially impossible at full-catalog cadence. If a plan is a declaration of demand, then demand is also the polling schedule — we only check what someone actually asked for. The free-tier limits (3 plans, 15 restaurants each) are the infrastructure limits, exposed honestly.

## What it took to get there

Snagr was four products before it was Snagr, and each transition deleted the prior model:

1. **The drop feed** — a live firehose of newly-opened tables. Fun, and useless: a drop at a restaurant you don't care about is noise.
2. **The community hotlist** — users vote on which venues get polled. Died of cold-start, and it solved curation, which was never the user's problem.
3. **Watchlists → shared watchlists** — where the product got good, and where three overlapping ways to express the same intent accreted.
4. **Plans** — one flat table, one concept, all polling derived from it.

The IA collapsed alongside: four tabs became two, because the median user has ~2 plans and a tab bar is organizational debt. Creation was eventually absorbed into browsing — ticking restaurants inside an editorial guide *is* creating a plan — which deleted six separate entry points.

## Research, honestly

No interviews, no surveys, no usability tests were run pre-launch; the case study says so instead of inventing metrics. The real research inputs were dogfooding (every plan in the app is one I actually wanted), technical reconnaissance with teeth (TheFork measured as Datadome-blocked and browse-only; counting real Paris booking links showed Zenchef beating TheFork 21-to-3, which reversed the whole Paris strategy), live catalog measurement (Paris: 23 of 252 venues pollable; NYC: 292 of 1,008), and TestFlight testers filing bugs via shake-to-report. Three of the first five user-reported bugs were trust bugs, not cosmetic ones — a genuinely useful signal about where the risk lives.

The biggest unvalidated risk is named, not hidden: unbounded pushes on a hot week → mute → dead product. The next research to run is a notification diary study, before anything else.

## The design spine

The recurring realization: **"we don't know" and "there's nothing" look identical, and we were shipping the wrong one.** Untracked venues said "No open tables." Paris venues said "Walk-in only" when they book fine on platforms we don't poll. Every one of these is the same bug — an absence of information rendered as a negative fact.

The rule that fixed it became the product's spine: **never show false availability.** Discovery only shows venues Snagr can actually watch. Empty states say "We're not watching this spot yet," never "No tables." A degraded provider suppresses pushes entirely rather than sending late ones, and quiet-hours skips are never replayed at 8am — stale tables at breakfast is exactly the burned-trust failure. Specificity earns interruption: a vague plan honors quiet hours; an enumerated night with one time window bypasses them.

## Iteration under fire

Three favorites, each of which changed a principle:

- **One plan froze the device.** An empty plan legitimately watches the whole city — 1,008 venues, all shipped to the client, all eagerly decoding images. Fixed with response caps that can't lie (true counts preserved), a 64MB decoded-image cache bound by byte cost, and a "Watching" card capped at 10 chips — which was a better card anyway; the crash just forced me to notice.
- **The false-availability arc.** Separating "takes no reservations" from "we never resolved this venue" cut NYC's flagship rail from 234 venues to 64 — an overreach, reverted in a commit that states the damage, then re-decided on a self-correcting principle and attacked at the cause: widget-detection took Paris from 23 to ~53 pollable venues, with every scraped id live-validated (0 of 30 failed).
- **The 0.34-point bug.** The whole home page could be dragged sideways. Measured instead of theorized: contentSize 402.67pt vs 402.33pt bounds — sub-pixel rounding, and UIScrollView pans on any overflow. "It feels wrong" is a measurable claim.

## Where it landed

TestFlight build 69, App Store review prepared, Snagr Pro live in sandbox, 552 backend tests passing, 73 guides across New York and Paris. Still open, and named: notification fatigue has no design solution yet, and a watch app that can only watch 29% of its catalog is lying by omission — closing that gap is the live tension the next cycle owns.`;

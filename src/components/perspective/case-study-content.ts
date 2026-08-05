// Product-design case study (~1609 words) for a design audience,
// condensed from /Users/netayamin/Desktop/snagr/docs/snagr-case-study.md — all facts from that doc.
export const CASE_STUDY = `# Snagr — Product Design Case Study

*A reservation-watching app for iOS. Solo: product strategy, design, and build — 17 weeks from blank repo to TestFlight build 69.*

## The problem

Discovery is the easy part — Infatuation lists, Google Maps saves, TikTok finds. The real workflow is what happens next: you find places, send them to the group chat, and then spend hours bouncing between reservation apps trying to get into *any* of them. Discovery tools end at a list. Booking tools expect you to already know exactly what to track. In the gap between them, plans die — because inventory at the places on those lists appears unpredictably and vanishes within minutes. Two truths shaped every decision that follows:

- **Latency is the product.** A table that opened 40 minutes ago is worthless information.
- **A false positive is catastrophic.** Tapping a "live" slot that's already gone is worse than silence.

## Hypothesis

Discovery should end in a live object, not a screenshot. The lists people already trust are static — so Snagr makes them selectable: new collections from top sources show up in the app, you tick the places you'd actually go, scope it to your occasion (these nights, this party size), and the whole list becomes one live, watchable thing. Instead of checking ten restaurants back and forth, you see them all in one place and get interrupted the moment any of them opens. Snagr turns discovery into a live event. The falsifiable part: engagement should look low and spiky (push → open → book → close).

## Research — an honest inventory

No user interviews, surveys, or usability tests were run pre-launch. I'd rather say that plainly than invent metrics. What I did have:

- **Dogfooding.** Every plan in the app was one I genuinely wanted a table for. Real signal — and the weakest kind, because it fits the product to one person.
- **Ground-truth measurement instead of assumption.** Before committing Paris to the "obvious" platform, I counted what Paris restaurants actually book on: of ~50 venues with booking links, **21 used Zenchef and only 3 used TheFork**. One afternoon of counting reversed the entire market strategy.
- **The catalog as a research subject.** Queries against live data changed designs more often than any spec: only **23 of 252** Paris venues and **292 of 1,008** NYC venues could actually be watched.
- **Real tester feedback.** Beta testers file bugs by shaking their phone. Of the first five reports, **three were trust bugs, not cosmetic ones**.

**What I'd run next, in order:** contextual interviews (the core hypothesis is still unfalsified, and everything inherits its error), a two-week notification diary study (fatigue is the #1 unmitigated risk), the already-specced activation funnel, and a first-run test against my stated target — *a new user is watching something within 20 seconds.*

## Insights

1. **Users want to stop checking, not discover.** V1 was a live feed of every table drop in NYC — genuinely fun to watch, and useless, because a drop at a restaurant you don't care about is noise. The principle that replaced it: **"Inventory, not news."** Only live, bookable openings; an opening that gets booked elsewhere disappears silently.
2. **"We don't know" and "there's nothing" look identical — and we were shipping the wrong one.** Venues we weren't watching said "No open tables"; venues we couldn't watch said "Walk-in only" when they book fine elsewhere; two data bugs quietly showed availability that wasn't real. All four are one mistake: *an absence of information rendered as a negative fact.* That recognition became the product's spine: **never show false availability.**
3. **Specificity is what grants permission to interrupt.** An early notification design was a filter matrix. The replacement has exactly two modes: **vague** (zero config, respects quiet hours) or **specific** (these nights, this window, this party size — and it *bypasses* quiet hours). If you don't know which night you want, you haven't earned a 2am push.
4. **Navigation should scale with the number of objects it organizes.** The median user has about two plans; the app had four tabs. It's two tabs now.
5. **Editorial guides are a selection accelerator, not a browse destination.** The win is "add 18 vetted spots to a plan in three taps," not "scroll editorial forever."

## Jobs to be done

- **Primary:** when the restaurant I want is booked out, tell me the instant a matching table appears, so I can book it and stop thinking about it.
- **Secondary:** when I haven't picked a place, let me cast a net across restaurants I'd be happy with and take whatever opens first.
- **Anti-job:** "help me decide where to eat." That's Infatuation's job; Snagr consumes their editorial as an input. This is why there are no ratings, no reviews, and a copy rule that bans "recommended for you".

## The user journey

**Declare → Wait → Act.** Sixty seconds of setup; hours-to-days out of the app; fifteen seconds from push to booked. The middle phase is where the entire product lives, and it has no UI — so the lock screen is the primary surface, and the app's job is to prove it's alive without demanding attention: *"Checked 1 minute ago · Watching 18 restaurants across 3 watches."*

## Ideation — four products before the product

1. **The drop feed** — killed: engaging is not the same as useful.
2. **The community hotlist** — users vote on which venues get watched. Killed: needs a crowd I didn't have, and it solved curation, which was never the user's problem. Editorial guides do that job on day one, for free.
3. **Watchlists, then shared watchlists** — where the product got genuinely good.
4. **Plans** — one concept, everything derived from it. This is where product and economics fused: watching everything for everyone is unaffordable, but *a plan is a declaration of demand — so demand itself becomes the watching schedule.* The free-tier limits are the real capacity limits, exposed honestly.

Ideas deliberately killed: email alerts (too slow for a five-minute window); the social layer on shared plans — comments, likes, chat (*collaborative, not social*); claim/hold on a shared table ("first to book wins" is honest; a hold we can't enforce is a lie); and plan names + emoji — cut on the principle that "a plan is identified by its criteria," then **reinstated** when the principle proved over-applied. Criteria identify a plan logically; they're a terrible way to *recognize* one in a list. Admitting that reversal mattered more than either decision.

## Structure & interaction

The home screen is one fixed skeleton across three states — **"state changes content, never structure."** Anything new sits in a top slot that is *absent*, not empty, when there's nothing new. New-opening cards cap at two plus "N more" — at nine cards it becomes a feed, and Snagr becomes a browsing app again. Eventually creation was absorbed into browsing: ticking restaurants inside a guide *is* creating a plan, which let me delete six separate "create" entry points.

Notifications are the most designed system in the product, and the design is mostly *suppression*: if data quality degrades, pushes stop entirely and are never replayed late — late is worse than never; one opening that matches three of your plans is one push, not three; quiet-hour skips are never replayed at 8am, because a batch of stale tables at breakfast is exactly the burned-trust failure. The copy system is mostly a NEVER list: never "polling," never "AI," never "recommended for you." And one gap named honestly: notification fatigue has no design solution yet. Naming it beats pretending it's handled.

## Iteration under fire

- **One plan froze the phone.** An empty plan legitimately watches the whole city — 1,008 venues rendered at once. The fixes were technical, but the design lesson wasn't: the "Watching" card now shows 10 chips + "N more," and that was *always* the better card. Seventy-eight chips was never good design; the crash just forced me to see it.
- **The false-availability arc.** My first honesty rule over-applied to New York and gutted the flagship rail from 234 venues to 64 — publicly reverted, damage stated in the commit. The re-decision used a better principle: don't classify *why* a venue can't be watched (the user doesn't care); show only what *can* be, and let every newly-resolved venue return automatically.
- **The page that felt broken.** The home screen could be dragged sideways by a third of a point of layout slack. The fix that held: measure the actual layout, find the real mechanism, verify the number. *"It feels wrong" is a measurable claim* — that's the difference between guessing and knowing.

## Where it landed

TestFlight build 69, App Store review prepared, subscription live in sandbox, 73 editorial guides across New York and Paris. Open and named: fatigue is unsolved, and an app that can only watch 29% of its catalog is lying by omission. Closing that gap owns the next cycle.`;

// Snagr case study (~1161 words): 5W1H, personas, journey maps,
// empathy-led decisions. Facts from docs/snagr-case-study.md in the snagr repo;
// personas marked provisional pending interviews.
export const CASE_STUDY = `# Snagr — Product Design Case Study

*A reservation-watching iOS app. Solo: product, design, and build — 17 weeks from a feeling to TestFlight build 69.*

## Who, what, when, where, why, how

**Who.** The friend who carries the dinner — the group's planner, late 20s to 40s, living in a reservation-scarce city. Secondary: the rest of their group chat, who just want to be told where to show up.

**What.** An app that turns the restaurant lists people already trust into live, watchable plans — and interrupts them the moment a real table opens.

**When.** In the gap between "we should go" and "we have a table": the days when a plan exists but no reservation does, and inventory appears at random hours and vanishes in minutes.

**Where.** New York and Paris to start — and mostly on the lock screen, not in the app. The product lives in a push notification.

**Why.** Discovery is solved; editors do it beautifully. Booking tools assume you already know exactly what to track. In between, plans die — because keeping one alive means a human polling four apps for a week, and humans are bad at polling. It doesn't just fail; it *feels* bad.

**How.** Declare an occasion once — these places, these nights, this party size — and Snagr watches everything on the list at once, then pushes a booking link the second a matching table opens. Sixty seconds of setup, days of silence, fifteen seconds from push to booked.

## Personas

**Maya, 29 — The Planner.** Runs the group chat like a second job. Saves Infatuation lists, screenshots menus, sets phone reminders to check Resy at odd hours. *Goal:* get her people into places worth the night — and honestly, be the hero who pulled it off. *Frustrations:* four apps on rotation, tables gone by the time anyone answers the thread, quiet blame when the plan fizzles. *"We have a whole list of places we want to try. We always end up at the same three."*

**Dan, 31 — The Flexible Friend.** Would happily eat at any of six places. *Goal:* minimum effort between "I'm in" and dinner. *Frustrations:* sixty-message threads that end nowhere; being asked to have opinions about time slots. *"Just tell me where and when. I'll be there."*

*(Honesty note: these personas are drawn from lived observation and dogfooding, not interviews — they're provisional by design, and validating them is the first study on the research roadmap below.)*

## The journey before Snagr

1. **Discover** — Maya finds the place on Infatuation or TikTok. *Feeling: excited.*
2. **Share** — into the group chat; the "omg yes"s roll in. *Feeling: hopeful.*
3. **Attempt** — she opens Resy. Booked out for six weeks. *Feeling: deflated.*
4. **The vigil** — days of checking four apps at random moments, including midnight "just in case." *Feeling: anxious, then resentful — the plan is now a chore she owns alone.*
5. **Give up** — the group ends up at the same three places again. *Feeling: resigned, slightly embarrassed.*

The product opportunity is stages 3–5. Nothing on the market touches them: discovery tools end at stage 2, booking tools only work if stage 3 succeeds.

## The journey with Snagr

1. **Declare** (~60 seconds) — browse a trusted guide, tick the places you'd actually go, set nights and party size. The list becomes one live plan. *Feeling: done — it's off my plate.*
2. **Wait** (hours to days, out of the app) — Snagr watches; the plan page whispers "Checked a minute ago · watching 18 places," so silence reads as diligence, not abandonment. *Feeling: calm. Someone's on it.*
3. **Act** (~15 seconds) — push arrives: "Table for 4 just opened — Don Angie, Sat 8:00." Tap, book, share to the chat. *Feeling: relief, and a little heroism.*
4. **Dinner.** The success metric isn't time in app — it's a short session that ends at a table.

## Why this solution, and what I rejected

The reframe that shaped everything: people aren't trying to *find* a restaurant — they're trying to *stop checking* one. So the answer had to start from what's bookable, be group-native, and interrupt rather than be browsed. Rejected on the way: a discovery app (a better Beli — but discovery isn't the bottleneck), a group-chat bot (no control of the notification surface, and bots get muted), and a web app (the product *is* a timely push; that lives on iOS).

## The hardest screen: reservations in bulk

Until now, a reservation was a one-shot question: one restaurant, one date, one time, one party size — four dropdowns, one answer. A Snagr plan breaks that contract on purpose. "Paris trip: Aug 17–18, 6 to 9pm, 3 to 5 people, anywhere on this list" is *one* human thought — but underneath it's fifteen restaurants times two dates times a time window times three party sizes, across different booking platforms. Hundreds of real, live openings, all true at once. Shown raw, it's a spreadsheet; the plan page had to make it feel like an answer.

The decisions that got it there:

- **The unit of decision is the restaurant, not the slot.** People pick a *place* first and a time second — so results group by venue, never as a giant chronological slot list.
- **Two slots per venue, then "+10 more times."** Enough to prove it's real and bookable, little enough to stay scannable. Depth is one tap away instead of on the page.
- **Every line is a complete sentence.** "Tue, Aug 18 · 8:15 PM · for 3 · Resy" — day, time, party size, platform. Any single row is bookable on sight, with zero cross-referencing.
- **The header restates the ask.** Date range, time window, party size sit as chips above the results, so every row below is implicitly filtered by them — context carried once, not repeated a hundred times.
- **One number up top.** "9 restaurants available" answers the emotional question — *is this trip going to work?* — before a single row is read.

The lesson: when you change the shape of the question, you inherit the duty of redesigning the shape of the answer. Bulk asking is Snagr's power; making bulk *readable* was the design work.

## How it evolved — four products, four lessons

1. **A live drop feed** of every opening in the city. Fun, useless: a table you don't care about is noise. *Engagement is not value.*
2. **A community hotlist** where users voted on what to watch. *People don't want jobs, they want outcomes* — editors already curate; borrow their work.
3. **Watchlists, then shared watchlists.** Sharing exposed the truth: *dining is a group decision, and every tool out there is single-player.*
4. **Plans.** Not a list — an *occasion*: Friday, four people, this list, 7 to 9. That's how people actually think about dinner, so it became the only concept in the app.

I also deleted things I loved — the feed, the voting, a whole social layer (shared plans are collaborative, not social) — and reversed myself once: plan emoji were cut on principle ("a plan is identified by its criteria"), then reinstated when real use proved criteria don't help you *recognize* your plan in a list. The reversal taught me more than either decision.

## Empathy as design rules

The spine of the product came from taking one moment seriously: tapping a "live" table that's already gone. That tap is a small betrayal — worse than silence, because the app promised. So:

- **Never show false availability.** Unverifiable means invisible.
- **"We're not watching this spot yet" — never "No tables."** Absence of information is not a negative fact.
- **Specificity earns interruption.** Vague plans respect quiet hours; only an exact ask may buzz you at 2am — and skipped pushes are never replayed at breakfast.
- **Prove you're alive** while being invisible, so trust survives the silent days.

## Research, honestly

No interviews or usability tests ran pre-launch, and this case study won't pretend otherwise. What existed: daily dogfooding (every plan was a dinner I truly wanted) and beta testers filing bugs by shaking their phone — of the first five reports, three were *trust* bugs, not visual ones. Users tell you where it hurts when reporting costs them nothing. Next, in order: contextual interviews to pressure-test the personas and core hypothesis, then a two-week notification diary — the line between "helpful" and "muted" is the product's whole life.

## Where it landed

TestFlight build 69, App Store review prepared, guides across New York and Paris. Open and named: notification fatigue has no design answer yet, and the catalog can't watch everything it shows. The journey continues — the most honest thing a 0 → 1 product can say.`;

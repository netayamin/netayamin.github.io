// Snagr case study (~1161 words): 5W1H, personas, journey maps,
// empathy-led decisions. Facts from docs/snagr-case-study.md in the snagr repo;
// personas marked provisional pending interviews.
export const CASE_STUDY = `# Snagr — Product Design Case Study

*Designing for a question reservation apps were never built to answer.*

**Tools:** SwiftUI · Xcode · Node.js backend · Redis · Render (deploy) · GitHub Actions CI/CD · TestFlight

*Solo: product, design, and build — 17 weeks to TestFlight build 69.*

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

*(Provisional — drawn from lived observation, to be validated by the interviews on the research roadmap below.)*

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

## Breaking the one-reservation model

Until now, every reservation product has been built around the same interaction: **one restaurant, one date, one time, one party size.** The interface is simple because the question is simple. Snagr intentionally breaks that model. A user isn't asking *"Can I book Carbone on Friday at 7?"* They're asking *"We're in Paris Aug 17–18, anytime between 6 and 9 PM, for 3–5 people — which restaurants from this list can actually work?"* That's a completely different problem.

Behind that seemingly simple request is an explosion of combinations: 15 restaurants, 2 dates, a 3-hour window, multiple party sizes, multiple reservation platforms — hundreds of live slots, every one of them valid. Showing all of them would be technically correct and completely unusable. The challenge wasn't retrieving the data. It was turning hundreds of possible answers into one understandable answer.

1. **The restaurant became the unit of decision.** People choose a restaurant first and a reservation second — so the interface groups everything by venue, letting users compare restaurants instead of timestamps.
2. **Show confidence, not completeness.** Users don't need twenty reservation times; they need confidence that a place is available. Each card surfaces the first few slots plus "+10 more" — proof of availability without the noise. Depth lives one tap later.
3. **Context belongs in the header.** The plan itself defines the search: date range, time window, and party size appear once at the top, and every row below inherits that context instead of repeating it dozens of times.
4. **Answer the emotional question first.** Before scanning a single option, users want to know: *is this trip actually going to work?* One summary — "9 restaurants available" — answers immediately. Exploration comes after.

Changing the shape of the user's question means redesigning the shape of the answer. Traditional apps optimize for finding one reservation; Snagr optimizes for planning across many restaurants, dates, times, and party sizes simultaneously. The hardest part wasn't the search engine — it was making an inherently exponential problem feel as effortless as asking a single question.

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

No interviews or usability tests ran pre-launch — I'd rather say so than pretend. What existed: daily dogfooding (every plan was a dinner I truly wanted) and beta testers filing bugs by shaking their phone — of the first five reports, three were *trust* bugs, not visual ones. Users tell you where it hurts when reporting costs them nothing. Next, in order: contextual interviews to pressure-test the personas and core hypothesis, then a two-week notification diary — the line between "helpful" and "muted" is the product's whole life.

## Where it landed

TestFlight build 69, App Store review prepared, guides across New York and Paris. Open and named: notification fatigue has no design answer yet, and the catalog can't watch everything it shows. The journey continues — the most honest thing a 0 → 1 product can say.`;

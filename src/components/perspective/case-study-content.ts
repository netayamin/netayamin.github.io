// Snagr case study: 5W1H, personas, journey maps, the bulk-reservation
// interaction model, and closing lessons. Facts from docs/snagr-case-study.md
// in the snagr repo. House style: no em dashes.
export const CASE_STUDY = `# Designing for a question reservation apps were never built to answer

*Snagr · Product Design Case Study*

**Tools:** Figma · Mobbin (inspo) · SwiftUI · Xcode + XcodeGen · StoreKit 2 · APNs · TestFlight · Claude (AI-assisted dev) · Node.js + TypeScript · Fastify · PostgreSQL + Drizzle · Redis · Playwright + Python (availability) · Meilisearch · Render · GitHub Actions CI/CD

## Who, what, when, where, why, how

**Who.** The group's planner: the friend who carries the dinner, late 20s to 40s, in a reservation-scarce city. Around her, a group chat waiting to be told where to show up.

**What.** Wanted restaurants are booked out, and keeping a plan alive means manually polling four apps for days. Snagr takes over the watching: trusted restaurant lists become live plans that alert the moment a matching table opens.

**When.** In the days between "we should go" and the dinner itself: after a plan forms in the chat but before any table exists. The decisive moments arrive at random hours, exactly when nobody is looking: the midnight cancellation, the table that drops during a work meeting.

**Where.** Wherever the user already is, not where the app is: in the group chat where plans are born, in bed doing one last Resy check, on the subway when the push lands. The product's real surface is the lock screen; the app is a landing pad.

**Why.** Discovery is solved and booking is solved, but the gap between them isn't. Humans are structurally bad at polling, and every failed vigil costs a real dinner.

**How.** Declare an occasion once (these places, these nights, this party size). Snagr watches everything on the list at once and pushes a booking link the second a match opens.

## Personas

**Maya, 29. The Planner (primary).** *"I don't care which restaurant, we just want a great dinner."* She books for the occasion: Wednesday Dinner, Girls Paris Trip, Parents Visiting NYC, Anniversary Weekend. She creates plans, watches many restaurants at once, stays flexible on venue, often spans several dates and party sizes, and shares the plan with friends. Success is simple: *we got a reservation.*

**Dan, 31. The Chaser (secondary).** *"I want THIS restaurant."* He hunts one specific place: Torrisi, 4 Charles, Don Angie, Tatiana. He watches one to three spots, usually a single date and a very specific time, and checks constantly because the place is impossible to book. Success: *I got Bar Tizio at 7:30.*

Their notification tolerance is exactly opposite: Maya wants calm and few, Dan wants to be woken at 2am. One system serving two contracts is the tension that shaped the vague-vs-specific alert modes.

*(Provisional: drawn from lived observation, to be validated by the interviews on the research roadmap below.)*

## The journey before Snagr

1. **Discover.** Google Maps saves, Infatuation, Eater NY, TikTok. *Feeling: excited.*
2. **Send to friends.** Links into the group chat; everyone is in. *Feeling: hopeful.*
3. **Decide which.** Sixty messages to narrow it to a few contenders. *Feeling: fading.*
4. **Try to get in.** Everything good is booked out. *Feeling: deflated.*
5. **Check one by one.** Each restaurant, each date, each time, each app, individually. The group is flexible; the tools aren't, so flexibility means *more* checking, not less. *Feeling: anxious, then resigned. Back to the same three places.*

The opportunity is stages 4 and 5. Nothing on the market touches them: discovery tools end at stage 2, and booking tools assume stage 4 just works.

## The journey with Snagr

1. **Declare** (~60 seconds). Browse a trusted guide, tick the places you'd actually go, set nights and party size. The list becomes one live plan. *Feeling: done. It's off my plate.*
2. **Wait** (hours to days, out of the app). Snagr watches; the plan page whispers "Checked a minute ago · watching 18 places," so silence reads as diligence, not abandonment. *Feeling: calm. Someone's on it.*
3. **Act** (~15 seconds). Push arrives: "Table for 4 just opened · Don Angie, Sat 8:00." Tap, book, share to the chat. *Feeling: relief, and a little heroism.*
4. **Dinner.** Success is a short session that ends at a table.

## Why this solution, and what I rejected

The reframe that shaped everything: people aren't trying to *find* a restaurant, they're trying to *stop checking* one. So the answer had to start from what's bookable, be group-native, and interrupt rather than be browsed. Rejected on the way: a discovery app (a better Beli, but discovery isn't the bottleneck), a group-chat bot (no control of the notification surface, and bots get muted), and a web app (the product *is* a timely push, and that lives on iOS).

## Breaking the one-reservation model

Until now, every reservation product has been built around the same interaction: **one restaurant, one date, one time, one party size.** The interface is simple because the question is simple. Snagr intentionally breaks that model. A user isn't asking *"Can I book Carbone on Friday at 7?"* They're asking *"We're in Paris Aug 17–18, anytime between 6 and 9 PM, for 3–5 people. Which restaurants from this list can actually work?"* That's a completely different problem.

Behind that seemingly simple request is an explosion of combinations: 15 restaurants, 2 dates, a 3-hour window, multiple party sizes, multiple reservation platforms. Hundreds of live slots, every one of them valid. Showing all of them would be technically correct and completely unusable. The challenge wasn't retrieving the data. It was turning hundreds of possible answers into one understandable answer.

1. **The restaurant became the unit of decision.** People choose a restaurant first and a reservation second, so the interface groups everything by venue, letting users compare restaurants instead of timestamps.
2. **Show confidence, not completeness.** Users don't need twenty reservation times; they need confidence that a place is available. Each card surfaces the first few slots plus "+10 more": proof of availability without the noise. Depth lives one tap later.
3. **Context belongs in the header.** The plan itself defines the search: date range, time window, and party size appear once at the top, and every row below inherits that context instead of repeating it dozens of times.
4. **Answer the emotional question first.** Before scanning a single option, users want to know: *is this trip actually going to work?* One summary, "9 restaurants available," answers immediately. Exploration comes after.

Changing the shape of the user's question means redesigning the shape of the answer. Traditional apps optimize for finding one reservation; Snagr optimizes for planning across many restaurants, dates, times, and party sizes simultaneously. The hardest part wasn't the search engine. It was making an inherently exponential problem feel as effortless as asking a single question.

## How it evolved: four products, four lessons

1. **A live drop feed** of every opening in the city. Fun, useless: a table you don't care about is noise. *Engagement is not value.*
2. **A community hotlist** where users voted on what to watch. *People don't want jobs, they want outcomes.* Editors already curate; borrow their work.
3. **Watchlists, then shared watchlists.** Sharing exposed the truth: *dining is a group decision, and every tool out there is single-player.*
4. **Plans.** Not a list but an *occasion*: Friday, four people, this list, 7 to 9. That's how people actually think about dinner, so it became the only concept in the app.

I also deleted things I loved (the feed, the voting, a whole social layer; shared plans are collaborative, not social) and reversed myself once: plan emoji were cut on principle ("a plan is identified by its criteria"), then reinstated when real use proved criteria don't help you *recognize* your plan in a list. The reversal taught me more than either decision.

## Research, honestly

No interviews or usability tests ran pre-launch, and I'd rather say so than pretend. What existed: daily dogfooding (every plan was a dinner I truly wanted) and beta testers filing bugs by shaking their phone. Of the first five reports, three were *trust* bugs, not visual ones. Users tell you where it hurts when reporting costs them nothing. Next, in order: contextual interviews to pressure-test the personas and core hypothesis, then a two-week notification diary, because the line between "helpful" and "muted" is the product's whole life.

## What I learned

- **Engagement is not value.** The best Snagr session is fifteen seconds long and ends at a dinner table.
- **Trust is the actual product.** One tap on a dead table costs more than a week of silence. That's why nothing unverifiable is ever shown, why an empty state says "we're not watching this spot yet" instead of "no tables," and why only a specific ask earns a 2am interruption.
- **People want outcomes, not jobs.** Every feature that asked users to work (voting, curating, configuring) died. Every feature that quietly did the work survived.
- **Delete your darlings, and admit the reversals.** The feed, the voting, the social layer all went; the emoji came back. The reversal taught me more than either decision.
- **A solo builder's biggest risk is building for herself.** The next chapter of this product belongs to research.`;

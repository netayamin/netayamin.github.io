// Snagr case study, designer-voiced (~1074 words): the journey and
// the empathy behind it. Facts from docs/snagr-case-study.md in the snagr repo.
export const CASE_STUDY = `# Snagr — a product design journey

*A reservation-watching app for iOS. Solo: product, design, and build — 17 weeks from a feeling to TestFlight build 69.*

## Where it started

Every group of friends has one person who carries the dinner. They find the place on Infatuation or TikTok, drop it in the group chat, collect the "omg yes"s — and then the plan quietly dies, because the place is booked out and nobody has the energy to keep checking. I was that person. I knew the exact low-grade anxiety of opening Resy at midnight *just in case*, and the small shame of giving up and going to the same three places again.

That feeling is the product brief. Not "restaurant discovery" — discovery is solved, delightfully, by people whose whole job is editorial. The unsolved thing is the gap between *we should go* and *we have a table*: a stretch of days where the plan's survival depends on someone refreshing four apps at the right random moment. Humans are bad at that, and worse, it feels bad — you're either anxious or you've already quit.

## Who it's for

Two people, really. The **planner**, who feels responsible for the group's joy and absorbs all the checking. And the **flexible friend**, who genuinely doesn't care which of the six places they end up at — they just want to be told where to show up. Every tool on the market serves a third person who barely exists: the solo diner with one specific restaurant and infinite patience.

## What people were actually asking for

Not more restaurants. **Relief.** The insight that reframed everything: people aren't trying to find a place — they're trying to *stop checking* one. So Snagr's shape became: declare what you want once — these places, these nights, this party size — and then be gently interrupted the moment a real table opens. The lists people already trust become live, selectable objects: tick the spots you'd actually go to, scope it to your occasion, and watch them all in one place instead of ten tabs.

The best version of this app is almost invisible. Sixty seconds of setup, days of silence, fifteen seconds from push to booked. Success isn't a long session; it's a short one that ends at dinner.

## The journey — four products, each a lesson about people

**The drop feed.** V1 was a live feed of every table opening in the city. It was genuinely fun to watch — and useless, because a table at a restaurant you don't care about is noise. *Lesson: engagement is not value. People wanted less to look at, not more.*

**The community hotlist.** V2 asked users to vote on which restaurants deserved watching. Elegant on paper; in reality it handed users a chore. *Lesson: people don't want jobs, they want outcomes. Editors already curate beautifully — borrow their work, don't recreate it.*

**Watchlists, then shared watchlists.** V3 got close. And sharing revealed the truth underneath: dining is a group decision, and every existing tool is single-player. *Lesson: build for the group chat, not the individual.*

**Plans.** The final shape. A plan isn't a list of restaurants — it's an *occasion*: Friday, four people, somewhere on this list, 7 to 9. That's how people actually think about dinner, so it became the product's only concept.

Along the way I deleted things I loved: the feed, the voting, a whole social layer (comments, likes, presence — shared plans are *collaborative, not social*), and at one point plan names and emoji, cut on a tidy principle — "a plan is identified by its criteria" — then brought back when real use proved the principle wrong. Criteria describe a plan; they don't help you *recognize* yours in a list. Admitting that reversal taught me more than either decision.

## Empathy as design rules

The product's spine came from taking one user moment seriously: tapping a "live" table that's already gone. That tap is a small betrayal — worse than silence, because the app *promised*. Everything followed from refusing to cause it:

- **Never show false availability.** If we can't verify it, we don't show it.
- **"We're not watching this spot yet" — never "No tables."** An absence of information is not a negative fact, and dressing one up as the other is lying to someone who trusted you.
- **Specificity earns interruption.** A vague plan respects quiet hours. Only an exact ask — this night, this window, this party size — has permission to buzz you at 2am. And skipped pushes are never replayed at breakfast; a stale table with your coffee is exactly the burned trust we exist to prevent.
- **Prove you're alive.** An app that's invisible for days must whisper, "Checked a minute ago, watching 18 places for you," so silence reads as diligence, not abandonment.

## Listening, honestly

No formal interviews or usability tests ran before launch — I'd rather say that than invent research. What I had: living inside the product daily (every plan was a dinner I truly wanted), and beta testers who file bugs by shaking their phone. Their reports were the most humbling research of all: of the first five bugs, three were *trust* bugs — the app claiming something that wasn't true. Nobody reported a wrong corner radius. Users tell you exactly where it hurts, if the reporting costs them nothing.

What I'd run next, in order: contextual interviews with people who fought for a table last month (the core hypothesis deserves real scrutiny), and a two-week notification diary — because the line between "helpful" and "muted" is the product's whole life, and I refuse to pretend I've found it already.

## What I learned

That empathy isn't a phase of the process — it's the spec. The honest empty state, the un-replayed notification, the deleted social feed: each one is just respect for the user's attention and trust, expressed as a decision. And that a solo builder's greatest risk is building for herself — which is why the next chapter of this product belongs to research.

## Where it landed

TestFlight build 69, App Store review prepared, editorial guides across New York and Paris. Still open, and named out loud: notification fatigue doesn't have a design answer yet, and the catalog can't watch everything it shows. The journey continues — which is the most honest thing a 0 → 1 product can say.`;

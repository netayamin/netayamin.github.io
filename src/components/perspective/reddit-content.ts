// Reddit Marketing Manager (Snagr Marketing Console) case study. No em dashes.
export const REDDIT_STUDY = `# A human-in-the-loop AI console for Reddit growth

*Reddit Marketing Manager · Snagr Marketing Console · Design, Product, and Engineering*

**Tools:** Next.js 16 · TypeScript · Tailwind · zustand · SQLite · OpenAI · Playwright

## The problem

Snagr is an iOS app that turns editorial "best of" restaurant lists into ready-to-book dinner plans. Its early growth channel is Reddit: joining threads where people are already fighting for reservations and answering them genuinely, with a light product mention.

Doing that well by hand means reading hundreds of posts a day across ~34 food and travel subreddits, judging which ones are actually worth replying to, writing a reply that doesn't sound like marketing, and posting it from the right account, without ever crossing into spam. That's an operations problem, a writing problem, and a trust problem at once.

## The product

A local-first operator console built around one linear, three-step flow. The whole app fits in the header:

> **① Review → ② Ready → ③ Posted**

### ① Review: triage, one post at a time

No feeds, no infinite lists. One card at a time: the post, its stats, and a "Why this matched" panel showing the *actual* signals behind the match (the AI scout's one-sentence reason, intent classification, recency, engagement), never invented rationale. The operator skips or approves and the next card slides in. Keyboard-first (A/S), with browse arrows and a "34 left to review" counter for momentum.

A deliberate economics decision lives here: **no AI reply is generated during triage.** Drafting only happens for posts a human already approved, so model spend scales with accepted opportunities, not with everything the collector drags in.

### ② Ready: generate, shape, and post the reply

Approved posts queue up here. The operator generates the reply on demand, shapes it with tone controls ("More casual", "Shorter") and a disclosure toggle, and posts it: one click per post, always. A live "Open in Chromium" pane pops the real thread open in a logged-in browser session, so the operator sees exactly what Reddit sees before committing.

### ③ Posted: the record

Every published reply with its thread, performance, and *who* posted it.

## Multi-operator by design

The console is shared by a small team on one machine. A "Posting as" switcher in the header changes the active operator in one click: no logins, no friction. Behind it:

- every approve, skip, and post is **attributed** to the operator who made it
- each operator posts from **their own Reddit account** via an isolated persistent browser profile
- the AI's taste model trains on the team's combined decisions

## The AI pipeline and its guardrails

A four-stage pipeline with a human gate in the middle:

1. **Collector.** A browser-resident script sweeps subreddit listings every 30 minutes and streams them into the console, with a heartbeat, so a quiet inbox is never mistaken for a dead collector.
2. **Keyword gate.** Free, instant junk filtering before any model is called. About 70% of collected posts never cost a token.
3. **LLM scout.** Scores survivors 0 to 100 against a calibrated rubric, with few-shot examples drawn live from the operators' own recent decisions, blended with learned priors from past approvals.
4. **Writer + reviewer.** Drafts the reply in the team's custom voice prompt, then a second model pass checks relevance and quality without rewriting the style.

The guardrails are code, not vibes:

- **Disclosure is enforced in the pipeline.** Replies mention the product with a plain affiliation disclosure; a "pure advice" mode strips any product mention entirely, guaranteed by a post-processing backstop that runs after every model stage, so no combination of model outputs can ship an undisclosed mention.
- **No auto-posting.** Even the guided "Start posting" run-through requires a human click per reply. Posting drives a real browser via Playwright, detects logged-out, blocked, and challenge states before typing, and verifies the comment actually rendered before marking it posted.
- **Honest telemetry.** Collector heartbeat, Chromium session status, and per-model token spend are always visible.

## Design engineering details I care about

- **The flow is the information architecture.** Three numbered steps in the header replaced a conventional sidebar-and-pages layout. The UI *is* the process diagram.
- **State that can't lie.** The reply editor reconciles async AI drafts against in-progress human edits with a dirty-flag protocol, so a background regeneration can never clobber typing and an empty draft can never be silently approved.
- **Local-first pragmatism.** SQLite file, no auth ceremony, a browser tab as the data collector (the network blocks server-side Reddit access, so the collector runs where a real session already exists).
- **Test discipline.** The judgment-bearing seams (scoring application, mention stripping, prompt construction, match explanations, profile routing) are pure functions with unit tests; 55 tests run in under a second.

## Outcome

A team of operators can now triage a day's worth of Reddit (200+ collected posts) in minutes, spend model tokens only on posts worth answering, and publish genuinely helpful, disclosed replies from their own accounts, with every decision attributed and every safety property enforced in code rather than in a prompt's fine print.`;

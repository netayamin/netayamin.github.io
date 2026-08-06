// The engineering cut of the Snagr story, shown in the doc's Raw tab.
// Facts from docs/snagr-case-study.md (§14) in the snagr repo.
export const TECH_NOTES = `# snagr, the technical cut

*Same product, other lens: what it took to build the thing the design story describes.*

## stack, and what each piece bought

**iOS.** SwiftUI end to end (iOS 17 target); UIKit only where SwiftUI has no answer. The Xcode project is *generated* with XcodeGen from a project.yml, because an .xcodeproj is a merge-conflict machine and the repo deserves one readable source of truth. Inject provides hot reload: on a design-heavy app, the rebuild between two spacing values is the real tax on iteration. StoreKit 2 handles Snagr Pro with receipts verified server-side, never trusted from the client. APNs carries the product's entire point: being told without looking. TestFlight ships it, roughly one build per working day from July (build 69 by August 5).

## backend

Node.js + TypeScript, split into an API process and a worker process. Fastify for HTTP, chosen partly for first-class control over streaming. Drizzle + PostgreSQL, SQL-first on purpose: much of the polling scheduler *is* SQL and it needed to stay legible. Redis (Valkey) is the response cache, the live-feed revision counters, and the bridge that lets the worker publish events the API streams to clients over Server-Sent Events: one-way, reconnects natively, no WebSocket infrastructure to run. Zod validates input, pino logs everything (every number quoted in the design story came out of pino), jose signs JWTs, Sharp + S3 process and store venue images, Meilisearch powers restaurant search. Tests run on node:test via tsx, zero framework dependencies: 576 tests in about 13 seconds.

## availability acquisition, the hard part

Reservation platforms do not publish availability APIs. Zenchef (Paris) has an open endpoint and simply works. Resy, OpenTable, and SevenRooms sit behind bot protection, which is why this layer needed Playwright and a separate Python/FastAPI service rather than an HTTP client. That asymmetry became a product constraint, not just an engineering one: it forced the distinction between "no tables" and "we can't see," the honesty rule the whole design hangs on.

## demand is the scheduler

Polling cost scales as venues × dates × party sizes: 1,000 venues × 14 days × 5 party sizes is 70,000 checks per cycle, financially impossible at any real cadence. Plans solve the economics: a plan is a declaration of demand, so demand itself gates the poller. Snagr only checks what someone actually asked for, deduplicated across users. The free-tier limits (3 plans, 15 restaurants) are polling-budget numbers, exposed honestly as product limits.

## notifications, engineered as suppression

A poll finds new times → a deduplicated drop event → recipients resolved from active plans → each candidate re-checked against exact criteria before sending. Then the gates, in order: if a provider's circuit breaker is open, pushes are suppressed entirely and never replayed (late is worse than never); one opening matching three of your plans is one push; quiet-hour skips are never replayed at 8am, because stale tables at breakfast is the burned-trust failure; and collapse ids group the lock screen instead of stacking it.

## infrastructure

Render runs it all: a Docker web service for the API, a Docker background worker for the poller, a static landing site, managed Postgres, and managed Key Value for Redis, declared as infrastructure-as-code in render.yaml so environments are reproducible rather than click-configured. GitHub Actions covers iOS PR builds, an automated TestFlight release pipeline, and an issue-triage agent. The paper trail: 1,030 commits, ~47k lines of Swift, ~45k of TypeScript, and a decision log honest enough to include the reversals.`;

// Trace spans case study (Comet ML / Opik). Designer-voiced, no em dashes.
export const TRACE_STUDY = `# Reading an LLM's mind: the waterfall nobody had drawn yet

*Trace spans for LLM observability · Comet ML · Product Design Story*

**Tools:** Figma · React + TypeScript · Redux · shipped in Opik, Comet's open source LLM evaluation platform

## The context

2023 into 2024 at Comet ML. Teams everywhere were suddenly shipping LLM features, and a single user request was no longer one call: it fanned out into chains of prompts, tool calls, and nested completions. Observability for classic ML training existed. Observability for *LLM applications* did not; it wasn't a product category yet and there were no established patterns to borrow. We were building what launched in September 2024 as **Opik**, Comet's fully open source LLM evaluation platform, built on three components: observability (record, sort, search, and understand each step an LLM application takes to generate a response), model unit testing with built-in LLM judges, and scoring across datasets and experiments. I designed and built the heart of the observability piece: how a trace is read.

## Who it was for

Opik positioned itself as a bridge between software engineering and data science, and the audience lived on that bridge: ML engineers and application developers shipping LLM features with a low tolerance for failure, debugging three questions, always the same three: why is it slow, why is it wrong, and what did it cost. They were not APM specialists. A Datadog or Jaeger flame graph was a foreign country to most of them, so borrowing enterprise APM wholesale would have answered the layout question while failing the audience.

## The problem

In this world, a **trace** is the complete story of one request, and **spans** are the individual operations inside it: chains, prompt calls, tool invocations, nested completions. Which makes a trace three things at once: a **tree** (what called what), a **timeline** (where the time went), and a **bill** (where the tokens went). Teams needed it to answer real debugging questions: why is this multi-step flow slow, which step produced the bad answer, and what did the whole thing cost. Before this component they read their chains as raw JSON blobs or flat log lists; structure was invisible, the bottleneck was invisible, and cost was a column of numbers you added up in your head. The design challenge was making all three readable in one glance without teaching anyone a new diagram.

## The user flow

Opik's observability starts wide: a **traces table**, one row per request, with start time, input, output, and feedback scores side by side. That's where debugging begins, scanning hundreds of rows (the project on the board holds 334) for the one that scored badly or reads wrong. Click a row and a **drawer slides over the table**: the trace opens as its tree of spans. Click a span and a detail pane joins it: full inputs and outputs, feedback scores, metadata, annotate and add-to-dataset actions.

Three levels, and each click narrows the scope. The table answers *which request*. The spans tree answers *where inside it*. The detail pane answers *what exactly happened*. The spans component is the spine of that drill-down, and it does its whole job inside a drawer, without a page transition, while the table waits underneath.

## The design

1. **Structure on the left, cost on the right.** Indentation and guide lines carry causality; right-aligned duration bars carry time. Your eye reads the tree downward and the expense sideways, and neither fights the other.
2. **Color means type, always.** Purple for the trace root, green for chains, blue for LLM calls. A glance tells you what kind of work each row is before you read a word. The palette never decorates; it classifies.
3. **Bars are proportional to the trace root.** No log scales, no per-row normalization. When one completion takes 4.3s of a 4.9s trace, its bar says so at full length and the bottleneck identifies itself. The 0.7s sibling barely registers, which is exactly the truth.
4. **Metadata lives under the bar, not in the row.** Duration and token count sit in a quiet line beneath each bar. Rows stay one line tall, names stay scannable, and spans without tokens (chains, tools) simply show less, no empty columns. At the width this component actually got, a metadata column would have been fatal.
5. **Built to collapse.** Agent frameworks produce deep, repetitive trees. Chevrons per parent plus a collapse-all keep a fifty-span trace navigable, and guide lines keep your place when it's open.

## What made it hard

- **Durations spanning three orders of magnitude** in one trace: a 40ms tool call next to a 4-second completion, both needing an honest bar.
- **Legitimate duplicate names.** A wrapper chain and its root can share a name (you can see generate_opik_story twice in the shipped screen). The type icon, not the label, is what disambiguates, which is why color-as-type had to be strict.
- **Ragged metadata.** Tokens exist only on LLM spans. The under-bar line had to degrade gracefully instead of forcing a grid of empty cells.
- **A sliver of screen, nested in a drawer.** The component never got a page of its own. It rendered inside the slide-over drawer, wedged between the trace list it came from and the span detail it feeds, routinely squeezed to a few hundred pixels. That killed every APM convention that assumes width: no time axis, no column grid, no room for labels to breathe. Everything had to stack vertically: bar under name, metadata under bar, type carried by an icon so the label could truncate without losing meaning.
- **No prior art to lean on.** Users had never seen an "LLM trace" before. Every choice had to be self-explanatory on first contact, because there was no convention to fall back on.

## What happened

It shipped, and it held. Opik launched in September 2024 as a true open source project, with tracing in both development and production, and the pattern became the way its traces read; the screenshot on the board is the shipped product. LLM observability grew into a real category, and the tree-plus-proportional-bars-plus-tokens reading became the standard way the industry shows this data. We drew the waterfall before there was a name for it.

## What I learned

- **Borrow the user's mental model, not the incumbent tool's.** The audience thought in chains and calls, not in flame graphs. Meeting them there mattered more than APM correctness.
- **When there's no convention, clarity is the convention.** A first-of-its-kind screen doesn't get a tutorial. If a row needs explaining, the row is wrong.
- **Design the pathological case first.** The fifty-span agent trace, the duplicate names, the missing tokens. The pretty four-span demo takes care of itself.`;

"use client";

import { useState } from "react";

// A markdown document card with its own Preview/Raw switch (the switch
// belongs to the document, not the window). Preview renders a minimal
// markdown subset: #/##/### headings, -/1. lists, > quotes, **bold**,
// *italic*. Raw shows the highlighted source.
export function mdSlug(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

type Tone = "h1" | "h2" | "h3" | "bullet" | "quote" | "meta" | "body";

const RAW_TONE_CLASS: Record<Tone, string> = {
  h1: "text-[#0d78c9] font-bold dark:text-[#5dd8ff]",
  h2: "text-[#c2255c] font-semibold dark:text-[#fc5fa3]",
  h3: "text-neutral-900 font-semibold dark:text-neutral-100",
  bullet: "text-neutral-500 dark:text-neutral-400",
  quote: "text-[#b08900] italic dark:text-[#d0bf69]",
  meta: "text-neutral-400 dark:text-[#6c7986]",
  body: "text-neutral-700 dark:text-neutral-300",
};

function classify(line: string): Tone {
  const t = line.trimStart();
  if (t.startsWith("# ")) return "h1";
  if (t.startsWith("## ")) return "h2";
  if (t.startsWith("### ")) return "h3";
  if (t.startsWith("- ") || /^\d+\.\s/.test(t)) return "bullet";
  if (t.startsWith(">")) return "quote";
  if (t.startsWith("---")) return "meta";
  return "body";
}

function inline(text: string): React.ReactNode[] {
  return text.split(/(\*\*[^*]+\*\*|\*[^*]+\*)/g).map((part, i) => {
    if (part.startsWith("**") && part.endsWith("**"))
      return (
        <strong key={i} className="font-semibold text-fg">
          {part.slice(2, -2)}
        </strong>
      );
    if (part.startsWith("*") && part.endsWith("*"))
      return (
        <em key={i} className="text-muted">
          {part.slice(1, -1)}
        </em>
      );
    return part;
  });
}

export function Formatted({ source }: { source: string }) {
  const lines = source.split("\n");
  const blocks: React.ReactNode[] = [];
  let list: string[] = [];
  let ordered = false;

  const flushList = () => {
    if (!list.length) return;
    const Tag = ordered ? "ol" : "ul";
    blocks.push(
      <Tag
        key={blocks.length}
        className={`flex flex-col gap-1.5 pl-5 text-[13.5px] leading-relaxed text-neutral-700 dark:text-neutral-300 ${
          ordered ? "list-decimal" : "list-disc"
        } marker:text-accent`}
      >
        {list.map((item, i) => (
          <li key={i}>{inline(item)}</li>
        ))}
      </Tag>,
    );
    list = [];
  };

  lines.forEach((line) => {
    const t = line.trim();
    if (t.startsWith("- ")) {
      if (list.length && ordered) flushList();
      ordered = false;
      list.push(t.slice(2));
      return;
    }
    const num = t.match(/^\d+\.\s+(.*)$/);
    if (num) {
      if (list.length && !ordered) flushList();
      ordered = true;
      list.push(num[1]);
      return;
    }
    flushList();
    if (!t) return;
    if (t === "---") {
      blocks.push(<hr key={blocks.length} className="border-line dark:border-white/10" />);
      return;
    }
    if (t.startsWith("# ")) {
      blocks.push(
        <h1 key={blocks.length} className="text-[22px] font-bold leading-tight tracking-tight">
          {t.slice(2)}
        </h1>,
      );
    } else if (t.startsWith("## ")) {
      blocks.push(
        <h2
          key={blocks.length}
          data-md-anchor={mdSlug(t.slice(3))}
          className="mt-2 text-[16px] font-bold tracking-tight"
        >
          {t.slice(3)}
        </h2>,
      );
    } else if (t.startsWith("### ")) {
      blocks.push(
        <h3 key={blocks.length} className="mt-1 text-[14px] font-semibold">
          {t.slice(4)}
        </h3>,
      );
    } else if (t.startsWith("> ")) {
      blocks.push(
        <blockquote
          key={blocks.length}
          className="flex gap-2.5 rounded-lg bg-fg/[0.04] px-3.5 py-2.5 text-[13.5px] leading-relaxed text-fg/85 dark:bg-white/[0.06]"
        >
          <span>{inline(t.slice(2))}</span>
        </blockquote>,
      );
    } else {
      blocks.push(
        <p
          key={blocks.length}
          className="text-[13.5px] leading-relaxed text-neutral-700 dark:text-neutral-300"
        >
          {inline(t)}
        </p>,
      );
    }
  });
  flushList();

  return <div className="flex flex-col gap-3.5">{blocks}</div>;
}

function Raw({ source }: { source: string }) {
  return (
    <pre className="whitespace-pre-wrap break-words font-mono text-[12px] leading-[1.7]">
      {source.split("\n").map((line, i) => (
        <div key={i} className={RAW_TONE_CLASS[classify(line)]}>
          {line || " "}
        </div>
      ))}
    </pre>
  );
}

export default function MarkdownDoc({
  source,
  rawSource,
}: {
  source: string;
  rawSource?: string; // an alternate story for the raw tab (e.g. the engineering cut)
  icon?: string; // accepted but unused — docs are emoji-free
}) {
  const [raw, setRaw] = useState(false);
  const activeSource = raw && rawSource ? rawSource : source;
  const lines = activeSource.split("\n");
  const titleLine = lines.find((l) => l.startsWith("# "));
  const title = titleLine ? titleLine.slice(2) : "Untitled";
  const body = lines.filter((l) => l !== titleLine).join("\n");
  const rawBody = rawSource ? rawSource.split("\n").filter((l) => !l.startsWith("# ")).join("\n") : source;

  return (
    <div className="rounded-xl border border-black/5 bg-white/60 px-9 py-8 dark:border-white/10 dark:bg-white/[0.04]">
      <div className="mb-2 flex items-start justify-end">
        <div className="flex overflow-hidden rounded-md border border-line text-[10px] dark:border-white/15">
          <button
            type="button"
            onClick={() => setRaw(false)}
            className={`px-2 py-1 ${!raw ? "bg-accent-soft font-medium text-accent" : "text-muted hover:text-fg"}`}
          >
            {rawSource ? "Design" : "Preview"}
          </button>
          <button
            type="button"
            onClick={() => setRaw(true)}
            className={`px-2 py-1 ${raw ? "bg-accent-soft font-medium text-accent" : "text-muted hover:text-fg"}`}
          >
            {rawSource ? "Engineering" : "Raw"}
          </button>
        </div>
      </div>
      <h1 className="mb-5 font-[family-name:var(--font-serif)] text-[30px] font-semibold italic leading-[1.15] tracking-tight">{title}</h1>
      {raw ? <Raw source={rawBody} /> : <Formatted source={body} />}
    </div>
  );
}

import type { Metadata } from "next";
import Workspace from "@/components/Workspace";

export const metadata: Metadata = {
  title: "Trace spans — Neta",
  description:
    "Designing trace spans for LLM observability at Comet ML, before LLM observability was a category. Still shipping today.",
};

export default function TraceSpansPage() {
  return <Workspace initial="tracespans" />;
}

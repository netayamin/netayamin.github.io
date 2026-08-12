import type { Metadata } from "next";
import Workspace from "@/components/Workspace";

export const metadata: Metadata = {
  title: "Reddit Marketing Manager — Neta",
  description:
    "A human-in-the-loop AI console for Reddit growth: triage, drafting, and posting with every safety property enforced in code.",
};

export default function RedditMarketingPage() {
  return <Workspace initial="redditmanager" />;
}

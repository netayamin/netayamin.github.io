import type { Metadata } from "next";
import Workspace from "@/components/Workspace";

export const metadata: Metadata = {
  title: "Heads Off — Neta",
  description:
    "Designing a social iOS word game around one deceptively simple mechanic: solve the clue, take the first letter's head off, solve again.",
};

export default function HeadsOffPage() {
  return <Workspace initial="headsoff" />;
}

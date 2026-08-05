import type { Metadata } from "next";
import Workspace from "@/components/Workspace";

export const metadata: Metadata = {
  title: "Snagr — Neta",
  description:
    "Snagr product design case study: designing for a question reservation apps were never built to answer.",
};

export default function SnagrPage() {
  return <Workspace initial="snagr" />;
}

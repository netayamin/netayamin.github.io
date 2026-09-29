"use client";

import { createContext, useContext, useEffect, useState } from "react";

export type PageId = "me" | "snagr" | "tracespans" | "headsoff";

const BASE = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

function pathFor(page: PageId): string {
  if (page === "snagr") return `${BASE}/projects/snagr/`;
  if (page === "tracespans") return `${BASE}/projects/trace-spans/`;
  if (page === "headsoff") return `${BASE}/projects/heads-off/`;
  return `${BASE}/`;
}

function pageFromPath(pathname: string): PageId {
  if (pathname.includes("/projects/snagr")) return "snagr";
  if (pathname.includes("/projects/trace-spans")) return "tracespans";
  if (pathname.includes("/projects/heads-off")) return "headsoff";
  return "me";
}

const PageContext = createContext<{
  page: PageId;
  setPage: (page: PageId) => void;
}>({ page: "me", setPage: () => {} });

export function PageProvider({
  initial = "me",
  children,
}: {
  initial?: PageId;
  children: React.ReactNode;
}) {
  const [page, setPageState] = useState<PageId>(initial);

  const setPage = (next: PageId) => {
    setPageState(next);
    window.history.pushState({}, "", pathFor(next));
  };

  useEffect(() => {
    const onPop = () => setPageState(pageFromPath(window.location.pathname));
    window.addEventListener("popstate", onPop);
    return () => window.removeEventListener("popstate", onPop);
  }, []);

  return (
    <PageContext.Provider value={{ page, setPage }}>
      {children}
    </PageContext.Provider>
  );
}

export function usePage() {
  return useContext(PageContext);
}

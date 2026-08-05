"use client";

import { createContext, useContext, useEffect, useState } from "react";

export type PageId = "me" | "snagr";

const BASE = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

function pathFor(page: PageId): string {
  return page === "snagr" ? `${BASE}/projects/snagr/` : `${BASE}/`;
}

function pageFromPath(pathname: string): PageId {
  return pathname.includes("/projects/snagr") ? "snagr" : "me";
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

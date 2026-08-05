"use client";

import { createContext, useContext, useState } from "react";

export type PageId = "me" | "snagr";

const PageContext = createContext<{
  page: PageId;
  setPage: (page: PageId) => void;
}>({ page: "me", setPage: () => {} });

export function PageProvider({ children }: { children: React.ReactNode }) {
  const [page, setPage] = useState<PageId>("me");
  return (
    <PageContext.Provider value={{ page, setPage }}>
      {children}
    </PageContext.Provider>
  );
}

export function usePage() {
  return useContext(PageContext);
}

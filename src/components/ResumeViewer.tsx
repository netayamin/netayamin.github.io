"use client";

import { useEffect } from "react";
import { Download, X } from "lucide-react";

// In-page resume viewer: the PDF in a clean modal with a download button.
export default function ResumeViewer({ onClose }: { onClose: () => void }) {
  const pdf = `${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}/resume.pdf`;

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-6 backdrop-blur-[2px]"
      onClick={onClose}
    >
      <div
        className="flex h-[88vh] w-full max-w-3xl flex-col overflow-hidden rounded-2xl bg-card shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between border-b border-line px-5 py-3">
          <p className="text-[14px] font-semibold">Resume — Neta Yamin</p>
          <div className="flex items-center gap-2">
            <a
              href={pdf}
              download="Neta-Yamin-Resume.pdf"
              className="flex items-center gap-1.5 rounded-lg bg-fg px-3 py-1.5 text-[12px] font-medium text-bg transition-opacity hover:opacity-85"
            >
              <Download size={13} />
              Download
            </a>
            <button
              type="button"
              aria-label="Close resume"
              onClick={onClose}
              className="flex h-8 w-8 items-center justify-center rounded-lg text-muted transition-colors hover:bg-fg/5 hover:text-fg"
            >
              <X size={16} />
            </button>
          </div>
        </div>
        <iframe src={pdf} title="Resume PDF" className="min-h-0 w-full flex-1 bg-white" />
      </div>
    </div>
  );
}

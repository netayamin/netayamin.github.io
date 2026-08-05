import MarkdownDoc from "./MarkdownDoc";
import { CASE_STUDY } from "./case-study-content";

// Snagr's text lens: the case study as a markdown document.
export default function SnagrDeveloper() {
  return (
    <div className="min-h-full bg-card pb-16">
      <div className="sticky top-0 z-10 flex items-center gap-3 border-b border-line bg-bg px-4 py-2 dark:bg-[#28282e]">
        <span className="flex gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
        </span>
        <span className="font-mono text-[11px] text-neutral-500 dark:text-neutral-400">
          Portfolio <span className="text-neutral-400 dark:text-neutral-600">›</span> Snagr{" "}
          <span className="text-neutral-400 dark:text-neutral-600">›</span>{" "}
          <span className="font-medium text-fg">snagr-case-study.md</span>
        </span>
      </div>

      <div className="w-1/2">
        <div className="mx-auto w-[94%] max-w-[560px] pt-10">
          <MarkdownDoc source={CASE_STUDY} />
        </div>
      </div>
    </div>
  );
}

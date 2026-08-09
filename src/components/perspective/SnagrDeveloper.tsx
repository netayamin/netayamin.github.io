import MarkdownDoc from "./MarkdownDoc";
import { CASE_STUDY } from "./case-study-content";
import { TECH_NOTES } from "./snagr-tech-content";

// Snagr's text lens: the case study as a markdown document.
export default function SnagrDeveloper() {
  return (
    <div className="relative min-h-full bg-[#f0f0f3] pb-16 dark:bg-[#2c2c2e]">
      
      <div className="w-full">
        <div className="ml-10 pt-6">
          <a
            href="https://apps.apple.com/us/app/snagr-live-editorial-dining/id6783079978"
            target="_blank"
            rel="noopener noreferrer"
            className="mb-3 inline-flex items-center gap-2 rounded-full border border-black/10 bg-white/70 px-4 py-1.5 text-[12px] font-medium text-neutral-800 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md dark:border-white/15 dark:bg-white/[0.06] dark:text-neutral-100"
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
            </span>
            Live on the App Store
            <span aria-hidden>&rarr;</span>
          </a>
          <MarkdownDoc source={CASE_STUDY} rawSource={TECH_NOTES} icon="🍽️" />
        </div>
      </div>
    </div>
  );
}

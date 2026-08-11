import MarkdownDoc from "./MarkdownDoc";
import { HEADSOFF_STUDY } from "./headsoff-content";

// Heads Off: the design story as a Notion-style document.
export default function HeadsOffDeveloper() {
  return (
    <div className="relative min-h-full bg-[#f0f0f3] pb-16 dark:bg-[#2c2c2e]">
      <div className="w-full">
        <div className="ml-10 pt-6">
          <MarkdownDoc source={HEADSOFF_STUDY} icon="👑" />
        </div>
      </div>
    </div>
  );
}

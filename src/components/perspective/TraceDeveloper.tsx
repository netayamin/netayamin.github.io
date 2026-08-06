import MarkdownDoc from "./MarkdownDoc";
import { TRACE_STUDY } from "./trace-content";

// Trace spans: the design story as a Notion-style document.
export default function TraceDeveloper() {
  return (
    <div className="relative min-h-full bg-[#f0f0f3] pb-16 dark:bg-[#2c2c2e]">
      <div className="w-full">
        <div className="ml-10 pt-6">
          <MarkdownDoc source={TRACE_STUDY} icon="🔬" />
        </div>
      </div>
    </div>
  );
}

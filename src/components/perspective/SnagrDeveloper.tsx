import MarkdownDoc from "./MarkdownDoc";
import { CASE_STUDY } from "./case-study-content";

// Snagr's text lens: the case study as a markdown document.
export default function SnagrDeveloper() {
  return (
    <div className="min-h-full bg-[#f0f0f3] pb-16 dark:bg-[#2c2c2e]">
      
      <div className="w-1/2">
        <div className="mx-auto w-[94%] max-w-[560px] pt-10">
          <MarkdownDoc source={CASE_STUDY} />
        </div>
      </div>
    </div>
  );
}

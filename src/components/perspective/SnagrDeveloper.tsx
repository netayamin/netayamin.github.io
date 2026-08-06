import MarkdownDoc from "./MarkdownDoc";
import { CASE_STUDY } from "./case-study-content";
import { TECH_NOTES } from "./snagr-tech-content";

// Snagr's text lens: the case study as a markdown document.
export default function SnagrDeveloper() {
  return (
    <div className="relative min-h-full bg-[#f0f0f3] pb-16 dark:bg-[#2c2c2e]">
      
      <div className="w-full">
        <div className="ml-10 pt-6">
          <MarkdownDoc source={CASE_STUDY} rawSource={TECH_NOTES} icon="🍽️" />
        </div>
      </div>
    </div>
  );
}

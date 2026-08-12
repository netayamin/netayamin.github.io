import MarkdownDoc from "./MarkdownDoc";
import { REDDIT_STUDY } from "./reddit-content";

// Reddit Marketing Manager: the design story as a Notion-style document.
export default function RedditDeveloper() {
  return (
    <div className="relative min-h-full bg-[#f0f0f3] pb-16 dark:bg-[#2c2c2e]">
      <div className="w-full">
        <div className="ml-10 pt-6">
          <MarkdownDoc source={REDDIT_STUDY} icon="📣" />
        </div>
      </div>
    </div>
  );
}

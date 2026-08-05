import { Mail } from "lucide-react";
import { GitHubIcon, LinkedInIcon } from "./BrandIcons";

// Phones get a wink instead of a squished workspace.
export default function MobileGate() {
  return (
    <div className="flex min-h-dvh flex-col items-center justify-center gap-6 px-8 text-center lg:hidden">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={`${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}/mazi.jpg`}
        alt="Mazi the dog"
        className="h-24 w-24 rounded-full object-cover shadow-lg"
      />
      <div>
        <p className="text-2xl font-bold tracking-tight">
          Sorry — no mobile version 🙈
        </p>
        <p className="mx-auto mt-3 max-w-[340px] text-[14px] leading-relaxed text-muted">
          This portfolio is a Figma canvas and an Xcode window sitting side by
          side. On your phone, that&rsquo;s just two very sad rectangles.
        </p>
        <p className="mx-auto mt-3 max-w-[340px] text-[14px] leading-relaxed text-muted">
          I promise I&rsquo;m genuinely good at responsive UI — this is a
          creative decision, not a skill issue. 🤞
        </p>
        <p className="mt-3 text-[14px] font-medium">
          Come back on a bigger screen. Mazi is waiting. 🐶
        </p>
      </div>
      <div className="flex items-center gap-6 text-sm text-fg/80">
        <a href="https://www.linkedin.com/" className="flex items-center gap-1.5">
          <LinkedInIcon size={15} /> LinkedIn
        </a>
        <a href="https://github.com/netayamin" className="flex items-center gap-1.5">
          <GitHubIcon size={15} /> GitHub
        </a>
        <a href="mailto:netayamin@gmail.com" className="flex items-center gap-1.5">
          <Mail size={15} /> Email
        </a>
      </div>
    </div>
  );
}

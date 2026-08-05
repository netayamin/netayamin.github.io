import { Mail } from "lucide-react";
import { LinkedInIcon } from "./BrandIcons";

// Phones get a wink instead of a squished workspace.
export default function MobileGate() {
  return (
    <div className="flex min-h-dvh flex-col items-center justify-center gap-7 px-7 text-center lg:hidden">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={`${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}/mazi.jpg`}
        alt="Mazi the dog"
        className="h-28 w-28 rounded-full object-cover shadow-lg"
      />
      <div>
        <p className="text-[26px] font-bold leading-tight tracking-tight">
          No mobile version.
          <br />
          On purpose. 🙈
        </p>
        <p className="mx-auto mt-4 max-w-[360px] text-[16px] leading-relaxed text-fg/85">
          This portfolio is a <strong>Figma canvas</strong> and an{" "}
          <strong>Xcode window</strong> sitting side by side — a desktop
          workspace you explore. Squeezed onto a phone, it&rsquo;s just two
          very sad rectangles.
        </p>
      </div>
      <div className="max-w-[360px] rounded-2xl bg-accent-soft px-5 py-4">
        <p className="text-[15px] font-semibold leading-snug text-accent">
          To be clear: I&rsquo;m genuinely good at responsive UI. 🤞
        </p>
        <p className="mt-1.5 text-[13px] leading-relaxed text-fg/70">
          This is a creative decision, not a skill issue — ask any design
          system I&rsquo;ve built.
        </p>
      </div>
      <p className="text-[15px] font-medium">
        Come back on a bigger screen — Mazi is waiting. 🐶
      </p>
      <div className="flex items-center gap-6 text-sm text-fg/80">
        <a href="https://www.linkedin.com/" className="flex items-center gap-1.5">
          <LinkedInIcon size={15} /> LinkedIn
        </a>
        <a href="mailto:netayamin@gmail.com" className="flex items-center gap-1.5">
          <Mail size={15} /> Email
        </a>
      </div>
    </div>
  );
}

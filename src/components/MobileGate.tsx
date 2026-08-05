import { FileText, Mail } from "lucide-react";
import { LinkedInIcon } from "./BrandIcons";

// Phones get a wink instead of a squished workspace.
export default function MobileGate() {
  const base = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
  return (
    <div className="flex min-h-dvh flex-col items-center justify-center gap-7 px-7 text-center lg:hidden">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={`${base}/mazi.jpg`}
        alt="Mazi the dog"
        className="h-28 w-28 rounded-full object-cover shadow-lg"
      />
      <div>
        <p className="text-[26px] font-bold leading-tight tracking-tight">
          No mobile version.
          <br />
          On purpose.
        </p>
        <p className="mx-auto mt-4 max-w-[330px] text-[15px] leading-relaxed text-fg/85">
          Responsive UI is my specialty, which is exactly how I know this
          page deserves a bigger screen. Mazi (my dog) will be waiting.
        </p>
      </div>
      <div className="flex items-center gap-6 text-sm font-medium text-fg/85">
        <a href={`${base}/resume.pdf`} className="flex items-center gap-1.5">
          <FileText size={15} /> Resume
        </a>
        <a href="https://www.linkedin.com/in/neta-y/" className="flex items-center gap-1.5">
          <LinkedInIcon size={15} /> LinkedIn
        </a>
        <a href="mailto:netayamin@gmail.com" className="flex items-center gap-1.5">
          <Mail size={15} /> Email
        </a>
      </div>
    </div>
  );
}

import { Mail } from "lucide-react";

function LinkedinIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5ZM3 9h4v12H3V9Zm7 0h3.8v1.7h.05c.53-1 1.83-2.05 3.77-2.05 4.03 0 4.78 2.65 4.78 6.1V21h-4v-5.7c0-1.36-.03-3.1-1.9-3.1-1.9 0-2.2 1.48-2.2 3v5.8h-4V9Z" />
    </svg>
  );
}

function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} className={className}>
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.2" cy="6.8" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

export default function BottomBar() {
  return (
    <div className="flex items-center justify-between border-t border-neutral-200 px-6 py-6 text-xs text-neutral-400 md:px-10">
      <p>© 2026 Neta Yamin &amp; Mazal, Chief Happiness Officer (unpaid, mostly treats)</p>

      <div className="flex items-center gap-4">
        <a href="mailto:netayamin@gmail.com" aria-label="Email" className="transition hover:text-neutral-900">
          <Mail className="h-4 w-4" strokeWidth={1.75} />
        </a>
        <a href="#" aria-label="LinkedIn" className="transition hover:text-neutral-900">
          <LinkedinIcon className="h-4 w-4" />
        </a>
        <a href="#" aria-label="Instagram" className="transition hover:text-neutral-900">
          <InstagramIcon className="h-4 w-4" />
        </a>
      </div>
    </div>
  );
}

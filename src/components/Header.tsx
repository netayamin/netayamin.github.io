import ZeroToOne from "./ZeroToOne";

export default function Header() {
  return (
    <header className="flex h-12 shrink-0 items-center border-b border-line px-5">
      <span
        className="text-[13px] font-medium text-muted"
        aria-label="Going from 0 to 1 is possible."
      >
        <ZeroToOne />
      </span>
    </header>
  );
}

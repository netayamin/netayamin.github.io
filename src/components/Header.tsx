import ZeroToOne from "./ZeroToOne";

export default function Header() {
  return (
    <header className="flex h-12 shrink-0 items-center border-b border-line px-5">
      <span
        className="text-[13px] font-medium text-muted"
        aria-label="Nothing is impossible — the im is just misallocated. Reallocating: improve, impress, impact."
      >
        <ZeroToOne />
      </span>
    </header>
  );
}

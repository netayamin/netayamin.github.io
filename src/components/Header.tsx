import ZeroToOne from "./ZeroToOne";

export default function Header() {
  return (
    <header className="flex h-12 shrink-0 items-center border-b border-line px-5">
      <span
        className="text-[13px] font-medium text-muted"
        aria-label="Impossible is just possible holding an im. I put the im to work: improve, impress, impact."
      >
        <ZeroToOne />
      </span>
    </header>
  );
}

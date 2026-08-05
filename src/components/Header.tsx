import { GitHubIcon } from "./BrandIcons";
import ThemeToggle from "./ThemeToggle";

const NAV = ["Work", "About", "Playground"];

export default function Header() {
  return (
    <header className="flex items-center justify-between px-8 py-5 lg:px-12">
      <div className="flex items-baseline gap-3">
        <span className="text-2xl font-bold tracking-tight">Neta</span>
        <span className="text-sm text-muted">Design Engineer</span>
      </div>

      <div className="flex items-center gap-2">
        <nav className="mr-4 hidden items-center gap-7 text-sm font-medium text-fg/80 md:flex">
          {NAV.map((item) => (
            <a key={item} href="#" className="transition-colors hover:text-fg">
              {item}
            </a>
          ))}
        </nav>
        <ThemeToggle />
        <a
          href="https://github.com/netayamin"
          target="_blank"
          rel="noreferrer"
          className="ml-2 flex items-center gap-2 rounded-xl bg-fg px-4 py-2 text-sm font-medium text-bg transition-opacity hover:opacity-85"
        >
          <GitHubIcon size={16} />
          GitHub
        </a>
      </div>
    </header>
  );
}

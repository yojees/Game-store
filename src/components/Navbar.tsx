import { useState } from 'react';
import { Gamepad2, Menu, Search, X } from 'lucide-react';

interface NavbarProps {
  totalGames: number;
  searchQuery: string;
  onSearchChange: (value: string) => void;
  onNavigate: (sectionId: string) => void;
}

const NAV_LINKS = [
  { label: 'Home', target: 'home' },
  { label: 'All Games', target: 'all-games' },
  { label: 'Categories', target: 'categories' },
];

export default function Navbar({
  totalGames,
  searchQuery,
  onSearchChange,
  onNavigate,
}: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLinkClick = (target: string) => {
    setMobileMenuOpen(false);
    onNavigate(target);
  };

  return (
    <header className="sticky top-0 z-40 border-b border-[#C084FC]/12 bg-[#0B0712]/92 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-[1440px] items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        {/* Left: GAMEVAULT logo with purple gaming icon */}
        <a
          href="#home"
          onClick={(e) => {
            e.preventDefault();
            handleLinkClick('home');
          }}
          className="flex shrink-0 items-center gap-2.5 whitespace-nowrap rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#A855F7]"
        >
          <span className="flex h-9 w-9 items-center justify-center rounded-lg border border-[#C084FC]/30 bg-[#9333EA]/20 text-[#C084FC] shadow-[0_0_16px_rgba(147,51,234,0.28)]">
            <Gamepad2 className="h-5 w-5" strokeWidth={2} />
          </span>
          <span className="font-display text-lg font-bold tracking-wider text-white">
            GAMEVAULT
          </span>
        </a>

        {/* Center: Home, All Games, Categories */}
        <nav
          aria-label="Primary Navigation"
          className="hidden md:flex items-center gap-7"
        >
          {NAV_LINKS.map((link) => (
            <a
              key={link.target}
              href={`#${link.target}`}
              onClick={(e) => {
                e.preventDefault();
                handleLinkClick(link.target);
              }}
              className="whitespace-nowrap shrink-0 text-sm font-medium text-[#A99BBE] transition-colors duration-150 hover:text-[#C084FC] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#A855F7] rounded px-1 py-1"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Right: Search bar + Total games counter */}
        <div className="flex shrink-0 items-center gap-3 sm:gap-4">
          <div className="relative hidden sm:block w-48 lg:w-60">
            <Search
              aria-hidden="true"
              className="pointer-events-none absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-[#A99BBE]"
            />
            <input
              type="search"
              value={searchQuery}
              onChange={(e) => {
                onSearchChange(e.target.value);
              }}
              placeholder="Quick search..."
              aria-label="Quick search games"
              className="h-9 w-full rounded-lg border border-[#C084FC]/18 bg-[#130D20] pr-8 pl-9 text-xs text-white placeholder-[#A99BBE]/75 transition-colors focus:border-[#A855F7] focus:outline-none"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => onSearchChange('')}
                aria-label="Clear quick search"
                className="absolute top-1/2 right-2 -translate-y-1/2 text-[#A99BBE] hover:text-white cursor-pointer"
              >
                <X className="h-3.5 w-3.5" />
              </button>
            )}
          </div>

          <span className="whitespace-nowrap shrink-0 text-xs font-semibold text-[#C084FC] tabular-nums sm:text-sm">
            {totalGames} Games
          </span>

          <button
            type="button"
            aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={mobileMenuOpen}
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-[#C084FC]/15 bg-[#130D20] text-white transition-colors hover:border-[#A855F7]/50 md:hidden cursor-pointer"
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown */}
      {mobileMenuOpen && (
        <div className="border-t border-[#C084FC]/10 bg-[#130D20] px-4 py-3 md:hidden">
          <nav aria-label="Mobile Navigation" className="flex flex-col gap-1">
            {NAV_LINKS.map((link) => (
              <a
                key={link.target}
                href={`#${link.target}`}
                onClick={(e) => {
                  e.preventDefault();
                  handleLinkClick(link.target);
                }}
                className="flex min-h-[44px] items-center rounded-lg px-3 text-sm font-medium text-[#A99BBE] transition-colors hover:bg-[#1A1229] hover:text-white"
              >
                {link.label}
              </a>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}

import { Gamepad2 } from 'lucide-react';
import type { FooterInfoPage } from './InfoModal';

interface FooterProps {
  onNavigate: (sectionId: string) => void;
  onOpenInfo: (page: Exclude<FooterInfoPage, null>) => void;
}

export default function Footer({ onNavigate, onOpenInfo }: FooterProps) {
  return (
    <footer className="border-t border-[#C084FC]/12 bg-[#0B0712] py-8">
      <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-center">
          <a
            href="#home"
            onClick={(e) => {
              e.preventDefault();
              onNavigate('home');
            }}
            className="inline-flex items-center gap-2.5 font-display text-base font-bold tracking-wider text-white"
          >
            <span className="flex h-8 w-8 items-center justify-center rounded-lg border border-[#C084FC]/25 bg-[#9333EA]/20 text-[#C084FC]">
              <Gamepad2 className="h-4 w-4" strokeWidth={2} />
            </span>
            <span>GAMEVAULT</span>
          </a>

          <nav
            aria-label="Footer Navigation"
            className="flex flex-wrap items-center gap-6 text-sm font-medium text-[#A99BBE]"
          >
            <button
              type="button"
              onClick={() => onOpenInfo('about')}
              className="transition-colors hover:text-[#C084FC] cursor-pointer"
            >
              About
            </button>
            <button
              type="button"
              onClick={() => onOpenInfo('contact')}
              className="transition-colors hover:text-[#C084FC] cursor-pointer"
            >
              Contact
            </button>
            <button
              type="button"
              onClick={() => onOpenInfo('privacy')}
              className="transition-colors hover:text-[#C084FC] cursor-pointer"
            >
              Privacy Policy
            </button>
          </nav>
        </div>

        <div className="mt-6 border-t border-[#C084FC]/10 pt-5 text-xs text-[#A99BBE]">
          <p>© {new Date().getFullYear()} GAMEVAULT. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

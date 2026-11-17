import { useEffect, useState } from 'react';
import { Check, Copy, Mail, X } from 'lucide-react';

export type FooterInfoPage = 'about' | 'contact' | 'privacy' | null;

interface InfoModalProps {
  activePage: FooterInfoPage;
  onClose: () => void;
}

export default function InfoModal({ activePage, onClose }: InfoModalProps) {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    setCopied(false);
  }, [activePage]);

  useEffect(() => {
    if (!activePage) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [activePage, onClose]);

  if (!activePage) return null;

  const contentMap = {
    about: {
      title: 'About GAMEVAULT',
      body: [
        'GAMEVAULT is a curated PC game collection designed for fast discovery, clean poster presentation, and transparent system specifications.',
        'Every entry connects directly to its individually configured official destination URL, or clearly marks Download Unavailable when no external link is set.',
      ],
    },
    contact: {
      title: 'Contact',
      body: [
        'Have a PC title update, release year correction, or general inquiry? Reach out to the GAMEVAULT team via email.',
      ],
    },
    privacy: {
      title: 'Privacy Policy',
      body: [
        'GAMEVAULT operates as a static client-side PC game library. We do not collect personal browsing profiles, require sign-ins, or run third-party tracking scripts.',
        'Selecting a Download button navigates directly to that game’s official destination URL, which operates under its respective publisher privacy policy.',
      ],
    },
  };

  const current = contentMap[activePage];
  const contactEmail = 'support@gamevault.store';

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(contactEmail);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="info-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
    >
      <div
        aria-hidden="true"
        onClick={onClose}
        className="fixed inset-0 bg-[#07040C]/88 backdrop-blur-sm"
      />

      <div className="relative z-10 w-full max-w-lg overflow-hidden rounded-2xl border border-[#C084FC]/18 bg-[#130D20] p-6 shadow-[0_24px_64px_rgba(0,0,0,0.85)] sm:p-7">
        <div className="flex items-center justify-between border-b border-[#C084FC]/12 pb-4">
          <h2
            id="info-modal-title"
            className="font-display text-xl font-bold text-white"
          >
            {current.title}
          </h2>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close modal"
            className="flex h-9 w-9 items-center justify-center rounded-lg border border-[#C084FC]/18 bg-[#1A1229] text-[#A99BBE] transition-colors hover:text-white cursor-pointer"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="mt-5 space-y-4 text-sm leading-relaxed text-[#A99BBE]">
          {current.body.map((paragraph, idx) => (
            <p key={idx}>{paragraph}</p>
          ))}

          {activePage === 'contact' && (
            <div className="mt-4 flex flex-wrap items-center justify-between gap-3 rounded-xl border border-[#C084FC]/15 bg-[#1A1229] p-4">
              <div className="flex items-center gap-2.5 text-sm font-medium text-white">
                <Mail className="h-4 w-4 text-[#C084FC]" />
                <span>{contactEmail}</span>
              </div>

              <button
                type="button"
                onClick={handleCopyEmail}
                className="inline-flex min-h-[36px] items-center gap-1.5 rounded-lg border border-[#C084FC]/20 bg-[#130D20] px-3 py-1.5 text-xs font-medium text-[#C084FC] transition-colors hover:border-[#A855F7] hover:text-white cursor-pointer"
              >
                {copied ? (
                  <>
                    <Check className="h-3.5 w-3.5" />
                    <span>Copied</span>
                  </>
                ) : (
                  <>
                    <Copy className="h-3.5 w-3.5" />
                    <span>Copy Email</span>
                  </>
                )}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

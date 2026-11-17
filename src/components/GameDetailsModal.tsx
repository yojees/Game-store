import { useEffect, useState } from 'react';
import { ArrowLeft, Check, Copy, Download, KeyRound, Monitor, X } from 'lucide-react';
import type { GameItem } from '../types/game';
import GameImage from './GameImage';

interface GameDetailsModalProps {
  game: GameItem | null;
  onClose: () => void;
}

function hasValidDownloadUrl(url?: string | null): url is string {
  if (!url || typeof url !== 'string') return false;
  const trimmed = url.trim();
  return trimmed.startsWith('https://') || trimmed.startsWith('http://');
}

export default function GameDetailsModal({
  game,
  onClose,
}: GameDetailsModalProps) {
  const [specTab, setSpecTab] = useState<'minimum' | 'recommended'>('minimum');
  const [copiedPassword, setCopiedPassword] = useState(false);

  useEffect(() => {
    setSpecTab('minimum');
    setCopiedPassword(false);
  }, [game?.id]);

  useEffect(() => {
    if (!game) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [game, onClose]);

  if (!game) return null;

  const canDownload = hasValidDownloadUrl(game.downloadUrl);
  const activeSpecs = game.systemRequirements?.[specTab];

  const handleCopyPassword = async () => {
    if (!game.archivePassword) return;
    try {
      await navigator.clipboard.writeText(game.archivePassword);
      setCopiedPassword(true);
      window.setTimeout(() => setCopiedPassword(false), 2000);
    } catch {
      setCopiedPassword(false);
    }
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="game-detail-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6"
    >
      {/* Backdrop */}
      <div
        aria-hidden="true"
        onClick={onClose}
        className="fixed inset-0 bg-[#07040C]/88 backdrop-blur-sm"
      />

      {/* Modal Window */}
      <div className="relative z-10 flex max-h-[90vh] w-full max-w-4xl flex-col overflow-hidden rounded-2xl border border-[#C084FC]/18 bg-[#130D20] shadow-[0_28px_80px_rgba(0,0,0,0.85)]">
        {/* Header with Back to Games button */}
        <div className="flex items-center justify-between border-b border-[#C084FC]/12 px-5 py-3.5 sm:px-7">
          <button
            type="button"
            onClick={onClose}
            className="inline-flex min-h-[38px] items-center gap-2 whitespace-nowrap rounded-lg border border-[#C084FC]/18 bg-[#1A1229] px-3.5 py-1.5 text-xs font-semibold text-[#C084FC] transition-colors hover:border-[#A855F7] hover:text-white cursor-pointer"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Back to Games</span>
          </button>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close game details"
            className="flex h-9 w-9 items-center justify-center rounded-lg border border-[#C084FC]/18 bg-[#1A1229] text-[#A99BBE] transition-colors hover:border-[#A855F7] hover:text-white cursor-pointer"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Scrollable Details Body */}
        <div className="overflow-y-auto p-5 sm:p-7">
          <div className="grid grid-cols-1 gap-7 md:grid-cols-[250px_1fr] lg:grid-cols-[280px_1fr]">
            {/* Left: Large Game Cover & Metadata */}
            <div className="space-y-4">
              <div className="overflow-hidden rounded-xl border border-[#C084FC]/15 bg-[#1A1229] shadow-[0_12px_36px_rgba(11,7,18,0.8)]">
                <GameImage
                  src={game.image}
                  alt={`${game.title} cover artwork`}
                  title={game.title}
                  aspectClassName="aspect-[3/4]"
                  priority
                />
              </div>

              <div className="space-y-2 rounded-xl border border-[#C084FC]/12 bg-[#1A1229] p-4 text-xs">
                <div className="flex justify-between gap-4">
                  <span className="text-[#A99BBE]">Release Year</span>
                  <span className="font-semibold text-white tabular-nums">
                    {game.year}
                  </span>
                </div>
                <div className="flex justify-between gap-4">
                  <span className="text-[#A99BBE]">Genre</span>
                  <span className="text-right font-semibold text-white">
                    {game.genre}
                  </span>
                </div>
                <div className="flex justify-between gap-4">
                  <span className="text-[#A99BBE]">Platform</span>
                  <span className="font-semibold text-white">PC</span>
                </div>
                {game.developer && (
                  <div className="flex justify-between gap-4">
                    <span className="text-[#A99BBE]">Developer</span>
                    <span className="text-right font-semibold text-white">
                      {game.developer}
                    </span>
                  </div>
                )}
              </div>
            </div>

            {/* Right: Title, Description, Archive Password (if present), Download CTA */}
            <div className="flex flex-col">
              <div className="flex flex-wrap items-center gap-2 text-xs font-medium text-[#C084FC]">
                <span>{game.genre}</span>
                <span aria-hidden="true">·</span>
                <span className="tabular-nums">{game.year}</span>
                <span aria-hidden="true">·</span>
                <span>PC</span>
              </div>

              <h2
                id="game-detail-title"
                className="mt-2 font-display text-2xl font-bold tracking-tight text-white sm:text-3xl"
              >
                {game.title}
              </h2>

              <p className="mt-4 text-sm leading-relaxed text-[#A99BBE] sm:text-base">
                {game.description}
              </p>

              {/* Archive Password (when supplied) */}
              {game.archivePassword && (
                <div className="mt-5 flex flex-wrap items-center justify-between gap-3 rounded-xl border border-[#C084FC]/20 bg-[#1A1229] px-4 py-3">
                  <div className="flex items-center gap-2.5 text-xs sm:text-sm">
                    <KeyRound className="h-4 w-4 text-[#C084FC]" />
                    <span className="text-[#A99BBE]">Archive Password:</span>
                    <code className="font-mono font-semibold text-white">
                      {game.archivePassword}
                    </code>
                  </div>

                  <button
                    type="button"
                    onClick={handleCopyPassword}
                    className="inline-flex min-h-[34px] items-center gap-1.5 rounded-lg border border-[#C084FC]/20 bg-[#130D20] px-3 py-1 text-xs font-medium text-[#C084FC] transition-colors hover:border-[#A855F7] hover:text-white cursor-pointer"
                  >
                    {copiedPassword ? (
                      <>
                        <Check className="h-3.5 w-3.5" />
                        <span>Copied</span>
                      </>
                    ) : (
                      <>
                        <Copy className="h-3.5 w-3.5" />
                        <span>Copy</span>
                      </>
                    )}
                  </button>
                </div>
              )}

              {/* Individual Game Download Button */}
              <div className="mt-6 border-y border-[#C084FC]/12 py-5">
                {canDownload ? (
                  <div className="flex flex-wrap items-center justify-between gap-4">
                    <span className="text-xs text-[#A99BBE]">
                      Destination configured for {game.title}
                    </span>
                    <a
                      href={game.downloadUrl.trim()}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex min-h-[44px] items-center justify-center gap-2 whitespace-nowrap rounded-xl bg-[#9333EA] px-6 py-2.5 text-sm font-semibold text-white shadow-[0_0_24px_rgba(147,51,234,0.35)] transition-all duration-150 hover:bg-[#A855F7] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C084FC]"
                    >
                      <Download className="h-4 w-4" />
                      <span>Download</span>
                    </a>
                  </div>
                ) : (
                  <div className="flex flex-wrap items-center justify-between gap-4">
                    <span className="text-xs text-[#A99BBE]">
                      No download URL is configured for this title.
                    </span>
                    <span
                      aria-disabled="true"
                      className="inline-flex min-h-[44px] items-center justify-center whitespace-nowrap rounded-xl border border-[#C084FC]/15 bg-[#1A1229] px-5 py-2.5 text-sm font-semibold text-[#A99BBE]"
                    >
                      Download Unavailable
                    </span>
                  </div>
                )}
              </div>

              {/* Optional System Requirements if supplied */}
              {activeSpecs && (
                <div className="mt-6">
                  <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
                    <div className="flex items-center gap-2">
                      <Monitor className="h-4 w-4 text-[#C084FC]" />
                      <h3 className="font-display text-base font-semibold text-white">
                        PC System Requirements
                      </h3>
                    </div>

                    <div
                      role="tablist"
                      aria-label="System requirement tier"
                      className="inline-flex rounded-lg border border-[#C084FC]/15 bg-[#0B0712] p-1"
                    >
                      <button
                        type="button"
                        role="tab"
                        aria-selected={specTab === 'minimum'}
                        onClick={() => setSpecTab('minimum')}
                        className={`rounded-md px-3 py-1.5 text-xs font-medium transition-colors cursor-pointer ${
                          specTab === 'minimum'
                            ? 'bg-[#9333EA] text-white'
                            : 'text-[#A99BBE] hover:text-white'
                        }`}
                      >
                        Minimum
                      </button>
                      <button
                        type="button"
                        role="tab"
                        aria-selected={specTab === 'recommended'}
                        onClick={() => setSpecTab('recommended')}
                        className={`rounded-md px-3 py-1.5 text-xs font-medium transition-colors cursor-pointer ${
                          specTab === 'recommended'
                            ? 'bg-[#9333EA] text-white'
                            : 'text-[#A99BBE] hover:text-white'
                        }`}
                      >
                        Recommended
                      </button>
                    </div>
                  </div>

                  <dl className="divide-y divide-[#C084FC]/10 rounded-xl border border-[#C084FC]/12 bg-[#1A1229]">
                    <div className="grid grid-cols-1 gap-1 px-4 py-3 sm:grid-cols-[120px_1fr] sm:gap-4">
                      <dt className="text-xs font-medium text-[#A99BBE]">OS</dt>
                      <dd className="font-mono text-xs text-white tabular-nums">
                        {activeSpecs.os}
                      </dd>
                    </div>
                    <div className="grid grid-cols-1 gap-1 px-4 py-3 sm:grid-cols-[120px_1fr] sm:gap-4">
                      <dt className="text-xs font-medium text-[#A99BBE]">
                        Processor
                      </dt>
                      <dd className="font-mono text-xs text-white tabular-nums">
                        {activeSpecs.processor}
                      </dd>
                    </div>
                    <div className="grid grid-cols-1 gap-1 px-4 py-3 sm:grid-cols-[120px_1fr] sm:gap-4">
                      <dt className="text-xs font-medium text-[#A99BBE]">
                        Memory
                      </dt>
                      <dd className="font-mono text-xs text-white tabular-nums">
                        {activeSpecs.memory}
                      </dd>
                    </div>
                    <div className="grid grid-cols-1 gap-1 px-4 py-3 sm:grid-cols-[120px_1fr] sm:gap-4">
                      <dt className="text-xs font-medium text-[#A99BBE]">
                        Graphics
                      </dt>
                      <dd className="font-mono text-xs text-white tabular-nums">
                        {activeSpecs.graphics}
                      </dd>
                    </div>
                    <div className="grid grid-cols-1 gap-1 px-4 py-3 sm:grid-cols-[120px_1fr] sm:gap-4">
                      <dt className="text-xs font-medium text-[#A99BBE]">
                        Storage
                      </dt>
                      <dd className="font-mono text-xs text-white tabular-nums">
                        {activeSpecs.storage}
                      </dd>
                    </div>
                  </dl>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

import { ArrowUpRight } from 'lucide-react';
import type { GameItem } from '../types/game';
import GameImage from './GameImage';

interface GameCardProps {
  game: GameItem;
  onSelect: (game: GameItem) => void;
}

export default function GameCard({ game, onSelect }: GameCardProps) {
  return (
    <article
      onClick={() => onSelect(game)}
      className="group flex h-full cursor-pointer flex-col overflow-hidden rounded-xl border border-[#C084FC]/12 bg-[#1A1229] transition-all duration-200 hover:-translate-y-0.5 hover:border-[#A855F7]/70 hover:shadow-[0_12px_30px_rgba(147,51,234,0.22)]"
    >
      {/* Vertical Poster Artwork */}
      <div className="relative overflow-hidden border-b border-[#C084FC]/10">
        <GameImage
          src={game.image}
          alt={`${game.title} cover poster`}
          title={game.title}
          aspectClassName="aspect-[3/4]"
          className="[&_img]:group-hover:scale-105"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 bottom-0 h-14 bg-gradient-to-t from-[#1A1229]/85 to-transparent"
        />
      </div>

      {/* Card Content */}
      <div className="flex flex-1 flex-col p-3.5 sm:p-4">
        <div className="flex items-center gap-1.5 text-xs font-medium text-[#A99BBE]">
          <span className="tabular-nums">{game.year}</span>
          <span aria-hidden="true">·</span>
          <span className="truncate">{game.genre}</span>
        </div>

        <h3 className="mt-1.5 line-clamp-1 font-display text-sm font-semibold tracking-tight text-white transition-colors duration-150 group-hover:text-[#C084FC] sm:text-base">
          {game.title}
        </h3>

        <div className="mt-auto pt-3.5">
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onSelect(game);
            }}
            className="inline-flex min-h-[38px] w-full items-center justify-center gap-1.5 whitespace-nowrap rounded-lg border border-[#C084FC]/18 bg-[#130D20] px-3 py-1.5 text-xs font-semibold text-white transition-colors duration-150 group-hover:border-[#9333EA] group-hover:bg-[#9333EA] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#A855F7] sm:text-sm cursor-pointer"
          >
            <span>View Details</span>
            <ArrowUpRight className="h-3.5 w-3.5 opacity-80 transition-transform duration-150 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </button>
        </div>
      </div>
    </article>
  );
}

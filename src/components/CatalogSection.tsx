import { useMemo } from 'react';
import { ArrowUpDown, RotateCcw, Search, X } from 'lucide-react';
import type { GameItem, SortOption } from '../types/game';
import GameCard from './GameCard';

interface CatalogSectionProps {
  games: GameItem[];
  categories: string[];
  searchQuery: string;
  onSearchChange: (value: string) => void;
  selectedCategory: string;
  onSelectCategory: (category: string) => void;
  sortBy: SortOption;
  onSortChange: (sort: SortOption) => void;
  onSelectGame: (game: GameItem) => void;
}

export default function CatalogSection({
  games,
  categories,
  searchQuery,
  onSearchChange,
  selectedCategory,
  onSelectCategory,
  sortBy,
  onSortChange,
  onSelectGame,
}: CatalogSectionProps) {
  const filterCategories = ['All Games', ...categories];

  const filteredAndSortedGames = useMemo(() => {
    const normalizedQuery = searchQuery.trim().toLowerCase();

    const filtered = games.filter((game) => {
      const matchesSearch =
        normalizedQuery.length === 0 ||
        game.title.toLowerCase().includes(normalizedQuery);

      const matchesCategory =
        selectedCategory === 'All Games' ||
        game.genre.toLowerCase().includes(selectedCategory.toLowerCase());

      return matchesSearch && matchesCategory;
    });

    return [...filtered].sort((a, b) => {
      if (sortBy === 'a-z') {
        return a.title.localeCompare(b.title);
      }
      if (sortBy === 'z-a') {
        return b.title.localeCompare(a.title);
      }
      return b.id - a.id;
    });
  }, [games, searchQuery, selectedCategory, sortBy]);

  const hasActiveFilters =
    searchQuery.trim().length > 0 ||
    selectedCategory !== 'All Games' ||
    sortBy !== 'recently-added';

  const handleReset = () => {
    onSearchChange('');
    onSelectCategory('All Games');
    onSortChange('recently-added');
  };

  return (
    <section id="all-games" className="scroll-mt-20 py-7 sm:py-9">
      <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-8">
        {/* Compact Library Top Bar */}
        <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h1 className="font-display text-2xl font-bold tracking-tight text-white sm:text-3xl">
              PC Game Collection
            </h1>
            <p className="mt-1 text-sm text-[#A99BBE]">
              Browse PC titles, filter by genre, and open game details.
            </p>
          </div>
          <p className="text-sm font-medium text-[#C084FC] tabular-nums">
            Showing {filteredAndSortedGames.length} of {games.length} games
          </p>
        </div>

        {/* Search + Sort Toolbar */}
        <div className="mb-4 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div className="relative flex-1 md:max-w-lg">
            <Search
              aria-hidden="true"
              className="pointer-events-none absolute top-1/2 left-3.5 h-4 w-4 -translate-y-1/2 text-[#A99BBE]"
            />
            <input
              type="search"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Search games by title..."
              aria-label="Search games by title"
              className="h-11 w-full rounded-xl border border-[#C084FC]/18 bg-[#130D20] pr-10 pl-10 text-sm text-white placeholder-[#A99BBE]/75 transition-colors focus:border-[#A855F7] focus:outline-none focus:ring-1 focus:ring-[#A855F7]"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => onSearchChange('')}
                aria-label="Clear search query"
                className="absolute top-1/2 right-2.5 flex h-7 w-7 -translate-y-1/2 items-center justify-center rounded-md text-[#A99BBE] transition-colors hover:bg-[#1A1229] hover:text-white cursor-pointer"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>

          <div className="flex items-center gap-3">
            <label
              htmlFor="catalog-sort"
              className="flex shrink-0 items-center gap-1.5 text-xs font-medium text-[#A99BBE]"
            >
              <ArrowUpDown className="h-3.5 w-3.5 text-[#C084FC]" />
              <span>Sort</span>
            </label>
            <select
              id="catalog-sort"
              value={sortBy}
              onChange={(e) => onSortChange(e.target.value as SortOption)}
              className="h-11 rounded-xl border border-[#C084FC]/18 bg-[#130D20] px-3.5 text-sm font-medium text-white transition-colors focus:border-[#A855F7] focus:outline-none focus:ring-1 focus:ring-[#A855F7] cursor-pointer"
            >
              <option value="recently-added">Recently Added</option>
              <option value="a-z">A–Z</option>
              <option value="z-a">Z–A</option>
            </select>

            {hasActiveFilters && (
              <button
                type="button"
                onClick={handleReset}
                className="inline-flex h-11 shrink-0 items-center gap-1.5 whitespace-nowrap rounded-xl border border-[#C084FC]/18 bg-[#130D20] px-3.5 text-xs font-medium text-[#C084FC] transition-colors hover:border-[#A855F7] hover:text-white cursor-pointer"
              >
                <RotateCcw className="h-3.5 w-3.5" />
                <span>Reset</span>
              </button>
            )}
          </div>
        </div>

        {/* Category Filters */}
        <div id="categories" className="mb-7 scroll-mt-24">
          <div
            role="tablist"
            aria-label="Filter games by category"
            className="flex flex-wrap items-center gap-2"
          >
            {filterCategories.map((category) => {
              const isActive = selectedCategory === category;
              return (
                <button
                  key={category}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => onSelectCategory(category)}
                  className={`min-h-[38px] whitespace-nowrap shrink-0 rounded-lg px-3.5 py-1.5 text-xs font-semibold transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#A855F7] sm:text-sm cursor-pointer ${
                    isActive
                      ? 'bg-[#9333EA] text-white shadow-[0_0_18px_rgba(147,51,234,0.38)]'
                      : 'border border-[#C084FC]/15 bg-[#130D20] text-[#A99BBE] hover:border-[#A855F7]/50 hover:text-white'
                  }`}
                >
                  {category}
                </button>
              );
            })}
          </div>
        </div>

        {/* 23-Game Grid: 2 mobile, 4 medium, 5 large */}
        {filteredAndSortedGames.length > 0 ? (
          <div className="grid grid-cols-2 gap-4 sm:gap-5 md:grid-cols-4 lg:grid-cols-5">
            {filteredAndSortedGames.map((game) => (
              <GameCard key={game.id} game={game} onSelect={onSelectGame} />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center rounded-2xl border border-[#C084FC]/12 bg-[#130D20] px-6 py-14 text-center">
            <p className="font-display text-xl font-semibold text-white">
              No matching games found
            </p>
            <p className="mt-2 max-w-md text-sm text-[#A99BBE]">
              Try clearing your search or selecting another category filter.
            </p>
            <button
              type="button"
              onClick={handleReset}
              className="mt-5 inline-flex min-h-[42px] items-center gap-2 rounded-lg bg-[#9333EA] px-5 py-2 text-sm font-semibold text-white transition-colors hover:bg-[#A855F7] cursor-pointer"
            >
              <RotateCcw className="h-4 w-4" />
              <span>Show All {games.length} Games</span>
            </button>
          </div>
        )}
      </div>
    </section>
  );
}

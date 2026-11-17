import { useState } from 'react';
import CatalogSection from './components/CatalogSection';
import Footer from './components/Footer';
import GameDetailsModal from './components/GameDetailsModal';
import InfoModal, { type FooterInfoPage } from './components/InfoModal';
import Navbar from './components/Navbar';
import { GAME_CATEGORIES, games as rawGames } from './data/games';
import type { GameItem, SortOption } from './types/game';

export default function App() {
  const games = rawGames as GameItem[];

  const [selectedGame, setSelectedGame] = useState<GameItem | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All Games');
  const [sortBy, setSortBy] = useState<SortOption>('recently-added');
  const [activeInfoPage, setActiveInfoPage] = useState<FooterInfoPage>(null);

  const scrollToSection = (sectionId: string) => {
    if (sectionId === 'home') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div id="home" className="min-h-screen purple-ambient-bg text-white flex flex-col">
      <Navbar
        totalGames={games.length}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        onNavigate={scrollToSection}
      />

      <main className="flex-1">
        <CatalogSection
          games={games}
          categories={GAME_CATEGORIES}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
          sortBy={sortBy}
          onSortChange={setSortBy}
          onSelectGame={setSelectedGame}
        />
      </main>

      <Footer
        onNavigate={scrollToSection}
        onOpenInfo={(page) => setActiveInfoPage(page)}
      />

      <GameDetailsModal
        game={selectedGame}
        onClose={() => setSelectedGame(null)}
      />

      <InfoModal
        activePage={activeInfoPage}
        onClose={() => setActiveInfoPage(null)}
      />
    </div>
  );
}

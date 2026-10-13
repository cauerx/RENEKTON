import React, { useState, useMemo, useRef, useEffect } from 'react';
import type { Matchup } from '../types/guide';
import { MatchupModal } from './MatchupModal';
import { Search, X, Shield, ArrowDownUp } from 'lucide-react';

interface MatchupHubProps {
  matchups: Matchup[];
}

type DifficultyFilter = 'ALL' | 'EASY' | 'MEDIUM' | 'HARD';
type SortOption = 'NAME_ASC' | 'DIFF_DESC' | 'DIFF_ASC';

export const MatchupHub: React.FC<MatchupHubProps> = ({ matchups }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDifficulty, setSelectedDifficulty] = useState<DifficultyFilter>('ALL');
  const [sortBy, setSortBy] = useState<SortOption>('NAME_ASC');
  const [selectedMatchup, setSelectedMatchup] = useState<Matchup | null>(null);

  const searchInputRef = useRef<HTMLInputElement>(null);

  // Auto-focus and keyboard shortcut '/' or 'Ctrl+K'
  useEffect(() => {
    if (searchInputRef.current) {
      searchInputRef.current.focus();
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.key === '/' || (e.ctrlKey && e.key === 'k') || (e.metaKey && e.key === 'k')) && !selectedMatchup) {
        e.preventDefault();
        searchInputRef.current?.focus();
        searchInputRef.current?.select();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedMatchup]);

  // Counts for filters
  const counts = useMemo(() => {
    let easy = 0;
    let medium = 0;
    let hard = 0;
    matchups.forEach((m) => {
      if (m.difficultyScore <= 3 || m.difficultyTier.toLowerCase().includes('easy')) easy++;
      else if (m.difficultyScore <= 7 || m.difficultyTier.toLowerCase().includes('medium')) medium++;
      else hard++;
    });
    return { all: matchups.length, easy, medium, hard };
  }, [matchups]);

  // Filtered and sorted matchups
  const filteredMatchups = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();

    return matchups
      .filter((m) => {
        // Search filter
        if (q && !m.champion.toLowerCase().includes(q) && !m.summary.toLowerCase().includes(q)) {
          return false;
        }

        // Difficulty filter
        if (selectedDifficulty === 'EASY') {
          return m.difficultyScore <= 3 || m.difficultyTier.toLowerCase().includes('easy');
        }
        if (selectedDifficulty === 'MEDIUM') {
          return (m.difficultyScore > 3 && m.difficultyScore <= 7) || m.difficultyTier.toLowerCase().includes('medium');
        }
        if (selectedDifficulty === 'HARD') {
          return m.difficultyScore > 7 || m.difficultyTier.toLowerCase().includes('hard');
        }

        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'DIFF_DESC') return b.difficultyScore - a.difficultyScore;
        if (sortBy === 'DIFF_ASC') return a.difficultyScore - b.difficultyScore;
        return a.champion.localeCompare(b.champion);
      });
  }, [matchups, searchQuery, selectedDifficulty, sortBy]);

  // Modal navigation index
  const currentIndex = selectedMatchup
    ? filteredMatchups.findIndex((m) => m.id === selectedMatchup.id)
    : -1;

  const handleNext = () => {
    if (currentIndex >= 0 && currentIndex < filteredMatchups.length - 1) {
      setSelectedMatchup(filteredMatchups[currentIndex + 1]);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setSelectedMatchup(filteredMatchups[currentIndex - 1]);
    }
  };

  const getDifficultyBadge = (score: number, tier: string) => {
    if (score <= 3 || tier.toLowerCase().includes('easy')) {
      return 'bg-emerald-950/70 border-emerald-500/40 text-emerald-300';
    }
    if (score <= 7 || tier.toLowerCase().includes('medium')) {
      return 'bg-amber-950/70 border-amber-500/40 text-amber-300';
    }
    return 'bg-rose-950/70 border-rose-500/40 text-rose-300';
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
      {/* Search & Filter Header Bar */}
      <div className="bg-[#0b1118] border border-[#213245] rounded-2xl p-4 sm:p-5 shadow-xl space-y-4">
        <div className="flex flex-col md:flex-row gap-3 items-stretch md:items-center justify-between">
          {/* Search Box */}
          <div className="relative flex-1">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-[#677b93]" />
            <input
              ref={searchInputRef}
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Digite o nome do campeão adversário (ex: Darius, Aatrox, Jax, Fiora)... [ / ]"
              className="w-full pl-11 pr-10 py-3 bg-[#101924] border border-[#233549] rounded-xl text-sm sm:text-base text-[#f0e6d2] placeholder-[#60738a] focus:outline-none focus:border-[#c8aa6e] focus:ring-1 focus:ring-[#c8aa6e] transition-all"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-[#677b93] hover:text-[#f0e6d2] transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Sort Selector */}
          <div className="flex items-center gap-2 self-end md:self-auto">
            <ArrowDownUp className="w-4 h-4 text-[#8a9db5]" />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as SortOption)}
              className="bg-[#101924] border border-[#233549] text-xs sm:text-sm text-[#cbd5e1] rounded-xl px-3 py-2.5 focus:outline-none focus:border-[#c8aa6e] cursor-pointer"
            >
              <option value="NAME_ASC">Ordem Alfabética (A-Z)</option>
              <option value="DIFF_DESC">Mais Difíceis Primeiro (10 → 1)</option>
              <option value="DIFF_ASC">Mais Fáceis Primeiro (1 → 10)</option>
            </select>
          </div>
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-[#172332]">
          <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
            <button
              onClick={() => setSelectedDifficulty('ALL')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                selectedDifficulty === 'ALL'
                  ? 'bg-[#c8aa6e] text-[#07090e] shadow-[0_0_12px_rgba(200,170,110,0.3)]'
                  : 'bg-[#101924] text-[#8a9db5] border border-[#202f40] hover:text-[#e2e8f0]'
              }`}
            >
              Todos ({counts.all})
            </button>
            <button
              onClick={() => setSelectedDifficulty('EASY')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                selectedDifficulty === 'EASY'
                  ? 'bg-emerald-500 text-black shadow-[0_0_12px_rgba(16,185,129,0.3)]'
                  : 'bg-[#101924] text-emerald-400 border border-emerald-900/50 hover:bg-emerald-950/30'
              }`}
            >
              Fácil ({counts.easy})
            </button>
            <button
              onClick={() => setSelectedDifficulty('MEDIUM')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                selectedDifficulty === 'MEDIUM'
                  ? 'bg-amber-500 text-black shadow-[0_0_12px_rgba(245,158,11,0.3)]'
                  : 'bg-[#101924] text-amber-400 border border-amber-900/50 hover:bg-amber-950/30'
              }`}
            >
              Médio ({counts.medium})
            </button>
            <button
              onClick={() => setSelectedDifficulty('HARD')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                selectedDifficulty === 'HARD'
                  ? 'bg-rose-600 text-white shadow-[0_0_12px_rgba(225,29,72,0.3)]'
                  : 'bg-[#101924] text-rose-400 border border-rose-900/50 hover:bg-rose-950/30'
              }`}
            >
              Difícil ({counts.hard})
            </button>
          </div>

          <div className="text-xs text-[#6e8299] font-mono">
            Exibindo <span className="text-[#c8aa6e] font-bold">{filteredMatchups.length}</span> campeões
          </div>
        </div>
      </div>

      {/* Champion Grid */}
      {filteredMatchups.length === 0 ? (
        <div className="bg-[#0b1118] border border-[#213245] rounded-2xl p-12 text-center space-y-3">
          <Shield className="w-12 h-12 text-[#465a73] mx-auto" />
          <h3 className="text-lg font-bold text-[#e2e8f0]">Nenhum campeão encontrado</h3>
          <p className="text-xs text-[#8a9db5]">
            Não encontramos nenhum confronto correspondente ao termo "{searchQuery}". Tente outro nome.
          </p>
          <button
            onClick={() => {
              setSearchQuery('');
              setSelectedDifficulty('ALL');
            }}
            className="px-4 py-2 bg-[#1b2a3d] hover:bg-[#253952] text-[#c8aa6e] text-xs font-bold rounded-lg transition-colors cursor-pointer"
          >
            Limpar Filtros
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3 sm:gap-4">
          {filteredMatchups.map((m) => {
            const badgeClass = getDifficultyBadge(m.difficultyScore, m.difficultyTier);

            return (
              <div
                key={m.id}
                onClick={() => setSelectedMatchup(m)}
                className="group relative bg-[#0d1520] hover:bg-[#121c2a] border border-[#1d2d3e] hover:border-[#c8aa6e]/60 rounded-xl p-3 flex flex-col items-center text-center cursor-pointer transition-all duration-200 hover:-translate-y-1 hover:shadow-[0_8px_25px_rgba(0,0,0,0.6)]"
              >
                {/* Champion Avatar */}
                <div className="relative mb-2.5">
                  <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-xl overflow-hidden border-2 border-[#2b3e54] group-hover:border-[#c8aa6e] transition-colors bg-[#080d14] shadow-md">
                    <img
                      src={m.avatarUrl}
                      alt={m.champion}
                      loading="lazy"
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src =
                          'https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Renekton_0.jpg';
                      }}
                    />
                  </div>
                  <span className="absolute -bottom-1 -right-1 text-[9px] font-black px-1.5 py-0.2 rounded bg-[#090e15] border border-[#2b3e54] text-[#8a9db5]">
                    {m.difficultyScore}/10
                  </span>
                </div>

                {/* Champion Name */}
                <h3 className="font-bold text-sm sm:text-base text-[#f0e6d2] group-hover:text-[#c8aa6e] transition-colors truncate w-full">
                  {m.champion}
                </h3>

                {/* Difficulty Badge */}
                <div className="mt-1 mb-2">
                  <span className={`px-2 py-0.5 text-[10px] font-bold rounded-md border ${badgeClass}`}>
                    {m.difficultyTier}
                  </span>
                </div>

                {/* Quick Snapshot tags */}
                <div className="w-full pt-2 border-t border-[#172433] space-y-1 text-[11px] text-[#889cb2]">
                  <div className="flex justify-between items-center text-[10px]">
                    <span className="text-[#647890]">Max:</span>
                    <span className="font-mono font-bold text-[#c8aa6e] truncate">{m.abilityMax || 'Q>E>W'}</span>
                  </div>
                  <div className="flex justify-between items-center text-[10px]">
                    <span className="text-[#647890]">Runa:</span>
                    <span className="font-semibold text-[#cbd5e1] truncate max-w-[90px]">
                      {m.runes.split('>')[0]?.trim() || 'PTA'}
                    </span>
                  </div>
                </div>

                {/* Hover Glow Pill */}
                <div className="mt-2.5 opacity-0 group-hover:opacity-100 transition-opacity text-[10px] font-bold text-[#c8aa6e] flex items-center gap-1">
                  <span>Ver Dicas</span>
                  <span>→</span>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Matchup Modal */}
      <MatchupModal
        matchup={selectedMatchup}
        onClose={() => setSelectedMatchup(null)}
        onNext={currentIndex < filteredMatchups.length - 1 ? handleNext : undefined}
        onPrev={currentIndex > 0 ? handlePrev : undefined}
      />
    </div>
  );
};

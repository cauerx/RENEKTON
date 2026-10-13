import React, { useEffect } from 'react';
import type { Matchup } from '../types/guide';
import { X, ChevronLeft, ChevronRight, Swords, Sparkles, Compass, BookOpen, Flame, Zap, Play } from 'lucide-react';

interface MatchupModalProps {
  matchup: Matchup | null;
  onClose: () => void;
  onNext?: () => void;
  onPrev?: () => void;
}

export const MatchupModal: React.FC<MatchupModalProps> = ({
  matchup,
  onClose,
  onNext,
  onPrev,
}) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight' && onNext) onNext();
      if (e.key === 'ArrowLeft' && onPrev) onPrev();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose, onNext, onPrev]);

  if (!matchup) return null;

  // Difficulty color styling
  const getDifficultyColor = (score: number, tier: string) => {
    if (score <= 3 || tier.toLowerCase().includes('easy')) {
      return {
        bg: 'bg-emerald-950/80',
        border: 'border-emerald-500/50',
        text: 'text-emerald-300',
        bar: 'bg-emerald-500',
        badge: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40',
      };
    }
    if (score <= 7 || tier.toLowerCase().includes('medium')) {
      return {
        bg: 'bg-amber-950/80',
        border: 'border-amber-500/50',
        text: 'text-amber-300',
        bar: 'bg-amber-500',
        badge: 'bg-amber-500/20 text-amber-300 border-amber-500/40',
      };
    }
    return {
      bg: 'bg-rose-950/80',
      border: 'border-rose-500/50',
      text: 'text-rose-300',
      bar: 'bg-rose-600',
      badge: 'bg-rose-500/20 text-rose-300 border-rose-500/40',
    };
  };

  const diffStyle = getDifficultyColor(matchup.difficultyScore, matchup.difficultyTier);

  // Parse tip to extract number, title, and body
  const parseTip = (tipStr: string) => {
    const match = tipStr.match(/^\((\d+)\)\s*([^-–:]+)\s*[-–:]\s*(.*)$/s);
    if (match) {
      return {
        number: match[1],
        title: match[2].trim(),
        body: match[3].trim(),
      };
    }
    return {
      number: null,
      title: null,
      body: tipStr,
    };
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/85 backdrop-blur-md flex items-center justify-center p-2 sm:p-4 lg:p-6 animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-4xl bg-[#0b1118] border border-[#233548] rounded-2xl shadow-2xl overflow-hidden my-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header Bar */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-[#1c2c3d] bg-gradient-to-r from-[#0d1622] via-[#101c2b] to-[#0d1622]">
          <div className="flex items-center gap-2">
            {onPrev && (
              <button
                onClick={onPrev}
                title="Campeão Anterior (←)"
                className="p-1.5 rounded-lg text-[#8da0b8] hover:text-[#f0e6d2] hover:bg-[#1b2b3d] transition-colors cursor-pointer"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
            )}
            {onNext && (
              <button
                onClick={onNext}
                title="Próximo Campeão (→)"
                className="p-1.5 rounded-lg text-[#8da0b8] hover:text-[#f0e6d2] hover:bg-[#1b2b3d] transition-colors cursor-pointer"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            )}
            <span className="text-xs text-[#7c90a6] uppercase tracking-widest font-mono ml-2">
              Detalhes do Confronto
            </span>
          </div>

          <button
            onClick={onClose}
            title="Fechar (Esc)"
            className="p-1.5 rounded-lg text-[#8da0b8] hover:text-white hover:bg-rose-950/60 transition-colors cursor-pointer"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Modal Scrollable Content */}
        <div className="max-h-[82vh] overflow-y-auto p-4 sm:p-6 space-y-6">
          {/* ============================================================== */}
          {/* CHEAT-SHEET RÁPIDO (PRÉ-JOGO / 5 SEGUNDOS DE LEITURA)          */}
          {/* ============================================================== */}
          <div className="relative rounded-xl border border-[#2a3e54] bg-gradient-to-b from-[#111c2a] to-[#0b121b] p-4 sm:p-5 shadow-lg">
            {/* Champion Banner Top */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-[#1e2f42]">
              <div className="flex items-center gap-4">
                <div className="relative">
                  <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-xl overflow-hidden border-2 border-[#c8aa6e] shadow-[0_0_20px_rgba(200,170,110,0.3)] bg-[#07090e]">
                    <img
                      src={matchup.avatarUrl}
                      alt={matchup.champion}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src =
                          'https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Renekton_0.jpg';
                      }}
                    />
                  </div>
                  <span className="absolute -bottom-2 -right-1 text-[10px] font-black px-1.5 py-0.5 rounded bg-[#07090e] border border-[#c8aa6e] text-[#c8aa6e]">
                    VS
                  </span>
                </div>

                <div>
                  <div className="flex items-center gap-3">
                    <h2 className="text-2xl sm:text-3xl font-black text-[#f0e6d2] tracking-wide font-serif">
                      {matchup.champion}
                    </h2>
                    <span className={`px-2.5 py-0.5 text-xs font-bold rounded-md border ${diffStyle.badge}`}>
                      {matchup.difficultyRaw}
                    </span>
                  </div>
                  <p className="text-xs text-[#8da0b8] mt-1">
                    Confronto na Rota Superior • Avaliação do Godrekton
                  </p>
                </div>
              </div>

              {/* Difficulty Bar */}
              <div className="w-full sm:w-48 bg-[#090f16] p-2.5 rounded-lg border border-[#1b2837]">
                <div className="flex justify-between text-xs font-semibold mb-1">
                  <span className="text-[#8da0b8]">Dificuldade</span>
                  <span className={diffStyle.text}>{matchup.difficultyScore} / 10</span>
                </div>
                <div className="w-full h-2 bg-[#172332] rounded-full overflow-hidden">
                  <div
                    className={`h-full transition-all duration-500 rounded-full ${diffStyle.bar}`}
                    style={{ width: `${Math.max(10, matchup.difficultyScore * 10)}%` }}
                  />
                </div>
              </div>
            </div>

            {/* 4 Quick Stat Cards */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mt-4">
              {/* Runas */}
              <div className="bg-[#0e1724] border border-[#213244] rounded-lg p-3 hover:border-[#c8aa6e]/40 transition-colors">
                <div className="flex items-center gap-1.5 text-xs font-semibold text-[#c8aa6e] mb-1">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Runas Recomendadas</span>
                </div>
                <div className="text-sm font-bold text-[#e6edf5] leading-snug">
                  {matchup.runes || 'PTA / Conq'}
                </div>
              </div>

              {/* Itens Iniciais */}
              <div className="bg-[#0e1724] border border-[#213244] rounded-lg p-3 hover:border-[#c8aa6e]/40 transition-colors">
                <div className="flex items-center gap-1.5 text-xs font-semibold text-[#c8aa6e] mb-1">
                  <Swords className="w-3.5 h-3.5" />
                  <span>Itens Iniciais</span>
                </div>
                <div className="text-sm font-bold text-[#e6edf5] leading-snug">
                  {matchup.startingItems || "Doran's Blade"}
                </div>
              </div>

              {/* Feitiços */}
              <div className="bg-[#0e1724] border border-[#213244] rounded-lg p-3 hover:border-[#c8aa6e]/40 transition-colors">
                <div className="flex items-center gap-1.5 text-xs font-semibold text-[#c8aa6e] mb-1">
                  <Flame className="w-3.5 h-3.5 text-rose-400" />
                  <span>Feitiços (Summoners)</span>
                </div>
                <div className="text-sm font-bold text-[#e6edf5] leading-snug">
                  {matchup.summoners || 'Ignite + Flash'}
                </div>
              </div>

              {/* Ordem de Maximização */}
              <div className="bg-[#0e1724] border border-[#213244] rounded-lg p-3 hover:border-[#c8aa6e]/40 transition-colors">
                <div className="flex items-center gap-1.5 text-xs font-semibold text-[#c8aa6e] mb-1">
                  <Zap className="w-3.5 h-3.5 text-amber-400" />
                  <span>Maximização (Max Order)</span>
                </div>
                <div className="text-base font-black text-[#c8aa6e] font-mono tracking-wider">
                  {matchup.abilityMax || 'Q > E > W'}
                </div>
              </div>
            </div>
          </div>

          {/* ============================================================== */}
          {/* RESUMO DA LANE (MACRO DYNAMICS)                                */}
          {/* ============================================================== */}
          {matchup.summary && (
            <div className="bg-[#0d1622] border-l-4 border-[#c8aa6e] p-4 rounded-r-xl border-y border-r border-[#1b2a3a]">
              <div className="flex items-center gap-2 text-xs font-bold text-[#c8aa6e] uppercase tracking-wider mb-2">
                <Compass className="w-4 h-4" />
                <span>Resumo da Rota & Condição de Vitória</span>
              </div>
              <p className="text-sm text-[#cbd5e1] leading-relaxed whitespace-pre-line">
                {matchup.summary}
              </p>
            </div>
          )}

          {/* ============================================================== */}
          {/* DICAS TÁTICAS DETALHADAS (PASSO A PASSO DA PARTIDA)             */}
          {/* ============================================================== */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2 text-sm font-bold text-[#f0e6d2] uppercase tracking-wider">
                <BookOpen className="w-4 h-4 text-[#c8aa6e]" />
                <span>Dicas Táticas Detalhadas ({matchup.tips.length})</span>
              </div>
              <span className="text-xs text-[#738499]">
                Pressione Esc para fechar
              </span>
            </div>

            <div className="space-y-3">
              {matchup.tips.map((tip, idx) => {
                const parsed = parseTip(tip);
                return (
                  <div
                    key={idx}
                    className="bg-[#0e1724] border border-[#1e2f42] rounded-xl p-3.5 sm:p-4 hover:border-[#2d4663] transition-all hover:shadow-md"
                  >
                    {parsed.title ? (
                      <div>
                        <div className="flex items-center gap-2 mb-2">
                          {parsed.number && (
                            <span className="w-6 h-6 flex items-center justify-center rounded-full bg-[#1b2a3d] border border-[#c8aa6e]/40 text-[#c8aa6e] font-mono font-bold text-xs">
                              {parsed.number}
                            </span>
                          )}
                          <h4 className="text-sm sm:text-base font-bold text-[#e2e8f0]">
                            {parsed.title}
                          </h4>
                        </div>
                        <p className="text-xs sm:text-sm text-[#94a3b8] leading-relaxed pl-8">
                          {parsed.body}
                        </p>
                      </div>
                    ) : (
                      <p className="text-xs sm:text-sm text-[#cbd5e1] leading-relaxed whitespace-pre-line">
                        {tip}
                      </p>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* ============================================================== */}
          {/* VÍDEO EXPLICATIVO / EXEMPLO                                    */}
          {/* ============================================================== */}
          {matchup.video && (
            <div className="bg-[#121b27] border border-[#233548] rounded-xl p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-lg bg-red-950/70 border border-red-500/30 text-red-400">
                  <Play className="w-5 h-5 fill-red-400" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-[#f0e6d2]">Vídeo de Exemplo do Matchup</h4>
                  <p className="text-xs text-[#8a99ad]">
                    Godrekton gravou uma partida demonstrando como jogar contra {matchup.champion}.
                  </p>
                </div>
              </div>

              <a
                href={matchup.video.startsWith('http') ? matchup.video : `https://${matchup.video}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto px-4 py-2 rounded-lg bg-red-600 hover:bg-red-500 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-lg transition-all cursor-pointer"
              >
                <Play className="w-4 h-4 fill-white" />
                <span>Assistir no YouTube</span>
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

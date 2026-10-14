import React, { useState } from 'react';
import type { RunesData, ItemsData, SummonersData, AbilitiesData } from '../types/guide';
import { getAssetUrl } from '../utils/assets';
import { Sparkles, Swords, Flame, Zap, Shield } from 'lucide-react';

interface BuildsRunesTabProps {
  runes: RunesData;
  items: ItemsData;
  summoners: SummonersData;
  abilities: AbilitiesData;
}

type SubSection = 'runes' | 'items' | 'summoners' | 'abilities';

export const BuildsRunesTab: React.FC<BuildsRunesTabProps> = ({
  runes,
  items,
  summoners,
  abilities,
}) => {
  const [activeSub, setActiveSub] = useState<SubSection>('runes');

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Sub-navigation pills */}
      <div className="flex flex-wrap items-center gap-2 bg-[#0c121a] p-2 rounded-2xl border border-[#213347] shadow-lg">
        <button
          onClick={() => setActiveSub('runes')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
            activeSub === 'runes'
              ? 'bg-[#c8aa6e] text-[#07090e] shadow-[0_0_15px_rgba(200,170,110,0.3)]'
              : 'text-[#8da0b8] hover:text-[#d3e0f0] hover:bg-[#121c27]'
          }`}
        >
          <Sparkles className="w-4 h-4" />
          <span>Configurações de Runas (PTA vs Conq)</span>
        </button>

        <button
          onClick={() => setActiveSub('items')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
            activeSub === 'items'
              ? 'bg-[#c8aa6e] text-[#07090e] shadow-[0_0_15px_rgba(200,170,110,0.3)]'
              : 'text-[#8da0b8] hover:text-[#d3e0f0] hover:bg-[#121c27]'
          }`}
        >
          <Swords className="w-4 h-4" />
          <span>Itens & Builds Completas</span>
        </button>

        <button
          onClick={() => setActiveSub('summoners')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
            activeSub === 'summoners'
              ? 'bg-[#c8aa6e] text-[#07090e] shadow-[0_0_15px_rgba(200,170,110,0.3)]'
              : 'text-[#8da0b8] hover:text-[#d3e0f0] hover:bg-[#121c27]'
          }`}
        >
          <Flame className="w-4 h-4" />
          <span>Feitiços de Invocador</span>
        </button>

        <button
          onClick={() => setActiveSub('abilities')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
            activeSub === 'abilities'
              ? 'bg-[#c8aa6e] text-[#07090e] shadow-[0_0_15px_rgba(200,170,110,0.3)]'
              : 'text-[#8da0b8] hover:text-[#d3e0f0] hover:bg-[#121c27]'
          }`}
        >
          <Zap className="w-4 h-4" />
          <span>Início de Habilidade & Maximização</span>
        </button>
      </div>

      {/* ============================================================== */}
      {/* 1. RUNAS                                                       */}
      {/* ============================================================== */}
      {activeSub === 'runes' && (
        <div className="space-y-8 animate-in fade-in duration-200">
          {/* PTA vs Conqueror Breakdown */}
          <div className="bg-[#0b121b] border border-[#213448] rounded-2xl p-6 sm:p-8 space-y-4 shadow-xl">
            <div className="flex items-center gap-2 text-xs font-bold text-[#c8aa6e] uppercase tracking-widest">
              <Sparkles className="w-4 h-4" />
              <span>Dilema da Runa Principal</span>
            </div>
            <h3 className="text-xl sm:text-3xl font-black text-[#f0e6d2] font-serif">
              {runes.ptaVsConqTitle || 'PTA OU CONQUEROR?'}
            </h3>
            <p className="text-sm text-[#cbd5e1] leading-relaxed whitespace-pre-line">
              {runes.ptaVsConqDetails || runes.ptaVsConqIntro}
            </p>
          </div>

          {/* 6 Visual Rune Setups from Godrekton */}
          <div>
            <h4 className="text-xl font-bold text-[#f0e6d2] font-serif mb-4 flex items-center gap-2">
              <Shield className="w-5 h-5 text-[#c8aa6e]" />
              <span>As 6 Páginas de Runas Recomendadas</span>
            </h4>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {runes.setups.map((setup, idx) => (
                <div
                  key={idx}
                  className="bg-[#0e1622] border border-[#1f2f42] rounded-2xl overflow-hidden hover:border-[#c8aa6e]/50 transition-all hover:shadow-xl flex flex-col justify-between"
                >
                  <div className="p-4 space-y-2 border-b border-[#182636]">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#172535] text-[#c8aa6e] font-bold">
                        PÁGINA {idx + 1}
                      </span>
                    </div>
                    <h5 className="font-bold text-base text-[#f0e6d2]">{setup.title}</h5>
                    <p className="text-xs text-[#8da0b8] leading-relaxed">
                      {setup.description}
                    </p>
                  </div>

                  <div className="p-3 bg-[#080d14] flex items-center justify-center">
                    <img
                      src={getAssetUrl(setup.image)}
                      alt={setup.title}
                      className="max-h-64 w-auto object-contain rounded-lg hover:scale-105 transition-transform duration-300 cursor-zoom-in"
                      onClick={() => window.open(getAssetUrl(setup.image), '_blank')}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ============================================================== */}
      {/* 2. ITENS & BUILDS                                              */}
      {/* ============================================================== */}
      {activeSub === 'items' && (
        <div className="space-y-8 animate-in fade-in duration-200">
          {/* Core Builds Diagrams */}
          <div>
            <h3 className="text-xl sm:text-2xl font-bold text-[#f0e6d2] font-serif mb-4 flex items-center gap-2">
              <Swords className="w-5 h-5 text-[#c8aa6e]" />
              <span>Builds Completas Recomendadas</span>
            </h3>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {items.builds.map((build, idx) => (
                <div
                  key={idx}
                  className="bg-[#0b121b] border border-[#203144] rounded-2xl p-5 space-y-4 hover:border-[#c8aa6e]/50 transition-all shadow-xl flex flex-col justify-between"
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#162332] text-[#c8aa6e] font-bold">
                        BUILD {idx + 1}
                      </span>
                    </div>
                    <h4 className="text-lg font-bold text-[#f0e6d2]">{build.title}</h4>
                    <p className="text-xs text-[#94a3b8] leading-relaxed">
                      {build.description}
                    </p>
                  </div>

                  <div className="rounded-xl overflow-hidden border border-[#1a293a] bg-[#070b10] p-2">
                    <img
                      src={getAssetUrl(build.image)}
                      alt={build.title}
                      className="w-full h-auto object-contain rounded-lg hover:scale-105 transition-transform duration-300 cursor-zoom-in"
                      onClick={() => window.open(getAssetUrl(build.image), '_blank')}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Item Tier List & Starts */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Item Starts & Boots */}
            <div className="bg-[#0b121b] border border-[#203144] rounded-2xl p-6 space-y-4 shadow-xl">
              <h4 className="text-lg font-bold text-[#f0e6d2] flex items-center gap-2">
                <Shield className="w-5 h-5 text-[#c8aa6e]" />
                <span>Itens Iniciais & Escolha de Botas</span>
              </h4>

              <div className="space-y-3">
                <div className="bg-[#0e1622] p-4 rounded-xl border border-[#1b2b3d]">
                  <strong className="text-[#c8aa6e] text-sm block mb-1">Inícios de Jogo:</strong>
                  <p className="text-xs text-[#94a3b8] leading-relaxed whitespace-pre-line">
                    {items.itemStarts}
                  </p>
                </div>

                <div className="bg-[#0e1622] p-4 rounded-xl border border-[#1b2b3d]">
                  <strong className="text-[#c8aa6e] text-sm block mb-1">Critério de Botas:</strong>
                  <p className="text-xs text-[#94a3b8] leading-relaxed whitespace-pre-line">
                    {items.boots}
                  </p>
                </div>
              </div>
            </div>

            {/* Item Tier List */}
            <div className="bg-[#0b121b] border border-[#203144] rounded-2xl p-6 space-y-4 shadow-xl">
              <h4 className="text-lg font-bold text-[#f0e6d2] flex items-center gap-2">
                <Swords className="w-5 h-5 text-[#c8aa6e]" />
                <span>Tier List de Itens Individuais</span>
              </h4>

              <div className="space-y-2.5 max-h-[460px] overflow-y-auto pr-1">
                {items.tierList.map((tier, idx) => (
                  <div key={idx} className="bg-[#0e1622] p-3.5 rounded-xl border border-[#1b2b3d]">
                    <div className="flex items-center gap-2 mb-1.5">
                      <span className="px-2 py-0.5 rounded bg-[#1c2c3d] text-[#c8aa6e] font-bold text-xs border border-[#c8aa6e]/30">
                        {tier.tier}
                      </span>
                    </div>
                    <p className="text-xs text-[#94a3b8] leading-relaxed whitespace-pre-line">
                      {tier.items}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ============================================================== */}
      {/* 3. FEITIÇOS (SUMMONERS)                                         */}
      {/* ============================================================== */}
      {activeSub === 'summoners' && (
        <div className="space-y-6 animate-in fade-in duration-200">
          <div className="bg-[#0b121b] border border-[#203144] rounded-2xl p-6 sm:p-8 space-y-3 shadow-xl">
            <h3 className="text-2xl font-bold text-[#f0e6d2] font-serif">
              {summoners.title}
            </h3>
            <p className="text-sm text-[#94a3b8] leading-relaxed">
              {summoners.intro}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {summoners.spells.map((spell, idx) => (
              <div
                key={idx}
                className="bg-[#0e1622] border border-[#1f2f42] rounded-2xl p-5 space-y-2.5 hover:border-[#c8aa6e]/50 transition-colors shadow-lg"
              >
                <div className="flex items-center justify-between">
                  <h4 className="font-bold text-base text-[#f0e6d2] flex items-center gap-2">
                    <Flame className="w-4 h-4 text-rose-400" />
                    <span>{spell.name}</span>
                  </h4>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#172535] text-[#8da0b8]">
                    FEITIÇO
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-[#94a3b8] leading-relaxed whitespace-pre-line">
                  {spell.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ============================================================== */}
      {/* 4. HABILIDADES & MAXIMIZAÇÃO                                   */}
      {/* ============================================================== */}
      {activeSub === 'abilities' && (
        <div className="space-y-6 animate-in fade-in duration-200">
          <div className="bg-[#0b121b] border border-[#203144] rounded-2xl p-6 sm:p-8 space-y-3 shadow-xl">
            <h3 className="text-2xl font-bold text-[#f0e6d2] font-serif">
              {abilities.title}
            </h3>
            <p className="text-sm text-[#94a3b8] leading-relaxed">
              {abilities.intro}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-[#0e1622] border border-[#1f2f42] rounded-2xl p-6 space-y-4 shadow-xl">
              <h4 className="text-lg font-bold text-[#f0e6d2] flex items-center gap-2">
                <Zap className="w-5 h-5 text-[#c8aa6e]" />
                <span>Início no Nível 1 (Q vs W vs E)</span>
              </h4>
              <p className="text-xs sm:text-sm text-[#94a3b8] leading-relaxed whitespace-pre-line">
                {abilities.level1Starts}
              </p>
              <div className="bg-[#0a0f16] p-4 rounded-xl border border-[#182636]">
                <strong className="text-[#c8aa6e] text-xs block mb-1">Na Rota Superior (Top):</strong>
                <p className="text-xs text-[#8da0b8] whitespace-pre-line leading-relaxed">
                  {abilities.topLaneStarts}
                </p>
              </div>
            </div>

            <div className="bg-[#0e1622] border border-[#1f2f42] rounded-2xl p-6 space-y-4 shadow-xl">
              <h4 className="text-lg font-bold text-[#f0e6d2] flex items-center gap-2">
                <Swords className="w-5 h-5 text-[#c8aa6e]" />
                <span>Ordem de Maximização de Habilidades</span>
              </h4>
              <p className="text-xs sm:text-sm text-[#94a3b8] leading-relaxed whitespace-pre-line">
                {abilities.maxOrderOverview}
              </p>
              <div className="bg-[#0a0f16] p-4 rounded-xl border border-[#182636]">
                <strong className="text-[#c8aa6e] text-xs block mb-1">Recomendações de Maximização:</strong>
                <p className="text-xs text-[#8da0b8] whitespace-pre-line leading-relaxed">
                  {abilities.topLaneMaxRecommendations}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

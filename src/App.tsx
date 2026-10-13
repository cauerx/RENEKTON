import React, { useState } from 'react';
import guideData from './data/guideData.json';
import type { GuideData } from './types/guide';
import { Header } from './components/Header';
import type { TabType } from './components/Header';
import { MatchupHub } from './components/MatchupHub';
import { CombosTab } from './components/CombosTab';
import { FuryTab } from './components/FuryTab';
import { BuildsRunesTab } from './components/BuildsRunesTab';
import { SkinsFaqTab } from './components/SkinsFaqTab';

export const App: React.FC = () => {
  const data = guideData as unknown as GuideData;
  const [activeTab, setActiveTab] = useState<TabType>('matchups');

  return (
    <div className="min-h-screen bg-[#07090e] text-[#e6edf5] flex flex-col font-sans selection:bg-[#c8aa6e]/30 selection:text-[#f0e6d2]">
      {/* Top Fixed Header with Navigation */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        totalMatchups={data.matchups.length}
      />

      {/* Main Tab Body */}
      <main className="flex-1 pb-16">
        {activeTab === 'matchups' && <MatchupHub matchups={data.matchups} />}
        {activeTab === 'combos' && <CombosTab mechanics={data.mechanics} />}
        {activeTab === 'fury' && <FuryTab fury={data.fury} />}
        {activeTab === 'builds' && (
          <BuildsRunesTab
            runes={data.runes}
            items={data.items}
            summoners={data.summoners}
            abilities={data.abilities}
          />
        )}
        {activeTab === 'skins' && (
          <SkinsFaqTab
            skins={data.skinTierList}
            faq={data.faq}
            intro={data.intro}
          />
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-[#182330] bg-[#05070a] py-6 px-4 text-center text-xs text-[#6e8196]">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
          <div>
            <span className="font-bold text-[#c8aa6e]">Renekton Guide App</span> • Baseado no guia oficial do{' '}
            <a
              href="https://www.youtube.com/@Godrekton"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#f0e6d2] underline hover:text-[#c8aa6e]"
            >
              Godrekton
            </a>
          </div>
          <div>
            Otimizado para uso local • 170 confrontos • League of Legends
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;

import { getAssetUrl } from '../utils/assets';
import { Shield, Zap, Flame, Sparkles, BookOpen, ExternalLink } from 'lucide-react';

export type TabType = 'matchups' | 'combos' | 'fury' | 'builds' | 'skins';

interface HeaderProps {
  activeTab: TabType;
  setActiveTab: (tab: TabType) => void;
  totalMatchups: number;
}

export const Header: React.FC<HeaderProps> = ({ activeTab, setActiveTab, totalMatchups }) => {
  const tabs: { id: TabType; label: string; icon: React.ReactNode; badge?: string | number }[] = [
    { id: 'matchups', label: 'Matchups (1v1)', icon: <Shield className="w-4 h-4" />, badge: totalMatchups },
    { id: 'combos', label: 'Combos & Mecânicas', icon: <Zap className="w-4 h-4" /> },
    { id: 'fury', label: 'Gerenciamento de Fúria', icon: <Flame className="w-4 h-4 text-red-400" /> },
    { id: 'builds', label: 'Runas, Feitiços & Builds', icon: <Sparkles className="w-4 h-4 text-amber-400" /> },
    { id: 'skins', label: 'Skins, FAQ & Sobre', icon: <BookOpen className="w-4 h-4" /> },
  ];

  return (
    <header className="sticky top-0 z-40 bg-[#080c12]/95 backdrop-blur-md border-b border-[#223042] shadow-2xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo & Champion info */}
          <div className="flex items-center gap-3.5 cursor-pointer" onClick={() => setActiveTab('matchups')}>
            <div className="relative group">
              <div className="w-12 h-12 rounded-xl overflow-hidden border-2 border-[#c8aa6e] shadow-[0_0_15px_rgba(200,170,110,0.3)] bg-[#0e1724]">
                <img
                  src="https://ddragon.leagueoflegends.com/cdn/14.24.1/img/champion/Renekton.png"
                  alt="Renekton"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  onError={(e) => {
                    // Fallback to local image
                    (e.target as HTMLImageElement).src = getAssetUrl('/extracted_media/image20.jpg');
                  }}
                />
              </div>
              <span className="absolute -bottom-1 -right-1 px-1.5 py-0.2 bg-[#c8aa6e] text-[#07090e] font-black text-[9px] rounded uppercase tracking-wider">
                TOP
              </span>
            </div>

            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl sm:text-2xl font-black tracking-wider uppercase font-serif text-transparent bg-clip-text bg-gradient-to-r from-[#f0e6d2] via-[#c8aa6e] to-[#c89b3c]">
                  Renekton Guide
                </h1>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-red-950/80 border border-red-500/30 text-red-300 uppercase tracking-widest hidden sm:inline-block">
                  Godrekton
                </span>
              </div>
              <p className="text-xs text-[#8a99ad] hidden sm:block">
                O Guia Definitivo do Carniceiro das Areias • 170 Confrontos Detalhados
              </p>
            </div>
          </div>

          {/* External Author links / Badge */}
          <div className="hidden lg:flex items-center gap-2">
            <a
              href="https://www.youtube.com/@Godrekton"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-[#c8aa6e] bg-[#141d28] border border-[#2d3e52] hover:border-[#c8aa6e] hover:bg-[#1a2636] transition-all"
            >
              <span>Canal do Godrekton</span>
              <ExternalLink className="w-3 h-3 opacity-70" />
            </a>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex space-x-1 sm:space-x-2 overflow-x-auto no-scrollbar py-2 border-t border-[#1a2533]">
          {tabs.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs sm:text-sm font-semibold whitespace-nowrap transition-all duration-200 cursor-pointer ${
                  isActive
                    ? 'bg-gradient-to-r from-[#c8aa6e]/20 via-[#c8aa6e]/15 to-transparent text-[#f0e6d2] border-b-2 border-[#c8aa6e] shadow-[inset_0_1px_0_rgba(200,170,110,0.3)]'
                    : 'text-[#8da0b8] hover:text-[#d3e0f0] hover:bg-[#121a24]'
                }`}
              >
                {tab.icon}
                <span>{tab.label}</span>
                {tab.badge !== undefined && (
                  <span
                    className={`ml-1 px-1.5 py-0.2 text-[10px] font-bold rounded-full ${
                      isActive ? 'bg-[#c8aa6e] text-[#07090e]' : 'bg-[#1b2634] text-[#8da0b8]'
                    }`}
                  >
                    {tab.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>
    </header>
  );
};

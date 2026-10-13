import React from 'react';
import type { SkinTierListData, FaqItem, IntroData } from '../types/guide';
import { Crown, HelpCircle, ExternalLink, Heart } from 'lucide-react';

interface SkinsFaqTabProps {
  skins: SkinTierListData;
  faq: FaqItem[];
  intro: IntroData;
}

export const SkinsFaqTab: React.FC<SkinsFaqTabProps> = ({ skins, faq, intro }) => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* 1. Skin Tier List */}
      <div className="bg-[#0b121b] border border-[#213448] rounded-2xl p-6 sm:p-8 space-y-6 shadow-xl">
        <div className="flex items-center gap-2 text-xs font-bold text-[#c8aa6e] uppercase tracking-widest">
          <Crown className="w-4 h-4 text-amber-400" />
          <span>Fluidez de Animações & Hitbox</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-black text-[#f0e6d2] font-serif">
          {skins.title}
        </h2>
        <p className="text-xs sm:text-sm text-[#94a3b8] leading-relaxed whitespace-pre-line">
          {skins.notes}
        </p>

        {/* Skin Tier List Graphic */}
        <div className="rounded-2xl overflow-hidden border border-[#233549] bg-[#070a10] shadow-2xl">
          <div className="p-3 bg-[#111924] border-b border-[#1c2c3e] flex items-center justify-between">
            <span className="text-xs font-bold text-[#c8aa6e]">Tier List Oficial de Skins do Renekton</span>
            <span className="text-[10px] text-[#768aa2]">Clique para ampliar</span>
          </div>
          <img
            src={skins.image}
            alt="Renekton Skin Tier List"
            className="w-full h-auto object-contain cursor-zoom-in"
            onClick={() => window.open(skins.image, '_blank')}
          />
        </div>
      </div>

      {/* 2. FAQ Section */}
      <div className="bg-[#0b121b] border border-[#213448] rounded-2xl p-6 sm:p-8 space-y-6 shadow-xl">
        <div className="flex items-center gap-2 text-xs font-bold text-[#c8aa6e] uppercase tracking-widest">
          <HelpCircle className="w-4 h-4 text-emerald-400" />
          <span>Perguntas Frequentes</span>
        </div>
        <h3 className="text-2xl font-black text-[#f0e6d2] font-serif">
          FAQ do Guia
        </h3>

        <div className="space-y-4">
          {faq.map((item, idx) => (
            <div
              key={idx}
              className="bg-[#0e1622] border border-[#1f2f42] rounded-xl p-4 sm:p-5 space-y-2 hover:border-[#c8aa6e]/40 transition-colors"
            >
              <h4 className="text-sm sm:text-base font-bold text-[#f0e6d2] flex items-start gap-2">
                <span className="text-[#c8aa6e] font-mono font-bold">Q:</span>
                <span>{item.question}</span>
              </h4>
              <p className="text-xs sm:text-sm text-[#94a3b8] leading-relaxed whitespace-pre-line pl-6">
                {item.answer}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* 3. About Godrekton & Community */}
      <div className="bg-gradient-to-r from-[#121c29] via-[#152335] to-[#0e1724] border border-[#243950] rounded-2xl p-6 sm:p-8 space-y-6 shadow-2xl">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl overflow-hidden border-2 border-[#c8aa6e] bg-[#080d14] shadow-lg">
              <img
                src="/extracted_media/image20.jpg"
                alt="Godrekton"
                className="w-full h-full object-cover"
                onError={(e) => {
                  (e.target as HTMLImageElement).src =
                    'https://ddragon.leagueoflegends.com/cdn/14.24.1/img/champion/Renekton.png';
                }}
              />
            </div>
            <div>
              <h3 className="text-xl sm:text-2xl font-black text-[#f0e6d2] font-serif flex items-center gap-2">
                <span>Sobre o Criador: Godrekton</span>
              </h3>
              <p className="text-xs text-[#8ca0b6]">
                Jogador mono Renekton há mais de 12 anos desde as primeiras temporadas do League of Legends.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs text-red-400 flex items-center gap-1 font-bold">
              <Heart className="w-3.5 h-3.5 fill-red-500 text-red-500" />
              <span>Criado pela Comunidade</span>
            </span>
          </div>
        </div>

        <p className="text-xs sm:text-sm text-[#cbd5e1] leading-relaxed whitespace-pre-line bg-[#0c141f] p-4 rounded-xl border border-[#1b2b3d]">
          {intro.about}
        </p>

        {/* Social Buttons */}
        <div className="pt-2">
          <span className="text-xs text-[#788ca3] uppercase tracking-wider block mb-3 font-bold">
            Acompanhe o Conteúdo do Godrekton:
          </span>
          <div className="flex flex-wrap gap-3">
            {intro.socials.map((social, idx) => (
              <a
                key={idx}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold text-[#c8aa6e] bg-[#0e1622] border border-[#213245] hover:border-[#c8aa6e] hover:bg-[#162334] transition-all shadow-md"
              >
                <span>{social.platform}</span>
                <ExternalLink className="w-3 h-3 opacity-70" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

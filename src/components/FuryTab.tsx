import React from 'react';
import type { FuryData } from '../types/guide';
import { getAssetUrl } from '../utils/assets';
import { Flame, Activity, Zap, CheckCircle2 } from 'lucide-react';

interface FuryTabProps {
  fury: FuryData;
}

export const FuryTab: React.FC<FuryTabProps> = ({ fury }) => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Hero Header */}
      <div className="relative rounded-2xl bg-gradient-to-r from-[#170e12] via-[#211218] to-[#120d14] border border-[#441f2a] p-6 sm:p-8 shadow-2xl overflow-hidden">
        <div className="relative z-10 max-w-3xl space-y-3">
          <div className="flex items-center gap-2 text-xs font-bold text-red-400 uppercase tracking-widest">
            <Flame className="w-4 h-4 text-red-500 animate-pulse" />
            <span>Recurso Essencial do Crocodilo</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-black text-[#f0e6d2] font-serif tracking-wide">
            {fury.title}
          </h2>
          <p className="text-sm sm:text-base text-[#d19aa3] leading-relaxed">
            {fury.intro}
          </p>
        </div>
      </div>

      {/* Fury Bar Visualizer & Priority Cards */}
      <div className="bg-[#0e1219] border border-[#213042] rounded-2xl p-6 shadow-xl space-y-6">
        <div>
          <h3 className="text-xl font-bold text-[#f0e6d2] font-serif flex items-center gap-2 mb-2">
            <Activity className="w-5 h-5 text-[#c8aa6e]" />
            <span>Entendendo a Barra de Fúria (Regra dos 50+)</span>
          </h3>
          <p className="text-sm text-[#8ca0b6] leading-relaxed">
            Renekton armazena até 100 de Fúria. Ao atingir 50 de fúria (barra fica vermelha), sua próxima habilidade básica consome 50 de fúria e se torna <strong>Fortalecida</strong>, ganhando efeitos absurdos.
          </p>
        </div>

        {/* 3 Empowered Abilities Comparison */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Empowered Q */}
          <div className="bg-[#121924] border border-emerald-900/50 rounded-xl p-4 space-y-2 hover:border-emerald-500/50 transition-colors">
            <div className="flex items-center justify-between">
              <span className="px-2.5 py-1 rounded bg-emerald-950 text-emerald-300 font-mono font-bold text-xs border border-emerald-500/40">
                Q FORTALECIDO (50 Fúria)
              </span>
              <span className="text-[10px] text-emerald-400 font-bold">SUSTAIN / POKE</span>
            </div>
            <h4 className="font-bold text-sm text-[#f0e6d2]">Abate os Indefesos</h4>
            <p className="text-xs text-[#94a3b8] leading-relaxed">
              Causa 50% mais dano e cura até <strong>300% a mais</strong> contra campeões, quadruplicando seu sustain na lane ou em lutas no meio de tropas.
            </p>
          </div>

          {/* Empowered W */}
          <div className="bg-[#181119] border border-rose-900/50 rounded-xl p-4 space-y-2 hover:border-rose-500/50 transition-colors">
            <div className="flex items-center justify-between">
              <span className="px-2.5 py-1 rounded bg-rose-950 text-rose-300 font-mono font-bold text-xs border border-rose-500/40">
                W FORTALECIDO (50 Fúria)
              </span>
              <span className="text-[10px] text-rose-400 font-bold">BURST / ANTI-ESCUDO</span>
            </div>
            <h4 className="font-bold text-sm text-[#f0e6d2]">Predador Desumano</h4>
            <p className="text-xs text-[#94a3b8] leading-relaxed">
              Ataca 3 vezes (225% AD total), <strong>destrói escudos inimigos</strong> antes de causar dano e atordoa o alvo por 1.5 segundos. Aplica 3 efeitos on-hit (BoTRK/PTA instantâneo).
            </p>
          </div>

          {/* Empowered E */}
          <div className="bg-[#17151e] border border-amber-900/50 rounded-xl p-4 space-y-2 hover:border-amber-500/50 transition-colors">
            <div className="flex items-center justify-between">
              <span className="px-2.5 py-1 rounded bg-amber-950 text-amber-300 font-mono font-bold text-xs border border-amber-500/40">
                E FORTALECIDO (50 Fúria)
              </span>
              <span className="text-[10px] text-amber-400 font-bold">ANTI-TANQUE</span>
            </div>
            <h4 className="font-bold text-sm text-[#f0e6d2]">Cortar (Dice)</h4>
            <p className="text-xs text-[#94a3b8] leading-relaxed">
              Apenas o segundo avanço (E2) consome fúria: <strong>destrói até 35% da armadura</strong> de todos os inimigos atingidos por 4 segundos, triturando tanques.
            </p>
          </div>
        </div>

        {/* Official Fury Infographic */}
        <div className="border border-[#233549] rounded-xl overflow-hidden bg-[#070a10]">
          <div className="p-3 bg-[#111a26] border-b border-[#1f2d3d] flex items-center justify-between">
            <span className="text-xs font-bold text-[#c8aa6e]">Infográfico de Geração e Gerenciamento de Fúria</span>
            <span className="text-[10px] text-[#788ca3]">Clique na imagem para ampliar</span>
          </div>
          <img
            src={getAssetUrl('/extracted_media/image22.png')}
            alt="Fury Mechanics Diagram"
            className="w-full h-auto object-contain cursor-zoom-in"
            onClick={() => window.open(getAssetUrl('/extracted_media/image22.png'), '_blank')}
          />
        </div>
      </div>

      {/* Ways to Maintain & Practice Methods */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Ways to Maintain */}
        <div className="bg-[#0b1118] border border-[#203144] rounded-2xl p-6 space-y-4 shadow-xl">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-lg bg-emerald-950/80 text-emerald-400 border border-emerald-500/30">
              <CheckCircle2 className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-[#f0e6d2]">Como Manter e Gerar Fúria</h3>
          </div>

          <div className="space-y-3 text-xs sm:text-sm text-[#94a3b8] leading-relaxed">
            <div className="bg-[#0e1622] p-3.5 rounded-xl border border-[#1b2b3d]">
              <strong className="text-[#f0e6d2] block mb-1">Estar em Combate:</strong>
              Permanecer em combate impede que a fúria decaia após 12 segundos. Bater em tropas ou monstros mantém a barra quente.
            </div>
            <div className="bg-[#0e1622] p-3.5 rounded-xl border border-[#1b2b3d]">
              <strong className="text-[#f0e6d2] block mb-1">Preparação de Onda (Wave Prep):</strong>
              Sempre suba sua fúria para 45-50 antes de iniciar uma investida com E. Um ataque básico seguido de E1 leva você para 50+ na hora do contato!
            </div>
            <div className="bg-[#0e1622] p-3.5 rounded-xl border border-[#1b2b3d]">
              <strong className="text-[#f0e6d2] block mb-1">Ativação do R (Dominus):</strong>
              Dominus concede 20 de fúria imediata e gera 5 de fúria por segundo continuamente, garantindo rotações contínuas de habilidades fortalecidas.
            </div>
          </div>
        </div>

        {/* Practice Methods */}
        <div className="bg-[#0b1118] border border-[#203144] rounded-2xl p-6 space-y-4 shadow-xl">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-lg bg-amber-950/80 text-amber-400 border border-amber-500/30">
              <Zap className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-[#f0e6d2]">Métodos de Prática & Treinamento</h3>
          </div>

          <div className="space-y-3 text-xs sm:text-sm text-[#94a3b8] leading-relaxed">
            <div className="bg-[#0e1622] p-3.5 rounded-xl border border-[#1b2b3d]">
              <strong className="text-[#f0e6d2] block mb-1">Treino na Ferramenta de Prática (Practice Tool):</strong>
              Posicione 3 bonecos de treino (Dummies) e pratique a rotação de fúria: chegue com 0 de fúria e observe quanto cada habilidade e auto-ataque gera.
            </div>
            <div className="bg-[#0e1622] p-3.5 rounded-xl border border-[#1b2b3d]">
              <strong className="text-[#f0e6d2] block mb-1">Cálculo Mental de Fúria:</strong>
              Treine calcular quando seu W gastará os 50 de fúria e quanto seu Q recuperará se atingir múltiplos campeões na mesma área.
            </div>
            <div className="bg-[#0e1622] p-3.5 rounded-xl border border-[#1b2b3d]">
              <strong className="text-[#f0e6d2] block mb-1">Decisão Sob Pressão:</strong>
              Em duelos 1v1 com pouca vida, pondere: fortalecer Q para virar a luta com cura massiva ou fortalecer W para deletar o escudo e garantir o stun?
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

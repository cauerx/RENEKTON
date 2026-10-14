import React, { useState } from 'react';
import type { MechanicsData } from '../types/guide';
import { getAssetUrl } from '../utils/assets';
import { Zap, Play, ChevronDown, ChevronUp, Swords, Layers } from 'lucide-react';

interface CombosTabProps {
  mechanics: MechanicsData;
}

export const CombosTab: React.FC<CombosTabProps> = ({ mechanics }) => {
  const [expandedSection, setExpandedSection] = useState<string | null>('combos');

  const toggle = (title: string) => {
    setExpandedSection(expandedSection === title ? null : title);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Hero Banner */}
      <div className="relative rounded-2xl bg-gradient-to-r from-[#111924] via-[#142132] to-[#0c131d] border border-[#233549] p-6 sm:p-8 shadow-2xl overflow-hidden">
        <div className="relative z-10 max-w-3xl space-y-3">
          <div className="flex items-center gap-2 text-xs font-bold text-[#c8aa6e] uppercase tracking-widest">
            <Zap className="w-4 h-4 text-amber-400" />
            <span>Guia Avançado de Execução</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-black text-[#f0e6d2] font-serif tracking-wide">
            {mechanics.title}
          </h2>
          <p className="text-sm sm:text-base text-[#94a3b8] leading-relaxed">
            {mechanics.intro}
          </p>

          {mechanics.video && (
            <div className="pt-2">
              <a
                href={mechanics.video.split(' ')[0]}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-red-600 hover:bg-red-500 text-white font-bold text-xs sm:text-sm shadow-lg transition-all"
              >
                <Play className="w-4 h-4 fill-white" />
                <span>Assistir no YouTube</span>
              </a>
            </div>
          )}
        </div>
      </div>

      {/* Featured Infographic Combos (Lane & All-In) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Short Trading Combos */}
        <div className="bg-[#0b121b] border border-[#21354a] rounded-2xl p-5 sm:p-6 space-y-4 hover:border-[#c8aa6e]/50 transition-colors shadow-xl">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-amber-950/70 border border-amber-500/30 text-amber-300">
              <Swords className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-[#f0e6d2]">Combos de Troca Curta (Lane Trades)</h3>
              <p className="text-xs text-[#8a99ad]">E &gt; Q &gt; AA &gt; W &gt; AA &gt; E Out / E &gt; Q &gt; W &gt; E</p>
            </div>
          </div>

          <div className="rounded-xl overflow-hidden border border-[#1b2b3d] bg-[#070b10]">
            <img
              src={getAssetUrl('/extracted_media/image42.png')}
              alt="Lane Trading Combos"
              className="w-full h-auto object-contain hover:scale-105 transition-transform duration-300 cursor-zoom-in"
              onClick={() => window.open(getAssetUrl('/extracted_media/image42.png'), '_blank')}
            />
          </div>
          <p className="text-xs text-[#94a3b8] leading-relaxed">
            Dica: use esses combos rápidos para diminuir a vida do adversário sem receber retaliação, preparando o abate com Flash ou mergulho sob a torre.
          </p>
        </div>

        {/* All-In Combos */}
        <div className="bg-[#0b121b] border border-[#21354a] rounded-2xl p-5 sm:p-6 space-y-4 hover:border-[#c8aa6e]/50 transition-colors shadow-xl">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-rose-950/70 border border-rose-500/30 text-rose-300">
              <Zap className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-[#f0e6d2]">Combos de All-In (Abate Completo)</h3>
              <p className="text-xs text-[#8a99ad]">Ativação com R, Fúria máxima e cancelamentos de animação</p>
            </div>
          </div>

          <div className="rounded-xl overflow-hidden border border-[#1b2b3d] bg-[#070b10]">
            <img
              src={getAssetUrl('/extracted_media/image37.png')}
              alt="All-In Combos"
              className="w-full h-auto object-contain hover:scale-105 transition-transform duration-300 cursor-zoom-in"
              onClick={() => window.open(getAssetUrl('/extracted_media/image37.png'), '_blank')}
            />
          </div>
          <p className="text-xs text-[#94a3b8] leading-relaxed">
            Dica: Inicie com R para gerar fúria constante. Cancele animações usando W &gt; R ou ativações de Hidra para aplicar dano máximo em milissegundos.
          </p>
        </div>
      </div>

      {/* Mechanics Breakdown Accordions */}
      <div className="space-y-4">
        <h3 className="text-xl font-bold text-[#f0e6d2] font-serif flex items-center gap-2">
          <Layers className="w-5 h-5 text-[#c8aa6e]" />
          <span>Cancelamentos de Animação e Mecânicas Detalhadas</span>
        </h3>

        {/* 1. Auto Attack Cancels */}
        <div className="bg-[#0b121b] border border-[#1f3044] rounded-xl overflow-hidden">
          <button
            onClick={() => toggle('auto-cancels')}
            className="w-full flex items-center justify-between p-4 sm:p-5 text-left bg-[#0e1724] hover:bg-[#131f2f] transition-colors"
          >
            <div className="flex items-center gap-3">
              <span className="w-8 h-8 rounded-lg bg-[#1b2a3d] border border-[#c8aa6e]/40 flex items-center justify-center font-bold text-xs text-[#c8aa6e]">
                AA
              </span>
              <div>
                <h4 className="font-bold text-sm sm:text-base text-[#f0e6d2]">Auto Attack Cancels</h4>
                <p className="text-xs text-[#7e92aa]">Cancelando a animação de recuo do ataque básico com habilidades e itens</p>
              </div>
            </div>
            {expandedSection === 'auto-cancels' ? <ChevronUp className="w-5 h-5 text-[#8da0b8]" /> : <ChevronDown className="w-5 h-5 text-[#8da0b8]" />}
          </button>
          {expandedSection === 'auto-cancels' && (
            <div className="p-4 sm:p-6 space-y-4 border-t border-[#172535] bg-[#090f17]">
              <div className="max-w-md mx-auto rounded-xl overflow-hidden border border-[#233549]">
                <img src={getAssetUrl('/extracted_media/image25.png')} alt="AA Cancels" className="w-full h-auto object-contain" />
              </div>
              <pre className="text-xs sm:text-sm text-[#cbd5e1] font-mono whitespace-pre-wrap leading-relaxed bg-[#0d1622] p-4 rounded-xl border border-[#1d2d3e]">
                {mechanics.sections[0]?.content}
              </pre>
            </div>
          )}
        </div>

        {/* 2. Items Doublecasts / Cancels */}
        <div className="bg-[#0b121b] border border-[#1f3044] rounded-xl overflow-hidden">
          <button
            onClick={() => toggle('item-cancels')}
            className="w-full flex items-center justify-between p-4 sm:p-5 text-left bg-[#0e1724] hover:bg-[#131f2f] transition-colors"
          >
            <div className="flex items-center gap-3">
              <span className="w-8 h-8 rounded-lg bg-[#1b2a3d] border border-[#c8aa6e]/40 flex items-center justify-center font-bold text-xs text-[#c8aa6e]">
                ITEM
              </span>
              <div>
                <h4 className="font-bold text-sm sm:text-base text-[#f0e6d2]">Interações de Itens Ativos (Hydra, Stridebreaker, Profane)</h4>
                <p className="text-xs text-[#7e92aa]">Doublecasts e cancelamentos instantâneos com ativos</p>
              </div>
            </div>
            {expandedSection === 'item-cancels' ? <ChevronUp className="w-5 h-5 text-[#8da0b8]" /> : <ChevronDown className="w-5 h-5 text-[#8da0b8]" />}
          </button>
          {expandedSection === 'item-cancels' && (
            <div className="p-4 sm:p-6 space-y-4 border-t border-[#172535] bg-[#090f17]">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-[#0d1520] border border-[#223347] rounded-xl p-3 space-y-2">
                  <h5 className="font-bold text-sm text-[#f0e6d2]">Ravenous Hydra</h5>
                  <img src={getAssetUrl('/extracted_media/image34.png')} alt="Ravenous Hydra" className="w-full rounded-lg" />
                  <p className="text-xs text-[#8a99ad]">Ravenous &gt; AA (cancela animação com clique direito) / Ravenous &gt; Q</p>
                </div>
                <div className="bg-[#0d1520] border border-[#223347] rounded-xl p-3 space-y-2">
                  <h5 className="font-bold text-sm text-[#f0e6d2]">Stridebreaker</h5>
                  <img src={getAssetUrl('/extracted_media/image43.png')} alt="Stridebreaker" className="w-full rounded-lg" />
                  <p className="text-xs text-[#8a99ad]">Stridebreaker &gt; AA / Stridebreaker &gt; Q para aplicar lentidão e dano imediato</p>
                </div>
                <div className="bg-[#0d1520] border border-[#223347] rounded-xl p-3 space-y-2">
                  <h5 className="font-bold text-sm text-[#f0e6d2]">Profane Hydra</h5>
                  <img src={getAssetUrl('/extracted_media/image40.png')} alt="Profane Hydra" className="w-full rounded-lg" />
                  <p className="text-xs text-[#8a99ad]">Profane &gt; AA / Profane &gt; Q para explosão letal</p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* 3. Q - Cull Of The Meek */}
        <div className="bg-[#0b121b] border border-[#1f3044] rounded-xl overflow-hidden">
          <button
            onClick={() => toggle('q-mechanics')}
            className="w-full flex items-center justify-between p-4 sm:p-5 text-left bg-[#0e1724] hover:bg-[#131f2f] transition-colors"
          >
            <div className="flex items-center gap-3">
              <span className="w-8 h-8 rounded-lg bg-emerald-950/70 border border-emerald-500/40 flex items-center justify-center font-bold text-xs text-emerald-300">
                Q
              </span>
              <div>
                <h4 className="font-bold text-sm sm:text-base text-[#f0e6d2]">Q - Cull Of The Meek (Abate os Indefesos)</h4>
                <p className="text-xs text-[#7e92aa]">Buffering, Q Flash e cancelamentos de animação</p>
              </div>
            </div>
            {expandedSection === 'q-mechanics' ? <ChevronUp className="w-5 h-5 text-[#8da0b8]" /> : <ChevronDown className="w-5 h-5 text-[#8da0b8]" />}
          </button>
          {expandedSection === 'q-mechanics' && (
            <div className="p-4 sm:p-6 space-y-4 border-t border-[#172535] bg-[#090f17]">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-[#0d1520] border border-[#223347] rounded-xl p-3 space-y-2">
                  <h5 className="font-bold text-xs text-[#c8aa6e]">Buffering contra CC</h5>
                  <img src={getAssetUrl('/extracted_media/image21.png')} alt="Q Buffering" className="w-full rounded-lg" />
                  <p className="text-xs text-[#8a99ad]">Spam de clique direito ou W durante animação do Q para garantir dano mesmo ao ser atordoado.</p>
                </div>
                <div className="bg-[#0d1520] border border-[#223347] rounded-xl p-3 space-y-2">
                  <h5 className="font-bold text-xs text-[#c8aa6e]">Q Flash</h5>
                  <img src={getAssetUrl('/extracted_media/image26.png')} alt="Q Flash" className="w-full rounded-lg" />
                  <p className="text-xs text-[#8a99ad]">Q &gt; Flash aplica dano antes do flash; Flash &gt; Q aplica após o flash para reposicionamento.</p>
                </div>
                <div className="bg-[#0d1520] border border-[#223347] rounded-xl p-3 space-y-2">
                  <h5 className="font-bold text-xs text-[#c8aa6e]">Cancelamento com AA</h5>
                  <img src={getAssetUrl('/extracted_media/image30.png')} alt="Q Cancels" className="w-full rounded-lg" />
                  <p className="text-xs text-[#8a99ad]">AA &gt; Q &gt; W ou E &gt; Q &gt; AA para conexões instantâneas.</p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* 4. W - Ruthless Predator */}
        <div className="bg-[#0b121b] border border-[#1f3044] rounded-xl overflow-hidden">
          <button
            onClick={() => toggle('w-mechanics')}
            className="w-full flex items-center justify-between p-4 sm:p-5 text-left bg-[#0e1724] hover:bg-[#131f2f] transition-colors"
          >
            <div className="flex items-center gap-3">
              <span className="w-8 h-8 rounded-lg bg-rose-950/70 border border-rose-500/40 flex items-center justify-center font-bold text-xs text-rose-300">
                W
              </span>
              <div>
                <h4 className="font-bold text-sm sm:text-base text-[#f0e6d2]">W - Ruthless Predator (Predador Desumano)</h4>
                <p className="text-xs text-[#7e92aa]">Interações de Runas, On-Hit e W &gt; R Doublecast Instantâneo</p>
              </div>
            </div>
            {expandedSection === 'w-mechanics' ? <ChevronUp className="w-5 h-5 text-[#8da0b8]" /> : <ChevronDown className="w-5 h-5 text-[#8da0b8]" />}
          </button>
          {expandedSection === 'w-mechanics' && (
            <div className="p-4 sm:p-6 space-y-4 border-t border-[#172535] bg-[#090f17]">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-[#0d1520] border border-[#223347] rounded-xl p-3 space-y-2">
                  <h5 className="font-bold text-xs text-[#c8aa6e]">Interações de Runas</h5>
                  <img src={getAssetUrl('/extracted_media/image23.png')} alt="W Runes" className="w-full rounded-lg" />
                  <p className="text-xs text-[#8a99ad]">W ativa PTA instantaneamente com 3 acertos quando fortalecido (50+ de fúria) e acumula Conquistador em segundos.</p>
                </div>
                <div className="bg-[#0d1520] border border-[#223347] rounded-xl p-3 space-y-2">
                  <h5 className="font-bold text-xs text-[#c8aa6e]">On-Hit e Buffering</h5>
                  <img src={getAssetUrl('/extracted_media/image33.png')} alt="W On Hit" className="w-full rounded-lg" />
                  <p className="text-xs text-[#8a99ad]">W aplica todos os efeitos de contato (BoTRK, cutelo) em cada um dos 2 ou 3 acertos.</p>
                </div>
                <div className="bg-[#0d1520] border border-[#223347] rounded-xl p-3 space-y-2">
                  <h5 className="font-bold text-xs text-[#c8aa6e]">W &gt; R Double Cast</h5>
                  <img src={getAssetUrl('/extracted_media/image24.png')} alt="W Double Cast" className="w-full rounded-lg" />
                  <p className="text-xs text-[#8a99ad]">Pressione R imediatamente após o W para cancelar o auto-atordoamento do Renekton, mantendo o inimigo preso!</p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* 5. E - Slice and Dice */}
        <div className="bg-[#0b121b] border border-[#1f3044] rounded-xl overflow-hidden">
          <button
            onClick={() => toggle('e-mechanics')}
            className="w-full flex items-center justify-between p-4 sm:p-5 text-left bg-[#0e1724] hover:bg-[#131f2f] transition-colors"
          >
            <div className="flex items-center gap-3">
              <span className="w-8 h-8 rounded-lg bg-amber-950/70 border border-amber-500/40 flex items-center justify-center font-bold text-xs text-amber-300">
                E
              </span>
              <div>
                <h4 className="font-bold text-sm sm:text-base text-[#f0e6d2]">E - Slice And Dice (Fatiar e Cortar)</h4>
                <p className="text-xs text-[#7e92aa]">E Flash e remoção de delay entre conjurações</p>
              </div>
            </div>
            {expandedSection === 'e-mechanics' ? <ChevronUp className="w-5 h-5 text-[#8da0b8]" /> : <ChevronDown className="w-5 h-5 text-[#8da0b8]" />}
          </button>
          {expandedSection === 'e-mechanics' && (
            <div className="p-4 sm:p-6 space-y-4 border-t border-[#172535] bg-[#090f17]">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-[#0d1520] border border-[#223347] rounded-xl p-3 space-y-2">
                  <h5 className="font-bold text-xs text-[#c8aa6e]">E Flash</h5>
                  <img src={getAssetUrl('/extracted_media/image36.png')} alt="E Flash" className="w-full rounded-lg" />
                  <p className="text-xs text-[#8a99ad]">A animação do E conclui antes do flash. Use Flash &gt; E para cobrir distâncias astronômicas de surpresa.</p>
                </div>
                <div className="bg-[#0d1520] border border-[#223347] rounded-xl p-3 space-y-2">
                  <h5 className="font-bold text-xs text-[#c8aa6e]">Remoção do Delay de E1 para E2</h5>
                  <img src={getAssetUrl('/extracted_media/image28.png')} alt="E Delay Removal" className="w-full rounded-lg" />
                  <p className="text-xs text-[#8a99ad]">Técnicas de clique para diminuir o atraso entre a primeira e a segunda investida do E.</p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* 6. R - Dominus */}
        <div className="bg-[#0b121b] border border-[#1f3044] rounded-xl overflow-hidden">
          <button
            onClick={() => toggle('r-mechanics')}
            className="w-full flex items-center justify-between p-4 sm:p-5 text-left bg-[#0e1724] hover:bg-[#131f2f] transition-colors"
          >
            <div className="flex items-center gap-3">
              <span className="w-8 h-8 rounded-lg bg-red-950/70 border border-red-500/40 flex items-center justify-center font-bold text-xs text-red-300">
                R
              </span>
              <div>
                <h4 className="font-bold text-sm sm:text-base text-[#f0e6d2]">R - Dominus</h4>
                <p className="text-xs text-[#7e92aa]">Aumento de alcance, geração contínua de Fúria e cancelamentos R &gt; AA</p>
              </div>
            </div>
            {expandedSection === 'r-mechanics' ? <ChevronUp className="w-5 h-5 text-[#8da0b8]" /> : <ChevronDown className="w-5 h-5 text-[#8da0b8]" />}
          </button>
          {expandedSection === 'r-mechanics' && (
            <div className="p-4 sm:p-6 space-y-4 border-t border-[#172535] bg-[#090f17]">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-[#0d1520] border border-[#223347] rounded-xl p-3 space-y-2">
                  <h5 className="font-bold text-xs text-[#c8aa6e]">Aumento de Alcance (+25 Range)</h5>
                  <img src={getAssetUrl('/extracted_media/image32.png')} alt="R Range" className="w-full rounded-lg" />
                  <p className="text-xs text-[#8a99ad]">Dominus aumenta o alcance do auto-ataque e do Q em 25 unidades, facilitando acertos na borda.</p>
                </div>
                <div className="bg-[#0d1520] border border-[#223347] rounded-xl p-3 space-y-2">
                  <h5 className="font-bold text-xs text-[#c8aa6e]">R &gt; AA e R &gt; Q Cancels</h5>
                  <img src={getAssetUrl('/extracted_media/image35.png')} alt="R Cancels" className="w-full rounded-lg" />
                  <p className="text-xs text-[#8a99ad]">Pressione clique direito ou Q logo após conjurar R para cortar a animação de transformação.</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

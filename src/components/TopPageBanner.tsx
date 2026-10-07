import React from 'react';
import { ShieldCheck, Heart, Newspaper, ArrowRight, Sparkles } from 'lucide-react';

interface TopPageBannerProps {
  currentPage: 'home' | 'tea' | 'news';
  onNavigate: (page: 'home' | 'tea' | 'news') => void;
}

export const TopPageBanner: React.FC<TopPageBannerProps> = ({ currentPage, onNavigate }) => {
  const tabs = [
    {
      id: 'home' as const,
      title: 'Início (Planos de Saúde)',
      kicker: 'Cotação & Consultoria',
      desc: 'Aline Matos com mais de 15 anos nas maiores corretoras de Belo Horizonte.',
      badge: 'Principal',
      icon: ShieldCheck,
      color: 'emerald',
    },
    {
      id: 'tea' as const,
      title: 'Plano de Saúde para Autistas (TEA)',
      kicker: 'Artigo Completo & Direitos',
      desc: 'Terapias multidisciplinares (ABA, Denver), fim de limites de sessões e jurisprudência STJ.',
      badge: 'Direitos Garantidos',
      icon: Heart,
      color: 'rose',
    },
    {
      id: 'news' as const,
      title: 'Notícias Saúde Suplementar',
      kicker: 'Levantamento 2024–2026',
      desc: 'Cronologia de reportagens com links clicáveis sobre reajustes, ANS e STF.',
      badge: '45 Notícias',
      icon: Newspaper,
      color: 'teal',
    },
  ];

  return (
    <div className="w-full bg-slate-950/95 border-b border-slate-800/80 pt-3 pb-4 px-4 sm:px-6 lg:px-8 relative z-30">
      <div className="max-w-7xl mx-auto">
        
        {/* Banner Kicker Label */}
        <div className="flex items-center justify-between gap-2 mb-2.5">
          <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-slate-300">
            <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
            <span>Navegue pelas Páginas e Guias Oficiais:</span>
          </div>
          <span className="text-[11px] text-slate-400 font-medium hidden sm:inline">
            Clique para alternar entre os conteúdos
          </span>
        </div>

        {/* Carousel / Responsive Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5 sm:gap-4">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = currentPage === tab.id;

            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => {
                  onNavigate(tab.id);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className={`p-4 rounded-2xl text-left transition-all duration-200 cursor-pointer relative flex flex-col justify-between border ${
                  isActive
                    ? 'bg-gradient-to-br from-slate-900 to-slate-800 border-emerald-500 shadow-xl shadow-emerald-500/10 ring-2 ring-emerald-500/30'
                    : 'bg-slate-900/70 border-slate-800 hover:border-slate-700 hover:bg-slate-900'
                }`}
              >
                {/* Active Indicator Top Bar */}
                {isActive && (
                  <div className="absolute -top-px left-4 right-4 h-0.5 bg-gradient-to-r from-emerald-500 via-teal-400 to-emerald-500 rounded-full" />
                )}

                <div>
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <div className="flex items-center gap-2">
                      <div className={`p-2 rounded-xl shrink-0 ${
                        isActive
                          ? 'bg-emerald-500 text-slate-950'
                          : 'bg-slate-800 text-emerald-400'
                      }`}>
                        <Icon className="w-4 h-4" />
                      </div>
                      <span className="text-[11px] font-extrabold uppercase tracking-wider text-emerald-400">
                        {tab.kicker}
                      </span>
                    </div>

                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${
                      isActive
                        ? 'bg-emerald-950 text-emerald-300 border-emerald-500/40'
                        : 'bg-slate-800 text-slate-400 border-slate-700'
                    }`}>
                      {tab.badge}
                    </span>
                  </div>

                  <h3 className="text-sm sm:text-base font-black text-white leading-snug">
                    {tab.title}
                  </h3>

                  <p className="text-xs text-slate-400 mt-1 leading-relaxed line-clamp-2">
                    {tab.desc}
                  </p>
                </div>

                <div className="pt-3 mt-2 border-t border-slate-800/80 flex items-center justify-between text-xs font-bold">
                  <span className={isActive ? 'text-emerald-400' : 'text-slate-400'}>
                    {isActive ? 'Página aberta agora' : 'Acessar página'}
                  </span>
                  <ArrowRight className={`w-3.5 h-3.5 transition-transform ${
                    isActive ? 'text-emerald-400 translate-x-1' : 'text-slate-500'
                  }`} />
                </div>
              </button>
            );
          })}
        </div>

      </div>
    </div>
  );
};

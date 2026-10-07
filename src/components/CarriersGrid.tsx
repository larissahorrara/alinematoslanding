import React, { useState } from 'react';
import { CARRIERS, HOSPITALS_BH } from '../data/carriers';
import { CheckCircle2, MessageCircle, Hospital, ShieldCheck, ArrowRight } from 'lucide-react';
import { openWhatsApp } from '../utils/whatsapp';

export const CarriersGrid: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const filteredCarriers = selectedCategory === 'all'
    ? CARRIERS
    : CARRIERS.filter(c => {
        if (selectedCategory === 'empresarial') return c.category.includes('Corporativo') || c.category.includes('Nacional');
        if (selectedCategory === 'regional') return c.category.includes('Minas Gerais') || c.category.includes('Regional');
        return true;
      });

  return (
    <section id="operadoras" className="py-20 bg-slate-900 text-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-950/80 border border-emerald-500/30 text-emerald-400 text-xs font-semibold uppercase tracking-wider mb-3">
            <ShieldCheck className="w-3.5 h-3.5" />
            Parcerias Diretas & Credenciamento Oficial
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
            As Melhores Operadoras e Seguradoras do País
          </h2>
          <p className="mt-3 text-slate-300 text-base sm:text-lg">
            Aline Matos trabalha com as maiores e mais bem avaliadas operadoras da ANS, garantindo acesso às redes hospitalares mais respeitadas de Belo Horizonte, Minas Gerais e do Brasil.
          </p>

          {/* Filter tabs */}
          <div className="flex items-center justify-center gap-2 mt-8">
            <button
              onClick={() => setSelectedCategory('all')}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-colors cursor-pointer ${
                selectedCategory === 'all'
                  ? 'bg-emerald-500 text-slate-950 shadow-md'
                  : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
              }`}
            >
              Todas as Operadoras
            </button>
            <button
              onClick={() => setSelectedCategory('empresarial')}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-colors cursor-pointer ${
                selectedCategory === 'empresarial'
                  ? 'bg-emerald-500 text-slate-950 shadow-md'
                  : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
              }`}
            >
              Nacional & Corporativo
            </button>
            <button
              onClick={() => setSelectedCategory('regional')}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-colors cursor-pointer ${
                selectedCategory === 'regional'
                  ? 'bg-emerald-500 text-slate-950 shadow-md'
                  : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
              }`}
            >
              Líderes Regionais em MG
            </button>
          </div>
        </div>

        {/* Carriers Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCarriers.map((carrier) => (
            <div
              key={carrier.id}
              className="bg-slate-800/90 border border-slate-700/80 rounded-3xl p-6 sm:p-7 flex flex-col justify-between hover:border-emerald-500/50 hover:bg-slate-800 transition-all group"
            >
              <div>
                {/* Header */}
                <div className="flex items-start justify-between gap-3 mb-4">
                  <div>
                    <h3 className="text-xl font-black text-white group-hover:text-emerald-300 transition-colors">
                      {carrier.name}
                    </h3>
                    <p className="text-xs text-slate-400">{carrier.category}</p>
                  </div>
                  <span className="text-[11px] font-bold text-emerald-400 bg-emerald-950/80 px-2.5 py-1 rounded-lg border border-emerald-500/30 whitespace-nowrap">
                    {carrier.badge}
                  </span>
                </div>

                <p className="text-xs sm:text-sm text-slate-300 mb-5 leading-relaxed">
                  {carrier.description}
                </p>

                {/* Highlights */}
                <div className="space-y-2 mb-6">
                  <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Destaques da Linha:</p>
                  {carrier.highlights.map((h, i) => (
                    <div key={i} className="flex items-center gap-2 text-xs text-slate-300">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                      <span>{h}</span>
                    </div>
                  ))}
                </div>

                {/* Hospitals covered */}
                <div className="pt-4 border-t border-slate-700/60 mb-6">
                  <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-2 flex items-center gap-1.5">
                    <Hospital className="w-3.5 h-3.5 text-teal-400" />
                    Hospitais de Referência:
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {carrier.hospitals.map((hosp, idx) => (
                      <span
                        key={idx}
                        className="text-[11px] text-slate-300 bg-slate-900/90 px-2 py-0.5 rounded-md border border-slate-700"
                      >
                        {hosp}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Action Button */}
              <div>
                <button
                  onClick={() => openWhatsApp(`Olá, Aline! Gostaria de consultar os valores e opções do plano da ${carrier.name}. Poderia me enviar a tabela atualizada?`)}
                  className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-slate-700 hover:bg-emerald-500 hover:text-slate-950 text-white font-bold text-xs sm:text-sm transition-all cursor-pointer group-hover:bg-emerald-500 group-hover:text-slate-950"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Cotar {carrier.name}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Prominent Hospital Network Bar */}
        <div className="mt-14 p-6 sm:p-8 rounded-3xl bg-slate-950 border border-slate-800 text-center">
          <p className="text-xs sm:text-sm font-bold text-emerald-400 uppercase tracking-wider mb-2">
            Rede Hospitalar em Belo Horizonte e Região
          </p>
          <p className="text-sm sm:text-base text-slate-300 max-w-3xl mx-auto mb-6">
            Aline Matos mapeia com precisão se os hospitais que você e sua família confiam estão inclusos na categoria escolhida:
          </p>
          <div className="flex flex-wrap justify-center gap-2.5 max-w-4xl mx-auto">
            {HOSPITALS_BH.map((h, i) => (
              <span
                key={i}
                className="text-xs text-slate-300 bg-slate-900 px-3 py-1.5 rounded-xl border border-slate-700/80"
              >
                {h}
              </span>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};

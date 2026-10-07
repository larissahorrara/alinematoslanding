import React, { useState } from 'react';
import { NEWS_ARTICLES } from '../data/news';
import { Newspaper, ExternalLink, Search, Filter, MessageCircle, Calendar } from 'lucide-react';
import { openWhatsApp } from '../utils/whatsapp';

export const NewsSection: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedOutlet, setSelectedOutlet] = useState<string>('all');

  const outlets = ['all', 'Folha de S.Paulo', 'Metrópoles', 'CNN Brasil', 'Agência Brasil', 'O Globo', 'Exame', 'Poder360'];

  const filteredNews = NEWS_ARTICLES.filter((item) => {
    const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          item.outlet.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          item.date.includes(searchTerm);
    const matchesOutlet = selectedOutlet === 'all' || item.outlet === selectedOutlet;
    return matchesSearch && matchesOutlet;
  });

  return (
    <section id="noticias" className="py-20 bg-slate-900 text-white relative overflow-hidden border-t border-slate-800">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-950/80 border border-emerald-500/30 text-emerald-400 text-xs font-bold uppercase tracking-wider mb-4">
            <Newspaper className="w-3.5 h-3.5" />
            Imprensa & Regulamentação
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight leading-tight uppercase">
            NOTÍCIAS SOBRE SAÚDE SUPLEMENTAR E PLANOS DE SAÚDE
          </h2>
          <p className="text-emerald-400 font-extrabold text-lg sm:text-xl mt-2 tracking-wide">
            2024–2026
          </p>
          <p className="mt-4 text-xs sm:text-sm text-slate-300 max-w-2xl mx-auto leading-relaxed italic">
            Levantamento cronológico de reportagens com links conferidos. Os títulos abaixo são hiperlinks clicáveis. A relação é um levantamento amplo da imprensa localizada, não uma garantia de exaustividade absoluta de todas as publicações brasileiras.
          </p>
        </div>

        {/* Filter and Search Bar */}
        <div className="bg-slate-800/80 border border-slate-700 rounded-2xl p-4 mb-8 flex flex-col sm:flex-row items-center gap-4">
          <div className="relative flex-1 w-full">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Buscar notícia, tema (ex: reajuste, cancelamento, ANS, STF)..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-slate-900 border border-slate-700 rounded-xl pl-10 pr-4 py-2.5 text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
            />
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <Filter className="w-4 h-4 text-slate-400 shrink-0" />
            <select
              value={selectedOutlet}
              onChange={(e) => setSelectedOutlet(e.target.value)}
              className="bg-slate-900 border border-slate-700 rounded-xl px-3 py-2.5 text-xs text-white focus:outline-none focus:border-emerald-500 w-full sm:w-auto"
            >
              <option value="all">Todos os Veículos ({NEWS_ARTICLES.length})</option>
              {outlets.filter(o => o !== 'all').map((o) => (
                <option key={o} value={o}>{o}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Articles Chronological List */}
        <div className="space-y-3">
          {filteredNews.map((news) => (
            <div
              key={news.id}
              className="p-4 sm:p-5 rounded-2xl bg-slate-800/60 hover:bg-slate-800 border border-slate-700/70 hover:border-emerald-500/50 transition-all group"
            >
              <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 mb-2">
                <div className="flex items-center gap-2 text-xs text-slate-400">
                  <span className="flex items-center gap-1 font-mono text-emerald-400 font-semibold">
                    <Calendar className="w-3 h-3" />
                    {news.date}
                  </span>
                  <span>—</span>
                  <span className="font-bold text-slate-200">
                    {news.outlet}
                  </span>
                </div>

                {news.category && (
                  <span className="text-[10px] font-semibold text-slate-400 bg-slate-900 px-2 py-0.5 rounded border border-slate-700/80 self-start sm:self-auto">
                    {news.category}
                  </span>
                )}
              </div>

              {/* Clickable Title */}
              <a
                href={news.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm sm:text-base font-bold text-white hover:text-emerald-400 transition-colors flex items-start justify-between gap-3 group-hover:underline underline-offset-4 leading-snug"
              >
                <span>{news.title}</span>
                <ExternalLink className="w-4 h-4 text-slate-500 group-hover:text-emerald-400 shrink-0 mt-0.5" />
              </a>
            </div>
          ))}

          {filteredNews.length === 0 && (
            <div className="text-center py-12 text-slate-400 text-sm">
              Nenhuma reportagem encontrada com os termos buscados.
            </div>
          )}
        </div>

        {/* Advisory Box at Bottom */}
        <div className="mt-14 p-6 sm:p-8 rounded-3xl bg-slate-950 border border-slate-800 text-center space-y-4">
          <h3 className="text-lg sm:text-xl font-bold text-white">
            Preocupado com reajustes, cancelamentos ou mudanças regulatórias?
          </h3>
          <p className="text-xs sm:text-sm text-slate-400 max-w-2xl mx-auto leading-relaxed">
            Com mais de 15 anos de atuação prática nas maiores corretoras de Belo Horizonte, Aline Matos acompanha diariamente as decisões da ANS e do STF para defender os interesses e o orçamento da sua família e da sua empresa.
          </p>
          <div className="pt-2">
            <button
              onClick={() => openWhatsApp('Olá, Aline! Vi o levantamento de notícias do seu site sobre planos de saúde e gostaria de tirar dúvidas sobre o meu contrato atual.')}
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs sm:text-sm shadow-md transition-all cursor-pointer"
            >
              <MessageCircle className="w-4 h-4 fill-slate-950" />
              <span>Tirar Dúvidas sobre seu Contrato no WhatsApp</span>
            </button>
          </div>
        </div>

      </div>
    </section>
  );
};

import React from 'react';
import { MessageCircle, ShieldCheck, MapPin, ArrowUp, Heart, Newspaper, Home } from 'lucide-react';
import { openWhatsApp } from '../utils/whatsapp';

interface FooterProps {
  onNavigate?: (page: 'home' | 'tea' | 'news') => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNav = (page: 'home' | 'tea' | 'news') => {
    if (onNavigate) {
      onNavigate(page);
    }
    scrollToTop();
  };

  return (
    <footer className="bg-slate-950 text-slate-400 border-t border-slate-800 text-sm pb-16 sm:pb-0">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          
          {/* Brand & Bio */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 shrink-0">
                <ShieldCheck className="w-5 h-5 text-emerald-400" />
              </div>
              <div>
                <span className="text-xl font-black text-white tracking-tight block leading-tight font-['Plus_Jakarta_Sans',sans-serif]">
                  Aline Matos
                </span>
                <span className="text-[11px] font-bold text-emerald-400 tracking-wide uppercase block">
                  REVENDEDORA de planos de saúde há mais de 15 anos
                </span>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed max-w-sm">
              Profissional com mais de 15 anos de atuação nas maiores corretoras de Belo Horizonte, especializada na comercialização, portabilidade e escolha segura de planos de saúde individuais, familiares e empresariais. Atendimento humanizado e direto.
            </p>

            <div className="pt-2 flex items-center gap-3 text-xs text-slate-300">
              <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>Conformidade com a legislação da ANS</span>
            </div>
          </div>

          {/* Contact Details - No explicit phone numbers */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">Contato Direto</h4>
            <ul className="space-y-2.5 text-xs sm:text-sm">
              <li>
                <button
                  onClick={() => openWhatsApp()}
                  className="flex items-center gap-2 text-slate-300 hover:text-emerald-400 transition-colors text-left cursor-pointer"
                >
                  <MessageCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Conversar no WhatsApp</span>
                </button>
              </li>
              <li className="flex items-center gap-2 text-slate-300">
                <MapPin className="w-4 h-4 text-teal-400 shrink-0" />
                <span>Belo Horizonte - MG · Atendimento Nacional</span>
              </li>
            </ul>
          </div>

          {/* Quick Links & Pages */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">Páginas & Guias</h4>
            <ul className="space-y-2 text-xs sm:text-sm">
              <li>
                <button
                  onClick={() => handleNav('home')}
                  className="hover:text-emerald-400 transition-colors flex items-center gap-1.5 cursor-pointer text-left"
                >
                  <Home className="w-3.5 h-3.5 text-slate-500" />
                  <span>Início (Planos de Saúde)</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('tea')}
                  className="text-emerald-400 font-semibold hover:text-white transition-colors flex items-center gap-1.5 cursor-pointer text-left"
                >
                  <Heart className="w-3.5 h-3.5 text-rose-400" />
                  <span>Plano de Saúde para Autistas (TEA)</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('news')}
                  className="text-emerald-400 font-semibold hover:text-white transition-colors flex items-center gap-1.5 cursor-pointer text-left"
                >
                  <Newspaper className="w-3.5 h-3.5 text-teal-400" />
                  <span>Notícias Saúde Suplementar (2024–2026)</span>
                </button>
              </li>
            </ul>
          </div>

          {/* Hours & Hours */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">Atendimento</h4>
            <div className="text-xs sm:text-sm space-y-1.5 text-slate-400">
              <p className="text-slate-200 font-semibold">Segunda a Sexta: 08h às 19h</p>
              <p>Sábados: 09h às 14h</p>
              <p className="text-emerald-400 text-xs mt-2 flex items-center gap-1.5">
                <MessageCircle className="w-3.5 h-3.5" />
                Atendimento direto no WhatsApp
              </p>
            </div>

            <div className="pt-3">
              <button
                onClick={scrollToTop}
                className="inline-flex items-center gap-1.5 text-xs text-slate-400 hover:text-white transition-colors cursor-pointer"
              >
                <ArrowUp className="w-3.5 h-3.5" />
                Voltar ao topo
              </button>
            </div>
          </div>

        </div>

        {/* Regulatory Disclaimer */}
        <div className="mt-12 pt-8 border-t border-slate-900 text-[11px] text-slate-500 space-y-2">
          <p>
            <strong>Aviso Legal:</strong> Aline Matos é revendedora e intermediária autorizada na comercialização de planos de saúde, atuante nas principais corretoras de Belo Horizonte, em estrita observância à Lei Federal nº 9.656/1998 e às normativas da Agência Nacional de Saúde Suplementar (ANS).
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-between gap-2 pt-4">
            <p>© {new Date().getFullYear()} Aline Matos · REVENDEDORA de planos de saúde há mais de 15 anos. Todos os direitos reservados.</p>
            <p className="text-slate-400 flex items-center gap-1.5">
              <MessageCircle className="w-3.5 h-3.5 text-emerald-400" />
              <span>Canal oficial de atendimento via WhatsApp</span>
            </p>
          </div>
        </div>

      </div>
    </footer>
  );
};


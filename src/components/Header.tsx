import React, { useState, useEffect } from 'react';
import { MessageCircle, Menu, X, ArrowUpRight, ShieldCheck, Heart, Newspaper, Home } from 'lucide-react';
import { openWhatsApp } from '../utils/whatsapp';

interface HeaderProps {
  currentPage: 'home' | 'tea' | 'news';
  onNavigate: (page: 'home' | 'tea' | 'news') => void;
}

export const Header: React.FC<HeaderProps> = ({ currentPage, onNavigate }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 15);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (page: 'home' | 'tea' | 'news') => {
    onNavigate(page);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header
      className={`sticky top-0 z-40 transition-all duration-300 ${
        scrolled
          ? 'bg-slate-900/98 backdrop-blur-md shadow-lg border-b border-slate-800 py-3'
          : 'bg-slate-900 py-4.5 border-b border-slate-800'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        
        {/* Brand identity - Elegant logo, no AM box */}
        <button
          onClick={() => handleNavClick('home')}
          className="flex items-center gap-3 text-left group cursor-pointer"
        >
          <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 group-hover:bg-emerald-500/20 group-hover:border-emerald-500/50 transition-colors shrink-0">
            <ShieldCheck className="w-5 h-5 text-emerald-400" />
          </div>
          <div>
            <span className="text-xl sm:text-2xl font-black text-white tracking-tight block leading-none font-['Plus_Jakarta_Sans',sans-serif]">
              Aline Matos
            </span>
            <span className="text-[10px] sm:text-[11px] font-bold text-emerald-400 tracking-wider uppercase block mt-1">
              REVENDEDORA de planos de saúde há mais de 15 anos
            </span>
          </div>
        </button>

        {/* Primary Navigation - Pages & Views */}
        <nav className="hidden lg:flex items-center gap-2 bg-slate-800/80 p-1.5 rounded-2xl border border-slate-700/80">
          <button
            onClick={() => handleNavClick('home')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
              currentPage === 'home'
                ? 'bg-emerald-500 text-slate-950 shadow-md'
                : 'text-slate-300 hover:text-white hover:bg-slate-700/50'
            }`}
          >
            <Home className="w-4 h-4" />
            <span>Início</span>
          </button>

          <button
            onClick={() => handleNavClick('tea')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
              currentPage === 'tea'
                ? 'bg-emerald-500 text-slate-950 shadow-md'
                : 'text-slate-300 hover:text-white hover:bg-slate-700/50'
            }`}
          >
            <Heart className="w-4 h-4 text-rose-400 fill-rose-400/20" />
            <span>Plano de Saúde para Autistas (TEA)</span>
          </button>

          <button
            onClick={() => handleNavClick('news')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
              currentPage === 'news'
                ? 'bg-emerald-500 text-slate-950 shadow-md'
                : 'text-slate-300 hover:text-white hover:bg-slate-700/50'
            }`}
          >
            <Newspaper className="w-4 h-4 text-teal-400" />
            <span>Notícias Saúde Suplementar</span>
          </button>
        </nav>

        {/* Contact Actions */}
        <div className="hidden sm:flex items-center gap-4">
          <button
            onClick={() => openWhatsApp('Olá, Aline! Vim através do site e gostaria de solicitar uma cotação.')}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 active:bg-emerald-600 text-slate-950 font-extrabold text-xs sm:text-sm shadow-md shadow-emerald-500/20 transition-all cursor-pointer group"
          >
            <MessageCircle className="w-4 h-4 fill-slate-950" />
            <span>Falar no WhatsApp</span>
            <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </button>
        </div>

        {/* Mobile Hamburger */}
        <div className="flex lg:hidden items-center gap-2">
          <button
            onClick={() => openWhatsApp()}
            className="p-2.5 rounded-xl bg-emerald-500 text-slate-950 sm:hidden cursor-pointer"
            aria-label="Chamar no WhatsApp"
          >
            <MessageCircle className="w-5 h-5 fill-slate-950" />
          </button>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2.5 rounded-xl text-slate-300 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
            aria-label="Abrir menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-slate-900 border-b border-slate-800 px-5 pt-3 pb-6 space-y-2">
          <button
            onClick={() => handleNavClick('home')}
            className={`w-full flex items-center gap-2.5 py-3 px-3 rounded-xl text-sm font-bold text-left cursor-pointer ${
              currentPage === 'home' ? 'bg-emerald-500 text-slate-950' : 'text-slate-200 hover:bg-slate-800'
            }`}
          >
            <Home className="w-4 h-4" />
            <span>Início (Planos de Saúde)</span>
          </button>

          <button
            onClick={() => handleNavClick('tea')}
            className={`w-full flex items-center gap-2.5 py-3 px-3 rounded-xl text-sm font-bold text-left cursor-pointer ${
              currentPage === 'tea' ? 'bg-emerald-500 text-slate-950' : 'text-slate-200 hover:bg-slate-800'
            }`}
          >
            <Heart className="w-4 h-4 text-rose-400" />
            <span>Plano de Saúde para Autistas (TEA)</span>
          </button>

          <button
            onClick={() => handleNavClick('news')}
            className={`w-full flex items-center gap-2.5 py-3 px-3 rounded-xl text-sm font-bold text-left cursor-pointer ${
              currentPage === 'news' ? 'bg-emerald-500 text-slate-950' : 'text-slate-200 hover:bg-slate-800'
            }`}
          >
            <Newspaper className="w-4 h-4 text-teal-400" />
            <span>Notícias sobre Saúde Suplementar</span>
          </button>

          <div className="pt-3 border-t border-slate-800">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                openWhatsApp();
              }}
              className="w-full flex items-center justify-center gap-2 py-3.5 px-4 rounded-xl bg-emerald-500 text-slate-950 font-extrabold text-sm shadow-md"
            >
              <MessageCircle className="w-5 h-5 fill-slate-950" />
              <span>Chamar no WhatsApp</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};

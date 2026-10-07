import React, { useState, useEffect } from 'react';
import { MessageCircle, X } from 'lucide-react';
import { openWhatsApp } from '../utils/whatsapp';

export const FloatingWhatsApp: React.FC = () => {
  const [showTooltip, setShowTooltip] = useState(false);
  const [closed, setClosed] = useState(false);

  useEffect(() => {
    // Show inviting message after 3 seconds
    const timer = setTimeout(() => {
      setShowTooltip(true);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  if (closed) return null;

  return (
    <>
      {/* Desktop & Tablet Floating Widget */}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-2.5">
        
        {/* Chat Balloon Tooltip */}
        {showTooltip && (
          <div className="bg-slate-900 text-white p-3.5 rounded-2xl shadow-2xl border border-slate-800 max-w-[270px] relative animate-fade-in">
            <button
              onClick={() => setShowTooltip(false)}
              className="absolute -top-2 -left-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-full p-1 cursor-pointer border border-slate-700"
              aria-label="Fechar mensagem"
            >
              <X className="w-3 h-3" />
            </button>
            
            <div className="flex items-center gap-2 mb-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-[11px] font-bold text-emerald-400 uppercase tracking-wider">
                Aline Matos · Online
              </span>
            </div>
            
            <p className="text-xs text-slate-300 leading-snug">
              Olá! Precisa de ajuda para encontrar o melhor plano de saúde para sua necessidade? Fale comigo agora no WhatsApp.
            </p>

            <button
              onClick={() => openWhatsApp('Olá, Aline! Vi sua mensagem no site e gostaria de uma ajuda para cotar meu plano.')}
              className="mt-2.5 text-xs font-bold text-emerald-400 hover:text-emerald-300 block text-right cursor-pointer"
            >
              Iniciar conversa →
            </button>
          </div>
        )}

        {/* WhatsApp Big Round Button */}
        <button
          onClick={() => openWhatsApp()}
          className="group relative flex items-center gap-3 bg-emerald-500 hover:bg-emerald-600 active:bg-emerald-700 text-white p-3.5 sm:px-5 sm:py-3.5 rounded-full shadow-2xl shadow-emerald-600/40 transition-all duration-300 hover:scale-105 cursor-pointer ring-4 ring-emerald-500/20"
          aria-label="Abrir WhatsApp da Aline Matos"
        >
          <div className="relative">
            <MessageCircle className="w-7 h-7 fill-white" />
            <span className="absolute -top-1 -right-1 w-3 h-3 bg-white rounded-full flex items-center justify-center">
              <span className="w-2 h-2 bg-emerald-500 rounded-full animate-ping" />
            </span>
          </div>

          <div className="hidden sm:block text-left leading-tight pr-1">
            <span className="block text-xs font-bold text-slate-950">WhatsApp da Aline</span>
            <span className="text-[10px] text-slate-900 font-medium">Online Agora</span>
          </div>
        </button>
      </div>

      {/* Mobile Sticky Bottom CTA Bar */}
      <div className="sm:hidden fixed bottom-0 left-0 right-0 z-40 bg-slate-950/95 backdrop-blur-md border-t border-slate-800 p-3 flex items-center justify-between gap-3 shadow-2xl">
        <div className="leading-tight">
          <p className="text-xs font-bold text-white flex items-center gap-1.5">
            Aline Matos
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 inline-block" />
          </p>
          <p className="text-[11px] text-emerald-400 font-bold">REVENDEDORA de planos de saúde há mais de 15 anos</p>
        </div>

        <button
          onClick={() => openWhatsApp()}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-500 active:bg-emerald-600 text-slate-950 font-extrabold text-xs shadow-md"
        >
          <MessageCircle className="w-4 h-4 fill-slate-950" />
          <span>Falar no WhatsApp</span>
        </button>
      </div>
    </>
  );
};

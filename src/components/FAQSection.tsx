import React, { useState } from 'react';
import { FAQ_ITEMS } from '../data/faq';
import { ChevronDown, HelpCircle, MessageCircle } from 'lucide-react';
import { openWhatsApp } from '../utils/whatsapp';

export const FAQSection: React.FC = () => {
  const [openId, setOpenId] = useState<string | null>('f1');

  const toggle = (id: string) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <section id="faq" className="py-20 bg-slate-950 text-white border-t border-slate-800 w-full">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-950/80 text-emerald-400 border border-emerald-500/30 text-xs font-bold uppercase tracking-wider mb-3">
            <HelpCircle className="w-3.5 h-3.5" />
            Tire Suas Dúvidas
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Perguntas Frequentes sobre Planos de Saúde
          </h2>
          <p className="mt-3 text-slate-300 text-base sm:text-lg">
            Respostas claras e diretas sobre custos, carências, portabilidade e CNPJ com a visão técnica de quem atua há mais de 15 anos.
          </p>
        </div>

        {/* Accordion list */}
        <div className="space-y-3.5">
          {FAQ_ITEMS.map((item) => {
            const isOpen = openId === item.id;
            return (
              <div
                key={item.id}
                className={`rounded-2xl border transition-all ${
                  isOpen
                    ? 'bg-slate-900 border-emerald-500/60 shadow-lg ring-1 ring-emerald-500/20'
                    : 'bg-slate-900/80 border-slate-800 hover:border-slate-700'
                }`}
              >
                <button
                  type="button"
                  onClick={() => toggle(item.id)}
                  className="w-full py-4.5 px-6 text-left flex items-center justify-between gap-4 cursor-pointer"
                  aria-expanded={isOpen}
                >
                  <span className="font-bold text-white text-sm sm:text-base">
                    {item.question}
                  </span>
                  <div
                    className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 transition-transform duration-200 ${
                      isOpen ? 'bg-emerald-500 text-slate-950 rotate-180' : 'bg-slate-800 text-slate-400'
                    }`}
                  >
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                {isOpen && (
                  <div className="px-6 pb-5 pt-1 text-slate-300 text-sm leading-relaxed border-t border-slate-800">
                    <p>{item.answer}</p>
                    <div className="mt-3 pt-2 text-right">
                      <button
                        onClick={() => openWhatsApp(`Olá, Aline! Fiquei com uma dúvida específica sobre: "${item.question}". Poderia me ajudar?`)}
                        className="text-xs font-semibold text-emerald-400 hover:text-emerald-300 inline-flex items-center gap-1 cursor-pointer"
                      >
                        <MessageCircle className="w-3.5 h-3.5" />
                        Esclarecer essa questão com a Aline no WhatsApp
                      </button>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Still have questions card */}
        <div className="mt-12 text-center p-8 bg-slate-900 border border-slate-800 rounded-3xl shadow-sm">
          <h4 className="text-lg font-bold text-white">Sua dúvida não está listada aqui?</h4>
          <p className="text-sm text-slate-400 mt-1 mb-5">
            Cada caso tem suas particularidades. Converse diretamente com Aline Matos sem nenhum compromisso.
          </p>
          <button
            onClick={() => openWhatsApp('Olá, Aline! Gostaria de tirar uma dúvida específica sobre planos de saúde que não encontrei no site.')}
            className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-sm shadow-md transition-all cursor-pointer"
          >
            <MessageCircle className="w-4 h-4 fill-slate-950" />
            <span>Falar com a Aline no WhatsApp</span>
          </button>
        </div>

      </div>
    </section>
  );
};

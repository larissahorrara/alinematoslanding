import React from 'react';
import { AlertCircle, ArrowRight, ShieldCheck, Zap, DollarSign, Clock, CheckCircle } from 'lucide-react';
import { openWhatsApp } from '../utils/whatsapp';

export const PainPointsSolution: React.FC = () => {
  const pains = [
    {
      title: 'Reajustes abusivos todo ano',
      problem: 'Sua fatura subiu consideravelmente por causa da mudança de faixa etária ou índice de sinistralidade, tornando o plano pesado no bolso.',
      solution: 'Aline realiza um estudo comparativo com as tabelas mais vantajosas do mercado, orientando a migração segura para operadoras de mesmo nível sem perder carências.',
      icon: DollarSign,
    },
    {
      title: 'Paga como pessoa física tendo CNPJ',
      problem: 'Você ou alguém da sua família possui MEI ou microempresa, mas continua pagando planos individuais caros por desconhecer os benefícios empresariais.',
      solution: 'Migração para plano PME a partir de apenas 2 vidas (você + cônjuge/filho ou sócio), com descontos agressivos e dedução tributária.',
      icon: Zap,
    },
    {
      title: 'Medo de cumprir carências novamente',
      problem: 'Você precisa de cirurgia, tem doenças preexistentes ou exames regulares e teme ficar meses desprotegido caso troque de operadora.',
      solution: 'Aplicação da regra de Portabilidade de Carências da ANS. Aline protocola seu histórico médico para garantir isenção total dos prazos já cumpridos.',
      icon: Clock,
    },
    {
      title: 'Falta de suporte quando você mais precisa',
      problem: 'Tentar resolver autorizações de exames, guias e internações em SACs com robôs e esperas intermináveis em momentos de fragilidade.',
      solution: 'Atendimento humanizado direto no WhatsApp da Aline Matos. Você terá uma defensora experiente para orientar e destravar procedimentos.',
      icon: ShieldCheck,
    },
  ];

  return (
    <section id="vantagens" className="py-20 bg-slate-950 text-white border-t border-slate-800 w-full">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-950/80 text-rose-400 border border-rose-800/40 text-xs font-bold uppercase tracking-wider mb-3">
            <AlertCircle className="w-3.5 h-3.5" />
            Problemas Comuns no Mercado
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Você se identifica com algum destes desafios?
          </h2>
          <p className="mt-3 text-slate-300 text-base sm:text-lg">
            Veja como a experiência de mais de 15 anos de Aline Matos transforma as principais dores de quem contrata plano de saúde em segurança médica e tranquilidade contratual.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {pains.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 sm:p-8 flex flex-col justify-between hover:border-slate-700 transition-all"
              >
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-xl bg-slate-800 text-emerald-400 flex items-center justify-center shrink-0">
                      <Icon className="w-5 h-5" />
                    </div>
                    <h3 className="text-lg font-bold text-white">{item.title}</h3>
                  </div>

                  <div className="space-y-4">
                    <div className="p-3.5 rounded-xl bg-rose-950/40 border border-rose-900/50 text-xs sm:text-sm text-rose-200">
                      <strong className="block text-rose-300 font-bold mb-1">A dor atual:</strong>
                      {item.problem}
                    </div>

                    <div className="p-3.5 rounded-xl bg-emerald-950/40 border border-emerald-900/50 text-xs sm:text-sm text-emerald-200">
                      <div className="flex items-start gap-2">
                        <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                        <div>
                          <strong className="block text-emerald-300 font-bold mb-0.5">Como a Aline resolve:</strong>
                          {item.solution}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="pt-6 mt-4 border-t border-slate-800">
                  <button
                    onClick={() => openWhatsApp(`Olá, Aline! Me identifiquei com o problema de: "${item.title}". Como você pode me ajudar a resolver?`)}
                    className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-emerald-400 hover:text-emerald-300 group cursor-pointer"
                  >
                    <span>Quero resolver essa situação com a Aline</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

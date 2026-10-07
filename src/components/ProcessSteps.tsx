import React from 'react';
import { MessageSquare, FileSpreadsheet, ShieldCheck, Headphones, ArrowRight } from 'lucide-react';
import { openWhatsApp } from '../utils/whatsapp';

export const ProcessSteps: React.FC = () => {
  const steps = [
    {
      step: '01',
      title: 'Diagnóstico Rápido',
      subtitle: 'Sem compromisso',
      description: 'Conversamos pelo WhatsApp ou telefone para entender suas prioridades: hospitais favoritos, orçamento disponível e se você já possui plano com carências.',
      icon: MessageSquare,
    },
    {
      step: '02',
      title: 'Estudo Comparativo',
      subtitle: 'Claro e objetivo',
      description: 'Aline prepara um comparativo lado a lado das melhores operadoras (Bradesco, Amil, SulAmérica, Unimed, etc.), demonstrando valores e redes.',
      icon: FileSpreadsheet,
    },
    {
      step: '03',
      title: 'Portabilidade e Contrato',
      subtitle: 'Zero dor de cabeça',
      description: 'Aline cuida de toda a documentação, aproveitamento de carências da ANS e submissão digital da proposta. Você não precisa enfrentar filas.',
      icon: ShieldCheck,
    },
    {
      step: '04',
      title: 'Pós-Venda Humanizado',
      subtitle: 'Apoio contínuo',
      description: 'Mesmo depois do plano ativo, Aline continua ao seu lado: apoio em autorizações difíceis, adição de dependentes e orientações em reajustes.',
      icon: Headphones,
    },
  ];

  return (
    <section className="py-20 bg-slate-900 text-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider block mb-2">
            Simplicidade e Segurança
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
            Como Funciona o Atendimento com a Aline em 4 Etapas
          </h2>
          <p className="mt-3 text-slate-300 text-base sm:text-lg">
            Um processo 100% transparente, sem letras miúdas e com acompanhamento do início ao fim.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((s, idx) => {
            const Icon = s.icon;
            return (
              <div
                key={idx}
                className="bg-slate-800/80 border border-slate-700/80 rounded-3xl p-6 sm:p-7 relative flex flex-col justify-between group hover:border-emerald-500/50 hover:bg-slate-800 transition-all"
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <span className="text-3xl font-black text-emerald-400/80 font-mono">
                      {s.step}
                    </span>
                    <div className="w-10 h-10 rounded-xl bg-slate-700/60 text-emerald-400 flex items-center justify-center group-hover:bg-emerald-500 group-hover:text-slate-950 transition-colors">
                      <Icon className="w-5 h-5" />
                    </div>
                  </div>

                  <h3 className="text-lg font-bold text-white mb-1">{s.title}</h3>
                  <p className="text-xs font-semibold text-emerald-400 mb-3">{s.subtitle}</p>
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                    {s.description}
                  </p>
                </div>

                <div className="pt-6 mt-4 border-t border-slate-700/40">
                  <span className="text-[11px] font-medium text-slate-400 flex items-center gap-1">
                    Etapa {s.step} de 04
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Action Button */}
        <div className="mt-14 text-center">
          <button
            onClick={() => openWhatsApp('Olá, Aline! Gostaria de dar início ao passo 1 para fazer o diagnóstico do meu plano de saúde.')}
            className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-extrabold text-base shadow-xl transition-all hover:scale-105 cursor-pointer"
          >
            <span>Iniciar Diagnóstico Gratuito com a Aline</span>
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>

      </div>
    </section>
  );
};

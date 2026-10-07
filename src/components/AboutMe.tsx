import React from 'react';
import { Building, Award, MessageCircle, MapPin, Briefcase, Sparkles } from 'lucide-react';
import { AlinePhoto } from './AlinePhoto';
import { openWhatsApp } from '../utils/whatsapp';

export const AboutMe: React.FC = () => {
  const credentials = [
    {
      title: 'Atuação nas Maiores Corretoras de BH',
      description: 'Mais de 15 anos de história trabalhando e mantendo parcerias ativas com as principais e mais consolidadas corretoras de saúde de Belo Horizonte.',
      icon: Building,
    },
    {
      title: 'Canal Direto com as Operadoras',
      description: 'Relacionamento estreito com as gerências comerciais de Bradesco, Amil, SulAmérica, Unimed-BH e Hapvida, acelerando análises e implantações.',
      icon: Briefcase,
    },
    {
      title: 'Otimização de Custos e Benefícios',
      description: 'Diagnóstico preciso para encontrar o melhor enquadramento (PME a partir de 2 vidas, MEI ou adesão), garantindo a melhor relação custo-benefício.',
      icon: Award,
    },
    {
      title: 'Conhecimento da Rede Hospitalar Mineira',
      description: 'Experiência de quem conhece a fundo o atendimento real dos hospitais de BH e RMBH: Mater Dei, Felício Rocho, Biocor, Vera Cruz e outros.',
      icon: MapPin,
    },
  ];

  return (
    <section id="sobre-mim" className="py-20 bg-slate-900 text-white border-t border-slate-800 w-full">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Photo Column - Exclusive to Aline Matos */}
          <div className="lg:col-span-5 order-2 lg:order-1 max-w-md mx-auto lg:max-w-none w-full">
            <div className="relative">
              <AlinePhoto className="w-full aspect-[4/5]" />
              
              <div className="mt-4 p-4 rounded-2xl bg-slate-800/80 border border-slate-700 text-center">
                <p className="text-xs uppercase tracking-wider font-bold text-emerald-400">
                  Atendimento Personalizado e Direto
                </p>
                <p className="text-sm font-semibold text-slate-200 mt-1">
                  Você fala diretamente com a Aline, sem intermediários ou robôs.
                </p>
              </div>
            </div>
          </div>

          {/* Text Column */}
          <div className="lg:col-span-7 order-1 lg:order-2 space-y-6">
            
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-950/80 text-emerald-300 text-xs font-bold uppercase tracking-wider border border-emerald-500/30">
              <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
              Sobre Mim
            </div>

            <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight leading-tight">
              Aline Matos
              <span className="block text-xl sm:text-2xl font-bold text-emerald-400 mt-1">
                REVENDEDORA de planos de saúde há mais de 15 anos
              </span>
            </h2>

            <div className="space-y-4 text-slate-300 text-base leading-relaxed">
              <p>
                Olá! Sou <strong className="text-white">Aline Matos</strong>, revendedora de planos de saúde há mais de 15 anos. Ao longo dessa trajetória sólida, já trabalhei e ainda trabalho nas maiores e mais conceituadas corretoras de planos de saúde de Belo Horizonte.
              </p>
              <p>
                Essa bagagem profissional nas maiores corretoras da capital mineira me confere um diferencial que poucos profissionais possuem: <strong className="text-white">conhecimento profundo dos bastidores do mercado</strong>, canal direto com as mesas de operações das seguradoras e domínio completo sobre como aprovar contratos com as melhores tarifas e coberturas possíveis.
              </p>
              <p>
                Seja para quem precisa revisar a mensalidade de um plano que ficou pesado, para empresários e MEIs que desejam obter condições diferenciadas na folha com responsabilidade, ou para famílias que precisam de segurança hospitalar sem ter que cumprir carência novamente, eu analiso cada caso de forma técnica e individualizada.
              </p>
            </div>

            {/* 4 Pillars of Experience */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-3">
              {credentials.map((cred, idx) => {
                const Icon = cred.icon;
                return (
                  <div key={idx} className="p-4 rounded-2xl bg-slate-800/80 border border-slate-700">
                    <div className="w-9 h-9 rounded-xl bg-slate-700 text-emerald-400 flex items-center justify-center mb-2.5">
                      <Icon className="w-5 h-5" />
                    </div>
                    <h4 className="font-bold text-white text-sm">{cred.title}</h4>
                    <p className="text-xs text-slate-400 mt-1 leading-normal">{cred.description}</p>
                  </div>
                );
              })}
            </div>

            {/* CTA */}
            <div className="pt-3">
              <button
                onClick={() => openWhatsApp('Olá, Aline! Conheci sua história no site e gostaria de cotar o meu plano de saúde com você.')}
                className="inline-flex items-center gap-2.5 px-7 py-4 rounded-xl bg-emerald-500 hover:bg-emerald-400 active:bg-emerald-600 text-slate-950 font-black text-sm shadow-md transition-all cursor-pointer"
              >
                <MessageCircle className="w-5 h-5 fill-slate-950" />
                <span>Conversar com a Aline no WhatsApp</span>
              </button>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};

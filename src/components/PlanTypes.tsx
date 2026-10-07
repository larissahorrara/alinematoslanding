import React from 'react';
import { Building2, Users, UserCheck, HeartHandshake, Check, ArrowRight, ShieldCheck } from 'lucide-react';
import { openWhatsApp } from '../utils/whatsapp';

export const PlanTypes: React.FC = () => {
  const plans = [
    {
      title: 'Planos Empresariais & MEI',
      subtitle: 'A partir de 2 vidas (MEI, ME, EPP, LTDA)',
      badge: 'Condições Especiais PME',
      featured: true,
      icon: Building2,
      description: 'Ideal para empresas de todos os portes e microempreendedores. Condições exclusivas com valores reduzidos em relação ao plano individual.',
      benefits: [
        'Contratação a partir de 2 vidas (sócios, funcionários ou dependentes)',
        'Aceita MEI ativo a partir de 6 meses',
        'Mensalidades dedutíveis no Imposto de Renda empresarial',
        'Opção de planos com ou sem coparticipação',
        'Carência zero para empresas com mais de 10 vidas',
      ],
      ctaText: 'Cotar Plano Empresarial / MEI',
      msg: 'Olá, Aline! Gostaria de cotar um Plano de Saúde Empresarial via CNPJ/MEI.',
    },
    {
      title: 'Planos Familiares',
      subtitle: 'Proteção sob medida para quem você ama',
      badge: 'Cuidado Completo',
      featured: false,
      icon: Users,
      description: 'Cobertura abrangente para casal, filhos, recém-nascidos e dependentes, com acesso às melhores maternidades e pronto-socorro infantil 24h.',
      benefits: [
        'Descontos progressivos por quantidade de dependentes',
        'Inclusão de recém-nascidos sem carência (com aproveitamento)',
        'Emergência pediátrica de alto padrão',
        'Acomodação em apartamento com direito a acompanhante',
        'Consultas em todas as especialidades médicas',
      ],
      ctaText: 'Cotar Plano Familiar',
      msg: 'Olá, Aline! Gostaria de cotar um Plano Familiar para minha casa.',
    },
    {
      title: 'Planos por Adesão e Profissionais',
      subtitle: 'Para profissionais liberais e estudantes',
      badge: 'Entidades de Classe',
      featured: false,
      icon: UserCheck,
      description: 'Parcerias com entidades de classe e sindicatos (OAB, CRM, CREA, CRA, servidores públicos e estudantes) com valores subsidiados.',
      benefits: [
        'Valores negociados para categorias profissionais',
        'Ampla aceitação de dependentes diretos',
        'Planos das maiores seguradoras (Bradesco, SulAmérica, Unimed)',
        'Reembolso flexível para consultas e exames particulares',
        'Contratação 100% digital e sem burocracia',
      ],
      ctaText: 'Cotar por Entidade / Adesão',
      msg: 'Olá, Aline! Gostaria de consultar planos por adesão para a minha profissão.',
    },
    {
      title: 'Planos Sênior & Melhor Idade',
      subtitle: 'Acolhimento digno a partir de 59 anos',
      badge: 'Atendimento Humanizado',
      featured: false,
      icon: HeartHandshake,
      description: 'Orientação especializada para pessoas idosas. Planos focados em geriatria, prevenção de quedas, controle de doenças crônicas e internação de excelência.',
      benefits: [
        'Linhas com foco em saúde preventiva e geriatria',
        'Hospitais de ponta e leitos com suporte intensivo',
        'Programas de acompanhamento domiciliar e telemedicina',
        'Orientação humanizada em todo o preenchimento da DPS (Declaração Pessoal de Saúde)',
        'Aline acompanha cada detalhe do contrato',
      ],
      ctaText: 'Cotar Plano Sênior',
      msg: 'Olá, Aline! Gostaria de uma orientação carinhosa e cotação para Plano de Saúde Sênior.',
    },
  ];

  return (
    <section className="py-20 bg-slate-900 text-white border-t border-slate-800 w-full">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-950/80 text-emerald-400 border border-emerald-500/30 text-xs font-bold uppercase tracking-wider mb-3">
            <ShieldCheck className="w-3.5 h-3.5" />
            Modalidades Sob Medida
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Encontre a Categoria Perfeita para a sua Realidade
          </h2>
          <p className="mt-3 text-slate-300 text-base sm:text-lg">
            Com mais de 15 anos no setor, Aline Matos sabe exatamente qual enquadramento legal traz o maior custo-benefício para você.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {plans.map((plan, idx) => {
            const Icon = plan.icon;
            return (
              <div
                key={idx}
                className={`rounded-3xl p-7 sm:p-9 flex flex-col justify-between transition-all duration-200 border ${
                  plan.featured
                    ? 'bg-gradient-to-b from-slate-900 via-slate-850 to-slate-950 text-white shadow-xl border-emerald-500 ring-2 ring-emerald-500/30'
                    : 'bg-slate-800/80 border-slate-700/80 text-white shadow-sm hover:border-slate-600'
                }`}
              >
                <div>
                  <div className="flex items-start justify-between gap-4 mb-4">
                    <div className="flex items-center gap-3">
                      <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${
                        plan.featured ? 'bg-emerald-500 text-slate-950' : 'bg-slate-700 text-emerald-400'
                      }`}>
                        <Icon className="w-6 h-6" />
                      </div>
                      <div>
                        <h3 className="text-xl font-extrabold tracking-tight text-white">{plan.title}</h3>
                        <p className="text-xs text-slate-400">
                          {plan.subtitle}
                        </p>
                      </div>
                    </div>

                    <span className={`text-[11px] font-bold px-2.5 py-1 rounded-lg ${
                      plan.featured
                        ? 'bg-emerald-400 text-slate-950'
                        : 'bg-emerald-950/80 text-emerald-300 border border-emerald-500/30'
                    }`}>
                      {plan.badge}
                    </span>
                  </div>

                  <p className="text-sm mb-6 text-slate-300 leading-relaxed">
                    {plan.description}
                  </p>

                  <div className="space-y-3 mb-8">
                    <p className="text-xs font-bold uppercase tracking-wider text-emerald-400">
                      Principais Vantagens:
                    </p>
                    {plan.benefits.map((b, i) => (
                      <div key={i} className="flex items-start gap-2.5 text-xs sm:text-sm">
                        <Check className="w-4 h-4 shrink-0 mt-0.5 text-emerald-400" />
                        <span className="text-slate-300">
                          {b}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-700/60">
                  <button
                    onClick={() => openWhatsApp(plan.msg)}
                    className={`w-full flex items-center justify-center gap-2 py-3.5 px-5 rounded-xl font-bold text-sm transition-all cursor-pointer ${
                      plan.featured
                        ? 'bg-emerald-500 hover:bg-emerald-400 text-slate-950 shadow-md'
                        : 'bg-slate-700 hover:bg-emerald-500 hover:text-slate-950 text-white shadow-sm'
                    }`}
                  >
                    <span>{plan.ctaText}</span>
                    <ArrowRight className="w-4 h-4" />
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

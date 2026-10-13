import React from 'react';
import { 
  Heart, ShieldCheck, Scale, FileText, CheckCircle2, AlertTriangle, 
  BookOpen, Brain, Users, ArrowRight, MessageCircle, ExternalLink 
} from 'lucide-react';
import { openWhatsApp } from '../utils/whatsapp';

export const AutismHealthPlan: React.FC = () => {
  return (
    <section id="plano-autistas" className="py-20 bg-cream text-ink relative overflow-hidden border-t border-ink/10">
      {/* Subtle soft backdrop accent */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-peach/50 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-babyblue/60 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-soft border border-brand/25 text-brand text-xs font-bold uppercase tracking-wider mb-4">
            <Heart className="w-3.5 h-3.5 fill-brand/20 text-brand" />
            Guia Completo & Direitos do Paciente
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-display font-medium text-ink tracking-tight leading-tight">
            Plano de Saúde para Autistas (TEA)
          </h1>
          <p className="mt-4 text-base sm:text-lg text-ink-soft leading-relaxed">
            O acesso a tratamentos multidisciplinares para o Transtorno do Espectro Autista (TEA) por meio de planos de saúde é um direito consolidado no Brasil. A legislação, a jurisprudência e as agências reguladoras estabelecem diretrizes claras que garantem terapias baseadas em evidências científicas, sem limites arbitrários de sessões ou interrupções indevidas.
          </p>
        </div>

        {/* Highlight Alert Box */}
        <div className="p-6 sm:p-8 rounded-3xl bg-white border border-brand/25 shadow-xl mb-12">
          <div className="flex flex-col sm:flex-row items-start gap-4">
            <div className="w-12 h-12 rounded-2xl bg-brand-soft text-brand flex items-center justify-center shrink-0">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-ink mb-2">
                Tratamento Contínuo e Integral: Conquista Assegurada por Lei
              </h3>
              <p className="text-sm text-ink-soft leading-relaxed">
                As operadoras de saúde são legalmente obrigadas a custear os métodos indicados pelo médico assistente (como ABA e Denver), sem teto anual de consultas para psicologia, fonoaudiologia, terapia ocupacional e fisioterapia. Além disso, a Justiça proíbe a rescisão unilateral do contrato enquanto houver tratamento em andamento.
              </p>
            </div>
          </div>
        </div>

        {/* Content Blocks */}
        <div className="space-y-10">
          
          {/* 1. Direitos Garantidos por Lei */}
          <div className="bg-white border border-ink/10 rounded-3xl p-6 sm:p-8 shadow-[var(--shadow-soft)]">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 rounded-xl bg-sage-soft text-brand">
                <Scale className="w-5 h-5" />
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-ink">Direitos Garantidos por Lei</h3>
            </div>
            
            <p className="text-sm sm:text-base text-ink-soft mb-6 leading-relaxed">
              A base jurídica que protege os beneficiários autistas fundamenta-se na equiparação legal do TEA a outras deficiências e na flexibilização do rol de procedimentos da saúde suplementar.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-5 rounded-2xl bg-cream border border-ink/10">
                <h4 className="text-base font-bold text-brand mb-2">
                  Lei Berenice Piana (Lei nº 12.764/2012)
                </h4>
                <p className="text-xs sm:text-sm text-ink-soft leading-relaxed">
                  Instituiu a <strong>Política Nacional de Proteção dos Direitos da Pessoa com TEA</strong>. O marco central desta lei é determinar que a pessoa com autismo é considerada pessoa com deficiência para todos os efeitos legais, assegurando acesso integral à saúde e ao atendimento multiprofissional.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-cream border border-ink/10">
                <h4 className="text-base font-bold text-brand mb-2">
                  O Rol Exemplificativo da ANS (Lei nº 14.454/2022)
                </h4>
                <p className="text-xs sm:text-sm text-ink-soft leading-relaxed">
                  Alterou a Lei dos Planos de Saúde (Lei nº 9.656/1998) para definir que o <strong>Rol de Procedimentos da ANS é uma referência mínima</strong>, e não uma lista fechada. Planos de saúde são obrigados a cobrir tratamentos prescritos pelo médico que não estejam no rol, desde que possuam comprovação de eficácia baseada em evidências científicas ou recomendação da Conitec.
                </p>
              </div>
            </div>
          </div>

          {/* 2. Regras da ANS: Cobertura Sem Limite de Sessões */}
          <div className="bg-white border border-ink/10 rounded-3xl p-6 sm:p-8 shadow-[var(--shadow-soft)]">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 rounded-xl bg-sage-soft text-[#3f6f91]">
                <CheckCircle2 className="w-5 h-5" />
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-ink">
                Regras da ANS: Cobertura Sem Limite de Sessões
              </h3>
            </div>

            <p className="text-sm sm:text-base text-ink-soft mb-6 leading-relaxed">
              A Agência Nacional de Saúde Suplementar (ANS) atualizou suas normativas em 2022 para suprir as exigências crônicas do tratamento de transtornos do neurodesenvolvimento.
            </p>

            <div className="space-y-4">
              <div className="p-5 rounded-2xl bg-cream border border-ink/10">
                <h4 className="text-base font-bold text-ink flex items-center gap-2 mb-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-brand" />
                  Fim do limite de sessões (RN nº 539/2022)
                </h4>
                <p className="text-xs sm:text-sm text-ink-soft leading-relaxed">
                  A partir de 1º de julho de 2022, tornou-se <strong>obrigatória a cobertura de qualquer método ou técnica indicada pelo médico assistente</strong> para pessoas com Transtornos Globais do Desenvolvimento (CID F84). Foram derrubados os limites anuais de sessões com <strong>fonoaudiólogos, psicólogos, terapeutas ocupacionais e fisioterapeutas</strong>.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-cream border border-ink/10">
                <h4 className="text-base font-bold text-ink flex items-center gap-2 mb-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-brand" />
                  Soberania da Prescrição Médica
                </h4>
                <p className="text-xs sm:text-sm text-ink-soft leading-relaxed">
                  A escolha da abordagem terapêutica — seja ela <strong>ABA, Modelo Denver (ESDM)</strong>, entre outras — cabe <strong>exclusivamente ao médico assistente</strong> (como o neuropediatra ou psiquiatra infantil), retirando da operadora o poder de restringir o método aplicado.
                </p>
              </div>
            </div>
          </div>

          {/* 3. Proibição de Cancelamento Unilateral */}
          <div className="bg-white border border-ink/10 rounded-3xl p-6 sm:p-8 shadow-[var(--shadow-soft)]">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 rounded-xl bg-sage-soft text-rose-700">
                <AlertTriangle className="w-5 h-5" />
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-ink">
                Proibição de Cancelamento Unilateral
              </h3>
            </div>

            <p className="text-sm sm:text-base text-ink-soft mb-6 leading-relaxed">
              Operadoras de planos de saúde têm o histórico de cancelar contratos unilateralmente, o que pode interromper tratamentos críticos. O Superior Tribunal de Justiça (STJ) firmou um entendimento rigoroso contra essa prática:
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-5 rounded-2xl bg-cream border border-ink/10">
                <h4 className="text-base font-bold text-rose-800 mb-2">
                  Ilegalidade na interrupção de tratamento contínuo
                </h4>
                <p className="text-xs sm:text-sm text-ink-soft leading-relaxed">
                  A 3ª Turma do STJ (reafirmado no julgamento do <strong>REsp 2.209.351/SP, em setembro de 2025</strong>) consolidou que a rescisão unilateral de contrato de plano de saúde — mesmo em contratos coletivos ou empresariais — é <strong>ilícita enquanto o beneficiário diagnosticado com TEA estiver em tratamento multidisciplinar contínuo</strong>.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-cream border border-ink/10">
                <h4 className="text-base font-bold text-rose-800 mb-2">
                  Garantia de sobrevivência e desenvolvimento
                </h4>
                <p className="text-xs sm:text-sm text-ink-soft leading-relaxed">
                  Aplica-se a tese vinculada ao <strong>Tema 1.082 do STJ</strong>, que veta o cancelamento de planos para pacientes que necessitam de tratamentos garantidores de sobrevivência ou preservação de sua saúde e desenvolvimento cognitivo.
                </p>
              </div>
            </div>
          </div>

          {/* 4. Terapias e Evidências Científicas */}
          <div className="bg-white border border-ink/10 rounded-3xl p-6 sm:p-8 shadow-[var(--shadow-soft)]">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 rounded-xl bg-sage-soft text-[#3f6f91]">
                <Brain className="w-5 h-5" />
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-ink">
                Terapias e Evidências Científicas
              </h3>
            </div>

            <p className="text-sm sm:text-base text-ink-soft mb-6 leading-relaxed">
              O tratamento do TEA exige intervenção precoce e multidisciplinar. A obrigatoriedade de cobertura abrange métodos com forte lastro científico, conforme exige a Lei 14.454.
            </p>

            <div className="space-y-4">
              <div className="p-5 rounded-2xl bg-cream border border-ink/10">
                <h4 className="text-base font-bold text-brand mb-1.5">
                  Análise do Comportamento Aplicada (ABA)
                </h4>
                <p className="text-xs sm:text-sm text-ink-soft leading-relaxed">
                  Extensamente documentada na literatura científica, a terapia ABA possui eficácia clínica comprovada em metanálises para o ensino de novas habilidades (comunicação, interação social) e manejo de comportamentos restritivos.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-cream border border-ink/10">
                <h4 className="text-base font-bold text-brand mb-1.5">
                  Modelo Denver de Intervenção Precoce (ESDM)
                </h4>
                <p className="text-xs sm:text-sm text-ink-soft leading-relaxed">
                  Focado em crianças na primeira infância (1 a 4 anos). Ensaios Clínicos Randomizados (ECRs) demonstram que o modelo promove melhorias significativas no desenvolvimento cognitivo, na evolução da linguagem (especialmente em crianças não verbais) e em habilidades adaptativas.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-cream border border-ink/10">
                <h4 className="text-base font-bold text-brand mb-1.5">
                  Integração de Especialidades
                </h4>
                <p className="text-xs sm:text-sm text-ink-soft leading-relaxed">
                  As evidências reforçam que os maiores ganhos ocorrem na atuação conjunta da <strong>psicologia</strong> com a <strong>fonoaudiologia</strong> (para estimular a linguagem, fala e comunicação alternativa) e a <strong>terapia ocupacional</strong> (com foco no processamento sensorial e nas atividades de vida diária).
                </p>
              </div>
            </div>
          </div>

          {/* 5. Fontes Oficiais e Referências */}
          <div className="bg-cream-deep border border-ink/10 rounded-3xl p-6 sm:p-8 shadow-[var(--shadow-soft)]">
            <div className="flex items-center gap-3 mb-5">
              <div className="p-2 rounded-xl bg-white text-amber-700">
                <BookOpen className="w-5 h-5" />
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-ink">
                Fontes Oficiais e Referências
              </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs sm:text-sm text-ink-soft">
              <div>
                <strong className="text-ink block mb-2 font-bold uppercase tracking-wider text-xs">
                  Legislação
                </strong>
                <ul className="space-y-2">
                  <li>
                    <strong className="text-ink-soft">Lei nº 12.764/2012:</strong> Lei Berenice Piana – Política Nacional de Proteção dos Direitos da Pessoa com TEA.
                  </li>
                  <li>
                    <strong className="text-ink-soft">Lei nº 14.454/2022:</strong> Alterou o art. 10 da Lei 9.656/98, definindo o Rol da ANS como exemplificativo.
                  </li>
                </ul>
              </div>

              <div>
                <strong className="text-ink block mb-2 font-bold uppercase tracking-wider text-xs">
                  ANS
                </strong>
                <p>
                  <strong className="text-ink-soft">Resolução Normativa (RN) nº 539/2022:</strong> Norma que revogou os limites de consultas e sessões com equipes multidisciplinares e tornou obrigatória a cobertura de qualquer método indicado pelo médico para a CID F84.
                </p>
              </div>

              <div>
                <strong className="text-ink block mb-2 font-bold uppercase tracking-wider text-xs">
                  Jurisprudência do STJ
                </strong>
                <p>
                  <strong className="text-ink-soft">Tema 1.082 e REsp 2.209.351/SP (3ª Turma - Setembro/2025):</strong> Jurisprudência que define como ilícita a rescisão unilateral do plano de saúde durante tratamento contínuo do beneficiário com TEA.
                </p>
              </div>
            </div>
          </div>

        </div>

        {/* Dedicated Advice Banner with Aline Matos */}
        <div className="mt-14 p-8 sm:p-10 rounded-3xl bg-gradient-to-r from-peach-soft via-cream to-babyblue-soft border border-brand/25 shadow-2xl flex flex-col lg:flex-row items-center justify-between gap-8">
          <div className="space-y-3 text-center lg:text-left max-w-2xl">
            <span className="text-xs font-bold text-brand uppercase tracking-wider block">
              Suporte com Quem Tem Mais de 15 Anos de Experiência
            </span>
            <h3 className="text-2xl sm:text-3xl font-display font-medium text-ink">
              Precisa de orientação segura para plano de saúde com cobertura para TEA?
            </h3>
            <p className="text-sm text-ink-soft leading-relaxed">
              <strong className="text-ink">Aline Matos</strong> conhece a fundo quais operadoras em Belo Horizonte e região oferecem as melhores redes credenciadas de clínicas multidisciplinares, sem cancelamento unilateral e com total respeito às prescrições médicas.
            </p>
          </div>

          <div className="shrink-0 w-full sm:w-auto">
            <button
              onClick={() => openWhatsApp('Olá, Aline! Li o artigo sobre plano de saúde para autistas (TEA) no seu site e gostaria de uma orientação especializada para minha família.')}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-4 rounded-full bg-brand hover:bg-brand-hover text-white font-semibold text-sm sm:text-base shadow-xl transition-transform hover:scale-105 cursor-pointer"
            >
              <MessageCircle className="w-5 h-5" />
              <span>Falar com a Aline no WhatsApp</span>
            </button>
          </div>
        </div>

      </div>
    </section>
  );
};

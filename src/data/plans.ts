/**
 * Modalidades de plano — texto original da página da Aline Matos.
 * O Plano Familiar é o destaque ("Recomendado") por ser o mais indicado para quem tem bebês e crianças pequenas.
 */
export interface PlanType {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  benefits: string[];
  ctaText: string;
  /** Mensagem do WhatsApp (o plano em destaque usa a mensagem padrão da página) */
  message?: string;
  featured?: boolean;
}

export const PLAN_TYPES: PlanType[] = [
  {
    id: 'familiar',
    title: 'Planos Familiares',
    subtitle: 'Proteção sob medida para quem você ama',
    description:
      'Cobertura abrangente para casal, filhos, recém-nascidos e dependentes, com acesso às melhores maternidades e pronto-socorro infantil 24h.',
    benefits: [
      'Descontos progressivos por quantidade de dependentes',
      'Inclusão de recém-nascidos sem carência (com aproveitamento)',
      'Emergência pediátrica de alto padrão',
      'Acomodação em apartamento com direito a acompanhante',
      'Consultas em todas as especialidades médicas',
    ],
    ctaText: 'Quero contratar',
    featured: true,
  },
  {
    id: 'empresarial',
    title: 'Planos Empresariais & MEI',
    subtitle: 'A partir de 2 vidas (MEI, ME, EPP, LTDA)',
    description:
      'Ideal para empresas de todos os portes e microempreendedores. Condições exclusivas com valores reduzidos em relação ao plano individual.',
    benefits: [
      'Contratação a partir de 2 vidas (sócios, funcionários ou dependentes)',
      'Aceita MEI ativo a partir de 6 meses',
      'Mensalidades dedutíveis no Imposto de Renda empresarial',
      'Opção de planos com ou sem coparticipação',
      'Carência zero para empresas com mais de 10 vidas',
    ],
    ctaText: 'Cotar Plano Empresarial / MEI',
    message: 'Olá, Aline! Gostaria de cotar um Plano de Saúde Empresarial via CNPJ/MEI.',
  },
  {
    id: 'adesao',
    title: 'Planos por Adesão e Profissionais',
    subtitle: 'Para profissionais liberais e estudantes',
    description:
      'Parcerias com entidades de classe e sindicatos (OAB, CRM, CREA, CRA, servidores públicos e estudantes) com valores subsidiados.',
    benefits: [
      'Valores negociados para categorias profissionais',
      'Ampla aceitação de dependentes diretos',
      'Planos das maiores seguradoras (Bradesco, SulAmérica, Unimed)',
      'Reembolso flexível para consultas e exames particulares',
      'Contratação 100% digital e sem burocracia',
    ],
    ctaText: 'Cotar por Entidade / Adesão',
    message: 'Olá, Aline! Gostaria de consultar planos por adesão para a minha profissão.',
  },
  {
    id: 'senior',
    title: 'Planos Sênior & Melhor Idade',
    subtitle: 'Acolhimento digno a partir de 59 anos',
    description:
      'Orientação especializada para pessoas idosas. Planos focados em geriatria, prevenção de quedas, controle de doenças crônicas e internação de excelência.',
    benefits: [
      'Linhas com foco em saúde preventiva e geriatria',
      'Hospitais de ponta e leitos com suporte intensivo',
      'Programas de acompanhamento domiciliar e telemedicina',
      'Orientação humanizada em todo o preenchimento da DPS (Declaração Pessoal de Saúde)',
      'Aline acompanha cada detalhe do contrato',
    ],
    ctaText: 'Cotar Plano Sênior',
    message: 'Olá, Aline! Gostaria de uma orientação carinhosa e cotação para Plano de Saúde Sênior.',
  },
];

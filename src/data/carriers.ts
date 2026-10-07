export interface Carrier {
  id: string;
  name: string;
  category: string;
  description: string;
  badge: string;
  highlights: string[];
  hospitals: string[];
  color: string;
}

export const CARRIERS: Carrier[] = [
  {
    id: 'bradesco',
    name: 'Bradesco Saúde',
    category: 'Nacional & Corporativo',
    badge: 'Líder em Reembolso',
    description: 'Referência absoluta no mercado corporativo e premium. Ampla rede de hospitais renomados, reembolso ágil e cobertura internacional opcional.',
    highlights: ['Reembolso de consultas e exames', 'Rede nacional completa', 'Acomodação em apartamento', 'Excelente aceitação médica'],
    hospitals: ['Mater Dei', 'Felício Rocho', 'Vila da Serra', 'Biocor / Rede D’Or', 'Albert Einstein (SP)', 'Sírio-Libanês (SP)'],
    color: 'from-red-600 to-red-700'
  },
  {
    id: 'sulamerica',
    name: 'SulAmérica Saúde',
    category: 'Nacional & Familiar',
    badge: 'Mais de 125 Anos',
    description: 'Tradição e tecnologia com programas preventivos ativos, aplicativo completo para reembolso digital e ampla assistência 24 horas.',
    highlights: ['Telemedicina no app 24h', 'Reembolso rápido 100% digital', 'Condições PME a partir de 2 vidas', 'Descontos em farmácias'],
    hospitals: ['Mater Dei Contorno', 'Felício Rocho', 'Hospital Vera Cruz', 'Hospital Lifecenter', 'Rede D’Or'],
    color: 'from-amber-600 to-amber-700'
  },
  {
    id: 'unimed',
    name: 'Unimed-BH & Nacional',
    category: 'Líder em Minas Gerais',
    badge: 'Maior Rede Própria em MG',
    description: 'A maior cooperativa de médicos de Minas Gerais e do Brasil. Centenas de hospitais, clínicas e laboratórios exclusivos com alta resolutividade.',
    highlights: ['Maior número de médicos cooperados em MG', 'Centros de promoção da saúde', 'Prontos-atendimentos 24h dedicados', 'Planos regionais e nacionais'],
    hospitals: ['Hospital Unimed-BH (Grajaú)', 'Hospital Unimed Betim', 'Maternidade Unimed', 'Rede ampla credenciada'],
    color: 'from-emerald-700 to-emerald-800'
  },
  {
    id: 'amil',
    name: 'Amil Saúde',
    category: 'Nacional & Custo-Benefício',
    badge: 'Alta Tecnologia e Cobertura',
    description: 'Linhas inteligentes que combinam custo acessível com hospitais de renome e programas de gestão de saúde continuada.',
    highlights: ['Amil Espaço Saúde com médicos de família', 'Resgate Saúde aéreo e terrestre', 'Opções com e sem coparticipação', 'Planos de abrangência flexível'],
    hospitals: ['Hospital Madre Teresa', 'Vila da Serra', 'Hospital Luxemburgo', 'Hospital Universitário'],
    color: 'from-blue-700 to-blue-800'
  },
  {
    id: 'porto',
    name: 'Porto Saúde',
    category: 'Executivo & Família',
    badge: 'Atendimento 5 Estrelas',
    description: 'Excelente pontuação de satisfação dos segurados, programas exclusivos para gestantes, check-up executivo e pontualidade exemplar.',
    highlights: ['Clube de vantagens Porto Seguro', 'Equipe de apoio 24h dedicada', 'Coleta de exames domiciliar', 'Facilidade na autorização de guias'],
    hospitals: ['Mater Dei', 'Felício Rocho', 'Hospital Semper', 'Laboratórios Hermes Pardini / Fleury'],
    color: 'from-sky-600 to-sky-700'
  },
  {
    id: 'hapvida-notredame',
    name: 'Hapvida NotreDame',
    category: 'Regional & Econômico',
    badge: 'Melhor Economia Mensal',
    description: 'A maior operadora de saúde integrada do Brasil. Ideal para quem busca economizar sem abrir mão de atendimento médico completo.',
    highlights: ['Rede própria moderna com hospitais e prontos-socorros', 'Mensalidades até 50% mais econômicas', 'Programas de saúde da mulher e da família', 'Sem coparticipação surpresa'],
    hospitals: ['Hospital Vera Cruz', 'Hospital Octaviano Neves', 'Hospital Lifecenter (linhas selecionadas)', 'Clínicas próprias NotreLife'],
    color: 'from-cyan-700 to-cyan-800'
  }
];

export const HOSPITALS_BH = [
  'Hospital Mater Dei (Santo Agostinho, Contorno, Betim)',
  'Hospital Felício Rocho',
  'Hospital Vila da Serra',
  'Biocor Instituto / Rede D’Or',
  'Hospital Madre Teresa',
  'Hospital Vera Cruz',
  'Hospital Lifecenter',
  'Hospital Semper',
  'Hospital Luxemburgo',
  'Hospital São Francisco de Assis',
  'Hospital Unimed (Contorno e Betim)'
];

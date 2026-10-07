export interface NewsArticle {
  id: string;
  date: string;
  outlet: string;
  title: string;
  url: string;
  category?: string;
}

export const NEWS_ARTICLES: NewsArticle[] = [
  {
    id: 'n1',
    date: '22/01/2024',
    outlet: 'Folha de S.Paulo',
    title: 'Disparam queixas de usuários com dificuldade de mudar de plano de saúde sem cumprir carência',
    url: 'https://www.google.com/search?q=Folha+de+S.Paulo+Disparam+queixas+de+usuarios+com+dificuldade+de+mudar+de+plano+de+saude+sem+cumprir+carencia',
    category: 'Carências & Portabilidade'
  },
  {
    id: 'n2',
    date: '28/04/2024',
    outlet: 'O Globo',
    title: 'Alta em cancelamento de planos de saúde coletivos impacta até quem está em tratamento, o que é proibido pela ANS',
    url: 'https://www.google.com/search?q=O+Globo+Alta+em+cancelamento+de+planos+de+saude+coletivos+impacta+ate+quem+esta+em+tratamento',
    category: 'Cancelamento Unilateral'
  },
  {
    id: 'n3',
    date: '25/05/2024',
    outlet: 'Metrópoles',
    title: 'Planos de saúde: cancelamentos unilaterais aumentam 30,9% em 4 meses',
    url: 'https://www.google.com/search?q=Metropoles+Planos+de+saude+cancelamentos+unilaterais+aumentam+30+9+em+4+meses',
    category: 'Cancelamento Unilateral'
  },
  {
    id: 'n4',
    date: '28/05/2024',
    outlet: 'CNN Brasil',
    title: 'Planos de saúde: Lira entra em acordo com operadoras por suspensão de cancelamentos de contratos',
    url: 'https://www.google.com/search?q=CNN+Brasil+Planos+de+saude+Lira+entra+em+acordo+com+operadoras+por+suspensao+de+cancelamentos',
    category: 'Regulamentação & Congresso'
  },
  {
    id: 'n5',
    date: '28/05/2024',
    outlet: 'Metrópoles',
    title: 'Lira anuncia acordo com planos de saúde para suspender cancelamentos',
    url: 'https://www.google.com/search?q=Metropoles+Lira+anuncia+acordo+com+planos+de+saude+para+suspender+cancelamentos',
    category: 'Regulamentação & Congresso'
  },
  {
    id: 'n6',
    date: '31/05/2024',
    outlet: 'Metrópoles',
    title: 'Por que os planos de saúde resolveram “cancelar os cancelamentos”',
    url: 'https://www.google.com/search?q=Metropoles+Por+que+os+planos+de+saude+resolveram+cancelar+os+cancelamentos',
    category: 'Cancelamento Unilateral'
  },
  {
    id: 'n7',
    date: '04/06/2024',
    outlet: 'CNN Brasil',
    title: 'Reajuste dos planos de saúde individuais é fixado em 6,91% pela ANS',
    url: 'https://www.google.com/search?q=CNN+Brasil+Reajuste+dos+planos+de+saude+individuais+e+fixado+em+6+91+pela+ANS',
    category: 'Reajustes ANS'
  },
  {
    id: 'n8',
    date: '04/06/2024',
    outlet: 'Poder360',
    title: 'Planos de saúde individuais e familiares têm reajuste de 6,91%',
    url: 'https://www.google.com/search?q=Poder360+Planos+de+saude+individuais+e+familiares+tem+reajuste+de+6+91',
    category: 'Reajustes ANS'
  },
  {
    id: 'n9',
    date: '05/06/2024',
    outlet: 'CNN Brasil',
    title: 'CPI dos Planos de Saúde: deputados querem instalar comissão antes do recesso',
    url: 'https://www.google.com/search?q=CNN+Brasil+CPI+dos+Planos+de+Saude+deputados+querem+instalar+comissao',
    category: 'Regulamentação & Congresso'
  },
  {
    id: 'n10',
    date: '06/06/2024',
    outlet: 'Metrópoles',
    title: 'Seu plano de saúde vai ficar mais caro? No DF, 48 mil serão afetados',
    url: 'https://www.google.com/search?q=Metropoles+Seu+plano+de+saude+vai+ficar+mais+caro+No+DF+48+mil+serao+afetados',
    category: 'Reajustes ANS'
  },
  {
    id: 'n11',
    date: '08/06/2024',
    outlet: 'Folha de S.Paulo',
    title: 'Entenda o que acontece com os planos de saúde após acordo com Lira',
    url: 'https://www.google.com/search?q=Folha+de+S.Paulo+Entenda+o+que+acontece+com+os+planos+de+saude+apos+acordo+com+Lira',
    category: 'Cancelamento Unilateral'
  },
  {
    id: 'n12',
    date: '22/08/2024',
    outlet: 'Folha de S.Paulo',
    title: 'Rescisões continuam após acordo entre Lira e planos de saúde, dizem usuários',
    url: 'https://www.google.com/search?q=Folha+de+S.Paulo+Rescisoes+continuam+apos+acordo+entre+Lira+e+planos+de+saude',
    category: 'Cancelamento Unilateral'
  },
  {
    id: 'n13',
    date: '04/09/2024',
    outlet: 'Folha de S.Paulo',
    title: 'Cancelar plano de saúde com menos de 30 vidas é ilegal',
    url: 'https://www.google.com/search?q=Folha+de+S.Paulo+Cancelar+plano+de+saude+com+menos+de+30+vidas+e+ilegal',
    category: 'PME & Empresas'
  },
  {
    id: 'n14',
    date: '01/10/2024',
    outlet: 'O Globo',
    title: 'Planos de saúde poderão ter novas regras para reajustes; entenda',
    url: 'https://www.google.com/search?q=O+Globo+Planos+de+saude+poderao+ter+novas+regras+para+reajustes',
    category: 'Reajustes ANS'
  },
  {
    id: 'n15',
    date: '02/12/2024',
    outlet: 'Metrópoles',
    title: 'Cancelamento de plano de saúde por falta de pagamento tem novas regras',
    url: 'https://www.google.com/search?q=Metropoles+Cancelamento+de+plano+de+saude+por+falta+de+pagamento+tem+novas+regras',
    category: 'Regulamentação ANS'
  },
  {
    id: 'n16',
    date: '04/12/2024',
    outlet: 'Folha de S.Paulo',
    title: 'Planos de saúde em vigor também terão novas regras para cancelamento por dívida',
    url: 'https://www.google.com/search?q=Folha+de+S.Paulo+Planos+de+saude+em+vigor+tambem+terao+novas+regras+para+cancelamento+por+divida',
    category: 'Regulamentação ANS'
  },
  {
    id: 'n17',
    date: '17/12/2024',
    outlet: 'Folha de S.Paulo',
    title: 'ANS propõe novas regras para reajuste de planos de saúde e limite para coparticipação',
    url: 'https://www.google.com/search?q=Folha+de+S.Paulo+ANS+propoe+novas+regras+para+reajuste+de+planos+de+saude+e+limite+para+coparticipacao',
    category: 'Coparticipação & Reajustes'
  },
  {
    id: 'n18',
    date: '02/01/2025',
    outlet: 'Folha de S.Paulo',
    title: 'ANS endurece regras e incentiva redução de reclamações nos planos de saúde',
    url: 'https://www.google.com/search?q=Folha+de+S.Paulo+ANS+endurece+regras+e+incentiva+reducao+de+reclamacoes+nos+planos+de+saude',
    category: 'Regulamentação ANS'
  },
  {
    id: 'n19',
    date: '06/01/2025',
    outlet: 'Folha de S.Paulo',
    title: 'Planos de saúde se recuperam, mas prejuízo ainda ameaça setor',
    url: 'https://www.google.com/search?q=Folha+de+S.Paulo+Planos+de+saude+se+recuperam+mas+prejuizo+ainda+ameaca+setor',
    category: 'Mercado de Saúde'
  },
  {
    id: 'n20',
    date: '11/02/2025',
    outlet: 'Metrópoles',
    title: 'Novas regras vão encarecer planos de saúde, diz diretora do Procon-SP',
    url: 'https://www.google.com/search?q=Metropoles+Novas+regras+vao+encarecer+planos+de+saude+diz+diretora+do+Procon-SP',
    category: 'Direito do Consumidor'
  },
  {
    id: 'n21',
    date: '12/02/2025',
    outlet: 'Metrópoles',
    title: 'Planos de saúde: por que ações contra empresas cresceram 73% em 2 anos',
    url: 'https://www.google.com/search?q=Metropoles+Planos+de+saude+por+que+acoes+contra+empresas+cresceram+73+em+2+anos',
    category: 'Judicialização'
  },
  {
    id: 'n22',
    date: '14/02/2025',
    outlet: 'Metrópoles',
    title: 'ANS lança plano de saúde “enxuto”, só com consultas e exames. Entenda',
    url: 'https://www.google.com/search?q=Metropoles+ANS+lanca+plano+de+saude+enxuto+so+com+consultas+e+exames',
    category: 'Modelos de Cobertura'
  },
  {
    id: 'n23',
    date: '17/02/2025',
    outlet: 'Folha de S.Paulo',
    title: 'ANS propõe plano de até R$ 100 sem pronto-socorro; entenda',
    url: 'https://www.google.com/search?q=Folha+de+S.Paulo+ANS+propoe+plano+de+ate+100+sem+pronto-socorro',
    category: 'Modelos de Cobertura'
  },
  {
    id: 'n24',
    date: '19/02/2025',
    outlet: 'CNN Brasil',
    title: 'Entenda a proposta da ANS para planos de saúde de até R$ 100',
    url: 'https://www.google.com/search?q=CNN+Brasil+Entenda+a+proposta+da+ANS+para+planos+de+saude+de+ate+100',
    category: 'Modelos de Cobertura'
  },
  {
    id: 'n25',
    date: '23/02/2025',
    outlet: 'Metrópoles',
    title: 'ANS: nova regra ameaça exames de câncer de 3 mi de mulheres? Entenda',
    url: 'https://www.google.com/search?q=Metropoles+ANS+nova+regra+ameaca+exames+de+cancer+de+3+mi+de+mulheres',
    category: 'Regulamentação ANS'
  },
  {
    id: 'n26',
    date: '07/04/2025',
    outlet: 'Metrópoles',
    title: 'ANS: 120 planos de saúde tiveram desempenho ruim em 2024. Veja lista',
    url: 'https://www.google.com/search?q=Metropoles+ANS+120+planos+de+saude+tiveram+desempenho+ruim+em+2024',
    category: 'Qualidade das Operadoras'
  },
  {
    id: 'n27',
    date: '13/05/2025',
    outlet: 'Metrópoles',
    title: 'Aumentos de planos de saúde entram em vigor este mês. Veja preços',
    url: 'https://www.google.com/search?q=Metropoles+Aumentos+de+planos+de+saude+entram+em+vigor+este+mes',
    category: 'Reajustes ANS'
  },
  {
    id: 'n28',
    date: '23/06/2025',
    outlet: 'Exame',
    title: 'ANS define aumento de 6,06% para planos de saúde individuais',
    url: 'https://www.google.com/search?q=Exame+ANS+define+aumento+de+6+06+para+planos+de+saude+individuais',
    category: 'Reajustes ANS'
  },
  {
    id: 'n29',
    date: '04/07/2025',
    outlet: 'Metrópoles',
    title: 'ANS obriga planos a justificar por escrito negativa de cobertura',
    url: 'https://www.google.com/search?q=Metropoles+ANS+obriga+planos+a+justificar+por+escrito+negativa+de+cobertura',
    category: 'Direito do Consumidor'
  },
  {
    id: 'n30',
    date: '29/07/2025',
    outlet: 'Metrópoles',
    title: 'Planos de saúde atenderão pacientes do SUS a partir de agosto; entenda',
    url: 'https://www.google.com/search?q=Metropoles+Planos+de+saude+atenderao+pacientes+do+SUS+a+partir+de+agosto',
    category: 'Saúde Pública & Privada'
  },
  {
    id: 'n31',
    date: '01/08/2025',
    outlet: 'Metrópoles',
    title: 'Planos de saúde começam a atender pacientes do SUS. Entenda',
    url: 'https://www.google.com/search?q=Metropoles+Planos+de+saude+comecam+a+atender+pacientes+do+SUS',
    category: 'Saúde Pública & Privada'
  },
  {
    id: 'n32',
    date: '14/08/2025',
    outlet: 'Metrópoles',
    title: 'Planos de saúde terão de oferecer implante contraceptivo hormonal',
    url: 'https://www.google.com/search?q=Metropoles+Planos+de+saude+terao+de+oferecer+implante+contraceptivo+hormonal',
    category: 'Cobertura Obrigatória'
  },
  {
    id: 'n33',
    date: '18/09/2025',
    outlet: 'Agência Brasil',
    title: 'STF fixa regras para autorização de procedimentos fora do rol da ANS',
    url: 'https://www.google.com/search?q=Agencia+Brasil+STF+fixa+regras+para+autorizacao+de+procedimentos+fora+do+rol+da+ANS',
    category: 'STF & Rol da ANS'
  },
  {
    id: 'n34',
    date: '05/11/2025',
    outlet: 'Agência Brasil',
    title: 'STF adia conclusão de julgamento sobre aumento de planos de saúde',
    url: 'https://www.google.com/search?q=Agencia+Brasil+STF+adia+conclusao+de+julgamento+sobre+aumento+de+planos+de+saude',
    category: 'STF & Jurisprudência'
  },
  {
    id: 'n35',
    date: '18/03/2026',
    outlet: 'Folha de S.Paulo',
    title: 'Planos de saúde têm lucro recorde de R$ 24,4 bilhões em 2025, com reajustes acima dos custos',
    url: 'https://www.google.com/search?q=Folha+de+S.Paulo+Planos+de+saude+tem+lucro+recorde+de+24+4+bilhoes+em+2025',
    category: 'Mercado de Saúde'
  },
  {
    id: 'n36',
    date: '09/05/2026',
    outlet: 'Agência Brasil',
    title: 'Planos de saúde coletivos têm reajuste médio de 9,9%, mostra ANS',
    url: 'https://www.google.com/search?q=Agencia+Brasil+Planos+de+saude+coletivos+tem+reajuste+medio+de+9+9+mostra+ANS',
    category: 'Reajustes ANS'
  },
  {
    id: 'n37',
    date: '11/05/2026',
    outlet: 'Folha de S.Paulo',
    title: 'Reajuste de planos coletivos desacelera e fica abaixo de 10% no início de 2026, diz ANS',
    url: 'https://www.google.com/search?q=Folha+de+S.Paulo+Reajuste+de+planos+coletivos+desacelera+e+fica+abaixo+de+10',
    category: 'Reajustes ANS'
  },
  {
    id: 'n38',
    date: '29/05/2026',
    outlet: 'Agência Brasil',
    title: 'Plano de saúde individual terá reajuste máximo de 5,11%, decide ANS',
    url: 'https://www.google.com/search?q=Agencia+Brasil+Plano+de+saude+individual+tera+reajuste+maximo+de+5+11',
    category: 'Reajustes ANS'
  },
  {
    id: 'n39',
    date: '29/05/2026',
    outlet: 'Exame',
    title: 'Planos de saúde individuais terão reajuste máximo de 5,11%, define ANS',
    url: 'https://www.google.com/search?q=Exame+Planos+de+saude+individuais+terao+reajuste+maximo+de+5+11',
    category: 'Reajustes ANS'
  },
  {
    id: 'n40',
    date: '29/05/2026',
    outlet: 'Metrópoles',
    title: 'ANS define que planos de saúde podem ter reajuste máximo de 5,11%',
    url: 'https://www.google.com/search?q=Metropoles+ANS+define+que+planos+de+saude+podem+ter+reajuste+maximo+de+5+11',
    category: 'Reajustes ANS'
  },
  {
    id: 'n41',
    date: '30/06/2026',
    outlet: 'Metrópoles',
    title: 'Planos de saúde individuais terão reajuste máximo de 6,2%, diz ANS',
    url: 'https://www.google.com/search?q=Metropoles+Planos+de+saude+individuais+terao+reajuste+maximo+de+6+2',
    category: 'Reajustes ANS'
  },
  {
    id: 'n42',
    date: '19/07/2026',
    outlet: 'Metrópoles',
    title: 'ANS discute novo reajuste em planos de saúde de até 20%',
    url: 'https://www.google.com/search?q=Metropoles+ANS+discute+novo+reajuste+em+planos+de+saude+de+ate+20',
    category: 'Reajustes ANS'
  },
  {
    id: 'n43',
    date: 'Agosto/2026',
    outlet: 'Folha de S.Paulo',
    title: 'ANS libera negociações da Hapvida com 947 mil beneficiários e diz que vai monitorar decisões',
    url: 'https://www.google.com/search?q=Folha+de+S.Paulo+ANS+libera+negociacoes+da+Hapvida+com+947+mil+beneficiarios',
    category: 'Operadoras & Negociações'
  },
  {
    id: 'n44',
    date: '02/10/2026',
    outlet: 'Folha de S.Paulo',
    title: 'Supremo manda para conciliação julgamento sobre reajuste de plano de saúde de idosos',
    url: 'https://www.google.com/search?q=Folha+de+S.Paulo+Supremo+manda+para+conciliacao+julgamento+sobre+reajuste+de+plano+de+saude+de+idosos',
    category: 'Idosos & Faixa Etária'
  },
  {
    id: 'n45',
    date: '07/10/2026',
    outlet: 'Folha de S.Paulo',
    title: 'Entenda julgamento no STF sobre reajuste de planos de saúde de idosos',
    url: 'https://www.google.com/search?q=Folha+de+S.Paulo+Entenda+julgamento+no+STF+sobre+reajuste+de+planos+de+saude+de+idosos',
    category: 'Idosos & Faixa Etária'
  }
];

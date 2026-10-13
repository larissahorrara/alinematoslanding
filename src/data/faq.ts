/** Perguntas frequentes — texto original da página da Aline Matos. */
export interface FaqItem {
  id: string;
  question: string;
  answer: string;
  category: string;
}

export const FAQ_ITEMS: FaqItem[] = [
  {
    id: 'f1',
    category: 'Custos e Contratação',
    question: 'O atendimento da Aline Matos tem algum custo para mim ou para minha empresa?',
    answer: 'Não! O atendimento e o estudo de valores de Aline Matos é 100% gratuito para você e sua empresa. A remuneração é paga diretamente pelas operadoras e seguradoras credenciadas, sem nenhum acréscimo no valor da sua mensalidade. Você recebe todo o estudo comparativo, análise de regras e acompanhamento de carências sem pagar nada a mais por isso.'
  },
  {
    id: 'f2',
    category: 'Portabilidade e Carências',
    question: 'Vou perder as carências que já cumpri se trocar de plano de saúde?',
    answer: 'Na grande maioria dos casos, NÃO. Com a Portabilidade de Carências regulamentada pela ANS (Resolução Normativa), é possível migrar para um novo plano mantendo todas as carências já cumpridas para consultas, exames, cirurgias e partos. A Aline analisa sua carta de permanência do plano atual e faz todo o procedimento técnico para garantir que você não fique desamparado nem precise aguardar novos prazos.'
  },
  {
    id: 'f3',
    category: 'CNPJ e MEI',
    question: 'Posso contratar plano com desconto usando MEI ou CNPJ pequeno?',
    answer: 'Sim! Planos de saúde empresariais (PME) podem ser contratados a partir de apenas 2 vidas (em algumas operadoras, até 1 titular + 1 dependente familiar direto). Ter um MEI ativo (com mais de 6 meses de abertura) ou qualquer CNPJ permite acessar tabelas com valores significativamente mais vantajosos em relação a planos individuais ou coletivos por adesão.'
  },
  {
    id: 'f4',
    category: 'Diferencial de Experiência',
    question: 'Qual a vantagem de contratar com a Aline Matos em vez de um call center ou robô de cotação?',
    answer: 'Com mais de 15 anos de atuação dedicada exclusivamente a planos de saúde, a Aline conhece o que os sites automatizados não mostram: quais hospitais realmente têm pronta-entrega de leitos, onde o atendimento de emergência funciona melhor, quais operadoras dificultam autorizações de guias e como escolher uma acomodação justa. Além disso, no pós-venda você fala diretamente com quem cuidou do seu contrato, e não com um protocolo anônimo de call center.'
  },
  {
    id: 'f5',
    category: 'Coparticipação',
    question: 'Vale a pena escolher um plano com ou sem coparticipação?',
    answer: 'Depende do perfil de utilização da sua família ou empresa. Planos com coparticipação têm mensalidades até 30% mais baratas, cobrando pequenas taxas fixas apenas quando uma consulta ou exame é realizado. Para quem usa o plano principalmente como segurança ou para consultas de rotina, gera enorme economia. A Aline faz o cálculo exato do seu perfil para indicar se a coparticipação vale a pena.'
  },
  {
    id: 'f6',
    category: 'Região de Atendimento',
    question: 'Aline atende somente Belo Horizonte ou todo o Brasil?',
    answer: 'Aline Matos atende clientes em Belo Horizonte, Região Metropolitana (Contagem, Betim, Nova Lima, Santa Luzia, Ribeirão das Neves, etc.), em todo o estado de Minas Gerais e também comercializa planos com cobertura nacional para clientes em qualquer estado brasileiro, com atendimento 100% digital, ágil e seguro via WhatsApp.'
  },
  {
    id: 'f7',
    category: 'Prazos',
    question: 'Em quanto tempo o plano de saúde entra em vigor após o envio dos documentos?',
    answer: 'O prazo de implantação costuma variar entre 2 a 10 dias úteis a depender da operadora escolhida. A Aline acompanha o protocolo diariamente junto ao setor de cadastro da operadora para agilizar a liberação da sua carteirinha e número de matrícula, avisando você no WhatsApp assim que o sistema estiver liberado.'
  }
];

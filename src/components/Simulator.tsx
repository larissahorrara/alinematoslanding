import React, { useState } from 'react';
import { 
  Building2, Users, User, HeartHandshake, Shield, Sparkles, 
  ArrowRight, Check, MessageCircle, RefreshCw, Hospital
} from 'lucide-react';
import { openWhatsApp, QuoteParams } from '../utils/whatsapp';

export const Simulator: React.FC = () => {
  const [step, setStep] = useState<number>(1);

  // Form State
  const [planType, setPlanType] = useState<string>('Empresarial (a partir de 2 vidas no CNPJ)');
  const [hasCnpj, setHasCnpj] = useState<boolean>(true);
  const [lives, setLives] = useState<string>('2 a 5 pessoas');
  const [city, setCity] = useState<string>('Belo Horizonte e RMBH');
  const [currentPlan, setCurrentPlan] = useState<string>('Já tenho plano e quero reduzir custos');
  const [accommodation, setAccommodation] = useState<string>('Apartamento (Quarto Privativo)');
  const [selectedHospitals, setSelectedHospitals] = useState<string[]>([
    'Mater Dei', 'Felício Rocho'
  ]);
  const [userName, setUserName] = useState<string>('');

  const toggleHospital = (hosp: string) => {
    if (selectedHospitals.includes(hosp)) {
      setSelectedHospitals(selectedHospitals.filter(h => h !== hosp));
    } else {
      setSelectedHospitals([...selectedHospitals, hosp]);
    }
  };

  const handleFinish = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const params: QuoteParams = {
      name: userName || undefined,
      planType,
      hasCnpj,
      lives,
      city,
      currentPlan,
      accommodation,
      hospitals: selectedHospitals,
    };
    openWhatsApp(params);
  };

  const planTypesOptions = [
    {
      id: 'pme',
      title: 'Empresarial / MEI',
      subtitle: 'A partir de 2 vidas (MEI, ME, LTDA)',
      badge: 'Condições Especiais PME',
      icon: Building2,
      isCnpj: true,
      text: 'Empresarial (a partir de 2 vidas no CNPJ)'
    },
    {
      id: 'family',
      title: 'Familiar',
      subtitle: 'Para casal, filhos e dependentes',
      badge: 'Proteção Completa',
      icon: Users,
      isCnpj: false,
      text: 'Familiar'
    },
    {
      id: 'individual',
      title: 'Individual / Adesão',
      subtitle: 'Profissionais liberais e autônomos',
      badge: 'Tabelas por Categoria',
      icon: User,
      isCnpj: false,
      text: 'Individual ou Adesão'
    },
    {
      id: 'senior',
      title: 'Sênior (59+ anos)',
      subtitle: 'Cuidado especializado e geriatria',
      badge: 'Acolhimento Humanizado',
      icon: HeartHandshake,
      isCnpj: false,
      text: 'Sênior / Melhor Idade (59+ anos)'
    }
  ];

  const popularHospitals = [
    'Mater Dei',
    'Felício Rocho',
    'Vila da Serra',
    'Biocor / Rede D’Or',
    'Unimed-BH',
    'Hospital Madre Teresa',
    'Hospital Vera Cruz',
    'Hospital Lifecenter'
  ];

  return (
    <section id="simulador" className="py-20 bg-slate-900 text-white relative overflow-hidden">
      {/* Background accents */}
      <div className="absolute top-1/2 left-0 w-72 h-72 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-950/80 border border-emerald-500/30 text-emerald-400 text-xs font-semibold uppercase tracking-wider mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            Simulador Inteligente em 3 Passos
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
            Descubra o Plano Ideal e o Custo Estimado
          </h2>
          <p className="mt-3 text-slate-300 text-base sm:text-lg">
            Responda em 30 segundos. A especialista <strong className="text-white">Aline Matos</strong> analisará suas respostas e enviará uma comparação detalhada no WhatsApp.
          </p>
        </div>

        {/* Simulator Card Box */}
        <div className="bg-slate-800/90 backdrop-blur-xl border border-slate-700 rounded-3xl p-6 sm:p-10 shadow-2xl">
          
          {/* Progress Indicators */}
          <div className="flex items-center justify-between mb-8 max-w-lg mx-auto">
            <div className="flex items-center gap-2">
              <span className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${
                step >= 1 ? 'bg-emerald-500 text-slate-950' : 'bg-slate-700 text-slate-400'
              }`}>
                {step > 1 ? <Check className="w-4 h-4" /> : '1'}
              </span>
              <span className={`text-xs sm:text-sm font-medium ${step >= 1 ? 'text-white' : 'text-slate-400'}`}>
                Perfil
              </span>
            </div>

            <div className={`h-0.5 flex-1 mx-3 ${step >= 2 ? 'bg-emerald-500' : 'bg-slate-700'}`} />

            <div className="flex items-center gap-2">
              <span className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${
                step >= 2 ? 'bg-emerald-500 text-slate-950' : 'bg-slate-700 text-slate-400'
              }`}>
                {step > 2 ? <Check className="w-4 h-4" /> : '2'}
              </span>
              <span className={`text-xs sm:text-sm font-medium ${step >= 2 ? 'text-white' : 'text-slate-400'}`}>
                Detalhes
              </span>
            </div>

            <div className={`h-0.5 flex-1 mx-3 ${step >= 3 ? 'bg-emerald-500' : 'bg-slate-700'}`} />

            <div className="flex items-center gap-2">
              <span className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${
                step >= 3 ? 'bg-emerald-500 text-slate-950' : 'bg-slate-700 text-slate-400'
              }`}>
                3
              </span>
              <span className={`text-xs sm:text-sm font-medium ${step >= 3 ? 'text-white' : 'text-slate-400'}`}>
                Cotação
              </span>
            </div>
          </div>

          {/* STEP 1: Tipo de Plano */}
          {step === 1 && (
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-bold text-white mb-2">Para quem é o plano de saúde?</h3>
                <p className="text-sm text-slate-400">Selecione a categoria que melhor representa sua necessidade hoje:</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {planTypesOptions.map((opt) => {
                  const Icon = opt.icon;
                  const isSelected = planType === opt.text;
                  return (
                    <button
                      key={opt.id}
                      type="button"
                      onClick={() => {
                        setPlanType(opt.text);
                        setHasCnpj(opt.isCnpj);
                      }}
                      className={`p-5 rounded-2xl border text-left transition-all duration-200 cursor-pointer relative ${
                        isSelected
                          ? 'border-emerald-500 bg-emerald-950/40 shadow-lg shadow-emerald-500/10 ring-2 ring-emerald-500/30'
                          : 'border-slate-700 bg-slate-800 hover:border-slate-600 hover:bg-slate-700/50'
                      }`}
                    >
                      <div className="flex items-start justify-between mb-3">
                        <div className={`p-2.5 rounded-xl ${isSelected ? 'bg-emerald-500 text-slate-950' : 'bg-slate-700 text-emerald-400'}`}>
                          <Icon className="w-5 h-5" />
                        </div>
                        <span className="text-[11px] font-semibold text-emerald-400 bg-emerald-900/60 px-2 py-0.5 rounded-md border border-emerald-500/30">
                          {opt.badge}
                        </span>
                      </div>
                      <h4 className="text-base font-bold text-white">{opt.title}</h4>
                      <p className="text-xs text-slate-400 mt-1">{opt.subtitle}</p>
                    </button>
                  );
                })}
              </div>

              {/* CNPJ confirmation helper */}
              <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-700/80 flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <Shield className="w-5 h-5 text-emerald-400 shrink-0" />
                  <span className="text-xs sm:text-sm text-slate-300">
                    Você ou alguém da família possui MEI ou CNPJ ativo?
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setHasCnpj(true)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
                      hasCnpj ? 'bg-emerald-500 text-slate-950' : 'bg-slate-800 text-slate-400 border border-slate-700'
                    }`}
                  >
                    Sim
                  </button>
                  <button
                    type="button"
                    onClick={() => setHasCnpj(false)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
                      !hasCnpj ? 'bg-emerald-500 text-slate-950' : 'bg-slate-800 text-slate-400 border border-slate-700'
                    }`}
                  >
                    Não
                  </button>
                </div>
              </div>

              <div className="flex justify-end pt-4">
                <button
                  type="button"
                  onClick={() => setStep(2)}
                  className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-bold text-sm shadow-md transition-all cursor-pointer"
                >
                  <span>Próximo Passo</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 2: Vidas e Preferências */}
          {step === 2 && (
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-bold text-white mb-2">Quantas pessoas e qual a sua região?</h3>
                <p className="text-sm text-slate-400">Informações rápidas para selecionarmos as tabelas corretas:</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {/* Quantidade de vidas */}
                <div>
                  <label className="block text-xs font-semibold uppercase text-slate-300 mb-2">
                    Número de Vidas (Titular + Dependentes)
                  </label>
                  <select
                    value={lives}
                    onChange={(e) => setLives(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-emerald-500"
                  >
                    <option value="1 pessoa (Individual)">1 pessoa (Individual)</option>
                    <option value="2 pessoas (Casal ou Sócio)">2 pessoas (Casal / Dupla)</option>
                    <option value="3 a 5 pessoas (Família ou PME)">3 a 5 pessoas (Família ou PME)</option>
                    <option value="6 a 15 pessoas">6 a 15 pessoas (PME)</option>
                    <option value="Mais de 15 pessoas">Mais de 15 pessoas (Corporativo)</option>
                  </select>
                </div>

                {/* Região / Cidade */}
                <div>
                  <label className="block text-xs font-semibold uppercase text-slate-300 mb-2">
                    Cidade / Região Principal
                  </label>
                  <select
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-emerald-500"
                  >
                    <option value="Belo Horizonte e RMBH">Belo Horizonte e Região Metropolitana</option>
                    <option value="Nova Lima / Betim / Contagem">Nova Lima / Betim / Contagem</option>
                    <option value="Outras cidades de Minas Gerais">Outras cidades de Minas Gerais</option>
                    <option value="Cobertura Nacional (Todo o Brasil)">Cobertura Nacional (Todo o Brasil)</option>
                  </select>
                </div>

                {/* Situação Atual */}
                <div>
                  <label className="block text-xs font-semibold uppercase text-slate-300 mb-2">
                    Você já possui plano de saúde atualmente?
                  </label>
                  <select
                    value={currentPlan}
                    onChange={(e) => setCurrentPlan(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-emerald-500"
                  >
                    <option value="Sim, quero trocar para pagar menos (Portabilidade)">Sim, quero pagar menos (Portabilidade sem carência)</option>
                    <option value="Sim, mas a rede atual não me atende">Sim, mas a rede de hospitais não me atende</option>
                    <option value="Não tenho plano (Primeira contratação)">Não tenho plano (Primeira contratação)</option>
                    <option value="Plano da empresa anterior cancelado">Plano da empresa anterior cancelado</option>
                  </select>
                </div>

                {/* Acomodação */}
                <div>
                  <label className="block text-xs font-semibold uppercase text-slate-300 mb-2">
                    Preferencia de Acomodação em Internação
                  </label>
                  <select
                    value={accommodation}
                    onChange={(e) => setAccommodation(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-emerald-500"
                  >
                    <option value="Apartamento (Quarto Privativo)">Apartamento (Quarto Privativo - Mais Conforto)</option>
                    <option value="Enfermaria (Quarto Coletivo)">Enfermaria (Quarto Coletivo - Mais Econômico)</option>
                    <option value="Quero comparar os dois">Quero comparar os dois valores</option>
                  </select>
                </div>
              </div>

              {/* Hospitais prioritários */}
              <div className="pt-2">
                <label className="block text-xs font-semibold uppercase text-slate-300 mb-2 flex items-center gap-1.5">
                  <Hospital className="w-4 h-4 text-emerald-400" />
                  Hospitais que você faz questão de ter na rede (opcional):
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {popularHospitals.map((hosp) => {
                    const isChecked = selectedHospitals.includes(hosp);
                    return (
                      <button
                        key={hosp}
                        type="button"
                        onClick={() => toggleHospital(hosp)}
                        className={`text-xs py-2 px-3 rounded-lg border text-left transition-colors cursor-pointer flex items-center justify-between ${
                          isChecked
                            ? 'bg-emerald-950/60 border-emerald-500 text-white font-semibold'
                            : 'bg-slate-900/60 border-slate-700 text-slate-400 hover:border-slate-600'
                        }`}
                      >
                        <span className="truncate">{hosp}</span>
                        {isChecked && <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0 ml-1" />}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="flex items-center justify-between pt-4">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="px-5 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-semibold text-sm cursor-pointer"
                >
                  Voltar
                </button>
                <button
                  type="button"
                  onClick={() => setStep(3)}
                  className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-bold text-sm shadow-md transition-all cursor-pointer"
                >
                  <span>Ver Resumo e Cotação</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 3: Resumo e Disparo para WhatsApp da Aline */}
          {step === 3 && (
            <div className="space-y-6">
              <div className="text-center sm:text-left">
                <span className="inline-block text-xs font-bold text-emerald-400 uppercase tracking-wider mb-1">
                  Simulação Quase Concluída!
                </span>
                <h3 className="text-2xl font-extrabold text-white">
                  Resumo da sua solicitação para Aline Matos
                </h3>
                <p className="text-sm text-slate-300 mt-1">
                  Confira as informações antes de enviar diretamente para o WhatsApp oficial da Aline:
                </p>
              </div>

              {/* Summary Card */}
              <div className="bg-slate-950/70 border border-slate-700/80 rounded-2xl p-5 space-y-3 text-sm">
                <div className="flex flex-wrap justify-between items-center py-1.5 border-b border-slate-800">
                  <span className="text-slate-400">Modalidade:</span>
                  <span className="font-semibold text-white">{planType}</span>
                </div>
                <div className="flex flex-wrap justify-between items-center py-1.5 border-b border-slate-800">
                  <span className="text-slate-400">Quantidade de Vidas:</span>
                  <span className="font-semibold text-white">{lives}</span>
                </div>
                <div className="flex flex-wrap justify-between items-center py-1.5 border-b border-slate-800">
                  <span className="text-slate-400">Região:</span>
                  <span className="font-semibold text-white">{city}</span>
                </div>
                <div className="flex flex-wrap justify-between items-center py-1.5 border-b border-slate-800">
                  <span className="text-slate-400">Acomodação preferida:</span>
                  <span className="font-semibold text-white">{accommodation}</span>
                </div>
                <div className="flex flex-wrap justify-between items-center py-1.5 border-b border-slate-800">
                  <span className="text-slate-400">Situação de carência:</span>
                  <span className="font-semibold text-emerald-400">{currentPlan}</span>
                </div>
                {selectedHospitals.length > 0 && (
                  <div className="flex flex-wrap justify-between items-center py-1.5">
                    <span className="text-slate-400">Hospitais de interesse:</span>
                    <span className="font-semibold text-white text-right max-w-xs">{selectedHospitals.join(', ')}</span>
                  </div>
                )}
              </div>

              {/* Name input */}
              <div>
                <label className="block text-xs font-semibold uppercase text-slate-300 mb-1.5">
                  Como Aline pode te chamar? (Opcional)
                </label>
                <input
                  type="text"
                  placeholder="Ex: Larissa Horrara"
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-white text-sm placeholder-slate-500 focus:outline-none focus:border-emerald-500"
                />
              </div>

              {/* Big High-Converting CTA Button */}
              <div className="space-y-3 pt-2">
                <button
                  type="button"
                  onClick={handleFinish}
                  className="w-full flex items-center justify-center gap-3 px-6 py-4 rounded-xl bg-emerald-500 hover:bg-emerald-600 active:bg-emerald-700 text-slate-950 font-extrabold text-base sm:text-lg shadow-xl shadow-emerald-500/20 transition-all hover:scale-[1.01] cursor-pointer"
                >
                  <MessageCircle className="w-6 h-6 fill-slate-950" />
                  <span>Enviar Simulação no WhatsApp da Aline</span>
                </button>
                <p className="text-center text-xs text-slate-400">
                  Ao clicar, o WhatsApp abrirá com todos os dados preenchidos. Sem custo, sem spam e com atendimento humanizado.
                </p>
              </div>

              <div className="flex justify-start pt-2">
                <button
                  type="button"
                  onClick={() => setStep(2)}
                  className="inline-flex items-center gap-1.5 text-xs text-slate-400 hover:text-white transition-colors cursor-pointer"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  Alterar respostas anteriores
                </button>
              </div>
            </div>
          )}

        </div>

      </div>
    </section>
  );
};

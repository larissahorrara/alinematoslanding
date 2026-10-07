import React, { useState } from 'react';
import { MessageCircle, ShieldCheck, CheckCircle2, Send, Lock } from 'lucide-react';
import { openWhatsApp } from '../utils/whatsapp';

export const QuickContactForm: React.FC = () => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [planType, setPlanType] = useState('Empresarial (a partir de 2 vidas)');
  const [currentCarrier, setCurrentCarrier] = useState('');
  const [note, setNote] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);

    const message = [
      `Olá, Aline! Enviei meus dados através do formulário de contato do site:`,
      `*Nome:* ${name || 'Não informado'}`,
      `*Telefone:* ${phone || 'Não informado'}`,
      `*Tipo de Plano:* ${planType}`,
      currentCarrier ? `*Plano Atual:* ${currentCarrier}` : null,
      note ? `*Observações:* ${note}` : null,
      `Gostaria de receber a cotação comparativa gratuita!`
    ].filter(Boolean).join('\n');

    setTimeout(() => {
      openWhatsApp(message);
    }, 600);
  };

  return (
    <section className="py-20 bg-slate-900 text-white relative overflow-hidden">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div className="bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700 rounded-3xl p-8 sm:p-12 shadow-2xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            
            {/* Left Copy */}
            <div className="lg:col-span-5 space-y-5">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-950/80 border border-emerald-500/30 text-emerald-400 text-xs font-semibold uppercase tracking-wider">
                <ShieldCheck className="w-3.5 h-3.5" />
                Atendimento Imediato
              </div>

              <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight leading-tight">
                Receba seu Estudo de Preços e Rede sem Sair do Lugar
              </h2>

              <p className="text-sm text-slate-300 leading-relaxed">
                Preencha os campos ao lado e seja direcionado instantaneamente para o WhatsApp particular de <strong className="text-white">Aline Matos</strong>.
              </p>

              <div className="space-y-3 pt-2 text-xs sm:text-sm text-slate-300">
                <div className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Cotação comparativa de até 4 operadoras</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Análise de carências e rede hospitalar</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Atendimento 100% gratuito e direto com a Aline</span>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-700/80 flex items-center gap-2 text-xs text-slate-400">
                <Lock className="w-3.5 h-3.5 text-slate-400" />
                <span>Seus dados são 100% confidenciais e protegidos.</span>
              </div>
            </div>

            {/* Right Form */}
            <div className="lg:col-span-7 bg-slate-900/90 border border-slate-700/80 rounded-2xl p-6 sm:p-8">
              {submitted ? (
                <div className="text-center py-8 space-y-4">
                  <div className="w-14 h-14 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h3 className="text-xl font-bold text-white">Redirecionando para o WhatsApp...</h3>
                  <p className="text-sm text-slate-300">
                    Se o aplicativo não abrir automaticamente, clique no botão abaixo:
                  </p>
                  <button
                    type="button"
                    onClick={() => openWhatsApp()}
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-emerald-500 text-slate-950 font-bold text-sm"
                  >
                    <MessageCircle className="w-4 h-4 fill-slate-950" />
                    <span>Abrir WhatsApp</span>
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-xs font-semibold uppercase text-slate-300 mb-1">
                      Seu Nome Completo *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Ex: Carlos Eduardo"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-2.5 text-white text-sm focus:outline-none focus:border-emerald-500"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold uppercase text-slate-300 mb-1">
                        Seu WhatsApp *
                      </label>
                      <input
                        type="tel"
                        required
                        placeholder="(31) 99999-9999"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-2.5 text-white text-sm focus:outline-none focus:border-emerald-500"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold uppercase text-slate-300 mb-1">
                        Modalidade Desejada
                      </label>
                      <select
                        value={planType}
                        onChange={(e) => setPlanType(e.target.value)}
                        className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-2.5 text-white text-sm focus:outline-none focus:border-emerald-500"
                      >
                        <option value="Empresarial (a partir de 2 vidas)">Empresarial / MEI (Tabela Reduzida)</option>
                        <option value="Familiar">Familiar</option>
                        <option value="Individual ou Adesão">Individual / Adesão</option>
                        <option value="Sênior (59+ anos)">Sênior (59+ anos)</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold uppercase text-slate-300 mb-1">
                      Já possui plano atualmente? Qual operadora? (Opcional)
                    </label>
                    <input
                      type="text"
                      placeholder="Ex: Unimed atual / Quero reduzir custo"
                      value={currentCarrier}
                      onChange={(e) => setCurrentCarrier(e.target.value)}
                      className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-2.5 text-white text-sm focus:outline-none focus:border-emerald-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold uppercase text-slate-300 mb-1">
                      Alguma prioridade especial? (Opcional)
                    </label>
                    <input
                      type="text"
                      placeholder="Ex: Faço questão de hospital Mater Dei ou Biocor"
                      value={note}
                      onChange={(e) => setNote(e.target.value)}
                      className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-2.5 text-white text-sm focus:outline-none focus:border-emerald-500"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full mt-2 flex items-center justify-center gap-2 py-3.5 px-6 rounded-xl bg-emerald-500 hover:bg-emerald-600 active:bg-emerald-700 text-slate-950 font-extrabold text-sm shadow-lg shadow-emerald-500/25 transition-all cursor-pointer"
                  >
                    <Send className="w-4 h-4" />
                    <span>Falar no WhatsApp da Aline Agora</span>
                  </button>
                </form>
              )}
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};

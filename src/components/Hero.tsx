import React from 'react';
import { MessageCircle, CheckCircle2, Clock, Building, ShieldCheck } from 'lucide-react';
import { AlinePhoto } from './AlinePhoto';
import { openWhatsApp } from '../utils/whatsapp';

export const Hero: React.FC = () => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-slate-900 via-slate-900 to-slate-950 text-white pt-8 pb-16 lg:pt-14 lg:pb-24">
      {/* Background glow effects */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-gradient-to-r from-emerald-600/10 via-teal-500/10 to-sky-600/10 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Copywriting */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            
            {/* Top kicker badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-950/90 border border-emerald-500/40 text-emerald-300 text-xs sm:text-sm font-bold">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>REVENDEDORA de planos de saúde há mais de 15 anos</span>
            </div>

            {/* Main Headline - Non-sensationalist, professional and trustworthy */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-5xl font-black tracking-tight text-white leading-[1.15]">
              O Plano de Saúde Ideal para você, sua família ou sua empresa com quem atua nas maiores corretoras de BH.
            </h1>

            {/* Sub-headline */}
            <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-2xl mx-auto lg:mx-0">
              Procurando o plano certo, com rede hospitalar de confiança e sem surpresas? 
              <strong className="text-white font-semibold"> Aline Matos</strong> é <strong className="text-emerald-300">REVENDEDORA de planos de saúde há mais de 15 anos</strong>, com atuação nas maiores corretoras de Belo Horizonte, analisando cada detalhe de carências, rede de atendimento e tabelas para garantir a melhor contratação.
            </p>

            {/* Key Value Points */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-left max-w-xl mx-auto lg:mx-0">
              <div className="flex items-start gap-2.5 text-sm text-slate-200">
                <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                <span><strong>Experiência em Grandes Corretoras:</strong> Acesso às principais tabelas e gerências em BH.</span>
              </div>
              <div className="flex items-start gap-2.5 text-sm text-slate-200">
                <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                <span><strong>Tabelas Especiais via CNPJ/MEI:</strong> A partir de 2 vidas com condições diferenciadas.</span>
              </div>
              <div className="flex items-start gap-2.5 text-sm text-slate-200">
                <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                <span><strong>Portabilidade de Carências:</strong> Orientação para migrar sem perder seus prazos cumpridos.</span>
              </div>
              <div className="flex items-start gap-2.5 text-sm text-slate-200">
                <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                <span><strong>Rede dos Melhores Hospitais:</strong> Mater Dei, Felício Rocho, Unimed, Biocor, etc.</span>
              </div>
            </div>

            {/* Primary Action Button - WhatsApp Direct (Simulador rápido button removed as requested) */}
            <div className="pt-4 flex flex-col sm:flex-row items-stretch sm:items-center justify-center lg:justify-start gap-4">
              <button
                onClick={() => openWhatsApp('Olá, Aline! Gostaria de fazer uma cotação de plano de saúde com você.')}
                className="inline-flex items-center justify-center gap-3 px-8 py-4 rounded-xl bg-emerald-500 hover:bg-emerald-400 active:bg-emerald-600 text-slate-950 font-black text-base shadow-lg shadow-emerald-500/25 transition-all duration-200 hover:scale-[1.02] cursor-pointer group"
              >
                <MessageCircle className="w-6 h-6 fill-slate-950" />
                <span className="text-left leading-tight">
                  <span className="block text-sm uppercase font-extrabold tracking-wider">Falar no WhatsApp com a Aline</span>
                  <span className="text-xs font-semibold text-slate-900/80">Atendimento Direto e Exclusivo</span>
                </span>
              </button>
            </div>

            {/* Regional Footprint */}
            <div className="pt-6 border-t border-slate-800 flex flex-wrap items-center justify-center lg:justify-start gap-6 text-xs text-slate-400">
              <div className="flex items-center gap-2">
                <Building className="w-4 h-4 text-emerald-400" />
                <span className="text-slate-300 font-medium">Belo Horizonte, RMBH e Nacional</span>
              </div>
              <span className="text-slate-700">·</span>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-teal-400" />
                <span className="text-slate-300 font-medium">Atendimento Direto no WhatsApp</span>
              </div>
              <span className="text-slate-700">·</span>
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span className="text-slate-300 font-medium">Sem Intermediários</span>
              </div>
            </div>

          </div>

          {/* Right Column: Aline's Photo */}
          <div className="lg:col-span-5 relative max-w-md mx-auto lg:max-w-none w-full">
            <div className="relative z-10 mx-auto max-w-sm lg:max-w-md">
              <AlinePhoto className="w-full aspect-[4/5]" />
            </div>

            {/* Floating Metric 1 */}
            <div className="absolute -top-4 -left-4 sm:-left-8 z-20 bg-slate-900/95 backdrop-blur-md p-3.5 rounded-2xl border border-emerald-500/30 shadow-xl max-w-[210px] hidden sm:block">
              <div className="flex items-center gap-2.5">
                <div className="p-2 bg-emerald-500/20 text-emerald-400 rounded-xl">
                  <Building className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-[11px] text-slate-400 uppercase font-medium">Atuação Comprovada</p>
                  <p className="text-sm font-extrabold text-white">Maiores Corretoras de BH</p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

/**
 * Landing Page & Portal - Planos de Saúde com Aline Matos
 * REVENDEDORA de planos de saúde há mais de 15 anos
 */

import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { TopPageBanner } from './components/TopPageBanner';
import { Hero } from './components/Hero';
import { AboutMe } from './components/AboutMe';
import { AutismHealthPlan } from './components/AutismHealthPlan';
import { NewsSection } from './components/NewsSection';
import { Simulator } from './components/Simulator';
import { PainPointsSolution } from './components/PainPointsSolution';
import { PlanTypes } from './components/PlanTypes';
import { CarriersGrid } from './components/CarriersGrid';
import { ProcessSteps } from './components/ProcessSteps';
import { FAQSection } from './components/FAQSection';
import { QuickContactForm } from './components/QuickContactForm';
import { Footer } from './components/Footer';
import { FloatingWhatsApp } from './components/FloatingWhatsApp';

export default function App() {
  const [currentPage, setCurrentPage] = useState<'home' | 'tea' | 'news'>('home');

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.toLowerCase();
      if (hash.includes('autista') || hash.includes('tea')) {
        setCurrentPage('tea');
      } else if (hash.includes('noticia') || hash.includes('news')) {
        setCurrentPage('news');
      } else if (hash === '' || hash.includes('inicio') || hash.includes('home')) {
        setCurrentPage('home');
      }
    };

    handleHashChange();
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const handleNavigate = (page: 'home' | 'tea' | 'news') => {
    setCurrentPage(page);
    if (page === 'tea') {
      window.location.hash = 'autismo';
    } else if (page === 'news') {
      window.location.hash = 'noticias';
    } else {
      window.location.hash = '';
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-emerald-500 selection:text-white w-full min-w-full overflow-x-hidden">
      {/* Top Header */}
      <Header currentPage={currentPage} onNavigate={handleNavigate} />

      {/* Banner / Menu Chamativo no Topo com as 3 Páginas/Guias */}
      <TopPageBanner currentPage={currentPage} onNavigate={handleNavigate} />

      {/* Conteúdo Dinâmico por Página */}
      <main className="flex-1 w-full overflow-x-hidden">
        {currentPage === 'home' && (
          <>
            {/* Dobra 1: Hero Principal */}
            <Hero />

            {/* Dobra 2: Sobre Mim - Trajetória nas Maiores Corretoras de BH */}
            <AboutMe />

            {/* Dobra 3: Simulador Express em 3 Passos */}
            <Simulator />

            {/* Dobra 4: Dores x Soluções */}
            <PainPointsSolution />

            {/* Dobra 5: Categorias de Planos */}
            <PlanTypes />

            {/* Dobra 6: Operadoras Parceiras & Hospitais de BH */}
            <CarriersGrid />

            {/* Dobra 7: Como Funciona o Atendimento */}
            <ProcessSteps />

            {/* Dobra 8: Dúvidas Frequentes */}
            <FAQSection />

            {/* Dobra 9: Formulário Rápido de Contato */}
            <QuickContactForm />
          </>
        )}

        {currentPage === 'tea' && (
          <>
            {/* Página Dedicada: Plano de Saúde para Autistas (TEA) */}
            <AutismHealthPlan />
            <QuickContactForm />
          </>
        )}

        {currentPage === 'news' && (
          <>
            {/* Página Dedicada: Notícias sobre Saúde Suplementar 2024–2026 */}
            <NewsSection />
            <QuickContactForm />
          </>
        )}
      </main>

      {/* Rodapé com Navegação e Contatos */}
      <Footer onNavigate={handleNavigate} />

      {/* Botão Flutuante Permanente para o WhatsApp */}
      <FloatingWhatsApp />
    </div>
  );
}

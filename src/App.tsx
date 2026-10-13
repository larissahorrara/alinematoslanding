/**
 * Landing page — Planos de saúde com Aline Matos
 * Página de rolagem única com narrativa sincronizada ao vídeo do hero,
 * voltada a pais e mães de bebês e crianças pequenas.
 */

import React, { Suspense, lazy, useEffect, useState } from 'react';
import { ArrowLeft } from 'lucide-react';
import { ScrollTrigger, startSmoothScroll } from './lib/motion';
import { HeroStory } from './components/landing/HeroStory';
import { Unpredictable } from './components/landing/Unpredictable';
import { NotAlone } from './components/landing/NotAlone';
import { AboutAline } from './components/landing/AboutAline';
import { FinalCTA } from './components/landing/FinalCTA';
import { SiteFooter } from './components/landing/SiteFooter';
import { WhatsAppFab } from './components/landing/WhatsAppFab';
import { PrivacyDialog } from './components/landing/PrivacyDialog';

// Páginas de guia carregadas sob demanda (deixam a página inicial mais leve)
const AutismHealthPlan = lazy(() =>
  import('./components/AutismHealthPlan').then((m) => ({ default: m.AutismHealthPlan })),
);
const NewsSection = lazy(() => import('./components/NewsSection').then((m) => ({ default: m.NewsSection })));

type Page = 'home' | 'tea' | 'news';

const pageFromHash = (): Page => {
  const hash = window.location.hash.toLowerCase();
  if (hash.includes('autis') || hash.includes('tea')) return 'tea';
  if (hash.includes('noticia') || hash.includes('news')) return 'news';
  return 'home';
};

export default function App() {
  const [page, setPage] = useState<Page>(pageFromHash);
  const [heroEnded, setHeroEnded] = useState(false);

  useEffect(() => startSmoothScroll(), []);

  useEffect(() => {
    const onHash = () => {
      const next = pageFromHash();
      setPage((prev) => {
        if (prev !== next) window.scrollTo(0, 0);
        return next;
      });
    };
    window.addEventListener('hashchange', onHash);
    return () => window.removeEventListener('hashchange', onHash);
  }, []);

  useEffect(() => {
    document.title =
      page === 'tea'
        ? 'Plano de saúde para autistas (TEA) | Aline Matos'
        : page === 'news'
          ? 'Notícias sobre saúde suplementar | Aline Matos'
          : 'Você planeja o berço, o enxoval, a escolinha. E a saúde dele, quem planeja?';
  }, [page]);

  useEffect(() => {
    // Recalcula as animações de rolagem quando a página muda ou as imagens terminam de carregar
    const id = window.setTimeout(() => ScrollTrigger.refresh(), 200);
    const onLoad = () => ScrollTrigger.refresh();
    window.addEventListener('load', onLoad);
    return () => {
      window.clearTimeout(id);
      window.removeEventListener('load', onLoad);
    };
  }, [page]);

  if (page !== 'home') {
    return (
      <>
        <header className="sticky top-0 z-40 border-b border-ink/10 bg-cream/90 backdrop-blur-md">
          <div className="mx-auto flex max-w-5xl items-center justify-between gap-4 px-5 py-3">
            <a href="#inicio" className="font-display text-xl text-ink">
              Aline Matos
            </a>
            <a href="#inicio" className="btn-ghost">
              <ArrowLeft className="h-4 w-4" aria-hidden="true" />
              Voltar ao início
            </a>
          </div>
        </header>
        <main>
          <Suspense fallback={<div className="min-h-[60svh]" />}>
            {page === 'tea' ? <AutismHealthPlan /> : <NewsSection />}
          </Suspense>
          <FinalCTA />
        </main>
        <SiteFooter />
        <WhatsAppFab ready />
        <PrivacyDialog />
      </>
    );
  }

  return (
    <>
      <main>
        <HeroStory onEnded={() => setHeroEnded(true)} />
        <Unpredictable />
        <NotAlone />
        <AboutAline />
        <FinalCTA />
      </main>
      <SiteFooter />
      <WhatsAppFab ready={heroEnded} />
      <PrivacyDialog />
    </>
  );
}

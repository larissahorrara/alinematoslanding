/**
 * Landing page — Planos de saúde com Aline Matos
 * Página de rolagem única com narrativa sincronizada ao vídeo do hero,
 * voltada a pais e mães de bebês e crianças pequenas.
 */

import React, { Suspense, lazy, useEffect, useState } from 'react';
import { requestRefresh, startSmoothScroll } from './lib/motion';
import { HeroStory } from './components/landing/HeroStory';
import { Unpredictable } from './components/landing/Unpredictable';
import { NotAlone } from './components/landing/NotAlone';
import { AboutAline } from './components/landing/AboutAline';
import { FinalCTA } from './components/landing/FinalCTA';
import { SiteFooter } from './components/landing/SiteFooter';
import { WhatsAppFab } from './components/landing/WhatsAppFab';
import { SiteHeader } from './components/landing/SiteHeader';
import { PrivacyDialog } from './components/landing/PrivacyDialog';
import { Testimonials } from './components/landing/Testimonials';
import { FAQ } from './components/landing/FAQ';
import { CookieConsent } from './components/landing/CookieConsent';

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
    requestRefresh(200);
    const onLoad = () => requestRefresh();
    window.addEventListener('load', onLoad);
    return () => window.removeEventListener('load', onLoad);
  }, [page]);

  return (
    <div className="has-header">
      <SiteHeader onHome={page === 'home'} />
      <main>
        {page === 'home' ? (
          <>
            <HeroStory onEnded={() => setHeroEnded(true)} />
            <Unpredictable />
            <NotAlone />
            <AboutAline />
            <Testimonials />
          </>
        ) : (
          <Suspense fallback={<div className="min-h-[60svh]" />}>
            {page === 'tea' ? <AutismHealthPlan /> : <NewsSection />}
          </Suspense>
        )}
        <FinalCTA />
        {page === 'home' && <FAQ />}
      </main>
      <SiteFooter />
      <WhatsAppFab ready={page !== 'home' || heroEnded} />
      <PrivacyDialog />
      <CookieConsent />
    </div>
  );
}

import React, { useCallback, useEffect, useRef, useState } from 'react';
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react';
import { prefersReducedMotion } from '../../lib/motion';
import { TESTIMONIALS } from '../../data/testimonials';

/** Depoimentos em carrossel com transição suave (avança sozinho e pausa ao passar o mouse ou focar) */
export const Testimonials: React.FC = () => {
  const trackRef = useRef<HTMLUListElement>(null);
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);

  const goTo = useCallback((index: number) => {
    const track = trackRef.current;
    if (!track) return;
    const n = TESTIMONIALS.length;
    const i = ((index % n) + n) % n;
    const card = track.children[i] as HTMLElement | undefined;
    if (!card) return;
    track.scrollTo({ left: card.offsetLeft - track.offsetLeft, behavior: prefersReducedMotion() ? 'auto' : 'smooth' });
  }, []);

  // Atualiza o indicador conforme a rolagem (inclusive quando a pessoa arrasta no celular)
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    const onScroll = () => {
      const cards = Array.from(track.children) as HTMLElement[];
      const left = track.scrollLeft;
      let best = 0;
      cards.forEach((c, i) => {
        if (Math.abs(c.offsetLeft - track.offsetLeft - left) < Math.abs(cards[best].offsetLeft - track.offsetLeft - left))
          best = i;
      });
      setActive(best);
    };
    track.addEventListener('scroll', onScroll, { passive: true });
    return () => track.removeEventListener('scroll', onScroll);
  }, []);

  // Avanço automático a cada 6 s
  useEffect(() => {
    if (paused || prefersReducedMotion()) return;
    const id = window.setInterval(() => {
      const track = trackRef.current;
      if (!track) return;
      const atEnd = track.scrollLeft + track.clientWidth >= track.scrollWidth - 8;
      goTo(atEnd ? 0 : active + 1);
    }, 6000);
    return () => window.clearInterval(id);
  }, [active, paused, goTo]);

  return (
    <section id="depoimentos" className="bg-cream-deep px-5 py-20 sm:py-24" aria-labelledby="titulo-depoimentos">
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
          <div className="max-w-2xl">
            <p className="text-sm font-semibold uppercase tracking-[0.16em] text-sage-deep">Quem já contratou</p>
            <h2 id="titulo-depoimentos" className="font-display mt-3 text-[clamp(1.8rem,3.6vw,2.6rem)] leading-tight text-brand">
              O que dizem os clientes da Aline
            </h2>
          </div>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => goTo(active - 1)}
              className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-brand/30 bg-white text-brand transition-colors hover:bg-brand hover:text-white"
              aria-label="Depoimento anterior"
            >
              <ChevronLeft className="h-5 w-5" aria-hidden="true" />
            </button>
            <button
              type="button"
              onClick={() => goTo(active + 1)}
              className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-brand/30 bg-white text-brand transition-colors hover:bg-brand hover:text-white"
              aria-label="Próximo depoimento"
            >
              <ChevronRight className="h-5 w-5" aria-hidden="true" />
            </button>
          </div>
        </div>

        <ul
          ref={trackRef}
          className="mt-10 flex snap-x snap-mandatory gap-5 overflow-x-auto pb-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          aria-label="Depoimentos"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          onFocus={() => setPaused(true)}
          onBlur={() => setPaused(false)}
          onTouchStart={() => setPaused(true)}
          data-lenis-prevent-wheel
        >
          {TESTIMONIALS.map((t, i) => (
            <li
              key={t.name}
              className="flex w-[86%] shrink-0 snap-start flex-col rounded-3xl border border-line bg-white p-7 shadow-[var(--shadow-soft)] sm:w-[calc(50%-0.625rem)] lg:w-[calc(33.333%-0.84rem)]"
              aria-roledescription="depoimento"
              aria-label={`${i + 1} de ${TESTIMONIALS.length}`}
            >
              <figure className="flex h-full flex-col">
                <Quote className="h-8 w-8 text-brand/30" aria-hidden="true" />
                <blockquote className="mt-4 flex-1 text-[1.02rem] leading-relaxed text-ink">{t.text}</blockquote>
                <figcaption className="mt-6 flex items-center gap-3">
                  <span
                    className="flex h-11 w-11 items-center justify-center rounded-full bg-brand text-base font-bold text-white"
                    aria-hidden="true"
                  >
                    {t.name.charAt(0)}
                  </span>
                  <span className="font-semibold text-ink">{t.name}</span>
                </figcaption>
              </figure>
            </li>
          ))}
        </ul>

        <div className="mt-4 flex justify-center gap-1" aria-hidden="true">
          {TESTIMONIALS.map((t, i) => (
            <button
              key={t.name}
              type="button"
              tabIndex={-1}
              onClick={() => goTo(i)}
              className="flex h-6 w-6 items-center justify-center"
            >
              <span className={`block h-2 rounded-full transition-all ${i === active ? 'w-6 bg-brand' : 'w-2 bg-brand/25'}`} />
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};

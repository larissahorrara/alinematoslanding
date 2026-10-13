import React, { useEffect, useRef } from 'react';
import { drawSvg, gsap, onIdle, prefersReducedMotion, requestRefresh } from '../../lib/motion';

/** Ícone de boleto: folha com canto dobrado, linhas de texto e código de barras */
const BoletoIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg
    viewBox="0 0 48 48"
    fill="none"
    stroke="currentColor"
    strokeWidth={2}
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    aria-hidden="true"
  >
    <path d="M11 4h19l8 8v32H11z" />
    <path d="M30 4v8h8" />
    <path d="M16 14h9M16 19h16" />
    <path className="bar" d="M16 27v10" />
    <path className="bar" d="M18.5 27v10" strokeWidth={1.2} />
    <path className="bar" d="M20.5 27v10" />
    <path className="bar" d="M23.5 27v10" strokeWidth={2.6} />
    <path className="bar" d="M26 27v10" strokeWidth={1.2} />
    <path className="bar" d="M28 27v10" />
    <path className="bar" d="M30.5 27v10" strokeWidth={2.6} />
    <path className="bar" d="M33 27v10" strokeWidth={1.2} />
    <path d="M16 41h17" strokeWidth={1.2} />
  </svg>
);

/** Frase de impacto antes dos planos: o boleto que se paga com gosto */
export const BoletoQuote: React.FC = () => {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = ref.current;
    if (!section || prefersReducedMotion()) return;
    let ctx: gsap.Context | undefined;
    const cancel = onIdle(() => {
      ctx = gsap.context(() => {
        gsap.from('.boleto-card', {
          opacity: 0,
          y: 30,
          duration: 0.9,
          ease: 'power3.out',
          scrollTrigger: { trigger: section, start: 'top 80%' },
          onStart: () => {
            drawSvg(section.querySelector('svg'), { duration: 1.4, stagger: 0.06, delay: 0.2 });
          },
        });
      }, section);
      requestRefresh();
    });
    return () => {
      cancel();
      ctx?.revert();
    };
  }, []);

  return (
    <section ref={ref} className="bg-white px-5 py-16 sm:py-20" aria-label="Por que vale a pena">
      <figure className="boleto-card mx-auto flex max-w-4xl flex-col items-center gap-6 rounded-[2rem] border border-brand/15 bg-brand-soft px-7 py-10 text-center sm:flex-row sm:gap-8 sm:px-12 sm:text-left">
        <span className="flex h-24 w-24 shrink-0 items-center justify-center rounded-3xl bg-white text-health shadow-[var(--shadow-soft)]">
          <BoletoIcon className="h-[4.5rem] w-[4.5rem]" />
        </span>
        <blockquote className="font-display text-[clamp(1.4rem,3vw,2.1rem)] leading-snug text-ink">
          Aquele boletinho que você paga com gosto, porque <span className="text-brand">a saúde do seu filho não tem preço.</span>
        </blockquote>
      </figure>
    </section>
  );
};

import React, { useEffect, useRef } from 'react';
import { Droplet, Hospital, Thermometer } from 'lucide-react';
import { drawSvg, gsap, prefersReducedMotion, onIdle, ScrollTrigger } from '../../lib/motion';

const CARDS = [
  {
    Icon: Thermometer,
    anim: 'anim-wobble',
    title: 'Febre alta de madrugada',
    text: 'Pediatras para orientar e atender.',
    bg: 'bg-peach-soft',
    fg: 'text-peach-deep',
  },
  {
    Icon: Droplet,
    anim: 'anim-drip',
    title: 'Alergia inesperada',
    text: 'Atendimento de emergência e exames para identificar a causa.',
    bg: 'bg-babyblue-soft',
    fg: 'text-brand',
  },
  {
    Icon: Hospital,
    anim: 'anim-beat',
    title: 'Um susto que não espera a hora',
    text: 'Pronto-socorro e rede hospitalar preparados para o que vier.',
    bg: 'bg-sage-soft',
    fg: 'text-health',
  },
];

const PATH_H = 'M 0 150 C 130 40, 260 260, 400 150 S 670 40, 800 150 S 1070 260, 1200 150';
const PATH_V = 'M 50 0 C 90 120, 10 220, 50 333 S 90 560, 50 666 S 10 880, 50 1000';

export const Unpredictable: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    const masks = section.querySelectorAll<SVGPathElement>('.route-mask');

    if (prefersReducedMotion()) {
      masks.forEach((m) => (m.style.strokeDashoffset = '0'));
      return;
    }

    let ctx: gsap.Context | undefined;
    const cancelIdle = onIdle(() => {
      ctx = gsap.context(() => {
        gsap.from('.reveal-title', {
          opacity: 0,
          y: 30,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: { trigger: section, start: 'top 75%' },
        });

        // Linha tracejada que se desenha como o caminho do bebê
        gsap.fromTo(
          masks,
          { strokeDashoffset: 1 },
          {
            strokeDashoffset: 0,
            ease: 'none',
            scrollTrigger: { trigger: gridRef.current, start: 'top 85%', end: 'bottom 45%', scrub: 0.6 },
          },
        );

        // Cartões revelados um a um, com os ícones desenhados
        const cards = gsap.utils.toArray<HTMLElement>('.risk-card');
        gsap.set(cards, { opacity: 0, y: 48 });
        cards.forEach((card, i) => {
          const svg = card.querySelector('svg');
          gsap.to(card, {
            opacity: 1,
            y: 0,
            duration: 0.9,
            ease: 'power3.out',
            delay: i * 0.18,
            scrollTrigger: { trigger: gridRef.current, start: 'top 78%' },
            onStart: () => {
              drawSvg(svg, { duration: 1.3, delay: 0.25 });
            },
          });
        });
      }, section);
      ScrollTrigger.refresh();
    });

    return () => {
      cancelIdle();
      ctx?.revert();
    };
  }, []);

  return (
    <section
      id="imprevistos"
      ref={sectionRef}
      className="relative overflow-hidden bg-cream px-5 py-24 sm:py-32"
      aria-labelledby="titulo-imprevistos"
    >
      <div className="mx-auto max-w-6xl">
        <div className="reveal-title mx-auto max-w-2xl text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.16em] text-sage-deep">O que ninguém conta no enxoval</p>
          <h2 id="titulo-imprevistos" className="font-display mt-4 text-[clamp(2rem,4.6vw,3.4rem)] leading-[1.1] text-brand">
            Mas tem coisas que não dá pra prever.
          </h2>
        </div>

        <div ref={gridRef} className="relative mt-16 sm:mt-20">
          {/* Caminho tracejado (horizontal no computador, vertical no celular) */}
          <svg
            className="pointer-events-none absolute inset-x-0 top-1/2 hidden h-48 w-full -translate-y-1/2 md:block"
            viewBox="0 0 1200 300"
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            <defs>
              <mask id="route-h" maskUnits="userSpaceOnUse">
                <path
                  className="route-mask"
                  d={PATH_H}
                  fill="none"
                  stroke="#fff"
                  strokeWidth="60"
                  pathLength={1}
                  style={{ strokeDasharray: 1, strokeDashoffset: 1 }}
                />
              </mask>
            </defs>
            <path
              d={PATH_H}
              fill="none"
              stroke="#1976d2"
              strokeOpacity="0.45"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeDasharray="2 12"
              vectorEffect="non-scaling-stroke"
              mask="url(#route-h)"
            />
          </svg>
          <svg
            className="pointer-events-none absolute inset-y-0 left-1/2 h-full w-24 -translate-x-1/2 md:hidden"
            viewBox="0 0 100 1000"
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            <defs>
              <mask id="route-v" maskUnits="userSpaceOnUse">
                <path
                  className="route-mask"
                  d={PATH_V}
                  fill="none"
                  stroke="#fff"
                  strokeWidth="60"
                  pathLength={1}
                  style={{ strokeDasharray: 1, strokeDashoffset: 1 }}
                />
              </mask>
            </defs>
            <path
              d={PATH_V}
              fill="none"
              stroke="#1976d2"
              strokeOpacity="0.45"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeDasharray="2 12"
              vectorEffect="non-scaling-stroke"
              mask="url(#route-v)"
            />
          </svg>

          <ol className="relative grid gap-10 md:grid-cols-3 md:gap-8" role="list">
            {CARDS.map(({ Icon, anim, title, text, bg, fg }) => (
              <li
                key={title}
                className="risk-card lift rounded-[2rem] border border-ink/5 bg-white/90 p-8 text-center shadow-[var(--shadow-soft)] backdrop-blur-sm sm:p-10"
              >
                <span className={`mx-auto flex h-20 w-20 items-center justify-center rounded-full ${bg} ${fg}`}>
                  <span className={`inline-flex ${anim}`}>
                    <Icon className="h-10 w-10" strokeWidth={1.5} aria-hidden="true" />
                  </span>
                </span>
                <h3 className="font-display mt-6 text-2xl leading-snug text-brand">{title}</h3>
                <p className="mt-3 text-base text-ink-soft">{text}</p>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
};

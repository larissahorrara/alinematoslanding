import React, { useEffect, useRef, useState } from 'react';
import { Ambulance, Baby, FlaskConical, Footprints, Hand, Smile, Stethoscope } from 'lucide-react';
import { drawSvg, gsap, HEADER_HEIGHT, prefersReducedMotion, onIdle, requestRefresh } from '../../lib/motion';

const PILLARS = [
  {
    Icon: Stethoscope,
    anim: 'anim-tilt',
    title: 'Pediatras',
    text: 'Consultas e orientação para acompanhar cada fase do crescimento.',
    tint: 'bg-peach-soft text-peach-deep',
  },
  {
    Icon: Ambulance,
    anim: 'anim-beat',
    title: 'Emergências',
    text: 'Pronto-socorro para quando o susto não espera a hora.',
    tint: 'bg-babyblue-soft text-brand',
  },
  {
    Icon: FlaskConical,
    anim: 'anim-wobble',
    title: 'Exames',
    text: 'Para entender o que está acontecendo e cuidar com segurança.',
    tint: 'bg-sage-soft text-health',
  },
];

const MILESTONES = [
  {
    Icon: Smile,
    age: 'Por volta dos 2 meses',
    title: 'O primeiro sorriso',
    care: 'As consultas de rotina com o pediatra acompanham o peso, o crescimento e cada nova descoberta.',
  },
  {
    Icon: Baby,
    age: 'Por volta dos 6 meses',
    title: 'Sentar sozinho',
    care: 'Chegam as primeiras comidinhas e, com elas, novas dúvidas. Pediatra e exames por perto fazem diferença.',
  },
  {
    Icon: Hand,
    age: 'Por volta dos 8 meses',
    title: 'Engatinhar',
    care: 'Tudo vira aventura, inclusive os tombos. Contar com pronto-socorro traz tranquilidade para a família.',
  },
  {
    Icon: Footprints,
    age: 'Por volta de 1 ano',
    title: 'Os primeiros passos',
    care: 'O primeiro ano passa, e o cuidado continua: consultas, exames e emergência sempre que precisar.',
  },
];

export const NotAlone: React.FC = () => {
  const [reduced] = useState(prefersReducedMotion);
  const sectionRef = useRef<HTMLElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLOListElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (reduced) return;
    const section = sectionRef.current;
    if (!section) return;

    let ctx: gsap.Context | undefined;
    const cancelIdle = onIdle(() => {
      ctx = gsap.context(() => {
        gsap.from('.na-title', {
          opacity: 0,
          y: 30,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: { trigger: section, start: 'top 75%' },
        });

        // Três blocos com animação de entrada
        const pillars = gsap.utils.toArray<HTMLElement>('.pillar');
        gsap.set(pillars, { opacity: 0, y: 40 });
        ScrollTriggerBatch(pillars);

        // Linha do tempo horizontal: rolagem vertical move o conteúdo na horizontal
        const track = trackRef.current!;
        const distance = () => Math.max(0, track.scrollWidth - window.innerWidth + 40);
        const tween = gsap.to(track, {
          x: () => -distance(),
          ease: 'none',
          scrollTrigger: {
            trigger: pinRef.current,
            start: `top ${HEADER_HEIGHT}px`,
            end: () => `+=${distance()}`,
            pin: true,
            scrub: 0.8,
            invalidateOnRefresh: true,
            anticipatePin: 1,
          },
        });
        gsap.fromTo(
          progressRef.current,
          { scaleX: 0 },
          {
            scaleX: 1,
            ease: 'none',
            scrollTrigger: {
              trigger: pinRef.current,
              start: `top ${HEADER_HEIGHT}px`,
              end: () => `+=${distance()}`,
              scrub: 0.8,
              invalidateOnRefresh: true,
            },
          },
        );

        // Cada marco aparece quando entra na tela durante o deslocamento horizontal
        gsap.utils.toArray<HTMLElement>('.milestone').forEach((m) => {
          gsap.from(m.querySelector('.milestone-body'), {
            opacity: 0,
            y: 24,
            duration: 0.8,
            ease: 'power2.out',
            scrollTrigger: { trigger: m, containerAnimation: tween, start: 'left 85%' },
            onStart: () => {
              drawSvg(m.querySelector('svg'), { duration: 1.1 });
            },
          });
        });
      }, section);
      requestRefresh();
    });

    function ScrollTriggerBatch(items: HTMLElement[]) {
      items.forEach((item, i) => {
        gsap.to(item, {
          opacity: 1,
          y: 0,
          duration: 0.9,
          delay: i * 0.15,
          ease: 'power3.out',
          scrollTrigger: { trigger: item.parentElement, start: 'top 80%' },
          onStart: () => {
            drawSvg(item.querySelector('svg'), { duration: 1.2, delay: 0.2 });
          },
        });
      });
    }

    return () => {
      cancelIdle();
      ctx?.revert();
    };
  }, [reduced]);

  return (
    <section
      id="voce-nao-esta-sozinho"
      ref={sectionRef}
      className="relative bg-cream-deep"
      aria-labelledby="titulo-sozinho"
    >
      <div className="mx-auto max-w-6xl px-5 pt-24 sm:pt-32">
        <div className="na-title mx-auto max-w-2xl text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.16em] text-brand">Um cuidado que acompanha</p>
          <h2 id="titulo-sozinho" className="font-display mt-4 text-[clamp(2rem,4.6vw,3.4rem)] leading-[1.1] text-brand">
            Com o Plano de Saúde, você não está sozinho.
          </h2>
        </div>

        <ul className="mt-16 grid gap-6 sm:mt-20 md:grid-cols-3 md:gap-8">
          {PILLARS.map(({ Icon, anim, title, text, tint }) => (
            <li
              key={title}
              className="pillar lift flex flex-col items-center rounded-[2rem] bg-white/90 p-8 text-center shadow-[var(--shadow-soft)] sm:p-10"
            >
              <span className={`flex h-16 w-16 items-center justify-center rounded-2xl ${tint}`}>
                <span className={`inline-flex ${anim}`}>
                  <Icon className="h-8 w-8" strokeWidth={1.5} aria-hidden="true" />
                </span>
              </span>
              <h3 className="font-display mt-5 text-2xl text-brand">{title}</h3>
              <p className="mt-2 text-base text-ink-soft">{text}</p>
            </li>
          ))}
        </ul>
      </div>

      {/* Linha do tempo do primeiro ano */}
      <div ref={pinRef} className={reduced ? 'px-5 py-24' : 'flex min-h-[100svh] flex-col justify-center overflow-hidden py-16'}>
        <div className="mx-auto w-full max-w-6xl px-5">
          <h3 className="font-display text-[clamp(1.6rem,3.2vw,2.4rem)] leading-tight text-brand">
            O primeiro ano, conquista por conquista
          </h3>
          <p className="mt-2 max-w-xl text-base text-ink-soft">
            As idades são aproximadas: cada criança tem o seu tempo. O cuidado é que não pode faltar.
          </p>
          {!reduced && (
            <div className="mt-8 h-1 w-full overflow-hidden rounded-full bg-ink/10" aria-hidden="true">
              <div ref={progressRef} className="h-full origin-left rounded-full bg-peach-deep/70" />
            </div>
          )}
        </div>

        <ol
          ref={trackRef}
          className={
            reduced
              ? 'mx-auto mt-10 grid max-w-6xl gap-6 sm:grid-cols-2 lg:grid-cols-4'
              : 'mt-10 flex w-max gap-6 pl-5 pr-10 sm:gap-8 lg:pl-[max(1.25rem,calc((100vw-72rem)/2+1.25rem))]'
          }
        >
          {MILESTONES.map(({ Icon, age, title, care }, i) => (
            <li
              key={title}
              className={`milestone relative flex shrink-0 flex-col rounded-[2rem] bg-white/95 p-8 shadow-[var(--shadow-soft)] ${
                reduced ? '' : 'w-[min(78vw,380px)]'
              }`}
            >
              <div className="flex items-center gap-4">
                <span className="flex h-14 w-14 items-center justify-center rounded-full bg-peach-soft text-peach-deep">
                  <Icon className="h-7 w-7" strokeWidth={1.5} aria-hidden="true" />
                </span>
                <span
                  className="font-display text-5xl leading-none text-ink/10 before:content-[attr(data-n)]"
                  data-n={`0${i + 1}`}
                  aria-hidden="true"
                />
              </div>
              <div className="milestone-body mt-6">
                <p className="text-sm font-semibold uppercase tracking-[0.12em] text-sage-deep">{age}</p>
                <h4 className="font-display mt-2 text-2xl text-brand">{title}</h4>
                <p className="mt-3 text-base text-ink-soft">{care}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
};

import React, { useEffect, useRef } from 'react';
import { HeartHandshake, MessageCircle } from 'lucide-react';
import { gsap, prefersReducedMotion, onIdle, ScrollTrigger } from '../../lib/motion';
import { CARRIERS } from '../../data/carriers';
import { KIDS_PLAN_URL } from '../../utils/whatsapp';

/** Dados reais já presentes na página: "há mais de 15 anos" e as operadoras parceiras listadas */
const COUNTERS = [
  { value: 15, prefix: 'Mais de ', suffix: ' anos', label: 'revendendo planos de saúde' },
  { value: CARRIERS.length, prefix: '', suffix: '', label: 'operadoras parceiras' },
];

export const AboutAline: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section || prefersReducedMotion()) return;

    let ctx: gsap.Context | undefined;
    const cancelIdle = onIdle(() => {
      ctx = gsap.context(() => {
        gsap.from('.about-photo', {
          opacity: 0,
          y: 40,
          scale: 0.97,
          duration: 1.1,
          ease: 'power3.out',
          scrollTrigger: { trigger: section, start: 'top 70%' },
        });
        gsap.from('.about-text > *', {
          opacity: 0,
          y: 24,
          duration: 0.8,
          ease: 'power3.out',
          stagger: 0.1,
          scrollTrigger: { trigger: '.about-text', start: 'top 80%' },
        });

        // Contadores animados
        gsap.utils.toArray<HTMLElement>('.counter-value').forEach((el) => {
          const target = Number(el.dataset.value || 0);
          const obj = { n: 0 };
          gsap.to(obj, {
            n: target,
            duration: 1.6,
            ease: 'power2.out',
            scrollTrigger: { trigger: el, start: 'top 90%' },
            onUpdate: () => {
              el.textContent = String(Math.round(obj.n));
            },
          });
          el.textContent = '0';
        });
      }, section);
      ScrollTrigger.refresh();
    });

    return () => {
      cancelIdle();
      ctx?.revert();
    };
  }, []);

  const carrierNames = CARRIERS.map((c) => c.name);

  return (
    <section id="aline" ref={sectionRef} className="overflow-hidden bg-cream px-5 py-24 sm:py-32" aria-labelledby="titulo-aline">
      <div className="mx-auto grid max-w-6xl items-center gap-14 lg:grid-cols-12 lg:gap-16">
        {/* Foto */}
        <div className="about-photo relative mx-auto w-full max-w-sm lg:col-span-5 lg:max-w-none">
          <div className="absolute -left-6 -top-6 h-40 w-40 rounded-full bg-peach/70 blur-2xl" aria-hidden="true" />
          <div className="absolute -bottom-8 -right-6 h-48 w-48 rounded-full bg-sage/60 blur-2xl" aria-hidden="true" />
          <div className="relative overflow-hidden rounded-[2.5rem] bg-peach-soft shadow-[var(--shadow-lift)]">
            <img
              src="/aline.jpg"
              alt="Aline Matos, revendedora de planos de saúde há mais de 15 anos"
              width={800}
              height={1000}
              loading="lazy"
              decoding="async"
              className="aspect-[4/5] w-full object-cover object-top"
            />
          </div>
          <div className="relative -mt-10 ml-auto mr-4 max-w-[17rem] rounded-3xl bg-white p-5 shadow-[var(--shadow-lift)]">
            <p className="flex items-center gap-2 text-sm font-semibold text-brand">
              <HeartHandshake className="h-5 w-5" aria-hidden="true" />
              Atendimento personalizado e direto
            </p>
            <p className="mt-1.5 text-sm text-ink-soft">Você fala diretamente com a Aline, sem intermediários ou robôs.</p>
          </div>
        </div>

        {/* Apresentação (texto original da página) */}
        <div className="about-text space-y-6 lg:col-span-7">
          <p className="text-sm font-semibold uppercase tracking-[0.16em] text-sage-deep">Quem vai cuidar da sua escolha</p>
          <h2 id="titulo-aline" className="font-display text-[clamp(2rem,4.4vw,3.2rem)] leading-[1.1] text-brand">
            Aline Matos
            <span className="mt-2 block text-[clamp(1.1rem,2vw,1.4rem)] font-normal text-ink-soft">
              Revendedora de planos de saúde há mais de 15 anos
            </span>
          </h2>
          <div className="space-y-4 text-[1.05rem] leading-relaxed text-ink-soft">
            <p>
              Olá! Sou <strong className="font-semibold text-ink">Aline Matos</strong>, revendedora de planos de saúde há mais de
              15 anos. Ao longo dessa trajetória sólida, já trabalhei e ainda trabalho nas maiores e mais conceituadas corretoras
              de planos de saúde de Belo Horizonte.
            </p>
            <p>
              Essa bagagem profissional nas maiores corretoras da capital mineira me confere um diferencial que poucos
              profissionais possuem:{' '}
              <strong className="font-semibold text-ink">conhecimento profundo dos bastidores do mercado</strong>, canal direto
              com as mesas de operações das seguradoras e domínio completo sobre como aprovar contratos com as melhores tarifas e
              coberturas possíveis.
            </p>
            <p>
              Seja para quem precisa revisar a mensalidade de um plano que ficou pesado, para empresários e MEIs que desejam obter
              condições diferenciadas na folha com responsabilidade, ou para famílias que precisam de segurança hospitalar sem ter
              que cumprir carência novamente, eu analiso cada caso de forma técnica e individualizada.
            </p>
          </div>

          <dl className="grid grid-cols-2 gap-4 pt-2">
            {COUNTERS.map((c) => (
              <div key={c.label} className="rounded-3xl bg-white/90 p-5 shadow-[var(--shadow-soft)]">
                <dt className="sr-only">{c.label}</dt>
                <dd className="m-0">
                  <span className="font-display block text-[clamp(1.6rem,3.4vw,2.4rem)] leading-none text-ink">
                    {c.prefix}
                    <span className="counter-value" data-value={c.value}>
                      {c.value}
                    </span>
                    {c.suffix}
                  </span>
                  <span className="mt-2 block text-sm text-ink-soft" aria-hidden="true">
                    {c.label}
                  </span>
                </dd>
              </div>
            ))}
          </dl>

          <a href={KIDS_PLAN_URL} target="_blank" rel="noopener noreferrer" className="btn-primary">
            <MessageCircle className="h-5 w-5" aria-hidden="true" />
            Quero contratar
          </a>
        </div>
      </div>

      {/* Operadoras representadas */}
      <div className="mx-auto mt-20 max-w-6xl sm:mt-24">
        <h3 className="text-center text-sm font-semibold uppercase tracking-[0.16em] text-ink-soft">
          Operadoras com que a Aline trabalha
        </h3>
        <div className="marquee mt-6 overflow-hidden py-2">
          <ul className="marquee-track" aria-label="Operadoras parceiras">
            {[...carrierNames, ...carrierNames].map((name, i) => (
              <li
                key={`${name}-${i}`}
                className={`font-display mr-4 shrink-0 whitespace-nowrap rounded-full border border-ink/10 bg-white/80 px-6 py-3 text-lg text-ink ${
                  i >= carrierNames.length ? 'marquee-dup' : ''
                }`}
                aria-hidden={i >= carrierNames.length ? true : undefined}
              >
                {name}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};

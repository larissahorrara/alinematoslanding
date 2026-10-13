import React, { useEffect, useId, useRef, useState } from 'react';
import { BadgeCheck, CheckCircle2, MessageCircle } from 'lucide-react';
import { gsap, prefersReducedMotion, onIdle, requestRefresh, scrollToTarget } from '../../lib/motion';
import { loadHeroMedia } from '../../lib/media';
import { PLAN_TYPES } from '../../data/plans';
import { trackLead } from '../../lib/analytics';
import { KIDS_PLAN_MESSAGE, KIDS_PLAN_URL, WHATSAPP_RAW_NUMBER, withOrigin } from '../../utils/whatsapp';
import { openPrivacyPolicy } from './PrivacyDialog';

const formatPhone = (value: string) => {
  const d = value.replace(/\D/g, '').slice(0, 11);
  if (d.length <= 2) return d.length ? `(${d}` : '';
  if (d.length <= 6) return `(${d.slice(0, 2)}) ${d.slice(2)}`;
  if (d.length <= 10) return `(${d.slice(0, 2)}) ${d.slice(2, 6)}-${d.slice(6)}`;
  return `(${d.slice(0, 2)}) ${d.slice(2, 7)}-${d.slice(7)}`;
};

const waUrl = (message: string) => `https://wa.me/${WHATSAPP_RAW_NUMBER}?text=${encodeURIComponent(withOrigin(message))}`;

/** Campos: fundo branco, borda cinza clara e borda azul quando ativos */
const inputClass =
  'mt-1.5 block min-h-12 w-full rounded-xl border border-[#cfd8dc] bg-white px-4 py-3 text-base text-ink placeholder:text-ink-soft/80 transition focus:border-brand focus:outline-none focus:ring-4 focus:ring-brand/15';

/**
 * Chamada final + cards de planos + formulário lateral de cotação rápida.
 */
export const FinalCTA: React.FC<{ id?: string }> = ({ id = 'cotacao' }) => {
  const sectionRef = useRef<HTMLElement>(null);
  const [poster, setPoster] = useState<string | null>(null);
  const [form, setForm] = useState({ name: '', phone: '', childAge: '', city: '', people: '', consent: false });
  const [sentUrl, setSentUrl] = useState<string | null>(null);
  const uid = useId();

  useEffect(() => {
    loadHeroMedia().then((m) => setPoster(m.poster));
  }, []);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section || prefersReducedMotion()) return;
    let ctx: gsap.Context | undefined;
    const cancelIdle = onIdle(() => {
      ctx = gsap.context(() => {
        gsap.from('.cta-reveal', {
          opacity: 0,
          y: 30,
          duration: 1,
          ease: 'power3.out',
          stagger: 0.12,
          scrollTrigger: { trigger: section, start: 'top 75%' },
        });
        gsap.from('.plan-card', {
          opacity: 0,
          y: 36,
          duration: 0.8,
          ease: 'power3.out',
          stagger: 0.12,
          scrollTrigger: { trigger: '.plan-grid', start: 'top 80%' },
        });
      }, section);
      requestRefresh();
    });
    return () => {
      cancelIdle();
      ctx?.revert();
    };
  }, []);

  const update = (field: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const target = e.target as HTMLInputElement;
    const value = field === 'consent' ? target.checked : field === 'phone' ? formatPhone(target.value) : target.value;
    setForm((f) => ({ ...f, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const url = waUrl(
      [
        KIDS_PLAN_MESSAGE,
        '',
        `*Nome:* ${form.name}`,
        `*WhatsApp:* ${form.phone}`,
        `*Idade da criança:* ${form.childAge}`,
        `*Cidade:* ${form.city}`,
        `*Pessoas no plano:* ${form.people}`,
      ].join('\n'),
    );
    // Sem "noopener" nas opções: com ele o navegador sempre devolve null e não daria para detectar bloqueio de pop-up
    const win = window.open(url, '_blank');
    if (win) win.opener = null;
    else window.location.href = url;
    trackLead('formulario', 'Cotação rápida');
    setSentUrl(url);
  };

  const f = (name: string) => `${uid}-${name}`;

  return (
    <section id={id} ref={sectionRef} aria-labelledby={`${uid}-titulo`}>
      {/* Faixa azul com a chamada final (quadro do sorriso ao fundo, quando enviado) */}
      <div className="relative isolate overflow-hidden px-5 py-20 text-center sm:py-24">
        <div className="absolute inset-0 -z-10" aria-hidden="true">
          {poster && <img src={poster} alt="" className="h-full w-full object-cover" loading="lazy" decoding="async" />}
          <div
            className={`absolute inset-0 ${
              poster ? 'bg-[#0d47a1]/75' : 'bg-[linear-gradient(160deg,#1565c0_0%,#1976d2_60%,#1e88e5_100%)]'
            }`}
          />
        </div>
        <h2 id={`${uid}-titulo`} className="cta-reveal font-display mx-auto max-w-3xl text-[clamp(2.1rem,4.8vw,3.6rem)] leading-[1.08] text-white">
          Proteja o futuro que está só começando.
          <span className="mt-3 block text-[#FFCC80]">Contrate hoje e durma tranquilo amanhã.</span>
        </h2>
        <p className="cta-reveal mx-auto mt-6 max-w-xl text-lg text-white/90">
          Escolha a modalidade e peça sua cotação: a conversa já começa no WhatsApp da Aline, com tudo o que ela precisa para indicar o
          plano certo para a sua família.
        </p>
        <div className="cta-reveal mt-8">
          <a
            href="#cotacao-rapida"
            onClick={(e) => {
              e.preventDefault();
              scrollToTarget('#cotacao-rapida');
            }}
            className="btn-primary pulse"
          >
            <MessageCircle className="h-5 w-5" aria-hidden="true" />
            Quero minha cotação grátis
          </a>
        </div>
      </div>

      {/* Planos + formulário lateral */}
      <div id="planos" className="bg-white px-5 py-20 sm:py-24">
        <div className="mx-auto max-w-6xl">
          <div className="max-w-2xl">
            <p className="text-sm font-semibold uppercase tracking-[0.16em] text-sage-deep">Modalidades sob medida</p>
            <h3 className="font-display mt-3 text-[clamp(1.8rem,3.6vw,2.6rem)] leading-tight text-brand">
              Encontre o plano certo para a sua família
            </h3>
            <p className="mt-3 text-base text-ink-soft">
              Com mais de 15 anos no setor, Aline Matos sabe exatamente qual enquadramento traz o maior custo-benefício para você.
            </p>
          </div>

          <div className="mt-12 grid items-start gap-8 lg:grid-cols-12">
            {/* Cards de planos */}
            <ul className="plan-grid grid gap-6 sm:grid-cols-2 lg:col-span-8">
              {PLAN_TYPES.map((plan) => (
                <li
                  key={plan.id}
                  className={`plan-card lift relative flex flex-col overflow-hidden rounded-3xl bg-cream-deep p-7 ${
                    plan.featured ? 'border-2 border-health shadow-[var(--shadow-lift)] sm:col-span-2' : 'border border-line'
                  }`}
                >
                  {plan.featured && (
                    <>
                      <span className="absolute inset-x-0 top-0 h-1.5 bg-health" aria-hidden="true" />
                      <span className="mb-4 inline-flex w-fit items-center gap-1.5 rounded-full bg-health px-3 py-1 text-xs font-bold uppercase tracking-wider text-white">
                        <BadgeCheck className="h-4 w-4" aria-hidden="true" />
                        Recomendado
                      </span>
                    </>
                  )}
                  <h4 className="font-display text-2xl leading-snug text-brand">{plan.title}</h4>
                  <p className="mt-1 text-sm font-medium text-ink-soft">{plan.subtitle}</p>
                  <p className="mt-4 text-[0.97rem] text-ink">{plan.description}</p>
                  <ul className={`mt-5 space-y-2.5 text-[0.95rem] text-ink ${plan.featured ? 'sm:grid sm:grid-cols-2 sm:gap-x-6 sm:space-y-0 sm:gap-y-2.5' : ''}`}>
                    {plan.benefits.map((b) => (
                      <li key={b} className="flex items-start gap-2.5">
                        <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-health" aria-hidden="true" />
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="mt-auto pt-7">
                    <a
                      href={plan.message ? waUrl(plan.message) : KIDS_PLAN_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={
                        plan.featured
                          ? 'btn-primary w-full sm:w-auto'
                          : 'inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-full bg-brand px-5 py-3 text-[0.95rem] font-semibold text-white transition-colors hover:bg-brand-hover'
                      }
                    >
                      <MessageCircle className="h-5 w-5" aria-hidden="true" />
                      {plan.ctaText}
                    </a>
                  </div>
                </li>
              ))}
            </ul>

            {/* Formulário lateral de cotação rápida */}
            <aside
              id="cotacao-rapida"
              className="rounded-3xl border border-brand bg-cream-deep p-6 sm:p-8 lg:sticky lg:top-24 lg:col-span-4"
              aria-labelledby={f('form-titulo')}
            >
              {sentUrl ? (
                <div className="py-6 text-center" role="status">
                  <p className="font-display text-2xl text-brand">Tudo certo!</p>
                  <p className="mt-2 text-ink-soft">
                    Abrimos o WhatsApp da Aline com os seus dados. Se ele não abriu, toque no botão abaixo.
                  </p>
                  <a href={sentUrl} target="_blank" rel="noopener noreferrer" className="btn-primary mt-6 w-full">
                    <MessageCircle className="h-5 w-5" aria-hidden="true" />
                    Abrir o WhatsApp
                  </a>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="grid gap-4">
                  <div>
                    <h3 id={f('form-titulo')} className="font-display text-2xl text-brand">
                      Cotação rápida
                    </h3>
                    <p className="mt-1 text-sm text-ink-soft">Leva menos de um minuto.</p>
                  </div>
                  <div>
                    <label htmlFor={f('nome')} className="text-sm font-semibold text-ink">
                      Nome
                    </label>
                    <input id={f('nome')} className={inputClass} required autoComplete="name" value={form.name} onChange={update('name')} />
                  </div>
                  <div>
                    <label htmlFor={f('tel')} className="text-sm font-semibold text-ink">
                      Telefone (WhatsApp)
                    </label>
                    <input
                      id={f('tel')}
                      className={inputClass}
                      type="tel"
                      inputMode="tel"
                      required
                      autoComplete="tel-national"
                      placeholder="(31) 99999-9999"
                      pattern="\(\d{2}\) \d{4,5}-\d{4}"
                      title="Informe o DDD e o número, por exemplo (31) 99999-9999"
                      value={form.phone}
                      onChange={update('phone')}
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label htmlFor={f('idade')} className="text-sm font-semibold text-ink">
                        Idade da criança
                      </label>
                      <input
                        id={f('idade')}
                        className={inputClass}
                        required
                        placeholder="Ex.: 8 meses"
                        value={form.childAge}
                        onChange={update('childAge')}
                      />
                    </div>
                    <div>
                      <label htmlFor={f('pessoas')} className="text-sm font-semibold text-ink">
                        Pessoas no plano
                      </label>
                      <select id={f('pessoas')} className={inputClass} required value={form.people} onChange={update('people')}>
                        <option value="" disabled>
                          Selecione
                        </option>
                        <option>1 pessoa</option>
                        <option>2 pessoas</option>
                        <option>3 pessoas</option>
                        <option>4 pessoas</option>
                        <option>5 pessoas ou mais</option>
                      </select>
                    </div>
                  </div>
                  <div>
                    <label htmlFor={f('cidade')} className="text-sm font-semibold text-ink">
                      Cidade
                    </label>
                    <input
                      id={f('cidade')}
                      className={inputClass}
                      required
                      autoComplete="address-level2"
                      value={form.city}
                      onChange={update('city')}
                    />
                  </div>
                  <label className="flex items-start gap-3 text-sm text-ink-soft">
                    <input
                      type="checkbox"
                      required
                      checked={form.consent}
                      onChange={update('consent')}
                      className="mt-0.5 h-5 w-5 shrink-0 accent-[#1976d2]"
                    />
                    <span>
                      Autorizo o uso destes dados para receber a cotação pelo WhatsApp, conforme a LGPD e a{' '}
                      <button
                        type="button"
                        onClick={openPrivacyPolicy}
                        className="font-semibold text-brand-hover underline underline-offset-2 hover:text-brand-dark"
                      >
                        política de privacidade
                      </button>
                      .
                    </span>
                  </label>
                  <button type="submit" className="btn-primary mt-1 w-full">
                    <MessageCircle className="h-5 w-5" aria-hidden="true" />
                    Quero minha cotação grátis
                  </button>
                </form>
              )}
            </aside>
          </div>

          <p className="mt-10 text-sm text-ink-soft">
            Coberturas, carências e valores dependem da operadora e do plano escolhido.
          </p>
        </div>
      </div>
    </section>
  );
};

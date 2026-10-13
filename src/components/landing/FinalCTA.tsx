import React, { useEffect, useId, useRef, useState } from 'react';
import { MessageCircle } from 'lucide-react';
import { gsap, prefersReducedMotion, onIdle, ScrollTrigger } from '../../lib/motion';
import { loadHeroMedia } from '../../lib/media';
import { KIDS_PLAN_MESSAGE, WHATSAPP_RAW_NUMBER } from '../../utils/whatsapp';
import { openPrivacyPolicy } from './PrivacyDialog';

const formatPhone = (value: string) => {
  const d = value.replace(/\D/g, '').slice(0, 11);
  if (d.length <= 2) return d.length ? `(${d}` : '';
  if (d.length <= 6) return `(${d.slice(0, 2)}) ${d.slice(2)}`;
  if (d.length <= 10) return `(${d.slice(0, 2)}) ${d.slice(2, 6)}-${d.slice(6)}`;
  return `(${d.slice(0, 2)}) ${d.slice(2, 7)}-${d.slice(7)}`;
};

const inputClass =
  'mt-1.5 block min-h-12 w-full rounded-2xl border border-ink/15 bg-white px-4 py-3 text-base text-ink placeholder:text-ink-soft/70 transition focus:border-brand focus:outline-none focus:ring-4 focus:ring-brand/15';

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
          scrollTrigger: { trigger: section, start: 'top 70%' },
        });
      }, section);
      ScrollTrigger.refresh();
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
    const message = [
      KIDS_PLAN_MESSAGE,
      '',
      `*Nome:* ${form.name}`,
      `*WhatsApp:* ${form.phone}`,
      `*Idade da criança:* ${form.childAge}`,
      `*Cidade:* ${form.city}`,
      `*Pessoas no plano:* ${form.people}`,
    ].join('\n');
    const url = `https://wa.me/${WHATSAPP_RAW_NUMBER}?text=${encodeURIComponent(message)}`;
    // Sem "noopener" nas opções: com ele o navegador sempre devolve null e não daria para detectar bloqueio de pop-up
    const win = window.open(url, '_blank');
    if (win) win.opener = null;
    else window.location.href = url;
    setSentUrl(url);
  };

  const f = (name: string) => `${uid}-${name}`;

  return (
    <section
      id={id}
      ref={sectionRef}
      className="relative isolate overflow-hidden px-5 py-24 sm:py-32"
      aria-labelledby={`${uid}-titulo`}
    >
      {/* Fundo: quadro do sorriso (quando enviado) com sobreposição clara */}
      <div className="absolute inset-0 -z-10" aria-hidden="true">
        {poster ? (
          <img src={poster} alt="" className="h-full w-full object-cover" loading="lazy" decoding="async" />
        ) : (
          <div className="h-full w-full bg-[radial-gradient(60%_60%_at_20%_20%,#F6D5C3_0%,transparent_70%),radial-gradient(55%_55%_at_85%_30%,#CFE3F0_0%,transparent_70%),radial-gradient(70%_60%_at_50%_100%,#B8CBB8_0%,transparent_70%)]" />
        )}
        <div className="absolute inset-0 bg-cream/80" />
      </div>

      <div className="mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-2 lg:gap-16">
        <div className="text-center lg:text-left">
          <h2 id={`${uid}-titulo`} className="cta-reveal font-display text-[clamp(2.1rem,4.8vw,3.6rem)] leading-[1.08] text-ink">
            Proteja o futuro que está só começando.
            <span className="mt-3 block text-peach-deep">Contrate hoje e durma tranquilo amanhã.</span>
          </h2>
          <p className="cta-reveal mx-auto mt-6 max-w-md text-lg text-ink-soft lg:mx-0">
            Preencha os dados e a conversa já começa no WhatsApp da Aline, com tudo o que ela precisa para indicar o plano certo
            para a sua família.
          </p>
        </div>

        <div className="cta-reveal rounded-[2rem] bg-white/95 p-6 shadow-[var(--shadow-lift)] sm:p-9">
          {sentUrl ? (
            <div className="py-6 text-center" role="status">
              <p className="font-display text-2xl text-ink">Tudo certo!</p>
              <p className="mt-2 text-ink-soft">
                Abrimos o WhatsApp da Aline com os seus dados. Se ele não abriu, toque no botão abaixo.
              </p>
              <a href={sentUrl} target="_blank" rel="noopener noreferrer" className="btn-primary mt-6">
                <MessageCircle className="h-5 w-5" aria-hidden="true" />
                Abrir o WhatsApp
              </a>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="grid gap-4 sm:grid-cols-2">
              <h3 className="font-display text-2xl text-ink sm:col-span-2">Peça sua cotação</h3>
              <div className="sm:col-span-2">
                <label htmlFor={f('nome')} className="text-sm font-medium text-ink">
                  Nome
                </label>
                <input
                  id={f('nome')}
                  className={inputClass}
                  required
                  autoComplete="name"
                  value={form.name}
                  onChange={update('name')}
                />
              </div>
              <div className="sm:col-span-2">
                <label htmlFor={f('tel')} className="text-sm font-medium text-ink">
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
              <div>
                <label htmlFor={f('idade')} className="text-sm font-medium text-ink">
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
                <label htmlFor={f('pessoas')} className="text-sm font-medium text-ink">
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
              <div className="sm:col-span-2">
                <label htmlFor={f('cidade')} className="text-sm font-medium text-ink">
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
              <label className="flex items-start gap-3 text-sm text-ink-soft sm:col-span-2">
                <input
                  type="checkbox"
                  required
                  checked={form.consent}
                  onChange={update('consent')}
                  className="mt-0.5 h-5 w-5 shrink-0 accent-[#047857]"
                />
                <span>
                  Autorizo o uso destes dados para receber a cotação pelo WhatsApp, conforme a LGPD e a{' '}
                  <button
                    type="button"
                    onClick={openPrivacyPolicy}
                    className="font-medium text-brand underline underline-offset-2 hover:text-brand-hover"
                  >
                    política de privacidade
                  </button>
                  .
                </span>
              </label>
              <button type="submit" className="btn-primary mt-2 w-full sm:col-span-2">
                <MessageCircle className="h-5 w-5" aria-hidden="true" />
                Quero contratar
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
};

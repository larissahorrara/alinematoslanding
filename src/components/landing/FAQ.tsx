import React from 'react';
import { ChevronDown } from 'lucide-react';
import { FAQ_ITEMS } from '../../data/faq';

/** Perguntas frequentes em acordeão (funciona sem JavaScript e com teclado) */
export const FAQ: React.FC = () => (
  <section id="perguntas" className="bg-white px-5 py-20 sm:py-24" aria-labelledby="titulo-perguntas">
    <div className="mx-auto max-w-3xl">
      <p className="text-sm font-semibold uppercase tracking-[0.16em] text-sage-deep">Dúvidas frequentes</p>
      <h2 id="titulo-perguntas" className="font-display mt-3 text-[clamp(1.8rem,3.6vw,2.6rem)] leading-tight text-brand">
        Antes de contratar, você pode estar se perguntando
      </h2>

      <div className="mt-10 divide-y divide-line rounded-3xl border border-line bg-cream-deep">
        {FAQ_ITEMS.map((item) => (
          <details key={item.id} className="group px-6 py-1 sm:px-8">
            <summary className="flex min-h-16 cursor-pointer list-none items-center justify-between gap-4 py-4 text-left text-[1.05rem] font-semibold text-ink marker:hidden [&::-webkit-details-marker]:hidden">
              <span>{item.question}</span>
              <ChevronDown
                className="h-5 w-5 shrink-0 text-brand transition-transform duration-300 group-open:rotate-180"
                aria-hidden="true"
              />
            </summary>
            <p className="pb-6 text-[0.98rem] leading-relaxed text-ink-soft">{item.answer}</p>
          </details>
        ))}
      </div>
    </div>
  </section>
);

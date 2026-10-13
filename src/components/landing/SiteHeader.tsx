import React, { useState } from 'react';
import { Menu, MessageCircle, X } from 'lucide-react';
import { scrollToTarget } from '../../lib/motion';
import { KIDS_PLAN_URL } from '../../utils/whatsapp';

const LINKS = [
  { href: '#inicio', label: 'Início' },
  { href: '#planos', label: 'Planos' },
  { href: '#aline', label: 'Quem sou' },
  { href: '#depoimentos', label: 'Depoimentos' },
  { href: '#cotacao', label: 'Contato' },
];

interface SiteHeaderProps {
  /** Na página inicial os links rolam até as seções; nas páginas de guia, voltam ao início */
  onHome: boolean;
}

/** Cabeçalho limpo: fundo branco, links em azul (verde ao passar o mouse) e botão laranja de conversão */
export const SiteHeader: React.FC<SiteHeaderProps> = ({ onHome }) => {
  const [open, setOpen] = useState(false);

  const handleClick = (href: string) => (e: React.MouseEvent<HTMLAnchorElement>) => {
    setOpen(false);
    if (!onHome) return; // o link #inicio leva de volta à página inicial
    e.preventDefault();
    scrollToTarget(href);
  };

  return (
    <header className="sticky top-0 z-40 h-16 border-b border-line bg-white">
      <div className="mx-auto flex h-full max-w-6xl items-center justify-between gap-2 px-4 sm:gap-4 sm:px-5">
        <a href="#inicio" onClick={handleClick('#inicio')} className="flex min-h-11 flex-col justify-center" aria-label="Aline Matos, planos de saúde — início">
          <span className="font-logo whitespace-nowrap text-[1.6rem] leading-none text-brand min-[380px]:text-[1.85rem] sm:text-[2.1rem]">Aline Matos</span>
          <span className="mt-0.5 hidden whitespace-nowrap pl-1 text-[0.62rem] font-semibold uppercase tracking-[0.22em] text-ink-soft sm:block">
            Planos de saúde
          </span>
        </a>

        <nav aria-label="Principal" className="hidden lg:block">
          <ul className="flex items-center gap-1">
            {LINKS.map((l) => (
              <li key={l.href}>
                <a
                  href={onHome ? l.href : '#inicio'}
                  onClick={handleClick(l.href)}
                  className="inline-flex min-h-11 items-center rounded-full px-4 text-[0.95rem] font-semibold text-brand transition-colors hover:text-health"
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <a
            href={KIDS_PLAN_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary !min-h-11 shrink-0 whitespace-nowrap !px-3.5 !py-2 text-sm min-[380px]:!px-4 sm:!px-5"
          >
            <MessageCircle className="hidden h-5 w-5 max-[359px]:block sm:block sm:h-4 sm:w-4" aria-hidden="true" />
            <span className="hidden xl:inline">Quero minha cotação grátis</span>
            <span className="max-[359px]:sr-only xl:hidden">Cotação grátis</span>
          </a>
          <button
            type="button"
            onClick={() => setOpen((o) => !o)}
            className="inline-flex h-11 w-11 items-center justify-center rounded-full text-brand hover:bg-brand-soft lg:hidden"
            aria-label={open ? 'Fechar menu' : 'Abrir menu'}
            aria-expanded={open}
            aria-controls="menu-celular"
          >
            {open ? <X className="h-5 w-5" aria-hidden="true" /> : <Menu className="h-5 w-5" aria-hidden="true" />}
          </button>
        </div>
      </div>

      {open && (
        <nav id="menu-celular" aria-label="Principal" className="border-b border-line bg-white px-5 pb-4 shadow-[var(--shadow-soft)] lg:hidden">
          <ul>
            {LINKS.map((l) => (
              <li key={l.href}>
                <a
                  href={onHome ? l.href : '#inicio'}
                  onClick={handleClick(l.href)}
                  className="flex min-h-12 items-center border-b border-line/70 text-base font-semibold text-brand"
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </header>
  );
};

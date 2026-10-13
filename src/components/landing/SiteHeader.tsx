import React, { useState } from 'react';
import { Menu, MessageCircle, ShieldCheck, X } from 'lucide-react';
import { scrollToTarget } from '../../lib/motion';
import { KIDS_PLAN_URL } from '../../utils/whatsapp';

const LINKS = [
  { href: '#inicio', label: 'Início' },
  { href: '#planos', label: 'Planos' },
  { href: '#aline', label: 'Quem sou' },
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
      <div className="mx-auto flex h-full max-w-6xl items-center justify-between gap-4 px-5">
        <a href="#inicio" onClick={handleClick('#inicio')} className="flex min-h-11 items-center gap-2.5">
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-brand text-white">
            <ShieldCheck className="h-5 w-5" aria-hidden="true" />
          </span>
          <span className="leading-none">
            <span className="font-display block text-lg text-brand">Aline Matos</span>
            <span className="mt-1 hidden whitespace-nowrap text-[0.68rem] font-medium uppercase tracking-[0.12em] text-ink-soft sm:block">
              Planos de saúde
            </span>
          </span>
        </a>

        <nav aria-label="Principal" className="hidden md:block">
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
            className="btn-primary !min-h-11 !px-5 !py-2 text-sm"
          >
            <MessageCircle className="h-4 w-4" aria-hidden="true" />
            <span className="hidden sm:inline">Quero contratar</span>
            <span className="sm:hidden">Contratar</span>
          </a>
          <button
            type="button"
            onClick={() => setOpen((o) => !o)}
            className="inline-flex h-11 w-11 items-center justify-center rounded-full text-brand hover:bg-brand-soft md:hidden"
            aria-label={open ? 'Fechar menu' : 'Abrir menu'}
            aria-expanded={open}
            aria-controls="menu-celular"
          >
            {open ? <X className="h-5 w-5" aria-hidden="true" /> : <Menu className="h-5 w-5" aria-hidden="true" />}
          </button>
        </div>
      </div>

      {open && (
        <nav id="menu-celular" aria-label="Principal" className="border-b border-line bg-white px-5 pb-4 md:hidden">
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

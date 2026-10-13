import React, { useEffect, useRef, useState } from 'react';
import { MessageCircle } from 'lucide-react';
import { prefersReducedMotion } from '../../lib/motion';
import { KIDS_PLAN_URL } from '../../utils/whatsapp';

interface WhatsAppFabProps {
  /** Libera o botão (na página inicial: depois do fim do vídeo) */
  ready: boolean;
}

export const WhatsAppFab: React.FC<WhatsAppFabProps> = ({ ready }) => {
  const [scrolledPast, setScrolledPast] = useState(false);
  const ref = useRef<HTMLAnchorElement>(null);
  const visible = ready || scrolledPast;

  // Também aparece se a pessoa rolar a página antes do fim do vídeo
  useEffect(() => {
    const onScroll = () => setScrolledPast(window.scrollY > window.innerHeight * 0.9);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Microanimação discreta a cada 10 segundos
  useEffect(() => {
    if (!visible || prefersReducedMotion()) return;
    const id = window.setInterval(() => {
      const el = ref.current;
      if (!el) return;
      el.classList.remove('fab-nudge');
      void el.offsetWidth;
      el.classList.add('fab-nudge');
    }, 10000);
    return () => window.clearInterval(id);
  }, [visible]);

  return (
    <a
      ref={ref}
      href={KIDS_PLAN_URL}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Falar com a Aline no WhatsApp"
      aria-hidden={!visible}
      tabIndex={visible ? 0 : -1}
      className={`group fixed bottom-5 right-5 z-50 inline-flex h-16 items-center gap-3 rounded-full bg-brand pl-4 pr-4 text-white shadow-[0_14px_34px_-12px_rgb(4_120_87/0.7)] transition-all duration-500 hover:bg-brand-hover sm:bottom-7 sm:right-7 sm:pr-6 ${
        visible ? 'translate-y-0 opacity-100' : 'pointer-events-none translate-y-6 opacity-0'
      }`}
    >
      <span className="relative inline-flex h-8 w-8 items-center justify-center">
        <MessageCircle className="h-7 w-7" aria-hidden="true" />
      </span>
      <span className="hidden text-[0.95rem] font-semibold sm:inline">Fale com a Aline</span>
    </a>
  );
};

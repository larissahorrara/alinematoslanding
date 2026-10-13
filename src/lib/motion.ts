import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';

gsap.registerPlugin(ScrollTrigger);

export { gsap, ScrollTrigger };

export const prefersReducedMotion = (): boolean =>
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

let lenis: Lenis | null = null;

/** Rolagem suave (Lenis) sincronizada com o ScrollTrigger. Desligada com movimento reduzido. */
export function startSmoothScroll(): () => void {
  if (prefersReducedMotion() || lenis) return () => undefined;

  lenis = new Lenis({ autoRaf: false, lerp: 0.1, smoothWheel: true });
  lenis.on('scroll', ScrollTrigger.update);

  const tick = (time: number) => lenis?.raf(time * 1000);
  gsap.ticker.add(tick);
  gsap.ticker.lagSmoothing(0);

  return () => {
    gsap.ticker.remove(tick);
    lenis?.destroy();
    lenis = null;
  };
}

/** Rola até um elemento usando o Lenis quando disponível. */
export function scrollToTarget(target: string | HTMLElement) {
  const el = typeof target === 'string' ? document.querySelector<HTMLElement>(target) : target;
  if (!el) return;
  if (lenis) {
    lenis.scrollTo(el, { offset: 0, duration: 1.4 });
  } else {
    el.scrollIntoView({ behavior: prefersReducedMotion() ? 'auto' : 'smooth' });
  }
}

/**
 * Desenha os traços de um SVG (efeito "caneta"), calculando o comprimento de cada caminho.
 * Retorna a animação para que possa ser controlada por quem chamou.
 */
export function drawSvg(svg: SVGElement | null, vars: gsap.TweenVars = {}) {
  if (!svg) return null;
  const shapes = Array.from(
    svg.querySelectorAll<SVGGeometryElement>('path, line, polyline, polygon, circle, rect, ellipse'),
  );
  shapes.forEach((shape) => {
    const length = typeof shape.getTotalLength === 'function' ? shape.getTotalLength() : 100;
    shape.style.strokeDasharray = `${length}`;
    shape.style.strokeDashoffset = `${length}`;
  });
  return gsap.to(shapes, {
    strokeDashoffset: 0,
    duration: 1.2,
    ease: 'power2.out',
    stagger: 0.08,
    ...vars,
  });
}

/**
 * Executa a configuração das animações de rolagem quando o navegador estiver ocioso,
 * tirando esse trabalho do carregamento inicial da página.
 */
export function onIdle(cb: () => void, timeout = 1500): () => void {
  const w = window as Window & {
    requestIdleCallback?: (fn: () => void, opts?: { timeout: number }) => number;
    cancelIdleCallback?: (id: number) => void;
  };
  if (w.requestIdleCallback) {
    const id = w.requestIdleCallback(cb, { timeout });
    return () => w.cancelIdleCallback?.(id);
  }
  const id = window.setTimeout(cb, 300);
  return () => window.clearTimeout(id);
}

/**
 * Medição de visitas e conversões (Google Analytics 4 e Pixel da Meta).
 *
 * PARA ATIVAR: preencha os códigos abaixo com os da sua conta e publique.
 *   - GA4: Administrador > Fluxos de dados > ID da métrica (formato G-XXXXXXXXXX)
 *   - Pixel da Meta: Gerenciador de Eventos > Fontes de dados > ID do pixel (só números)
 *
 * Enquanto os dois estiverem vazios, nada é carregado e o aviso de cookies não aparece.
 * Com algum código preenchido, os scripts só carregam depois que a pessoa aceita os cookies (LGPD).
 */
export const GA4_ID = '';
export const META_PIXEL_ID = '';

export const ANALYTICS_ENABLED = Boolean(GA4_ID || META_PIXEL_ID);

const CONSENT_KEY = 'consentimento-cookies';
export type Consent = 'aceito' | 'recusado';

export function readConsent(): Consent | null {
  try {
    const v = localStorage.getItem(CONSENT_KEY);
    return v === 'aceito' || v === 'recusado' ? v : null;
  } catch {
    return null;
  }
}

export function saveConsent(value: Consent) {
  try {
    localStorage.setItem(CONSENT_KEY, value);
  } catch {
    /* navegação privada: a escolha vale só para esta visita */
  }
}

type Gtag = (...args: unknown[]) => void;
type Fbq = ((...args: unknown[]) => void) & { callMethod?: unknown; queue?: unknown[]; loaded?: boolean; version?: string; push?: unknown };
declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: Gtag;
    fbq?: Fbq;
    _fbq?: Fbq;
  }
}

let loaded = false;

function addScript(src: string) {
  const s = document.createElement('script');
  s.async = true;
  s.src = src;
  document.head.appendChild(s);
}

/** Carrega GA4 e Pixel (somente após o consentimento) e passa a registrar os cliques no WhatsApp */
export function loadAnalytics() {
  if (loaded || !ANALYTICS_ENABLED) return;
  loaded = true;

  if (GA4_ID) {
    window.dataLayer = window.dataLayer || [];
    window.gtag = function gtag() {
      // eslint-disable-next-line prefer-rest-params
      window.dataLayer!.push(arguments);
    };
    window.gtag('js', new Date());
    window.gtag('config', GA4_ID, { anonymize_ip: true });
    addScript(`https://www.googletagmanager.com/gtag/js?id=${GA4_ID}`);
  }

  if (META_PIXEL_ID) {
    const fbq = ((...args: unknown[]) => {
      if (fbq.callMethod) (fbq.callMethod as (...a: unknown[]) => void)(...args);
      else fbq.queue!.push(args);
    }) as Fbq;
    fbq.push = fbq;
    fbq.loaded = true;
    fbq.version = '2.0';
    fbq.queue = [];
    window.fbq = fbq;
    window._fbq = fbq;
    addScript('https://connect.facebook.net/en_US/fbevents.js');
    fbq('init', META_PIXEL_ID);
    fbq('track', 'PageView');
  }

  // Todo clique em link do WhatsApp conta como conversão
  document.addEventListener('click', (e) => {
    const link = (e.target as Element | null)?.closest?.('a[href^="https://wa.me"]');
    if (link) trackLead('whatsapp', link.textContent?.trim() || 'WhatsApp');
  });
}

/** Registra uma conversão (clique no WhatsApp ou envio do formulário) */
export function trackLead(method: 'whatsapp' | 'formulario', label = '') {
  if (!loaded) return;
  window.gtag?.('event', 'generate_lead', { method, link_text: label });
  window.fbq?.('track', method === 'formulario' ? 'Lead' : 'Contact');
}

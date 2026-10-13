/**
 * Utilitários para formatação e direcionamento para o WhatsApp da especialista Aline Matos
 * Telefone solicitado: (31) 9497-1034
 */

export const WHATSAPP_RAW_NUMBER = '553194971034';
export const WHATSAPP_ALT_NUMBER = '5531994971034';
export const WHATSAPP_DISPLAY = '(31) 9497-1034';
export const CONSULTANT_NAME = 'Aline Matos';
export const CONSULTANT_ROLE = 'REVENDEDORA de planos de saúde há mais de 15 anos';

/* ------------------------------------------------------------------
   Origem do contato: quando a pessoa chega por um link com marcação de campanha
   (ex.: ?utm_source=instagram&utm_campaign=dia-das-criancas) ou por anúncio do Google/Meta,
   a mensagem do WhatsApp já informa à Aline de onde ela veio.
   ------------------------------------------------------------------ */
const SOURCE_LABELS: Record<string, string> = {
  instagram: 'Instagram',
  ig: 'Instagram',
  facebook: 'Facebook',
  fb: 'Facebook',
  google: 'Google',
  whatsapp: 'WhatsApp',
  tiktok: 'TikTok',
  youtube: 'YouTube',
};

function readLeadOrigin(): string | null {
  if (typeof window === 'undefined') return null;
  try {
    const params = new URLSearchParams(window.location.search);
    const source = params.get('utm_source');
    let origin: string | null = null;
    if (source) {
      const label = SOURCE_LABELS[source.toLowerCase()] ?? source;
      origin = [label, params.get('utm_medium'), params.get('utm_campaign')].filter(Boolean).join(' / ');
    } else if (params.get('gclid')) {
      origin = 'anúncio do Google';
    } else if (params.get('fbclid')) {
      origin = 'Facebook ou Instagram';
    }
    // Guarda a origem durante a visita, mesmo que a pessoa navegue entre as páginas do site
    if (origin) sessionStorage.setItem('origem-do-contato', origin);
    return origin ?? sessionStorage.getItem('origem-do-contato');
  } catch {
    return null;
  }
}

export const LEAD_ORIGIN = readLeadOrigin();

/** Acrescenta a origem do contato ao fim da mensagem, quando ela for conhecida */
export const withOrigin = (message: string) => (LEAD_ORIGIN ? `${message}\n\n(Origem do contato: ${LEAD_ORIGIN})` : message);

/** Mensagem padrão de todos os botões de contratação da página inicial */
export const KIDS_PLAN_MESSAGE =
  'Olá! Vi sua página e quero saber mais sobre plano de saúde para meu filho.';

/** Link direto do WhatsApp com a mensagem padrão da página inicial */
export const KIDS_PLAN_URL = `https://wa.me/${WHATSAPP_RAW_NUMBER}?text=${encodeURIComponent(withOrigin(KIDS_PLAN_MESSAGE))}`;

export interface QuoteParams {
  planType?: string;
  lives?: string;
  city?: string;
  hasCnpj?: boolean;
  accommodation?: string;
  currentPlan?: string;
  hospitals?: string[];
  name?: string;
}

export function formatWhatsAppMessage(params?: QuoteParams): string {
  if (!params) {
    return `Olá, Aline! Vi o seu site e gostaria de solicitar uma cotação personalizada de plano de saúde.`;
  }

  const parts: string[] = [];
  parts.push(`Olá, Aline! Vi o seu site e gostaria de uma cotação personalizada.`);

  if (params.name) {
    parts.push(`*Meu nome:* ${params.name}`);
  }
  if (params.planType) {
    parts.push(`*Tipo de plano:* ${params.planType}`);
  }
  if (params.hasCnpj !== undefined) {
    parts.push(`*Possui CNPJ/MEI:* ${params.hasCnpj ? 'Sim' : 'Não'}`);
  }
  if (params.lives) {
    parts.push(`*Quantidade de pessoas (vidas):* ${params.lives}`);
  }
  if (params.city) {
    parts.push(`*Cidade/Região:* ${params.city}`);
  }
  if (params.currentPlan) {
    parts.push(`*Plano atual:* ${params.currentPlan}`);
  }
  if (params.accommodation) {
    parts.push(`*Preferência de acomodação:* ${params.accommodation}`);
  }
  if (params.hospitals && params.hospitals.length > 0) {
    parts.push(`*Hospitais de preferência:* ${params.hospitals.join(', ')}`);
  }

  parts.push(`Poderia me apresentar as melhores opções com o melhor custo-benefício?`);

  return parts.join('\n');
}

export function getWhatsAppUrl(customMessage?: string, useAltNumber: boolean = false): string {
  const number = useAltNumber ? WHATSAPP_ALT_NUMBER : WHATSAPP_RAW_NUMBER;
  const message = withOrigin(customMessage || formatWhatsAppMessage());
  return `https://wa.me/${number}?text=${encodeURIComponent(message)}`;
}

export function openWhatsApp(params?: QuoteParams | string, useAltNumber: boolean = false): void {
  const message = typeof params === 'string' ? params : formatWhatsAppMessage(params);
  const url = getWhatsAppUrl(message, useAltNumber);
  window.open(url, '_blank', 'noopener,noreferrer');
}

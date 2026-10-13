/**
 * Arquivos de vídeo do hero. Basta enviar os arquivos para a pasta public/video
 * com estes nomes que a página passa a usá-los automaticamente:
 *
 *   hero-16x9.mp4 / hero-16x9.webm   → computador
 *   hero-9x16.mp4 / hero-9x16.webm   → celular
 *   poster-sorriso-16x9.jpg          → quadro final do sorriso (computador)
 *   poster-sorriso-9x16.jpg          → quadro final do sorriso (celular)
 *
 * Enquanto os arquivos não existirem, o hero roda a mesma narrativa sobre um fundo ilustrado.
 */

/** O vídeo atual não tem trilha sonora; mude para true se enviar uma versão com som (mostra o botão "Ativar som") */
export const HERO_VIDEO_HAS_AUDIO = false;

export interface HeroMedia {
  /** Fontes de vídeo encontradas (vazio quando ainda não há vídeo) */
  sources: { src: string; type: string }[];
  /** Quadro do sorriso usado como pôster e como fundo da chamada final */
  poster: string | null;
  portrait: boolean;
}

const isPortraitViewport = () =>
  window.matchMedia('(max-width: 767px), (orientation: portrait) and (max-width: 1024px)').matches;

async function exists(url: string, typePrefix: string): Promise<boolean> {
  try {
    const res = await fetch(url, { method: 'HEAD', cache: 'no-cache' });
    const type = res.headers.get('content-type') || '';
    // A Vercel e o Vite devolvem o index.html para arquivos inexistentes, por isso conferimos o tipo
    return res.ok && type.startsWith(typePrefix);
  } catch {
    return false;
  }
}

let cache: Promise<HeroMedia> | null = null;

export function loadHeroMedia(): Promise<HeroMedia> {
  if (cache) return cache;
  cache = (async () => {
    const portrait = isPortraitViewport();
    const ratio = portrait ? '9x16' : '16x9';
    const webm = `/video/hero-${ratio}.webm`;
    const mp4 = `/video/hero-${ratio}.mp4`;
    const poster = `/video/poster-sorriso-${ratio}.jpg`;

    const [hasWebm, hasMp4, hasPoster] = await Promise.all([
      exists(webm, 'video'),
      exists(mp4, 'video'),
      exists(poster, 'image'),
    ]);

    const sources: HeroMedia['sources'] = [];
    if (hasWebm) sources.push({ src: webm, type: 'video/webm' });
    if (hasMp4) sources.push({ src: mp4, type: 'video/mp4' });

    return { sources, poster: hasPoster ? poster : null, portrait };
  })();
  return cache;
}

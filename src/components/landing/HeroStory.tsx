import React, { useEffect, useRef, useState } from 'react';
import { BadgeCheck, ChevronDown, Droplet, Hospital, MessageCircle, RotateCcw, Syringe, Thermometer, Volume2, VolumeX } from 'lucide-react';
import { gsap, requestRefresh, prefersReducedMotion, scrollToTarget } from '../../lib/motion';
import { HERO_VIDEO_HAS_AUDIO, loadHeroMedia, type HeroMedia } from '../../lib/media';
import { KIDS_PLAN_URL } from '../../utils/whatsapp';
import { Words } from './Words';

/* ------------------------------------------------------------------
   Roteiro (segundos contados a partir do início do vídeo)
   ------------------------------------------------------------------ */
const DURATION = 28;
const INTRO_LINE_2 = 1.5;
const INTRO_END = 3.5;
const STORY_END = 18;
const SMILE = 19;
const SMILE_SUB = SMILE + 0.8;
const FINAL = 24;
const FINAL_BUTTON = FINAL + 0.4;

export const TITLE_LINE_1 = 'Você planeja o berço, o enxoval, a escolinha.';
export const TITLE_LINE_2 = 'E a saúde dele, quem planeja?';
export const MAIN_MESSAGE = 'Com o Plano de Saúde, você não está sozinho.';
export const MAIN_SUB = 'São pediatras, emergências e exames — prontos para o que vier.';
export const FINAL_LINE_1 = 'Proteja o futuro que está só começando.';
export const FINAL_LINE_2 = 'Contrate hoje e durma tranquilo amanhã.';

const NARRATIVE = [
  { start: 2, text: 'Você prepara tudo. O quarto, a mamadeira, o primeiro passinho...' },
  { start: 7, text: 'Mas tem coisas que não dá pra prever.', highlight: 'não dá' },
  { start: 11, text: 'Uma febre alta de madrugada.', highlight: 'febre alta' },
  { start: 13.5, text: 'Uma alergia inesperada.', highlight: 'inesperada' },
  { start: 16, text: 'Um susto que não espera a hora.', highlight: 'não espera' },
] as { start: number; text: string; highlight?: string }[];

/** Frase com uma expressão em destaque (a pontuação colada não quebra de linha separada da palavra) */
const HighlightedLine: React.FC<{ text: string; highlight?: string }> = ({ text, highlight }) => {
  const i = highlight ? text.indexOf(highlight) : -1;
  if (!highlight || i < 0) return <Words text={text} />;
  const before = text.slice(0, i).trimEnd();
  let after = text.slice(i + highlight.length);
  const glued = after.match(/^[^\s]*/)?.[0] ?? '';
  after = after.slice(glued.length).trim();
  return (
    <>
      {before && (
        <>
          <Words text={before} />{' '}
        </>
      )}
      <span className="whitespace-nowrap">
        <span className="hl">
          <Words text={highlight} />
        </span>
        {glued && <span className="word">{glued}</span>}
      </span>
      {after && (
        <>
          {' '}
          <Words text={after} />
        </>
      )}
    </>
  );
};

const ICONS = [
  {
    id: 'thermometer',
    Icon: Thermometer,
    start: 11,
    opacity: 0.24,
    depth: 0.7,
    color: 'var(--icon-a)',
    style: { top: '13%', left: '7%', width: 'clamp(64px, 9vw, 128px)' } as React.CSSProperties,
  },
  {
    id: 'drop',
    Icon: Droplet,
    start: 13.5,
    opacity: 0.22,
    depth: 1,
    color: 'var(--icon-b)',
    style: { top: '52%', right: '8%', width: 'clamp(56px, 8vw, 112px)' } as React.CSSProperties,
  },
  {
    id: 'syringe',
    Icon: Syringe,
    start: 16,
    opacity: 0.24,
    depth: 1.2,
    color: 'var(--icon-c)',
    style: { bottom: '13%', right: '13%', width: 'clamp(60px, 8.5vw, 120px)' } as React.CSSProperties,
  },
  {
    id: 'hospital',
    Icon: Hospital,
    start: 16,
    opacity: 0.15,
    depth: 0.35,
    color: 'var(--icon-b)',
    blur: 4,
    style: {
      top: '34%',
      left: '50%',
      width: 'clamp(170px, 28vw, 360px)',
      marginLeft: 'calc(clamp(170px, 28vw, 360px) / -2)',
    } as React.CSSProperties,
  },
];

/** Texto: só transparente (continua acessível a leitores de tela). Controles: também invisíveis ao foco. */
const HIDDEN_TEXT: React.CSSProperties = { opacity: 0 };
const HIDDEN: React.CSSProperties = { opacity: 0, visibility: 'hidden' };

type Mode = 'pending' | 'video' | 'fallback';
type Stage = 'intro' | 'story' | 'pause' | 'smile' | 'final' | 'ended';

const revealIn = (el: Element | null, delay = 0) => {
  if (!el) return;
  const words = el.querySelectorAll('.word');
  gsap.killTweensOf([el, ...Array.from(words)]);
  gsap.set(el, { opacity: 1, y: 0 });
  gsap.fromTo(
    words,
    { opacity: 0, y: 14, filter: 'blur(10px)' },
    {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      duration: 0.7,
      ease: 'power3.out',
      stagger: 0.085,
      delay,
    },
  );
};

const fadeOut = (el: Element | null, vars: gsap.TweenVars = {}) => {
  if (!el) return;
  gsap.to(el, { opacity: 0, duration: 0.6, ease: 'power2.out', overwrite: true, ...vars });
};

interface HeroStoryProps {
  /** Chamado quando a narrativa termina (libera o botão flutuante do WhatsApp) */
  onEnded?: () => void;
}

export const HeroStory: React.FC<HeroStoryProps> = ({ onEnded }) => {
  const [reduced] = useState(prefersReducedMotion);
  const [media, setMedia] = useState<HeroMedia | null>(null);
  const [mode, setMode] = useState<Mode>('pending');
  const [ended, setEnded] = useState(false);
  const [muted, setMuted] = useState(true);

  const heroRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const titleLine1Ref = useRef<HTMLSpanElement>(null);
  const titleLine2Ref = useRef<HTMLSpanElement>(null);
  const washRef = useRef<HTMLDivElement>(null);
  const narrativeRefs = useRef<(HTMLParagraphElement | null)[]>([]);
  const iconRefs = useRef<(HTMLDivElement | null)[]>([]);
  const iconsLayerRef = useRef<HTMLDivElement>(null);
  const mainRef = useRef<HTMLDivElement>(null);
  const mainSubRef = useRef<HTMLParagraphElement>(null);
  const finalRef = useRef<HTMLDivElement>(null);
  const finalButtonRef = useRef<HTMLAnchorElement>(null);
  const endControlsRef = useRef<HTMLDivElement>(null);
  const pathMaskRef = useRef<SVGPathElement>(null);
  const progressRef = useRef<HTMLSpanElement>(null);

  const mediaRef = useRef<HeroMedia | null>(null);
  const modeRef = useRef<Mode>('pending');
  const onEndedRef = useRef(onEnded);
  onEndedRef.current = onEnded;
  const videoEndRef = useRef<() => void>(() => undefined);
  const replayRef = useRef<() => void>(() => undefined);

  // Estado visual atual de cada camada (para animar somente quando muda)
  const state = useRef({
    stage: 'intro' as Stage,
    narrative: -1,
    icons: ICONS.map(() => false),
    main: false,
    mainSub: false,
    final: false,
    finalButton: false,
    clockStart: 0,
    raf: 0,
    finished: false,
  });

  /* Detecta se o vídeo já foi enviado para public/video */
  useEffect(() => {
    let alive = true;
    loadHeroMedia().then((m) => {
      if (!alive) return;
      mediaRef.current = m;
      setMedia(m);
    });
    return () => {
      alive = false;
    };
  }, []);

  /* Roteiro completo (somente quando o movimento não está reduzido) */
  useEffect(() => {
    if (reduced) return;
    const hero = heroRef.current;
    if (!hero) return;
    const s = state.current;

    const setStage = (stage: Stage) => {
      if (s.stage === stage) return;
      s.stage = stage;
      hero.dataset.stage = stage;
    };

    const setModeAll = (m: Mode) => {
      modeRef.current = m;
      hero.dataset.mode = m;
      setMode(m);
    };

    const hideAll = () => {
      gsap.set(narrativeRefs.current, { autoAlpha: 0 });
      gsap.set(iconRefs.current, { autoAlpha: 0 });
      gsap.set([mainRef.current, mainSubRef.current, finalRef.current], { opacity: 0, y: 0 });
      gsap.set(finalButtonRef.current, { autoAlpha: 0, y: 0 });
      gsap.set(endControlsRef.current, { autoAlpha: 0 });
      s.narrative = -1;
      s.icons = ICONS.map(() => false);
      s.main = s.mainSub = s.final = s.finalButton = false;
      s.finished = false;
      if (pathMaskRef.current) pathMaskRef.current.style.strokeDashoffset = '1';
    };

    const finish = () => {
      if (s.finished) return;
      s.finished = true;
      update(DURATION);
      setStage('ended');
      cancelAnimationFrame(s.raf);
      gsap.to(endControlsRef.current, { autoAlpha: 1, duration: 0.8, delay: 0.3 });
      setEnded(true);
      onEndedRef.current?.();
    };

    // Vídeo chegou ao fim: na primeira vez libera o botão do WhatsApp e os controles,
    // mas o roteiro segue ligado ao vídeo, que recomeça do zero com as frases no mesmo ritmo
    const roundDone = () => {
      if (s.finished) return;
      s.finished = true;
      gsap.to(endControlsRef.current, { autoAlpha: 1, duration: 0.8, delay: 0.3 });
      setEnded(true);
      onEndedRef.current?.();
    };

    const currentTime = () => {
      if (modeRef.current === 'video' && videoRef.current) return videoRef.current.currentTime;
      return Math.min((performance.now() - s.clockStart) / 1000, DURATION);
    };

    const update = (t: number) => {
      // Etapa geral (controla véu, escurecimento e fundo)
      setStage(t < STORY_END ? 'story' : t < SMILE ? 'pause' : t < FINAL ? 'smile' : 'final');

      // Textos narrativos no terço inferior
      let idx = -1;
      if (t < STORY_END) NARRATIVE.forEach((n, i) => t >= n.start && (idx = i));
      if (idx !== s.narrative) {
        if (s.narrative >= 0) {
          gsap.to(narrativeRefs.current[s.narrative], {
            autoAlpha: 0,
            y: -10,
            filter: 'blur(4px)',
            duration: 0.6,
            ease: 'power2.out',
            overwrite: true,
          });
        }
        if (idx >= 0) {
          // Frase revelada palavra por palavra, com o traço laranja crescendo embaixo
          const line = narrativeRefs.current[idx];
          if (line) {
            gsap.killTweensOf(line);
            gsap.set(line, { autoAlpha: 1, y: 0, filter: 'blur(0px)' });
            gsap.fromTo(
              line.querySelectorAll('.word'),
              { opacity: 0, y: 22, scale: 0.94 },
              { opacity: 1, y: 0, scale: 1, duration: 0.6, ease: 'back.out(1.7)', stagger: 0.07 },
            );
            gsap.fromTo(
              line.querySelectorAll('.hl'),
              { backgroundSize: '0% 100%' },
              { backgroundSize: '100% 100%', duration: 0.7, ease: 'power2.out', delay: 0.45 },
            );
            gsap.fromTo(
              line.querySelector('.accent'),
              { scaleX: 0 },
              { scaleX: 1, duration: 0.8, ease: 'power3.out', delay: 0.25 },
            );
          }
        }
        s.narrative = idx;
      }

      // Ícones em sobreposição
      ICONS.forEach((icon, i) => {
        const visible = t >= icon.start && t < STORY_END;
        if (visible === s.icons[i]) return;
        s.icons[i] = visible;
        gsap.to(iconRefs.current[i], {
          autoAlpha: visible ? icon.opacity : 0,
          scale: visible ? 1 : 0.92,
          duration: visible ? 1 : 0.9,
          ease: 'power2.out',
          overwrite: 'auto',
        });
      });

      // Caminho desenhado (apenas no modo sem vídeo)
      if (pathMaskRef.current) {
        pathMaskRef.current.style.strokeDashoffset = `${1 - Math.min(t / STORY_END, 1)}`;
      }

      // Mensagem principal no momento do sorriso
      const main = t >= SMILE && t < FINAL;
      if (main !== s.main) {
        s.main = main;
        if (main) revealIn(mainRef.current);
        else fadeOut(mainRef.current, { y: -26, duration: 0.7 });
      }
      const mainSub = t >= SMILE_SUB && t < FINAL;
      if (mainSub !== s.mainSub) {
        s.mainSub = mainSub;
        if (mainSub) {
          gsap.fromTo(
            mainSubRef.current,
            { opacity: 0, y: 10, filter: 'blur(6px)' },
            { opacity: 1, y: 0, filter: 'blur(0px)', duration: 0.8, ease: 'power2.out', overwrite: true },
          );
        } else fadeOut(mainSubRef.current);
      }

      // Chamada final
      const final = t >= FINAL;
      if (final !== s.final) {
        s.final = final;
        if (final) revealIn(finalRef.current, 0.35);
        else fadeOut(finalRef.current);
      }
      const finalButton = t >= FINAL_BUTTON;
      if (finalButton !== s.finalButton) {
        s.finalButton = finalButton;
        if (finalButton) {
          gsap.fromTo(
            finalButtonRef.current,
            { autoAlpha: 0, y: 12, scale: 0.96 },
            { autoAlpha: 1, y: 0, scale: 1, duration: 0.6, ease: 'back.out(1.6)', delay: 0.35, overwrite: true },
          );
        } else gsap.to(finalButtonRef.current, { autoAlpha: 0, duration: 0.4, overwrite: true });
      }
    };

    const loop = () => {
      const t = currentTime();
      update(t);
      if (progressRef.current) progressRef.current.style.transform = `scaleX(${Math.min(t / DURATION, 1)})`;
      if (modeRef.current === 'fallback' && t >= DURATION) {
        finish();
        return;
      }
      s.raf = requestAnimationFrame(loop);
    };

    const startClock = () => {
      setModeAll('fallback');
      s.clockStart = performance.now();
      cancelAnimationFrame(s.raf);
      s.raf = requestAnimationFrame(loop);
    };

    const startVideo = (video: HTMLVideoElement) => {
      video.muted = true;
      video.currentTime = 0;
      video
        .play()
        .then(() => {
          setModeAll('video');
          cancelAnimationFrame(s.raf);
          s.raf = requestAnimationFrame(loop);
        })
        .catch(() => startClock()); // reprodução automática bloqueada (ex.: modo de economia)
    };

    const begin = () => {
      hero.dataset.phase = 'play';
      gsap.to(washRef.current, { autoAlpha: 0, duration: 1.1, ease: 'power2.out' });
      gsap.to(titleRef.current, {
        opacity: 0,
        y: -14,
        filter: 'blur(12px)',
        duration: 1,
        ease: 'power2.inOut',
      });

      const m = mediaRef.current;
      const video = videoRef.current;
      const playable = m?.sources.some((src) => video?.canPlayType(src.type)) ?? false;
      if (!m || !video || !playable || video.error) {
        startClock();
        return;
      }
      if (video.readyState >= 2) {
        startVideo(video);
        return;
      }
      // Vídeo ainda carregando: aguarda até 3 s antes de seguir com o fundo ilustrado
      let done = false;
      const settle = (useVideo: boolean) => {
        if (done) return;
        done = true;
        video.removeEventListener('canplay', onReady);
        lastSource?.removeEventListener('error', onFail);
        if (useVideo) startVideo(video);
        else startClock();
      };
      const onReady = () => settle(true);
      const onFail = () => settle(false);
      const lastSource = video.querySelector('source:last-of-type');
      video.addEventListener('canplay', onReady, { once: true });
      lastSource?.addEventListener('error', onFail, { once: true });
      window.setTimeout(() => settle(false), 3000);
    };

    const ctx = gsap.context(() => {
      hideAll();
      hero.dataset.phase = 'intro';
      hero.dataset.stage = 'intro';
      hero.dataset.mode = 'pending';

      // Abertura: título revelado palavra por palavra antes do vídeo
      const intro = gsap.timeline();
      intro.fromTo(
        titleLine1Ref.current!.querySelectorAll('.word'),
        { opacity: 0, y: 18, filter: 'blur(8px)' },
        { opacity: 1, y: 0, filter: 'blur(0px)', duration: 0.7, ease: 'power3.out', stagger: 0.12 },
        0,
      );
      intro.fromTo(
        titleLine2Ref.current!.querySelectorAll('.word'),
        { opacity: 0, y: 18, filter: 'blur(8px)' },
        { opacity: 1, y: 0, filter: 'blur(0px)', duration: 0.8, ease: 'power3.out', stagger: 0.12 },
        INTRO_LINE_2,
      );

      // Aguarda a checagem do vídeo (no máximo 2 s além do tempo da abertura)
      let waited = 0;
      const tryBegin = () => {
        if (mediaRef.current || waited >= 2000) begin();
        else {
          waited += 100;
          window.setTimeout(tryBegin, 100);
        }
      };
      intro.call(tryBegin, [], INTRO_END);

      // Parallax dos ícones: acompanha o ponteiro e a rolagem
      const movers = iconRefs.current.map((el, i) => ({
        x: gsap.quickTo(el, 'x', { duration: 1.2, ease: 'power3.out' }),
        y: gsap.quickTo(el, 'y', { duration: 1.2, ease: 'power3.out' }),
        depth: ICONS[i].depth,
      }));
      const onPointer = (e: PointerEvent) => {
        const rx = e.clientX / window.innerWidth - 0.5;
        const ry = e.clientY / window.innerHeight - 0.5;
        movers.forEach((m) => {
          m.x(rx * 46 * m.depth);
          m.y(ry * 34 * m.depth);
        });
      };
      hero.addEventListener('pointermove', onPointer);

      gsap.to(iconsLayerRef.current, {
        yPercent: 18,
        ease: 'none',
        scrollTrigger: { trigger: hero, start: 'top top', end: 'bottom top', scrub: true },
      });

      return () => hero.removeEventListener('pointermove', onPointer);
    }, hero);

    videoEndRef.current = roundDone;

    // Exposto para o botão "Assistir novamente"
    replayRef.current = () => {
      hideAll();
      setEnded(false);
      hero.dataset.stage = 'story';
      s.stage = 'story';
      const v = videoRef.current;
      if (modeRef.current === 'video' && v) {
        v.currentTime = 0;
        v.play().catch(() => undefined);
        cancelAnimationFrame(s.raf);
        s.raf = requestAnimationFrame(loop);
      } else {
        startClock();
      }
    };

    return () => {
      cancelAnimationFrame(s.raf);
      ctx.revert();
    };
  }, [reduced]);

  const hasVideo = !!media && media.sources.length > 0;

  // Vídeo terminou: volta ao início em looping e as frases acompanham de novo, no mesmo tempo da primeira rodada
  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    const onVideoEnded = () => {
      videoEndRef.current();
      v.currentTime = 0;
      v.play().catch(() => undefined);
    };
    v.addEventListener('ended', onVideoEnded);
    return () => v.removeEventListener('ended', onVideoEnded);
  }, [hasVideo]);

  // Economia de bateria: pausa o vídeo quando o banner sai da tela e retoma quando volta
  useEffect(() => {
    const hero = heroRef.current;
    const v = videoRef.current;
    if (!hero || !v || reduced) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (modeRef.current !== 'video') return;
        if (entry.isIntersecting) v.play().catch(() => undefined);
        else v.pause();
      },
      { threshold: 0.15 },
    );
    io.observe(hero);
    return () => io.disconnect();
  }, [hasVideo, reduced]);

  useEffect(() => {
    if (!reduced) requestRefresh();
  }, [media, reduced]);

  const toggleSound = () => {
    const v = videoRef.current;
    if (!v) return;
    v.muted = !v.muted;
    setMuted(v.muted);
    if (!v.muted && v.paused && !ended) v.play().catch(() => undefined);
  };

  const replay = () => replayRef.current();

  /* ------------------------------------------------------------------
     Movimento reduzido: título fixo sobre o quadro estático do sorriso
     ------------------------------------------------------------------ */
  if (reduced) {
    return (
      <section
        ref={heroRef}
        id="inicio"
        className="hero"
        data-phase="static"
        data-stage="ended"
        data-mode="fallback"
        style={{ height: 'auto', minHeight: 'calc(100svh - 64px)' }}
        aria-labelledby="titulo-principal"
      >
        {media?.poster ? (
          <img src={media.poster} alt="Bebê sentado no chão da sala olhando para os pais com um sorriso" className="hero-media" />
        ) : (
          <div className="hero-fallback" aria-hidden="true">
            <div className="sun" />
          </div>
        )}
        <div className="hero-veil" style={{ opacity: 1 }} aria-hidden="true" />
        <div className="relative z-10 mx-auto flex min-h-[calc(100svh-64px)] max-w-3xl flex-col items-center justify-center gap-8 px-5 py-20 text-center">
          <h1 id="titulo-principal" className="font-display text-[clamp(2rem,5.4vw,3.6rem)] leading-[1.08] text-white">
            <span className="block">{TITLE_LINE_1}</span>
            <span className="mt-2 block text-[#FFCC80] glow-text">{TITLE_LINE_2}</span>
          </h1>
          <div className="space-y-3">
            <p className="font-display text-[clamp(1.5rem,3.6vw,2.4rem)] leading-tight text-white">{MAIN_MESSAGE}</p>
            <p className="text-lg text-white/90">{MAIN_SUB}</p>
          </div>
          <div className="space-y-5 rounded-[2rem] bg-white/10 px-6 py-6 ring-1 ring-white/25">
            <p className="font-display text-[clamp(1.35rem,3vw,2rem)] leading-tight text-white">
              {FINAL_LINE_1}
              <span className="block text-[#FFCC80]">{FINAL_LINE_2}</span>
            </p>
            <a href={KIDS_PLAN_URL} target="_blank" rel="noopener noreferrer" className="btn-primary">
              <MessageCircle className="h-5 w-5" aria-hidden="true" />
              Quero minha cotação grátis
            </a>
          </div>
          <ScrollCue />
        </div>
      </section>
    );
  }

  return (
    <section
      ref={heroRef}
      id="inicio"
      className="hero"
      data-phase="intro"
      data-stage="intro"
      data-mode="pending"
      aria-labelledby="titulo-principal"
      style={
        {
          '--icon-a': mode === 'video' ? '#BBDEFB' : '#FFFFFF',
          '--icon-b': mode === 'video' ? '#C8E6C9' : '#BBDEFB',
          '--icon-c': mode === 'video' ? '#FFE0B2' : '#FFCC80',
        } as React.CSSProperties
      }
    >
      {/* Fundo: vídeo (quando enviado) ou cena ilustrada */}
      {hasVideo ? (
        <video
          ref={videoRef}
          className="hero-media"
          muted
          playsInline
          preload="auto"
          disablePictureInPicture
          poster={media?.poster ?? undefined}
          aria-label="Vídeo: um bebê engatinha pela sala iluminada de casa, para, olha para os pais e sorri."
          style={{ visibility: mode === 'fallback' ? 'hidden' : 'visible' }}
        >
          {media!.sources.map((s) => (
            <source key={s.src} src={s.src} type={s.type} />
          ))}
          <track kind="captions" src="/video/legendas-pt.vtt" srcLang="pt-BR" label="Português" />
        </video>
      ) : null}

      {(!hasVideo || mode === 'fallback') && (
        <div className="hero-fallback" aria-hidden="true">
          <div
            className="blob"
            style={{ width: '42vw', height: '42vw', left: '-8vw', top: '-6vw', '--blob': '#64B5F6' } as React.CSSProperties}
          />
          <div
            className="blob"
            style={
              {
                width: '38vw',
                height: '38vw',
                right: '-6vw',
                top: '8vh',
                '--blob': '#0D47A1',
                animationDelay: '-6s',
              } as React.CSSProperties
            }
          />
          <div
            className="blob"
            style={
              {
                width: '46vw',
                height: '30vw',
                left: '28vw',
                bottom: '-10vw',
                '--blob': '#81C784',
                animationDelay: '-11s',
              } as React.CSSProperties
            }
          />
          <div className="sun" />
          {/* Caminho do bebê, desenhado ao longo da narrativa */}
          <svg
            className="absolute inset-x-0 bottom-[26%] h-[22%] w-full"
            viewBox="0 0 1000 200"
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            <defs>
              <mask id="hero-path-mask" maskUnits="userSpaceOnUse">
                <path
                  ref={pathMaskRef}
                  d="M-20 150 C 120 70, 240 190, 400 120 S 660 40, 820 110 S 980 170, 1030 90"
                  fill="none"
                  stroke="#fff"
                  strokeWidth="40"
                  pathLength={1}
                  style={{ strokeDasharray: 1, strokeDashoffset: 1 }}
                />
              </mask>
            </defs>
            <path
              d="M-20 150 C 120 70, 240 190, 400 120 S 660 40, 820 110 S 980 170, 1030 90"
              fill="none"
              stroke="#FFFFFF"
              strokeOpacity="0.5"
              strokeWidth="3"
              strokeLinecap="round"
              strokeDasharray="2 14"
              vectorEffect="non-scaling-stroke"
              mask="url(#hero-path-mask)"
            />
          </svg>
        </div>
      )}

      {/* Véu azul da abertura */}
      <div ref={washRef} className="absolute inset-0 z-[2] bg-[#1565c0]/60" aria-hidden="true" />

      <div className="hero-scrim" aria-hidden="true" />
      <div className="hero-veil" aria-hidden="true" />

      {/* Ícones em sobreposição */}
      <div ref={iconsLayerRef} className="hero-icons" aria-hidden="true">
        {ICONS.map(({ id, Icon, style, color, blur }, i) => (
          <div
            key={id}
            ref={(el) => {
              iconRefs.current[i] = el;
            }}
            className="hero-icon"
            style={{ ...style, color, filter: `blur(${blur ?? 1.2}px)` }}
          >
            <span style={{ animationDelay: `${-i * 1.7}s` }}>
              <Icon strokeWidth={1} />
            </span>
          </div>
        ))}
      </div>

      {/* Botão de som (navegadores bloqueiam áudio automático) */}
      {hasVideo && mode === 'video' && HERO_VIDEO_HAS_AUDIO && (
        <button
          type="button"
          onClick={toggleSound}
          className="btn-ghost absolute right-4 top-4 z-20 sm:right-6 sm:top-6"
          aria-pressed={!muted}
        >
          {muted ? <VolumeX className="h-4 w-4" aria-hidden="true" /> : <Volume2 className="h-4 w-4" aria-hidden="true" />}
          {muted ? 'Ativar som' : 'Desativar som'}
        </button>
      )}

      {/* Título principal (abertura) */}
      <div className="pointer-events-none absolute inset-0 z-[4] grid place-items-center px-5">
        <h1
          ref={titleRef}
          id="titulo-principal"
          className="font-display mx-auto w-full max-w-[80vw] text-center text-[clamp(2rem,6vw,4.6rem)] font-medium leading-[1.06] text-white sm:max-w-4xl"
        >
          <span ref={titleLine1Ref} className="block">
            <Words text={TITLE_LINE_1} />
          </span>
          <span ref={titleLine2Ref} className="mt-3 block text-[#FFCC80] glow-text">
            <Words text={TITLE_LINE_2} />
          </span>
        </h1>
      </div>

      {/* Textos narrativos sincronizados (terço inferior) */}
      <div className="narrative" aria-hidden="true">
        {NARRATIVE.map((n, i) => (
          <p
            key={n.start}
            ref={(el) => {
              narrativeRefs.current[i] = el;
            }}
            className="narrative-line"
          >
            <HighlightedLine text={n.text} highlight={n.highlight} />
            <span className="accent" />
          </p>
        ))}
      </div>
      <div className="sr-only">
        {NARRATIVE.map((n) => (
          <p key={n.start}>{n.text}</p>
        ))}
      </div>

      {/* Momento do sorriso e chamada final (à esquerda no computador, embaixo no celular) */}
      <div className="top-message">
        <div ref={mainRef} className="max-w-3xl" style={HIDDEN_TEXT}>
          <p className="font-display text-[clamp(1.75rem,4.4vw,3.4rem)] font-medium leading-[1.1] text-white glow-text">
            <Words text={MAIN_MESSAGE} />
          </p>
          <p
            ref={mainSubRef}
            style={HIDDEN_TEXT}
            className="mx-auto mt-3 max-w-xl text-[clamp(1rem,1.6vw,1.25rem)] font-medium text-white/90 md:mx-0"
          >
            {MAIN_SUB}
          </p>
        </div>

        <div ref={finalRef} className="max-w-3xl" style={HIDDEN_TEXT}>
          <p className="font-display text-[clamp(1.75rem,4.4vw,3.4rem)] font-medium leading-[1.1] text-white glow-text">
            <Words text={FINAL_LINE_1} />
          </p>
          <p className="font-display mt-2 text-[clamp(1.15rem,2.4vw,1.9rem)] leading-snug text-[#FFCC80]">
            <Words text={FINAL_LINE_2} />
          </p>
          <div className="mt-6 flex justify-center md:justify-start">
            <a
              ref={finalButtonRef}
              style={HIDDEN}
              href={KIDS_PLAN_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary pulse is-interactive"
            >
              <MessageCircle className="h-5 w-5" aria-hidden="true" />
              Quero minha cotação grátis
            </a>
          </div>
        </div>
      </div>

      {/* Fim do vídeo: assistir novamente + indicador de rolagem */}
      <div ref={endControlsRef} style={HIDDEN} className="pointer-events-none absolute inset-0 z-10">
        <button
          type="button"
          onClick={replay}
          className="btn-ghost pointer-events-auto absolute right-4 top-4 sm:right-6 sm:top-6"
          tabIndex={ended ? 0 : -1}
        >
          <RotateCcw className="h-4 w-4" aria-hidden="true" />
          Assistir novamente
        </button>
        <div className="pointer-events-auto absolute inset-x-0 bottom-3 flex justify-center sm:bottom-5">
          <ScrollCue hidden={!ended} />
        </div>
      </div>

      {/* Subtítulo com a promessa e botão de cotação visíveis desde o início */}
      <div className="hero-quick">
        <p className="inline-flex items-center gap-2 rounded-full bg-white/15 px-4 py-2 text-sm font-semibold text-white ring-1 ring-white/30 backdrop-blur-sm">
          <BadgeCheck className="h-4 w-4 shrink-0" aria-hidden="true" />
          Cotação gratuita com quem tem mais de 15 anos de mercado em BH
        </p>
        <a href={KIDS_PLAN_URL} target="_blank" rel="noopener noreferrer" className="btn-primary !min-h-11 !px-5 !py-2 text-sm">
          <MessageCircle className="h-4 w-4" aria-hidden="true" />
          Quero minha cotação grátis
        </a>
      </div>

      {/* Progresso da história */}
      <div className="story-progress" aria-hidden="true">
        <span ref={progressRef} />
      </div>
    </section>
  );
};

const ScrollCue: React.FC<{ hidden?: boolean }> = ({ hidden }) => (
  <button
    type="button"
    onClick={() => scrollToTarget('#imprevistos')}
    className="scroll-cue inline-flex min-h-11 min-w-11 flex-col items-center gap-1 rounded-full px-3 py-1 text-sm font-medium text-white"
    tabIndex={hidden ? -1 : 0}
    aria-label="Rolar para continuar"
  >
    <span className="rounded-full bg-white/90 px-3 py-1 text-brand-dark">Role para continuar</span>
    <ChevronDown className="h-5 w-5" aria-hidden="true" />
  </button>
);

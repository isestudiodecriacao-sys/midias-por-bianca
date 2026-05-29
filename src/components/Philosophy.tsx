import { useRef, useEffect, useCallback } from 'react';
import {
  Camera,
  Heart,
  MessageCircle,
  Share2,
  Image,
  Play,
  Bookmark,
  AtSign,
  Hash,
  Sparkles,
} from 'lucide-react';
import { playSoundThrottled } from '@/hooks/useSoundEffect';

const icons = [
  { Icon: Camera, x: 8, y: 12, size: 28, speed: 0.6, rotate: -15, opacity: 0.12 },
  { Icon: Heart, x: 85, y: 8, size: 22, speed: 0.4, rotate: 12, opacity: 0.10 },
  { Icon: MessageCircle, x: 92, y: 45, size: 26, speed: 0.7, rotate: -8, opacity: 0.11 },
  { Icon: Share2, x: 5, y: 55, size: 20, speed: 0.5, rotate: 20, opacity: 0.09 },
  { Icon: Image, x: 78, y: 75, size: 24, speed: 0.35, rotate: -18, opacity: 0.10 },
  { Icon: Play, x: 15, y: 80, size: 18, speed: 0.65, rotate: 10, opacity: 0.08 },
  { Icon: Bookmark, x: 90, y: 20, size: 20, speed: 0.45, rotate: -25, opacity: 0.09 },
  { Icon: Camera, x: 50, y: 5, size: 20, speed: 0.55, rotate: 8, opacity: 0.07 },
  { Icon: AtSign, x: 20, y: 35, size: 22, speed: 0.3, rotate: -12, opacity: 0.08 },
  { Icon: Hash, x: 75, y: 30, size: 18, speed: 0.5, rotate: 15, opacity: 0.10 },
  { Icon: Sparkles, x: 45, y: 85, size: 22, speed: 0.4, rotate: -5, opacity: 0.09 },
  { Icon: Camera, x: 65, y: 60, size: 16, speed: 0.6, rotate: 22, opacity: 0.07 },
  { Icon: Heart, x: 30, y: 65, size: 16, speed: 0.35, rotate: -20, opacity: 0.08 },
  { Icon: MessageCircle, x: 55, y: 25, size: 18, speed: 0.45, rotate: 10, opacity: 0.07 },
];

export function Philosophy() {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const iconsRef = useRef<(HTMLDivElement | null)[]>([]);
  const rafRef = useRef<number>(0);
  const shutterFired = useRef(false);
  const prevProgress = useRef(0);

  const update = useCallback(() => {
    const el = sectionRef.current;
    const content = contentRef.current;
    if (!el || !content) return;

    const rect = el.getBoundingClientRect();
    const vh = window.innerHeight;
    const raw = (vh - rect.top) / (vh + rect.height);
    const progress = Math.max(0, Math.min(1, raw));

    // Text animation
    let scale: number;
    let opacity: number;
    let translateY: number;
    let blur: number;

    if (progress <= 0.5) {
      const t = progress / 0.5;
      scale = 0.45 + t * 0.55;
      opacity = t;
      translateY = (1 - t) * 60;
      blur = (1 - t) * 6;
    } else {
      const t = (progress - 0.5) / 0.5;
      scale = 1 - t * 0.3;
      opacity = 1 - t;
      translateY = -t * 80;
      blur = t * 10;
    }

    content.style.transform = `translateY(${translateY}px) scale(${scale})`;
    content.style.opacity = `${opacity}`;
    content.style.filter = `blur(${blur}px)`;

    // Shutter sound when text reaches full size (crossing 0.45 threshold going up)
    if (prevProgress.current < 0.45 && progress >= 0.45 && !shutterFired.current) {
      shutterFired.current = true;
      playSoundThrottled('swoosh', 0.10, 500);
    }
    // Reset so it fires again on next scroll-through
    if (progress < 0.3 || progress > 0.7) {
      shutterFired.current = false;
    }
    prevProgress.current = progress;

    // Icons parallax
    for (let i = 0; i < icons.length; i++) {
      const iconEl = iconsRef.current[i];
      if (!iconEl) continue;
      const cfg = icons[i];
      const drift = (progress - 0.5) * cfg.speed * 200;
      const rot = cfg.rotate + (progress - 0.5) * cfg.speed * 60;
      const iconOpacity = cfg.opacity * (1 - Math.abs(progress - 0.5) * 1.6);
      iconEl.style.transform = `translateY(${drift}px) rotate(${rot}deg)`;
      iconEl.style.opacity = `${Math.max(0, iconOpacity)}`;
    }
  }, []);

  useEffect(() => {
    const onScroll = () => {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(update);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    update();
    return () => {
      window.removeEventListener('scroll', onScroll);
      cancelAnimationFrame(rafRef.current);
    };
  }, [update]);

  return (
    <section ref={sectionRef} className="relative overflow-hidden bg-white py-52 dark:bg-[#0a0a0a] md:py-72">
      {/* Floating icons layer */}
      <div className="pointer-events-none absolute inset-0">
        {icons.map((cfg, i) => (
          <div
            key={i}
            ref={(el) => { iconsRef.current[i] = el; }}
            className="absolute text-[var(--coral)]"
            style={{
              left: `${cfg.x}%`,
              top: `${cfg.y}%`,
              opacity: 0,
              willChange: 'transform, opacity',
            }}
          >
            <cfg.Icon size={cfg.size} strokeWidth={1.5} />
          </div>
        ))}
      </div>

      <div className="mx-auto max-w-7xl px-6">
        <div className="relative flex flex-col items-center">
          <div
            ref={contentRef}
            className="relative z-10 max-w-3xl text-center"
            style={{ willChange: 'transform, opacity, filter' }}
          >
            <span className="mb-6 inline-block text-sm font-medium uppercase tracking-[0.15em] text-[var(--coral)]">
              Filosofia
            </span>

            <h2 className="font-galderglynn text-[clamp(1.75rem,4vw,3.5rem)] font-medium leading-[1.15] tracking-[-0.05em] text-[var(--black)]">
              Cada marca tem uma{' '}
              <span className="text-gradient">história única.</span> Meu papel é
              contar a sua de forma autêntica e impactante nas redes sociais.
            </h2>

            <p className="mt-8 text-base leading-relaxed text-[var(--gray-500)]">
              Acredito que conteúdo de qualidade vai além de fotos bonitas. É
              sobre criar conexões reais entre sua marca e seu público,
              construindo uma presença digital que gera resultados.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

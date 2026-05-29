import { useRef, useState, useEffect, useCallback } from 'react';
import { ArrowRight } from 'lucide-react';
import { playSoundThrottled } from '@/hooks/useSoundEffect';
import { TextRepel } from '@/components/ui/text-repel';

const photos = [
  { src: '/images/bianca-white.png', tilt: -10 },
  { src: '/images/bianca-blazer.png', tilt: 8 },
  { src: '/images/hero-bianca.png', tilt: -6 },
  { src: '/images/bianca-jeans.png', tilt: 9 },
  { src: '/images/bianca-burgundy.png', tilt: -12 },
];

export function CTA() {
  const sectionRef = useRef<HTMLElement>(null);
  const rafRef = useRef<number>(0);
  const [progress, setProgress] = useState(0);
  const [maxRadius, setMaxRadius] = useState(350);
  const prevExpansionBucket = useRef(-1);

  const update = useCallback(() => {
    const el = sectionRef.current;
    if (!el) return;

    const rect = el.getBoundingClientRect();
    const vh = window.innerHeight;
    const raw = (vh - rect.top) / (vh + rect.height);
    const p = Math.max(0, Math.min(1, raw));
    setProgress(p);
    const vw = window.innerWidth;
    setMaxRadius(vw < 768 ? Math.min(280, Math.max(180, vw * 0.5)) : Math.min(700, Math.max(380, vw * 0.42)));

    // Sound: trigger swoosh at key expansion milestones as photos spread
    const bucket = Math.floor(p * 5);
    if (bucket !== prevExpansionBucket.current && bucket > 0 && bucket < 5) {
      playSoundThrottled('swoosh', 0.08, 500);
      prevExpansionBucket.current = bucket;
    }
    if (p < 0.05) prevExpansionBucket.current = -1;
  }, []);

  useEffect(() => {
    const onScroll = () => {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(update);
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });
    update();
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      cancelAnimationFrame(rafRef.current);
    };
  }, [update]);

  // Easing
  const easeOut = (t: number) => t * (2 - t);

  // Expansion: starts at 0, reaches 1 around 60% scroll
  const expansion = easeOut(Math.min(1, progress * 1.7));
  // Orbit rotation: 0° → 220° over full scroll
  const rotation = progress * 220;
  // Fade in: 0 → 1 very quickly in first 15% of scroll
  const fadeIn = Math.min(1, progress * 6);
  // Scale: photos grow from small to full
  const scale = 0.3 + expansion * 0.7;

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="relative overflow-hidden bg-white pt-40 pb-24 dark:bg-[#0a0a0a] md:pt-60 md:pb-32"
    >
      {/* Orbit container — all screen sizes */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
          {photos.map((photo, i) => {
            const baseAngle = (i / photos.length) * 360;
            const angle = baseAngle + rotation;
            const rad = (angle * Math.PI) / 180;

            const radius = expansion * maxRadius;
            const x = Math.cos(rad) * radius;
            const y = Math.sin(rad) * radius * 0.7;

            return (
              <div
                key={i}
                className="pointer-events-auto absolute left-0 top-0"
                style={{
                  transform: `translate(-50%, -50%) translate(${x}px, ${y}px) rotate(${photo.tilt + rotation * 0.05}deg) scale(${scale})`,
                  opacity: fadeIn,
                  willChange: 'transform, opacity',
                }}
              >
                <div className="h-36 w-24 rounded-lg bg-white p-1.5 shadow-xl dark:bg-[#1a1a1a] sm:h-44 sm:w-32 sm:p-2 md:h-52 md:w-40">
                  <div className="h-full w-full overflow-hidden rounded bg-[var(--gray-100)]">
                    <img
                      src={photo.src}
                      alt=""
                      className="h-full w-full rounded object-cover object-top"
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Text — always on top */}
      <div className="relative z-10 mx-auto max-w-7xl px-6">
        <div className="flex flex-col items-center text-center">
          <h2 className="font-galderglynn text-[clamp(2.5rem,6vw,4.5rem)] font-bold leading-[1.05] tracking-[-0.06em] text-[var(--black)]">
            <TextRepel text="Vamos transformar suas mídias?" radius={120} strength={40} stiffness={200} damping={16} mass={0.3} />
          </h2>

          <div className="mx-auto mt-6 max-w-md text-base text-[var(--gray-500)]">
            <TextRepel text="Estou pronta para levar sua presença digital ao próximo nível. Vamos conversar sobre o seu projeto?" radius={80} strength={20} stiffness={200} damping={16} mass={0.3} />
          </div>

          <div className="mt-10">
            <a
              href="https://form.respondi.app/y0PBhqbR?utm_source=ig&utm_medium=social&utm_content=link_in_bio"
              target="_blank"
              rel="noopener noreferrer"

              className="group inline-flex items-center gap-2 rounded-full bg-[var(--black)] px-8 py-4 text-sm font-medium text-white transition-all duration-300 hover:bg-[var(--coral)]"
            >
              Entre em contato
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </a>
          </div>
        </div>
      </div>

    </section>
  );
}

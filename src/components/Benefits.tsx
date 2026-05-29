import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { useEffect, useRef, useState, useCallback } from 'react';
import { TrendingUp, Users, Zap, Heart } from 'lucide-react';
import { useCounterSound } from '@/hooks/useSoundEffect';
import { TextRepel } from '@/components/ui/text-repel';

// ── Count-up hook ──
function useCountUp(target: number, duration: number, start: boolean) {
  const [value, setValue] = useState(0);
  const [done, setDone] = useState(false);
  const frameRef = useRef<number>(0);

  useEffect(() => {
    if (!start) return;
    setValue(0);
    setDone(false);

    const startTime = performance.now();

    function tick(now: number) {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);

      // ease-out cubic for satisfying deceleration
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = Math.round(eased * target);

      setValue(current);

      if (progress < 1) {
        frameRef.current = requestAnimationFrame(tick);
      } else {
        setDone(true);
      }
    }

    frameRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frameRef.current);
  }, [target, duration, start]);

  return { value, done };
}

// ── Animated number component ──
function AnimatedNumber({
  raw,
  duration = 5000,
  start,
  onDone,
  className = '',
}: {
  raw: string;
  duration?: number;
  start: boolean;
  onDone?: () => void;
  className?: string;
}) {
  // Parse: "+150" → prefix="+", num=150, suffix=""
  //        "98%"  → prefix="",  num=98,  suffix="%"
  //        "3x"   → prefix="",  num=3,   suffix="x"
  const match = raw.match(/^([+]?)(\d+)(.*)$/);
  const prefix = match?.[1] ?? '';
  const target = parseInt(match?.[2] ?? '0', 10);
  const suffix = match?.[3] ?? '';

  const { value, done } = useCountUp(target, duration, start);

  const doneTriggered = useRef(false);
  useEffect(() => {
    if (done && !doneTriggered.current) {
      doneTriggered.current = true;
      onDone?.();
    }
  }, [done, onDone]);

  return (
    <span className={className}>
      {prefix}
      {start ? value : 0}
      {suffix}
    </span>
  );
}

// ── Stats data ──
const stats = [
  { value: '+150', label: 'Projetos realizados', icon: Zap },
  { value: '98%', label: 'Satisfação dos clientes', icon: Heart },
  { value: '3x', label: 'Mais engajamento', icon: TrendingUp },
  { value: '+50', label: 'Marcas atendidas', icon: Users },
];

export function Benefits() {
  const { ref, isVisible } = useScrollAnimation();
  useCounterSound(isVisible, 5000);
  const [heroBlur, setHeroBlur] = useState(false);
  const [cardBlurs, setCardBlurs] = useState<boolean[]>([false, false, false, false]);

  const handleHeroDone = useCallback(() => {
    setHeroBlur(true);
    setTimeout(() => setHeroBlur(false), 1000);
  }, []);

  const handleCardDone = useCallback((index: number) => {
    setCardBlurs((prev) => {
      const next = [...prev];
      next[index] = true;
      return next;
    });
    setTimeout(() => {
      setCardBlurs((prev) => {
        const next = [...prev];
        next[index] = false;
        return next;
      });
    }, 1000);
  }, []);

  return (
    <section ref={ref} className="bg-[var(--gray-50)] py-28">
      <div className="mx-auto max-w-7xl px-6">
        {/* Header */}
        <div
          className={`mb-16 text-center ${isVisible ? 'animate-fade-up' : 'opacity-0'}`}
        >
          <span className="text-sm font-medium uppercase tracking-[0.15em] text-[var(--coral)]">
            Resultados
          </span>
          <h2 className="font-galderglynn mt-4 text-[clamp(2rem,4vw,3rem)] font-medium leading-[1.15] tracking-[-0.05em] text-[var(--black)]">
            <TextRepel text="Números que falam por si" radius={100} strength={30} stiffness={200} damping={16} mass={0.3} />
          </h2>
        </div>

        {/* Bento Grid */}
        <div className="grid gap-4 md:grid-cols-4 md:grid-rows-2">
          {/* Large stat card — 340% */}
          <div
            className={`flex flex-col justify-between rounded-3xl bg-[var(--black)] p-8 md:col-span-2 md:row-span-2 transition-[filter] duration-1000 ${
              isVisible ? 'animate-fade-up delay-100' : 'opacity-0'
            }`}
            style={{
              filter: heroBlur ? 'blur(6px)' : 'blur(0px)',
            }}
          >
            <div>
              <span className="text-sm font-medium text-[var(--coral)]">
                Crescimento médio
              </span>
              <h3 className="font-galderglynn mt-3 text-6xl font-bold tracking-[-0.06em] text-white md:text-7xl">
                <AnimatedNumber
                  raw="340%"
                  duration={5000}
                  start={isVisible}
                  onDone={handleHeroDone}
                />
              </h3>
              <p className="mt-3 max-w-xs text-sm leading-relaxed text-white/50">
                Aumento médio no engajamento dos perfis gerenciados nos primeiros
                6 meses de trabalho.
              </p>
            </div>
            <div className="mt-8 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[var(--coral)]">
                <TrendingUp className="h-5 w-5 text-white" />
              </div>
              <span className="text-sm text-white/40">Dados de 2024</span>
            </div>
          </div>

          {/* Stat cards */}
          {stats.map((stat, i) => {
            const Icon = stat.icon;
            return (
              <div
                key={stat.label}
                className={`flex flex-col justify-between rounded-3xl bg-white p-6 shadow-[0_2px_8px_rgba(0,0,0,0.04)] transition-[filter] duration-1000 dark:bg-[#1a1a1a] ${
                  isVisible ? 'animate-fade-up' : 'opacity-0'
                }`}
                style={{
                  animationDelay: `${0.2 + i * 0.1}s`,
                  filter: cardBlurs[i] ? 'blur(6px)' : 'blur(0px)',
                }}
              >
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[var(--gray-50)]">
                  <Icon
                    className="h-4 w-4 text-[var(--coral)]"
                    strokeWidth={1.5}
                  />
                </div>
                <div className="mt-4">
                  <p className="text-3xl font-bold tracking-[-0.05em] text-[var(--black)]">
                    <AnimatedNumber
                      raw={stat.value}
                      duration={5000}
                      start={isVisible}
                      onDone={() => handleCardDone(i)}
                    />
                  </p>
                  <p className="mt-1 text-sm text-[var(--gray-500)]">
                    {stat.label}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

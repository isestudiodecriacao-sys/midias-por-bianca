import { useRef, useEffect, useState, type ReactNode } from 'react';

interface MarqueeProps {
  children: ReactNode;
  speed?: number;
  gap?: string;
  fade?: boolean;
  pauseOnHover?: boolean;
  className?: string;
}

export function Marquee({
  children,
  speed = 25,
  gap = '80px',
  fade = true,
  pauseOnHover = false,
  className = '',
}: MarqueeProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [duration, setDuration] = useState(20);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    // Calculate duration based on content width and speed
    const contentWidth = el.scrollWidth / 2; // half because we duplicate
    setDuration(contentWidth / speed);
  }, [speed]);

  return (
    <div
      className={`group relative w-full overflow-hidden ${className}`}
      style={
        fade
          ? {
              maskImage:
                'linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%)',
              WebkitMaskImage:
                'linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%)',
            }
          : undefined
      }
    >
      <div
        ref={scrollRef}
        className={`flex w-max animate-marquee ${pauseOnHover ? 'group-hover:[animation-play-state:paused]' : ''}`}
        style={
          {
            gap,
            animationDuration: `${duration}s`,
            '--marquee-gap': gap,
          } as React.CSSProperties
        }
      >
        {/* Original */}
        <div className="flex shrink-0 items-center" style={{ gap }}>
          {children}
        </div>
        {/* Duplicate for seamless loop */}
        <div className="flex shrink-0 items-center" style={{ gap }}>
          {children}
        </div>
      </div>
    </div>
  );
}

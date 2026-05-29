import { useRef, useState, useEffect, useCallback } from 'react';
import { playSoundThrottled } from '@/hooks/useSoundEffect';
import { TextRepel } from '@/components/ui/text-repel';

interface Card {
  title: string;
  description: string;
  category: string;
  bgColor: string;
  textColor: string;
  images: string[];
}

interface ScrollSplitCardProps {
  cards: Card[];
}

function AutoCarousel({ images, interval = 3000 }: { images: string[]; interval?: number }) {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (images.length <= 1) return;
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, interval);
    return () => clearInterval(timer);
  }, [images, interval]);

  return (
    <div className="relative h-full w-full overflow-hidden rounded-2xl bg-[var(--gray-50)]">
      {images.map((src, i) => (
        <img
          key={src}
          src={src}
          alt=""
          className="absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ease-in-out"
          style={{ opacity: i === current ? 1 : 0 }}
        />
      ))}
      {/* Dots */}
      <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-2">
        {images.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={`h-2 rounded-full transition-all duration-300 ${
              i === current ? 'w-6 bg-white' : 'w-2 bg-white/50'
            }`}
          />
        ))}
      </div>
    </div>
  );
}

export function ScrollSplitCard({ cards }: ScrollSplitCardProps) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const prevIndexRef = useRef(0);

  const handleScroll = useCallback(() => {
    const wrapper = wrapperRef.current;
    if (!wrapper) return;

    const rect = wrapper.getBoundingClientRect();
    const vh = window.innerHeight;

    // How far past the top of the wrapper the viewport has scrolled
    const scrolled = -rect.top;
    const totalScroll = wrapper.offsetHeight - vh;

    if (totalScroll <= 0) return;

    const progress = Math.max(0, Math.min(1, scrolled / totalScroll));
    const index = Math.min(cards.length - 1, Math.floor(progress * cards.length));
    if (index !== prevIndexRef.current) {
      playSoundThrottled('swoosh', 0.10, 600);
      prevIndexRef.current = index;
    }
    setActiveIndex(index);
  }, [cards.length]);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  return (
    <div
      ref={wrapperRef}
      // Each card gets 100vh of scroll space
      style={{ height: `${(cards.length + 0.5) * 100}vh` }}
    >
      <div className="sticky top-0 flex h-screen items-center overflow-hidden">
        <div className="mx-auto grid w-full max-w-7xl grid-cols-1 gap-8 px-6 lg:grid-cols-2 lg:gap-12">
          {/* Left — Image carousel */}
          <div className="relative h-[40vh] overflow-hidden rounded-2xl shadow-2xl lg:h-[70vh]">
            {cards.map((card, i) => (
              <div
                key={i}
                className="absolute inset-0 transition-all duration-700"
                style={{
                  opacity: i === activeIndex ? 1 : 0,
                  transform: i === activeIndex ? 'scale(1)' : 'scale(1.05)',
                }}
              >
                <AutoCarousel images={card.images} interval={2800 + i * 200} />
              </div>
            ))}
          </div>

          {/* Right — Info card */}
          <div className="flex items-center">
            <div className="relative w-full">
              {cards.map((card, i) => (
                <div
                  key={i}
                  className="absolute inset-x-0 top-0 rounded-3xl p-8 transition-all duration-500 md:p-10"
                  style={{
                    backgroundColor: card.bgColor,
                    color: card.textColor,
                    opacity: i === activeIndex ? 1 : 0,
                    transform:
                      i === activeIndex
                        ? 'translateY(0) scale(1)'
                        : i < activeIndex
                          ? 'translateY(-40px) scale(0.96)'
                          : 'translateY(40px) scale(0.96)',
                    pointerEvents: i === activeIndex ? 'auto' : 'none',
                  }}
                >
                  <span
                    className="mb-2 inline-block rounded-full px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.12em]"
                    style={{
                      backgroundColor: card.textColor === '#ffffff' ? 'rgba(255,255,255,0.12)' : 'rgba(0,0,0,0.06)',
                    }}
                  >
                    {card.category}
                  </span>
                  <h3 className="font-galderglynn mt-4 text-3xl font-bold tracking-[-0.04em] md:text-4xl">
                    <TextRepel text={card.title} radius={100} strength={30} stiffness={200} damping={16} mass={0.3} />
                  </h3>
                  <p className="mt-4 text-base leading-relaxed opacity-75 md:text-lg">
                    {card.description}
                  </p>
                  <div className="mt-8 flex items-center gap-4">
                    <div className="flex -space-x-2">
                      {card.images.slice(0, 4).map((img, j) => (
                        <div
                          key={j}
                          className="h-10 w-10 overflow-hidden rounded-full border-2"
                          style={{ borderColor: card.bgColor }}
                        >
                          <img src={img} alt="" className="h-full w-full object-cover" />
                        </div>
                      ))}
                    </div>
                    <span className="text-sm opacity-60">
                      {card.images.length} fotos do projeto
                    </span>
                  </div>
                </div>
              ))}
              {/* Invisible spacer */}
              <div className="invisible rounded-3xl p-8 md:p-10">
                <span className="mb-2 inline-block rounded-full px-4 py-1.5 text-xs">_</span>
                <h3 className="mt-4 text-3xl font-bold md:text-4xl">_</h3>
                <p className="mt-4 text-base md:text-lg">Placeholder for layout height</p>
                <div className="mt-8 flex items-center gap-4">
                  <div className="h-10" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Side dots — progress indicator */}
        <div className="absolute right-4 top-1/2 hidden -translate-y-1/2 flex-col gap-3 lg:flex">
          {cards.map((_, i) => (
            <div
              key={i}
              className="rounded-full transition-all duration-300"
              style={{
                width: i === activeIndex ? 10 : 6,
                height: i === activeIndex ? 10 : 6,
                backgroundColor:
                  i === activeIndex
                    ? cards[activeIndex]?.bgColor === '#f2f4f7'
                      ? '#111111'
                      : cards[activeIndex]?.bgColor
                    : '#d1d5db',
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

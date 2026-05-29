import { Star } from 'lucide-react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

export function SocialProof() {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section ref={ref} className="bg-white py-20">
      <div
        className={`mx-auto flex max-w-7xl flex-col items-center gap-8 px-6 md:flex-row md:justify-center md:gap-16 ${
          isVisible ? 'animate-fade-up' : 'opacity-0'
        }`}
      >
        {/* Avatars stack */}
        <div className="flex items-center">
          <div className="flex -space-x-3">
            {(['FL', 'RS', 'JC', 'MO'] as const).map((initials, i) => {
              const colors = ['bg-[#ec5a29]', 'bg-[#2a2a2a]', 'bg-[#667085]', 'bg-[#d4451a]'];
              return (
                <div
                  key={initials}
                  className={`flex h-10 w-10 items-center justify-center rounded-full border-2 border-white text-[10px] font-bold text-white ${colors[i]}`}
                >
                  {initials}
                </div>
              );
            })}
          </div>
          <span className="ml-4 text-sm font-medium text-[var(--gray-500)]">
            +50 clientes satisfeitos
          </span>
        </div>

        {/* Divider */}
        <div className="hidden h-8 w-px bg-[var(--gray-200)] md:block" />

        {/* Stars */}
        <div className="flex items-center gap-3">
          <div className="flex gap-0.5">
            {[1, 2, 3, 4, 5].map((i) => (
              <Star
                key={i}
                className="h-5 w-5 fill-[var(--coral)] text-[var(--coral)]"
              />
            ))}
          </div>
          <span className="text-sm font-medium text-[var(--gray-500)]">
            5.0 no Google
          </span>
        </div>

        {/* Divider */}
        <div className="hidden h-8 w-px bg-[var(--gray-200)] md:block" />

        {/* Award */}
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1 text-[var(--coral)]">
            <span className="text-lg">🏆</span>
          </div>
          <span className="text-sm font-medium text-[var(--gray-500)]">
            Top Social Media 2024
          </span>
        </div>
      </div>
    </section>
  );
}

import { useScrollAnimation } from '@/hooks/useScrollAnimation';

import { TextRepel } from '@/components/ui/text-repel';

export function Hero() {
  const { ref, isVisible } = useScrollAnimation(0.1);

  return (
    <section id="hero" ref={ref} className="relative h-screen min-h-[700px] overflow-hidden">
      {/* Background photo - fills entire hero */}
      <div className="absolute inset-0">
        <img
          src="/images/hero-bianca.png"
          alt="Bianca - Social Media Manager"
          className={`h-full w-full object-cover object-[35%_15%] transition-transform duration-[2s] ease-out ${
            isVisible ? 'scale-100' : 'scale-105'
          }`}
        />
        {/* Dark overlay for text readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black/60" />
        {/* Bottom fade to white */}
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-white to-transparent dark:from-[#0a0a0a]" />
      </div>

      {/* Content overlaid on photo */}
      <div className="relative z-10 flex h-full flex-col items-center justify-center px-6 text-center">
        {/* Small tag */}
        <div
          className={`mb-8 rounded-full border border-white/30 bg-white/10 px-5 py-2 text-[13px] font-medium text-white/90 glass ${
            isVisible ? 'animate-fade-up' : 'opacity-0'
          }`}
        >
          <TextRepel
            text="Social Media & Conteúdo Digital"
            radius={80}
            strength={25}
            stiffness={200}
            damping={16}
            mass={0.3}
            letterClassName="text-[13px] font-medium"
          />
        </div>

        {/* Large name */}
        <h1
          className={`font-galderglynn text-[clamp(4rem,15vw,12rem)] font-bold leading-[0.9] tracking-[-0.06em] text-white ${
            isVisible ? 'animate-fade-up delay-100' : 'opacity-0'
          }`}
        >
          <TextRepel
            text="BIANCA"
            radius={150}
            strength={50}
            stiffness={200}
            damping={16}
            mass={0.3}
            letterClassName="font-galderglynn text-[clamp(4rem,15vw,12rem)] font-bold leading-[0.9] tracking-[-0.06em]"
          />
        </h1>

        {/* Subtitle */}
        <p
          className={`mt-6 max-w-md text-lg font-normal leading-relaxed text-white/80 ${
            isVisible ? 'animate-fade-up delay-200' : 'opacity-0'
          }`}
        >
          Transformando sua presença digital em resultados reais. Estratégia, conteúdo e gestão de mídias sociais.
        </p>

        {/* CTA buttons */}
        <div
          className={`mt-10 flex items-center gap-4 ${
            isVisible ? 'animate-fade-up delay-300' : 'opacity-0'
          }`}
        >
          <a
            href="#portfolio"

            className="rounded-full bg-[var(--black)] px-7 py-3.5 text-sm font-medium text-white transition-all duration-300 hover:bg-[var(--coral)]"
          >
            Ver portfolio
          </a>
          <a
            href="https://form.respondi.app/y0PBhqbR?utm_source=ig&utm_medium=social&utm_content=link_in_bio"
            target="_blank"
            rel="noopener noreferrer"

            className="rounded-full border border-white/40 bg-white/10 px-7 py-3.5 text-sm font-medium text-white glass transition-all duration-300 hover:bg-white/20"
          >
            Entre em contato
          </a>
        </div>
      </div>
    </section>
  );
}

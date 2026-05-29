import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { Typewriter } from './typewriter';

export function FeaturedPhoto() {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section ref={ref} className="bg-white px-6 py-16 dark:bg-[#0a0a0a]">
      <div
        className={`mx-auto max-w-5xl overflow-hidden rounded-3xl bg-[var(--black)] ${
          isVisible ? 'animate-scale-in' : 'opacity-0'
        }`}
      >
        <div className="relative aspect-[16/9] md:aspect-[21/9]">
          <img
            src="/images/bianca-blazer.png"
            alt="Bianca — Social Media Manager"
            className="h-full w-full object-cover opacity-80"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[var(--black)] via-transparent to-transparent" />
          <div className="absolute bottom-8 left-8 right-8 md:bottom-12 md:left-12">
            <p className="text-sm font-medium uppercase tracking-[0.15em] text-[var(--coral)]">
              Destaque
            </p>
            <h3 className="font-galderglynn mt-2 text-2xl font-medium tracking-[-0.04em] text-white md:text-3xl">
              <Typewriter
                words={[
                  'Criando conteúdo que conecta',
                  'Estratégia que gera resultados',
                  'Mídias sociais que engajam',
                ]}
                speed={80}
                delayBetweenWords={3000}
                cursorChar="|"
              />
            </h3>
            <p className="mt-2 max-w-md text-sm text-white/60">
              Mais de 3 anos transformando marcas através das mídias sociais
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

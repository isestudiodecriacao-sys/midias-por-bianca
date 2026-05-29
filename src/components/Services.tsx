import { useRef, useCallback, useState, useEffect } from 'react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

import { TextRepel } from '@/components/ui/text-repel';

const services = [
  {
    heading: 'Gestão de Mídias Sociais',
    tagline: '01 — Social Media',
    description:
      'Gerenciamento completo dos seus perfis nas redes sociais, desde planejamento até publicação e monitoramento.',
    imageUrl: '/images/portfolio/sancor/sancor-1.jpg',
    tags: ['Instagram', 'Facebook', 'TikTok'],
  },
  {
    heading: 'Criação de Conteúdo',
    tagline: '02 — Content',
    description:
      'Desenvolvimento de conteúdo visual e textual alinhado com a identidade da sua marca e objetivos.',
    imageUrl: '/images/portfolio/natural-one/natural-one-1.png',
    tags: ['Reels', 'Stories', 'Feed'],
  },
  {
    heading: 'Estratégia Digital',
    tagline: '03 — Strategy',
    description:
      'Planejamento estratégico baseado em dados para maximizar seu alcance e engajamento online.',
    imageUrl: '/images/portfolio/maringa-fc/maringa-fc-1.png',
    tags: ['Analytics', 'Planejamento', 'KPIs'],
  },
  {
    heading: 'Identidade Visual',
    tagline: '04 — Branding',
    description:
      'Criação de identidade visual consistente para suas redes, incluindo templates e guia de estilo.',
    imageUrl: '/images/portfolio/miss-sarandi/miss-sarandi-1.png',
    tags: ['Templates', 'Paleta', 'Guia de Estilo'],
  },
  {
    heading: 'Produção Fotográfica',
    tagline: '05 — Photography',
    description:
      'Sessões fotográficas profissionais para criar um banco de imagens autêntico para suas redes.',
    imageUrl: '/images/portfolio/sancor/sancor-2.jpg',
    tags: ['Ensaios', 'Produto', 'Lifestyle'],
  },
  {
    heading: 'Tráfego Pago',
    tagline: '06 — Ads',
    description:
      'Gestão de campanhas patrocinadas no Instagram, Facebook e Google para alcançar seu público ideal.',
    imageUrl: '/images/portfolio/maringa-fc/maringa-fc-2.png',
    tags: ['Meta Ads', 'Google Ads', 'ROI'],
  },
];

const CARD_COUNT = services.length;
const ANGLE_STEP = 360 / CARD_COUNT;
const RADIUS = 280;

function CylinderCard({ service }: { service: (typeof services)[0] }) {
  const innerRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    const el = innerRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    el.style.transition = 'none';
    el.style.transform = `scale(1.12) rotateX(${-y * 12}deg) rotateY(${x * 12}deg)`;
  }, []);

  const handleMouseLeave = useCallback(() => {
    const el = innerRef.current;
    if (!el) return;
    el.style.transition = 'transform 0.5s cubic-bezier(0.33, 1, 0.68, 1)';
    el.style.transform = 'scale(1) rotateX(0deg) rotateY(0deg)';
  }, []);

  return (
    <div
      ref={innerRef}
      className="h-full rounded-3xl overflow-hidden shadow-2xl shadow-black/30"
      style={{ transformStyle: 'preserve-3d' }}

      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <div className="flex h-full flex-col bg-neutral-950">
        {/* Image */}
        <div className="relative h-[150px] shrink-0 overflow-hidden">
          <img
            src={service.imageUrl}
            alt={service.heading}
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/20 to-transparent" />
          <span className="absolute left-4 top-3 text-xs font-medium text-white/80">
            {service.tagline}
          </span>
        </div>

        {/* Content */}
        <div className="relative -mt-3 flex flex-1 flex-col px-4 pb-4">
          <h3 className="font-galderglynn text-base font-medium leading-tight tracking-tight text-white">
            {service.heading}
          </h3>
          <p className="mt-1.5 line-clamp-2 text-[11px] leading-relaxed text-neutral-400">
            {service.description}
          </p>
          <a
            href="https://form.respondi.app/y0PBhqbR?utm_source=ig&utm_medium=social&utm_content=link_in_bio"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-3 inline-block w-fit rounded-full border border-neutral-700/50 bg-neutral-800/80 px-3 py-1.5 text-[10px] font-medium text-neutral-200 transition-colors hover:border-[var(--coral)] hover:text-white"
          >
            Solicitar orçamento
          </a>

          {/* Footer tags */}
          <div className="mt-auto flex items-center gap-1.5 border-t border-neutral-800/50 pt-3">
            <span className="text-[9px] text-neutral-500">mídias por bianca</span>
            <span className="ml-auto flex items-center gap-1">
              {service.tags.map((tag, j) => (
                <span key={tag} className="text-[9px] text-neutral-500">
                  {tag}
                  {j < service.tags.length - 1 && (
                    <span className="ml-1 text-neutral-600">✦</span>
                  )}
                </span>
              ))}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

function MobileCards({ services: svcList, isVisible }: { services: (typeof services); isVisible: boolean }) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    const onScroll = () => {
      const scrollLeft = el.scrollLeft;
      const cardWidth = el.querySelector('.snap-center')?.clientWidth || 280;
      const gap = 16;
      const index = Math.round(scrollLeft / (cardWidth + gap));
      setActiveIndex(Math.min(index, svcList.length - 1));
    };
    el.addEventListener('scroll', onScroll, { passive: true });
    return () => el.removeEventListener('scroll', onScroll);
  }, [svcList.length]);

  return (
    <div
      className={`lg:hidden ${
        isVisible ? 'animate-fade-in delay-300' : 'opacity-0'
      }`}
    >
      <div
        ref={scrollRef}
        className="flex gap-4 overflow-x-auto pb-4 pl-6 pr-6 snap-x snap-mandatory scrollbar-hide"
      >
        {svcList.map((service) => (
          <div key={service.heading} className="w-[280px] sm:w-[300px] h-[370px] shrink-0 snap-center">
            <CylinderCard service={service} />
          </div>
        ))}
      </div>
      <div className="mt-4 flex justify-center gap-1.5">
        {svcList.map((_, i) => (
          <button
            key={i}
            aria-label={`Card ${i + 1}`}
            onClick={() => {
              const el = scrollRef.current;
              if (!el) return;
              const card = el.querySelectorAll('.snap-center')[i] as HTMLElement;
              card?.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
            }}
            className={`h-1.5 rounded-full transition-all duration-300 ${
              i === activeIndex ? 'w-6 bg-[var(--coral)]' : 'w-1.5 bg-neutral-600'
            }`}
          />
        ))}
      </div>
    </div>
  );
}

export function Services() {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section id="services" ref={ref} className="bg-white py-16 md:py-28 dark:bg-[#0a0a0a] overflow-hidden">
      {/* Header */}
      <div className="mx-auto max-w-7xl px-6">
        <div
          className={`mb-10 md:mb-20 text-center ${
            isVisible ? 'animate-fade-up' : 'opacity-0'
          }`}
        >
          <span className="text-sm font-medium uppercase tracking-[0.15em] text-[var(--coral)]">
            Serviços
          </span>
          <h2 className="font-galderglynn mx-auto mt-4 max-w-2xl text-[clamp(2rem,4vw,3rem)] font-medium leading-[1.15] tracking-[-0.05em] text-[var(--black)]">
            <TextRepel text="Tudo que sua marca precisa para brilhar online" radius={100} strength={30} stiffness={200} damping={16} mass={0.3} />
          </h2>
          <p className="mx-auto mt-4 max-w-lg text-base leading-relaxed text-[var(--gray-500)]">
            Ofereço soluções completas de mídias sociais, desde a estratégia até
            a execução, para que você possa focar no que faz de melhor.
          </p>
        </div>
      </div>

      {/* Mobile/Tablet: horizontal scroll cards */}
      <MobileCards services={services} isVisible={isVisible} />

      {/* Desktop: 3D Cylinder */}
      <div
        className={`relative mx-auto hidden lg:block ${
          isVisible ? 'animate-fade-in delay-300' : 'opacity-0'
        }`}
        style={{ perspective: '1200px', height: 440 }}
      >
        <div
          className="cylinder-spin absolute left-1/2 top-1/2"
          style={{
            transformStyle: 'preserve-3d',
            width: 240,
            height: 370,
            marginLeft: -120,
            marginTop: -185,
          }}
        >
          {services.map((service, i) => (
            <div
              key={service.heading}
              className="absolute inset-0"
              style={{
                transform: `rotateY(${i * ANGLE_STEP}deg) translateZ(${RADIUS}px)`,
                backfaceVisibility: 'hidden',
              }}
            >
              <CylinderCard service={service} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

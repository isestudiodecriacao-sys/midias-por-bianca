import { ScrollSplitCard } from './ui/scroll-split-card';
import { TextRepel } from '@/components/ui/text-repel';

const projects = [
  {
    title: 'Sancor Seguros',
    category: 'Cobertura de Eventos',
    description:
      'Marketing e produção de conteúdo para eventos esportivos patrocinados pela Sancor Seguros. Cobertura completa de jogos e bastidores.',
    bgColor: '#1c1c1c',
    textColor: '#ffffff',
    images: [
      '/images/portfolio/sancor/sancor-4.jpg',
      '/images/portfolio/sancor/sancor-2.jpg',
      '/images/portfolio/sancor/sancor-3.jpg',
      '/images/portfolio/sancor/sancor-1.jpg',
    ],
  },
  {
    title: 'Miss Sarandi',
    category: 'Gestão de Mídias Sociais',
    description:
      'Produção fotográfica e gestão de redes sociais para o concurso Miss Sarandi. Desde os ensaios até a noite de gala.',
    bgColor: '#f2f4f7',
    textColor: '#111111',
    images: [
      '/images/portfolio/miss-sarandi/miss-sarandi-2.png',
      '/images/portfolio/miss-sarandi/miss-sarandi-1.png',
      '/images/portfolio/miss-sarandi/miss-sarandi-3.png',
    ],
  },
  {
    title: 'Natural One',
    category: 'Conteúdo & Ativações',
    description:
      'Criação de conteúdo e cobertura de ativações e eventos da marca de bebidas Natural One. Estratégia visual e engajamento.',
    bgColor: '#ec5a29',
    textColor: '#ffffff',
    images: [
      '/images/portfolio/natural-one/natural-one-1.png',
      '/images/portfolio/natural-one/natural-one-3.png',
      '/images/portfolio/natural-one/natural-one-4.png',
      '/images/portfolio/natural-one/natural-one-2.png',
      '/images/portfolio/natural-one/natural-one-5.png',
    ],
  },
  {
    title: 'Maringá FC',
    category: 'Marketing Esportivo',
    description:
      'Gestão de mídias sociais e cobertura de jogos para o Maringá Futebol Clube. Conteúdo para torcedores e patrocinadores.',
    bgColor: '#2a2a2a',
    textColor: '#ffffff',
    images: [
      '/images/portfolio/maringa-fc/maringa-fc-1.png',
      '/images/portfolio/maringa-fc/maringa-fc-2.png',
      '/images/portfolio/maringa-fc/maringa-fc-3.png',
      '/images/portfolio/maringa-fc/maringa-fc-4.png',
    ],
  },
];

export function Portfolio() {
  return (
    <section id="portfolio" className="bg-white dark:bg-[#0a0a0a]">
      {/* Section header */}
      <div className="mx-auto max-w-7xl px-6 pb-4 pt-28">
        <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <div>
            <span className="text-sm font-medium uppercase tracking-[0.15em] text-[var(--coral)]">
              Portfolio
            </span>
            <h2 className="font-galderglynn mt-4 text-[clamp(2rem,4vw,3rem)] font-medium leading-[1.15] tracking-[-0.05em] text-[var(--black)]">
              <TextRepel text="Trabalhos em destaque" radius={100} strength={30} stiffness={200} damping={16} mass={0.3} />
            </h2>
          </div>
          <a
            href="https://form.respondi.app/y0PBhqbR?utm_source=ig&utm_medium=social&utm_content=link_in_bio"
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-2 text-sm font-medium text-[var(--black)] transition-colors hover:text-[var(--coral)]"
          >
            Solicite um orçamento
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
            >
              <path d="M7 7h10v10" />
              <path d="M7 17 17 7" />
            </svg>
          </a>
        </div>
      </div>

      {/* Scroll-split cards — driven by main page scroll */}
      <ScrollSplitCard cards={projects} />
    </section>
  );
}

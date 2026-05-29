import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { BracketCard } from './BracketCard';
import { ArrowUpRight } from 'lucide-react';
import { TextRepel } from '@/components/ui/text-repel';

const posts = [
  {
    title: 'Como criar um feed harmonioso no Instagram em 2024',
    category: 'Dicas',
    date: '15 Jan 2024',
    image: '/images/bianca-white.png',
    featured: true,
  },
  {
    title: '5 tendências de conteúdo que vão dominar as redes sociais',
    category: 'Tendências',
    date: '22 Fev 2024',
    image: '/images/portfolio/sancor/sancor-2.jpg',
    featured: false,
  },
  {
    title: 'Reels vs. Stories: qual funciona melhor para sua marca?',
    category: 'Estratégia',
    date: '08 Mar 2024',
    image: '/images/portfolio/natural-one/natural-one-1.png',
    featured: false,
  },
  {
    title: 'O guia completo de copywriting para mídias sociais',
    category: 'Conteúdo',
    date: '19 Abr 2024',
    image: '/images/bianca-blazer.png',
    featured: false,
  },
];

export function Blog() {
  const { ref, isVisible } = useScrollAnimation();
  const featured = posts.find((p) => p.featured);
  const rest = posts.filter((p) => !p.featured);

  return (
    <section id="blog" ref={ref} className="bg-white py-28 dark:bg-[#0a0a0a]">
      <div className="mx-auto max-w-7xl px-6">
        {/* Header */}
        <div className="mb-16 flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <div
            className={`${isVisible ? 'animate-fade-up' : 'opacity-0'}`}
          >
            <span className="text-sm font-medium uppercase tracking-[0.15em] text-[var(--coral)]">
              Blog
            </span>
            <h2 className="font-galderglynn mt-4 text-[clamp(2rem,4vw,3rem)] font-medium leading-[1.15] tracking-[-0.05em] text-[var(--black)]">
              <TextRepel text="Dicas e insights" radius={100} strength={30} stiffness={200} damping={16} mass={0.3} />
            </h2>
          </div>
          <a
            href="#"
            className={`group flex items-center gap-2 text-sm font-medium text-[var(--black)] transition-colors hover:text-[var(--coral)] ${
              isVisible ? 'animate-fade-up delay-200' : 'opacity-0'
            }`}
          >
            Ver todos os artigos
            <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </a>
        </div>

        {/* Grid */}
        <div className="grid gap-6 lg:grid-cols-[1.5fr,1fr]">
          {/* Featured */}
          {featured && (
            <BracketCard
              className={`${isVisible ? 'animate-fade-up delay-100' : 'opacity-0'}`}
            >
              <div className="overflow-hidden rounded-xl">
                <img
                  src={featured.image}
                  alt={featured.title}
                  className="aspect-[16/10] w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
              <div className="mt-5">
                <div className="flex items-center gap-3">
                  <span className="rounded-full bg-[var(--coral)]/10 px-3 py-1 text-xs font-medium text-[var(--coral)]">
                    {featured.category}
                  </span>
                  <span className="text-xs text-[var(--gray-400)]">
                    {featured.date}
                  </span>
                </div>
                <h3 className="font-galderglynn mt-3 text-xl font-medium tracking-[-0.04em] text-[var(--black)]">
                  {featured.title}
                </h3>
              </div>
            </BracketCard>
          )}

          {/* Small posts */}
          <div className="flex flex-col gap-4">
            {rest.map((post, i) => (
              <BracketCard
                key={post.title}
                className={`${isVisible ? 'animate-fade-up' : 'opacity-0'}`}
              >
                <div
                  className="flex gap-4"
                  style={{ animationDelay: `${0.2 + i * 0.1}s` }}
                >
                  <div className="h-20 w-20 shrink-0 overflow-hidden rounded-lg">
                    <img
                      src={post.image}
                      alt={post.title}
                      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                  </div>
                  <div className="flex flex-col justify-center">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-medium text-[var(--coral)]">
                        {post.category}
                      </span>
                      <span className="text-xs text-[var(--gray-400)]">
                        {post.date}
                      </span>
                    </div>
                    <h3 className="mt-1 text-sm font-medium leading-snug tracking-[-0.03em] text-[var(--black)]">
                      {post.title}
                    </h3>
                  </div>
                </div>
              </BracketCard>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

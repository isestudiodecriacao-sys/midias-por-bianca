import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { Star } from 'lucide-react';
import { TextRepel } from '@/components/ui/text-repel';
import {
  Avatar,
  AvatarFallback,
  AvatarGroup,
  AvatarImage,
} from '@/components/ui/avatar';
import { Marquee } from './ui/marquee';

const testimonials = [
  {
    name: 'Fernanda Lima',
    role: 'CEO, Studio Vitória',
    initials: 'FL',
    avatar:
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=96&h=96&q=80',
    text: 'A Bianca transformou completamente a presença digital do nosso estúdio. Em 3 meses, triplicamos nosso engajamento e as vendas pelo Instagram aumentaram 200%.',
    rating: 5,
  },
  {
    name: 'Rafael Santos',
    role: 'Fundador, Café & Arte',
    initials: 'RS',
    avatar:
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=96&h=96&q=80',
    text: 'Profissionalismo e criatividade definem o trabalho da Bianca. Ela entendeu nossa marca desde o primeiro dia e criou um conteúdo que realmente representa quem somos.',
    rating: 5,
  },
  {
    name: 'Juliana Costa',
    role: 'Diretora, Moda Brasil',
    initials: 'JC',
    avatar:
      'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=96&h=96&q=80',
    text: 'Trabalhar com a Bianca foi a melhor decisão que tomamos para nossa marca. Sua estratégia de conteúdo nos trouxe resultados que não imaginávamos ser possíveis.',
    rating: 5,
  },
  {
    name: 'Marcos Oliveira',
    role: 'Proprietário, Espaço Zen',
    initials: 'MO',
    avatar:
      'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=96&h=96&q=80',
    text: 'Além de talentosa, a Bianca é extremamente dedicada. Sempre atenta às tendências e proativa em trazer novas ideias para nossas redes.',
    rating: 5,
  },
  {
    name: 'Camila Ferreira',
    role: 'Fundadora, Beleza Natural',
    initials: 'CF',
    avatar:
      'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=96&h=96&q=80',
    text: 'A qualidade do conteúdo que a Bianca produz é incomparável. Fotos, textos, stories — tudo pensado estrategicamente e com um acabamento impecável.',
    rating: 5,
  },
  {
    name: 'Ana Rodrigues',
    role: 'Sócia, Doce Encanto',
    initials: 'AR',
    avatar:
      'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=96&h=96&q=80',
    text: 'Já trabalhei com outras profissionais de social media, mas nenhuma se compara ao nível de comprometimento e resultado que a Bianca entrega.',
    rating: 5,
  },
];

function TestimonialCard({ t }: { t: (typeof testimonials)[0] }) {
  return (
    <div className="w-[340px] shrink-0 rounded-2xl bg-white p-6 shadow-[0_2px_8px_rgba(0,0,0,0.04)] dark:bg-[#1a1a1a]">
      {/* Stars */}
      <div className="flex gap-0.5">
        {Array.from({ length: t.rating }).map((_, j) => (
          <Star
            key={j}
            className="h-4 w-4 fill-[var(--coral)] text-[var(--coral)]"
          />
        ))}
      </div>

      {/* Text */}
      <p className="mt-4 line-clamp-4 text-sm leading-relaxed text-[var(--gray-500)]">
        &ldquo;{t.text}&rdquo;
      </p>

      {/* Author */}
      <div className="mt-5 flex items-center gap-3">
        <Avatar className="size-9">
          <AvatarImage src={t.avatar} alt={t.name} />
          <AvatarFallback className="bg-[var(--coral)] text-xs font-semibold text-white">
            {t.initials}
          </AvatarFallback>
        </Avatar>
        <div>
          <p className="text-sm font-medium text-[var(--black)]">{t.name}</p>
          <p className="text-xs text-[var(--gray-400)]">{t.role}</p>
        </div>
      </div>
    </div>
  );
}

export function Testimonials() {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section ref={ref} className="bg-[var(--gray-50)] py-28">
      {/* Header + Social Proof */}
      <div className="mx-auto max-w-7xl px-6">
        <div
          className={`mb-12 flex flex-col items-center text-center ${
            isVisible ? 'animate-fade-up' : 'opacity-0'
          }`}
        >
          <span className="text-sm font-medium uppercase tracking-[0.15em] text-[var(--coral)]">
            Depoimentos
          </span>
          <h2 className="font-galderglynn mt-4 text-[clamp(2rem,4vw,3rem)] font-medium leading-[1.15] tracking-[-0.05em] text-[var(--black)]">
            <TextRepel text="O que dizem sobre meu trabalho" radius={100} strength={30} stiffness={200} damping={16} mass={0.3} />
          </h2>

          {/* Avatar social proof pill */}
          <div className="mt-6 inline-flex items-center gap-2 rounded-full border border-[var(--gray-100)] bg-white px-3 py-1.5 shadow-sm dark:bg-[#1a1a1a]">
            <AvatarGroup>
              {testimonials.slice(0, 4).map((t) => (
                <Avatar key={t.name} className="size-7 border-2 border-white dark:border-[#1a1a1a]">
                  <AvatarImage src={t.avatar} alt={t.name} />
                  <AvatarFallback className="bg-[var(--coral)] text-[10px] font-semibold text-white">
                    {t.initials}
                  </AvatarFallback>
                </Avatar>
              ))}
            </AvatarGroup>
            <p className="text-xs text-[var(--gray-500)]">
              Aprovado por{' '}
              <span className="font-semibold text-[var(--black)]">+50</span>{' '}
              marcas
            </p>
          </div>
        </div>
      </div>

      {/* Scrolling testimonial cards */}
      <div
        className={`${isVisible ? 'animate-fade-up delay-200' : 'opacity-0'}`}
      >
        <Marquee speed={25} gap="16px" fade>
          {testimonials.map((t) => (
            <TestimonialCard key={t.name} t={t} />
          ))}
        </Marquee>
      </div>
    </section>
  );
}

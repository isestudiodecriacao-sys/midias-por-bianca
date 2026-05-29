import { Marquee } from './ui/marquee';

interface Brand {
  name: string;
  logo: string;
  width: number;
}

const brands: Brand[] = [
  { name: 'Sancor Seguros', logo: '/images/brands/sancor-seguros.png', width: 150 },
  { name: 'Natural One', logo: '/images/brands/natural-one.png', width: 85 },
  { name: 'Melissa', logo: '/images/brands/melissa.png', width: 120 },
  { name: 'Maringá FC', logo: '/images/brands/maringa-fc.png', width: 80 },
  { name: 'Faça Consórcio', logo: '/images/brands/faca-consorcio.png', width: 150 },
  { name: 'Galeria', logo: '/images/brands/galeria.png', width: 50 },
  { name: 'Sancor Seguros 2', logo: '/images/brands/sancor-seguros.png', width: 150 },
  { name: 'Natural One 2', logo: '/images/brands/natural-one.png', width: 85 },
  { name: 'Melissa 2', logo: '/images/brands/melissa.png', width: 120 },
  { name: 'Maringá FC 2', logo: '/images/brands/maringa-fc.png', width: 80 },
  { name: 'Faça Consórcio 2', logo: '/images/brands/faca-consorcio.png', width: 150 },
  { name: 'Galeria 2', logo: '/images/brands/galeria.png', width: 50 },
];

export function FeaturedOn() {
  return (
    <section className="-mt-px bg-white py-8 dark:bg-[#0a0a0a]">
      <Marquee speed={30} gap="80px" fade pauseOnHover>
        {brands.map((brand) => (
          <img
            key={brand.name}
            src={brand.logo}
            alt={brand.name}
            style={{ width: brand.width, mixBlendMode: 'darken' }}
            className="shrink-0 object-contain brightness-0 opacity-30 transition-all duration-500 hover:brightness-100 hover:opacity-100 dark:brightness-0 dark:invert dark:opacity-40 dark:hover:invert-0 dark:hover:brightness-100 dark:hover:opacity-100"
          />
        ))}
      </Marquee>
    </section>
  );
}

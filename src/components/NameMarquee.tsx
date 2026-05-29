import { Marquee } from './ui/marquee';

const items = Array.from({ length: 8 }, (_, i) => i);

export function NameMarquee() {
  return (
    <section className="overflow-hidden bg-white py-10 dark:bg-[#0a0a0a]">
      <Marquee speed={60} gap="64px" fade={false}>
        {items.map((i) => (
          <span
            key={i}
            className="font-galderglynn whitespace-nowrap text-[clamp(3rem,8vw,6rem)] font-bold uppercase leading-none tracking-[-0.04em] text-[var(--black)]"
          >
            Bianca Martins
            <span className="mx-8 inline-block text-[var(--coral)]">•</span>
          </span>
        ))}
      </Marquee>
    </section>
  );
}

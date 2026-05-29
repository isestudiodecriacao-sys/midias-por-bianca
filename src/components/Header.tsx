import { useState, useEffect } from 'react';
import { Camera, Menu, X } from 'lucide-react';
import { useTheme } from '@/hooks/useTheme';


export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { dark, toggle } = useTheme();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Início', href: '#hero' },
    { label: 'Serviços', href: '#services' },
    { label: 'Portfolio', href: '#portfolio' },
    { label: 'Blog', href: '#blog' },
    { label: 'FAQ', href: '#faq' },
  ];

  return (
    <>
      {/* Top header - white text over hero photo, transitions to dark after scroll */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 px-6 py-5 transition-all duration-500 ${
          scrolled ? 'bg-white/90 dark:bg-[#111]/90 glass shadow-[0_2px_20px_rgba(0,0,0,0.06)]' : ''
        }`}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between">
          <a
            href="#"
            className={`font-galderglynn text-lg font-semibold tracking-[-0.05em] transition-colors duration-500 ${
              scrolled ? 'text-[var(--black)]' : 'text-white'
            }`}
          >
            mídias por bianca
          </a>

          <button
            onClick={() => toggle()}
            className="animate-rotate-in delay-500 relative"
            aria-label="Alternar tema"
          >
            <Camera
              className={`h-6 w-6 transition-colors duration-500 ${
                scrolled ? 'text-[var(--black)]' : 'text-white'
              }`}
              strokeWidth={1.5}
            />
            {!dark && (
              <svg
                className={`absolute -right-1.5 -top-1.5 h-3.5 w-3.5 transition-colors duration-500 ${
                  scrolled ? 'text-[var(--coral)]' : 'text-yellow-300'
                }`}
                viewBox="0 0 14 14"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
              >
                <circle cx="7" cy="7" r="2.5" fill="currentColor" />
                <line x1="7" y1="0.5" x2="7" y2="2.5" />
                <line x1="7" y1="11.5" x2="7" y2="13.5" />
                <line x1="0.5" y1="7" x2="2.5" y2="7" />
                <line x1="11.5" y1="7" x2="13.5" y2="7" />
                <line x1="2.4" y1="2.4" x2="3.8" y2="3.8" />
                <line x1="10.2" y1="10.2" x2="11.6" y2="11.6" />
                <line x1="2.4" y1="11.6" x2="3.8" y2="10.2" />
                <line x1="10.2" y1="3.8" x2="11.6" y2="2.4" />
              </svg>
            )}
          </button>

          <a
            href="https://form.respondi.app/y0PBhqbR?utm_source=ig&utm_medium=social&utm_content=link_in_bio"
            target="_blank"
            rel="noopener noreferrer"
            className={`hidden rounded-full px-6 py-2.5 text-sm font-medium transition-all duration-300 md:inline-flex ${
              scrolled
                ? 'bg-[var(--black)] text-white hover:bg-[var(--coral)]'
                : 'bg-white/15 text-white glass border border-white/20 hover:bg-white/25'
            }`}
          >
            Contato
          </a>

          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className={`transition-colors md:hidden ${scrolled ? 'text-[var(--black)]' : 'text-white'}`}
          >
            {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </header>

      {/* Floating bottom navbar — hidden on mobile/tablet, shown on lg+ */}
      <nav
        className={`fixed bottom-7 left-1/2 z-50 -translate-x-1/2 transition-all duration-500 hidden lg:block ${
          scrolled ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'
        }`}
      >
        <div className="glass flex items-center gap-1 rounded-full border border-white/10 bg-[var(--black)]/90 px-2 py-2 shadow-[0_12px_37px_rgba(0,0,0,0.25)]">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="rounded-full px-4 py-2 text-[13px] font-medium text-white/70 transition-all duration-300 hover:bg-white/10 hover:text-white"
            >
              {link.label}
            </a>
          ))}
          <a
            href="https://form.respondi.app/y0PBhqbR?utm_source=ig&utm_medium=social&utm_content=link_in_bio"
            target="_blank"
            rel="noopener noreferrer"
            className="ml-1 rounded-full bg-[var(--coral)] px-5 py-2 text-[13px] font-medium text-white transition-all duration-300 hover:bg-[var(--coral-light)]"
          >
            Contato
          </a>
        </div>
      </nav>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="fixed inset-0 z-40 flex flex-col items-center justify-center gap-8 bg-white dark:bg-[#0a0a0a] md:hidden">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              className="text-2xl font-medium text-[var(--black)] transition-colors hover:text-[var(--coral)]"
            >
              {link.label}
            </a>
          ))}
          <a
            href="https://form.respondi.app/y0PBhqbR?utm_source=ig&utm_medium=social&utm_content=link_in_bio"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setMobileOpen(false)}
            className="mt-4 rounded-full bg-[var(--black)] px-8 py-3 text-base font-medium text-white"
          >
            Contato
          </a>
        </div>
      )}
    </>
  );
}

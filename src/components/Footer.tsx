import { ArrowUp } from 'lucide-react';
import { TextRepel } from '@/components/ui/text-repel';

function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  );
}

function LinkedinIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect width="4" height="12" x="2" y="9" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  );
}

function YoutubeIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17" />
      <path d="m10 15 5-3-5-3z" />
    </svg>
  );
}

export function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="border-t border-[var(--gray-100)] bg-white dark:bg-[#0a0a0a]">
      {/* Social links bar */}
      <div className="border-b border-[var(--gray-100)] py-10">
        <div className="mx-auto flex max-w-7xl flex-col items-center gap-6 px-6 md:flex-row md:justify-center">
          <span className="text-sm text-[var(--gray-400)]">Me siga nas redes</span>
          <div className="flex items-center gap-4">
            <a
              href="https://www.instagram.com/midiasporbianca/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-10 w-10 items-center justify-center rounded-full bg-[var(--gray-50)] text-[var(--gray-500)] transition-all duration-300 hover:bg-[var(--coral)] hover:text-white"
            >
              <InstagramIcon className="h-4 w-4" />
            </a>
            <a
              href="#"
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-10 w-10 items-center justify-center rounded-full bg-[var(--gray-50)] text-[var(--gray-500)] transition-all duration-300 hover:bg-[var(--coral)] hover:text-white"
            >
              <LinkedinIcon className="h-4 w-4" />
            </a>
            <a
              href="#"
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-10 w-10 items-center justify-center rounded-full bg-[var(--gray-50)] text-[var(--gray-500)] transition-all duration-300 hover:bg-[var(--coral)] hover:text-white"
            >
              <YoutubeIcon className="h-4 w-4" />
            </a>
          </div>
        </div>
      </div>

      {/* Main footer */}
      <div className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid gap-12 md:grid-cols-[2fr,1fr,1fr]">
          {/* Brand */}
          <div>
            <h3 className="font-galderglynn text-lg font-semibold tracking-[-0.05em] text-[var(--black)]">
              <TextRepel text="mídias por bianca" radius={80} strength={25} stiffness={200} damping={16} mass={0.3} />
            </h3>
            <div className="mt-3 max-w-xs text-sm leading-relaxed text-[var(--gray-500)] text-left">
              Transformando a presença digital de marcas com estratégia, criatividade e conteúdo autêntico.
            </div>
          </div>

          {/* Pages */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-[0.15em] text-[var(--gray-400)]">
              Páginas
            </h4>
            <div className="mt-4 flex flex-col gap-3">
              {['Início', 'Serviços', 'Portfolio', 'Blog', 'FAQ'].map(
                (page) => (
                  <a
                    key={page}
                    href={`#${page.toLowerCase()}`}
                    className="text-sm text-[var(--gray-500)] transition-colors duration-300 hover:text-[var(--coral)]"
                  >
                    {page}
                  </a>
                ),
              )}
            </div>
          </div>

          {/* Info */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-[0.15em] text-[var(--gray-400)]">
              Informações
            </h4>
            <div className="mt-4 flex flex-col gap-3">
              <a
                href="https://form.respondi.app/y0PBhqbR?utm_source=ig&utm_medium=social&utm_content=link_in_bio"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-[var(--gray-500)] transition-colors duration-300 hover:text-[var(--coral)]"
              >
                Contato
              </a>
              <a
                href="#"
                className="text-sm text-[var(--gray-500)] transition-colors duration-300 hover:text-[var(--coral)]"
              >
                Política de Privacidade
              </a>
              <a
                href="#"
                className="text-sm text-[var(--gray-500)] transition-colors duration-300 hover:text-[var(--coral)]"
              >
                Termos de Uso
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-[var(--gray-100)]">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-6">
          <p className="flex items-center gap-1.5 text-xs text-[var(--gray-400)]">
            Feito por <span className="font-medium text-[var(--gray-500)]">IS Estúdio de Criação</span>
          </p>
          <button
            onClick={scrollToTop}
            className="flex h-8 w-8 items-center justify-center rounded-full bg-[var(--gray-50)] text-[var(--gray-500)] transition-all duration-300 hover:bg-[var(--coral)] hover:text-white"
          >
            <ArrowUp className="h-4 w-4" />
          </button>
        </div>
      </div>
    </footer>
  );
}

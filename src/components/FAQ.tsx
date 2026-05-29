import { useState } from 'react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { Plus, Minus } from 'lucide-react';

import { TextRepel } from '@/components/ui/text-repel';

const faqs = [
  {
    question: 'Quais redes sociais você gerencia?',
    answer:
      'Trabalho com Instagram, Facebook, TikTok, LinkedIn e Pinterest. A escolha das plataformas depende do perfil do seu negócio e onde seu público-alvo está presente.',
  },
  {
    question: 'Como funciona o processo de trabalho?',
    answer:
      'Começamos com uma reunião de briefing para entender sua marca, objetivos e público. Em seguida, desenvolvo a estratégia, calendario editorial e identidade visual. Após aprovação, inicio a produção e gestão do conteúdo.',
  },
  {
    question: 'Qual é o prazo para ver resultados?',
    answer:
      'Resultados orgânicos consistentes geralmente aparecem entre 2 a 4 meses. Com estratégias de tráfego pago, os primeiros resultados podem ser vistos em semanas. Cada caso é único e depende do nicho e investimento.',
  },
  {
    question: 'Você produz as fotos e vídeos?',
    answer:
      'Sim! Ofereço sessões fotográficas e produção de vídeos curtos como parte dos meus pacotes. Também trabalho com material fornecido pelo cliente, adaptando-o para as redes sociais.',
  },
  {
    question: 'Quais são os planos e valores?',
    answer:
      'Tenho pacotes mensais que variam conforme o número de publicações, plataformas e serviços inclusos. Entre em contato para receber uma proposta personalizada para o seu negócio.',
  },
  {
    question: 'Posso cancelar a qualquer momento?',
    answer:
      'Sim, não trabalho com contratos de fidelidade. Peço apenas um aviso prévio de 30 dias para uma transição organizada do conteúdo e acessos.',
  },
];

export function FAQ() {
  const { ref, isVisible } = useScrollAnimation();
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section id="faq" ref={ref} className="bg-[var(--gray-50)] py-28">
      <div className="mx-auto max-w-3xl px-6">
        {/* Header */}
        <div
          className={`mb-16 text-center ${isVisible ? 'animate-fade-up' : 'opacity-0'}`}
        >
          <span className="text-sm font-medium uppercase tracking-[0.15em] text-[var(--coral)]">
            FAQ
          </span>
          <h2 className="font-galderglynn mt-4 text-[clamp(2rem,4vw,3rem)] font-medium leading-[1.15] tracking-[-0.05em] text-[var(--black)]">
            <TextRepel text="Perguntas frequentes" radius={100} strength={30} stiffness={200} damping={16} mass={0.3} />
          </h2>
        </div>

        {/* Accordion */}
        <div className="space-y-3">
          {faqs.map((faq, i) => {
            const isOpen = openIndex === i;
            return (
              <div
                key={i}
                onMouseEnter={() => setOpenIndex(i)}
                onMouseLeave={() => setOpenIndex(null)}
                className={`overflow-hidden rounded-2xl bg-white transition-all duration-500 dark:bg-[#1a1a1a] ${
                  isOpen ? 'shadow-[0_12px_37px_var(--shadow-sm)]' : ''
                } ${isVisible ? 'animate-fade-up' : 'opacity-0'}`}
                style={{ animationDelay: `${0.1 + i * 0.06}s` }}
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : i)}
                  className="flex w-full items-center justify-between p-6 text-left"
                >
                  <span className="pr-4 text-base font-medium tracking-[-0.03em] text-[var(--black)]">
                    {faq.question}
                  </span>
                  <div
                    className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full transition-all duration-300 ${
                      isOpen
                        ? 'bg-[var(--coral)] text-white'
                        : 'bg-[var(--gray-50)] text-[var(--gray-500)]'
                    }`}
                  >
                    {isOpen ? (
                      <Minus className="h-3.5 w-3.5" />
                    ) : (
                      <Plus className="h-3.5 w-3.5" />
                    )}
                  </div>
                </button>
                <div
                  className={`grid transition-all duration-300 ease-in-out ${
                    isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
                  }`}
                >
                  <div className="overflow-hidden">
                    <p className="px-6 pb-6 text-sm leading-relaxed text-[var(--gray-500)]">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

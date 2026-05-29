import { useRef, useEffect, useState } from 'react';
import { TextRepel } from '@/components/ui/text-repel';

const reels = [
  'AQMHw5hULgf7HTk1HL3S_O1x7ZednnYi_lmX-9Rs0kx4WrP6c2dtL3tacIfqCArxoCockm0PmlPw8eUHKL8iDaoB1YpHxqG6GHI2OKo',
  'AQOP3z2TMjvbk9JQbacA3Grt0c9EW-s-EVco3Ua_gS01xH--91DmZ8EamDpCXUsZsd1zF1S2DbBGSP0_H1420jF3UgqIBJ6_UBTisaE',
  'AQMwJPOHIteCqvCEYqlIkoM61BvwimbefPJv3vXTxur8L89xxZqviNILEBaRAy__fRDo5UZL16IRrw5opIusJByVNcBJnr0VfxAVQSU',
  'AQO7Idu_XVNhdoS93G0HhFCqF9XxzQsniatAIYO0mARyYadKDDfCC85DJKyW0rs5UGSLSiSOqJFc-6Z6JDXBn3inmvre7tqS44ul5o0',
  'AQNR_gXaUf0WIqVGat_Ck9Z6vkg27JRk3F_cs8et02bsy124oPv55B08x_tLryJRNH2txxeVdcH643k_dQaKN29wbH4j9HK7AA4AoYg',
  'AQO7vU7a2PbkGEGYAfJwcwg4jnwuiccCahQVh0BnqQcAG_I_ev1lKAwPVzrPAMdxMLwa4fvqPZRFg1GXi7qW_bRpJcXKgfcpWHJt7n8',
  'AQMfvU1uaQE5I5LBMtWyowmJK2zC2MIBrbIENFz6kjo5Myv1lma_2u9fiy_xtLmLKzNixEsg5yD0l6oARcz6MpB9kvvYUZa6ccgdM7A',
  'AQMDadF7oPnw0lsY6ddpYXueD0X-XLexBNzLeviSSpfdnwkBymjTgIEUec65QA5GkdBIKyTmhsjEpJGb037rQugdujGqCejD_Qu4EwQ',
  'AQP7J7d6aWZY2QEDluqq8y9B_4OyV_JWtz1p-4xE5q2iSRnz1380QzzuOAyRD7SuS7rKEfdPJCWt4lwTm4EJuTRnt0Ui4_z8Mk040iA',
  'AQORqqfIVrFrbhKhYhXl5uovpZOxckxFJU2V2Um3DQYyISANN5mLEWZTUvkJIf7UGh4nWq63Y9REwGh2sQUsZComomRq8aH2GPXly5s',
  'AQNj0atlY0_4UbeB0SEEnDxMfczuanbhceAJdflCP9aVwgnxX_Zw96EePuAHraG1J82mHwjchcpKD3a3Ati3J0yKoTKn6eThAeBIGsg',
];

export function Reels() {
  const outerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number>(0);
  const [extraHeight, setExtraHeight] = useState(2000);

  useEffect(() => {
    const calc = () => {
      const track = trackRef.current;
      if (!track) return;
      const overflow = track.scrollWidth - window.innerWidth + 80;
      setExtraHeight(Math.max(0, overflow));
    };
    calc();
    window.addEventListener('resize', calc);
    return () => window.removeEventListener('resize', calc);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(() => {
        const outer = outerRef.current;
        const track = trackRef.current;
        if (!outer || !track) return;

        const rect = outer.getBoundingClientRect();
        const scrollable = outer.offsetHeight - window.innerHeight;
        if (scrollable <= 0) return;

        const scrolled = Math.max(0, -rect.top);
        const progress = Math.min(1, Math.max(0, scrolled / scrollable));

        const maxTranslate = track.scrollWidth - window.innerWidth + 40;
        track.style.transform = `translateX(${-progress * Math.max(0, maxTranslate)}px)`;
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => {
      window.removeEventListener('scroll', handleScroll);
      cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <div ref={outerRef} style={{ height: `calc(100vh + ${extraHeight}px)` }}>
      <div className="sticky top-0 flex h-screen flex-col items-start justify-center overflow-hidden bg-[var(--gray-50)] dark:bg-[#0a0a0a]">
        {/* Header */}
        <div className="mx-auto mb-10 w-full max-w-7xl px-6">
          <div className="text-center">
            <span className="text-sm font-medium uppercase tracking-[0.15em] text-[var(--coral)]">
              Reels
            </span>
            <h2 className="font-galderglynn mx-auto mt-4 max-w-2xl text-[clamp(2rem,4vw,3rem)] font-medium leading-[1.15] tracking-[-0.05em] text-[var(--black)]">
              <TextRepel text="Conteúdo que engaja e converte" radius={100} strength={30} stiffness={200} damping={16} mass={0.3} />
            </h2>
          </div>
        </div>

        {/* Horizontal reel track */}
        <div
          ref={trackRef}
          className="flex gap-4 pl-6"
          style={{ willChange: 'transform' }}
        >
          {reels.map((id, i) => (
            <div
              key={i}
              className="shrink-0 overflow-hidden rounded-2xl bg-black shadow-lg"
              style={{ width: 220, height: 390 }}
            >
              <video
                src={`/REELS BIANCA/SaveClip.App_${id}.mp4`}
                muted
                autoPlay
                loop
                playsInline
                className="h-full w-full object-cover"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

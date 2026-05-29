import { Header } from '@/components/Header';
import { Hero } from '@/components/Hero';
import { ScrollProgress } from '@/components/scroll-progress';

import { Philosophy } from '@/components/Philosophy';
import { FeaturedPhoto } from '@/components/FeaturedPhoto';
import { Services } from '@/components/Services';
import { Benefits } from '@/components/Benefits';
import { FeaturedOn } from '@/components/FeaturedOn';
import { Portfolio } from '@/components/Portfolio';
import { Reels } from '@/components/Reels';
import { Testimonials } from '@/components/Testimonials';
import { Blog } from '@/components/Blog';
import { NameMarquee } from '@/components/NameMarquee';
import { FAQ } from '@/components/FAQ';
import { CTA } from '@/components/CTA';
import { Footer } from '@/components/Footer';
import { NoiseTexture } from '@/components/ui/noise-texture';

function App() {
  return (
    <div className="relative min-h-screen bg-white transition-colors duration-500 dark:bg-[#0a0a0a]">
      <NoiseTexture opacity={0.08} grain="fine" blend="overlay" speed={8} className="fixed inset-0 z-50" />
      <ScrollProgress
        variant="custom"
        customGradient="bg-gradient-to-r from-[var(--coral)] to-[var(--coral-light)]"
        size="sm"
        position="bottom"
      />
      <Header />
      <main>
        <Hero />
        <FeaturedOn />
        <Philosophy />
        <FeaturedPhoto />
        <Services />
        <Benefits />
        <Portfolio />
        <Reels />
        <Testimonials />
        <Blog />
        <NameMarquee />
        <FAQ />
        <CTA />
      </main>
      <Footer />
    </div>
  );
}

export default App;

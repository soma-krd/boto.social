'use client';

import { HomeHeader } from './header';
import { HeroSection } from './hero-section';
import { FeaturesSection } from './features-section';
import { FAQSection } from './faq-section';
import { Footer } from './footer';

export function HomePage() {
  return (
    <div className="min-h-screen bg-[#f8faff] text-[#202124]">
      <HomeHeader />
      <main>
        <HeroSection />
        <FeaturesSection />
        <FAQSection />
      </main>
      <Footer />
    </div>
  );
}


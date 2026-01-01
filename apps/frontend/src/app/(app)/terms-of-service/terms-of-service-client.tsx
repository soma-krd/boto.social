'use client';

import { TermsOfServiceContent } from '@gitroom/frontend/components/legal/terms-of-service-content';
import { HomeHeader } from '@gitroom/frontend/components/home/header';
import { Footer } from '@gitroom/frontend/components/home/footer';

export function TermsOfServiceClient() {
  return (
    <div className="min-h-screen bg-[#0E0E0E]">
      <HomeHeader />

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-6 pt-32 pb-16">
        {/* Title */}
        <h1 className="text-5xl md:text-6xl font-bold text-white mb-12 tracking-tight">
          Terms of Service
        </h1>

        {/* Content */}
        <TermsOfServiceContent />
      </main>

      <Footer />
    </div>
  );
}

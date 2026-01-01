'use client';

import { PrivacyPolicyContent } from '@gitroom/frontend/components/legal/privacy-policy-content';
import { HomeHeader } from '@gitroom/frontend/components/home/header';
import { Footer } from '@gitroom/frontend/components/home/footer';

export function PrivacyPolicyClient() {
  return (
    <div className="min-h-screen bg-[#0E0E0E]">
      <HomeHeader />

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-6 pt-32 pb-16">
        {/* Title */}
        <h1 className="text-5xl md:text-6xl font-bold text-white mb-12 tracking-tight">
          Privacy Policy
        </h1>

        {/* Content */}
        <PrivacyPolicyContent />
      </main>

      <Footer />
    </div>
  );
}

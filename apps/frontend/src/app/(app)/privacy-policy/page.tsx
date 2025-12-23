'use client';

import { PrivacyPolicyContent } from '@gitroom/frontend/components/legal/privacy-policy-content';
import Link from 'next/link';
import Image from 'next/image';

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0a0a0a] via-[#0f0f14] to-[#0a0a0a]">
      {/* Header */}
      <header className="sticky top-0 z-50 backdrop-blur-xl bg-[#0a0a0a]/80 border-b border-white/5">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center group">
            <Image 
              src="/logo-text.svg" 
              alt="Boto" 
              width={120} 
              height={40} 
              className="h-10 w-auto"
            />
          </Link>
          <div className="flex items-center gap-4">
            <Link 
              href="/auth/login" 
              className="px-4 py-2 text-sm font-medium text-white/70 hover:text-white transition-colors"
            >
              Sign In
            </Link>
            <Link 
              href="/auth" 
              className="px-5 py-2.5 text-sm font-medium text-white bg-gradient-to-r from-violet-600 to-fuchsia-600 rounded-lg hover:from-violet-500 hover:to-fuchsia-500 transition-all shadow-lg shadow-violet-500/25 hover:shadow-violet-500/40"
            >
              Get Started
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-violet-900/20 via-transparent to-transparent" />
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-violet-500/10 rounded-full blur-3xl" />
        <div className="absolute top-20 right-1/4 w-64 h-64 bg-fuchsia-500/10 rounded-full blur-3xl" />
        
        <div className="relative max-w-6xl mx-auto px-6 pt-20 pb-12">
          <div className="text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-6">
              <svg className="w-4 h-4 text-violet-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
              <span className="text-sm text-white/60">Your Privacy Matters</span>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 tracking-tight">
              Privacy Policy
            </h1>
            <p className="text-lg text-white/50 max-w-2xl mx-auto">
              We&apos;re committed to protecting your personal information and being transparent about what we collect and how we use it.
            </p>
            <p className="text-sm text-white/30 mt-4">Last updated: December 2025</p>
          </div>
        </div>
      </div>

      {/* Content */}
      <main className="relative max-w-4xl mx-auto px-6 pb-24">
        <div className="bg-gradient-to-b from-white/[0.03] to-transparent rounded-3xl border border-white/5 p-8 md:p-12 backdrop-blur-sm">
          <PrivacyPolicyContent />
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-white/5 bg-[#0a0a0a]/50 backdrop-blur-xl">
        <div className="max-w-6xl mx-auto px-6 py-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm text-white/40">© {new Date().getFullYear()} Boto. All rights reserved.</p>
            <div className="flex items-center gap-6">
              <Link href="/terms-of-service" className="text-sm text-white/40 hover:text-white/70 transition-colors">
                Terms of Service
              </Link>
              <Link href="/privacy-policy" className="text-sm text-violet-400 hover:text-violet-300 transition-colors">
                Privacy Policy
              </Link>
              <Link href="mailto:hi@boto.social" className="text-sm text-white/40 hover:text-white/70 transition-colors">
                Contact
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

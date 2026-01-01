'use client';

import { TermsOfServiceContent } from '@gitroom/frontend/components/legal/terms-of-service-content';
import Link from 'next/link';
import Image from 'next/image';

export function TermsOfServiceClient() {
  return (
    <div className="min-h-screen bg-[#0f0e15]">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-[#0f0e15] border-b border-white/5">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center">
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
              Log In
            </Link>
            <Link 
              href="/auth" 
              className="px-5 py-2.5 text-sm font-medium text-black bg-white rounded-full hover:bg-white/90 transition-all flex items-center gap-2"
            >
              Get Started
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M9 18l6-6-6-6" />
              </svg>
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-6 py-16">
        {/* Title */}
        <h1 className="text-5xl md:text-6xl font-bold text-white mb-12 tracking-tight">
          Terms of Service
        </h1>

        {/* Content */}
        <TermsOfServiceContent />
      </main>

      {/* Footer */}
      <footer className="border-t border-white/5 bg-[#0f0e15]">
        <div className="max-w-6xl mx-auto px-6 py-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm text-white/40">© {new Date().getFullYear()} Boto. All rights reserved.</p>
            <div className="flex items-center gap-6">
              <Link href="/terms-of-service" className="text-sm text-violet-400 hover:text-violet-300 transition-colors">
                Terms of Service
              </Link>
              <Link href="/privacy-policy" className="text-sm text-white/40 hover:text-white/70 transition-colors">
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

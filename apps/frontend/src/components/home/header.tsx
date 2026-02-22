'use client';

import Link from 'next/link';
import { useState } from 'react';
import { LogoTextComponent } from '../ui/logo-text.component';
import { useT } from '@gitroom/react/translation/get.transation.service.client';

export function HomeHeader() {
  const t = useT();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 inset-x-0 z-50 bg-white/80 backdrop-blur-xl border-b border-black/5">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <LogoTextComponent color="black" />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-3">
            <Link
              href="/auth/login"
              className="px-5 py-2 rounded-full bg-[#f1f3f4] text-[#202124] text-sm font-medium hover:bg-[#e8eaed] transition-colors"
            >
              {t('home_header_login', 'Log In')}
            </Link>
            <Link
              href="/auth/register"
              className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-[#202124] text-white text-sm font-medium hover:bg-[#303134] transition-colors"
            >
              {t('home_header_get_started', 'Get Started')}
              <svg
                className="w-4 h-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 7l5 5m0 0l-5 5m5-5H6"
                />
              </svg>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 text-[#5f6368] hover:text-[#202124] transition-colors"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? (
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-black/5">
            <div className="flex flex-col gap-3">
              <Link
                href="/auth"
                className="text-center px-5 py-2.5 rounded-full bg-[#f1f3f4] text-[#202124] text-sm font-medium hover:bg-[#e8eaed] transition-colors"
              >
                {t('home_header_login', 'Log In')}
              </Link>
              <Link
                href="/auth/register"
                className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full bg-[#202124] text-white text-sm font-medium hover:bg-[#303134] transition-colors"
              >
                {t('home_header_get_started', 'Get Started')}
                <svg
                  className="w-4 h-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 7l5 5m0 0l-5 5m5-5H6"
                  />
                </svg>
              </Link>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}

'use client';

import Link from 'next/link';
import Image from 'next/image';

const sitemapLinks = {
  product: {
    title: 'Product',
    links: [
      { label: 'Home', href: '/' },
      { label: 'Features', href: '/#features' },
    ],
  },
  account: {
    title: 'Account',
    links: [
      { label: 'Login', href: '/auth/login' },
      { label: 'Register', href: '/auth/register' },
      { label: 'Forgot Password', href: '/auth/forgot' },
    ],
  },
  legal: {
    title: 'Legal',
    links: [
      { label: 'Privacy Policy', href: '/privacy-policy' },
      { label: 'Terms of Service', href: '/terms-of-service' },
    ],
  },
  resources: {
    title: 'Resources',
    links: [
      { label: 'GitHub', href: 'https://github.com/soma-krd/boto', external: true },
      { label: 'soma.krd', href: 'https://soma.krd', external: true },
    ],
  },
};

export function Footer() {
  return (
    <footer className="bg-[#0E0E0E] text-white">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 pt-20 pb-16">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 lg:gap-12">
          {/* Brand Section */}
          <div className="col-span-2 md:col-span-4 lg:col-span-1 lg:max-w-xs">
            <p className="text-gray-500 text-sm leading-relaxed mb-4">
              AI-powered social media management and scheduling tool. Manage posts across 15+ platforms.
            </p>
            <p className="text-gray-600 text-xs">
              Forked from{' '}
              <a
                href="https://postiz.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-purple-400 hover:text-purple-300 transition-colors"
              >
                Postiz
              </a>
            </p>
          </div>

          {/* Sitemap Links */}
          {Object.values(sitemapLinks).map((section) => (
            <div key={section.title}>
              <h3 className="text-white font-semibold text-sm mb-4 uppercase tracking-wider">
                {section.title}
              </h3>
              <ul className="space-y-3">
                {section.links.map((link) => (
                  <li key={link.label}>
                    {'external' in link && link.external ? (
                      <a
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-500 hover:text-white transition-colors text-sm flex items-center gap-1"
                      >
                        {link.label}
                        <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                        </svg>
                      </a>
                    ) : (
                      <Link
                        href={link.href}
                        className="text-gray-500 hover:text-white transition-colors text-sm"
                      >
                        {link.label}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Large boto Logo */}
        <div className="mt-16 md:mt-24 flex justify-center">
          <Image
            src="/logo-text.svg"
            alt="boto"
            width={1000}
            height={300}
            className="w-full max-w-5xl h-auto"
          />
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-6 md:px-12 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-600 text-sm">
              © {new Date().getFullYear()} Boto Social. All rights reserved.
            </p>
            <div className="flex items-center gap-4">
              <Link
                href="/sitemap.xml"
                className="text-gray-500 hover:text-white transition-colors text-sm"
              >
                Sitemap
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

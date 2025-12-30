'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useT } from '@gitroom/react/translation/get.transation.service.client';
import { LanguageComponent } from '../layout/language.component';

const getSitemapLinks = (t: any) => ({
  product: {
    title: t('home_footer_section_product', 'Product'),
    links: [
      { label: t('home_footer_link_home', 'Home'), href: '/' },
      { label: t('home_footer_link_features', 'Features'), href: '/#features' },
    ],
  },
  account: {
    title: t('home_footer_section_account', 'Account'),
    links: [
      { label: t('home_footer_link_login', 'Login'), href: '/auth/login' },
      { label: t('home_footer_link_register', 'Register'), href: '/auth/register' },
      { label: t('home_footer_link_forgot_password', 'Forgot Password'), href: '/auth/forgot' },
    ],
  },
  legal: {
    title: t('home_footer_section_legal', 'Legal'),
    links: [
      { label: t('home_footer_link_privacy_policy', 'Privacy Policy'), href: '/privacy-policy' },
      { label: t('home_footer_link_terms_of_service', 'Terms of Service'), href: '/terms-of-service' },
    ],
  },
  resources: {
    title: t('home_footer_section_resources', 'Resources'),
    links: [
      { label: t('home_footer_link_github', 'GitHub'), href: 'https://github.com/soma-krd/boto.social', external: true },
      { label: t('home_footer_link_soma_krd', 'soma.krd'), href: 'https://soma.krd', external: true },
    ],
  },
});

export function Footer() {
  const t = useT();
  const sitemapLinks = getSitemapLinks(t);

  return (
    <footer className="bg-[#0E0E0E] text-white">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 pt-20 pb-16">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 lg:gap-12">
          {/* Brand Section */}
          <div className="col-span-2 md:col-span-4 lg:col-span-1 lg:max-w-xs">
            <p className="text-white/70 text-sm leading-relaxed mb-4">
              {t('home_footer_description', 'AI-powered social media management and scheduling tool. Manage posts across 15+ platforms.')}
            </p>
            <p className="text-white/60 text-xs">
              {t('home_footer_forked_from', 'Forked from')}{' '}
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
                        className="text-white/70 hover:text-white transition-colors text-sm flex items-center gap-1"
                      >
                        {link.label}
                        <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                        </svg>
                      </a>
                    ) : (
                      <Link
                        href={link.href}
                        className="text-white/70 hover:text-white transition-colors text-sm"
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
            <p className="text-white/70 text-sm">
              {t('home_footer_copyright', '© {{year}} Boto Social. All rights reserved.', { year: new Date().getFullYear() })}
            </p>
            <div className="flex items-center gap-4">
              <Link
                href="/sitemap.xml"
                className="text-white/70 hover:text-white transition-colors text-sm"
              >
                {t('home_footer_sitemap', 'Sitemap')}
              </Link>
              <LanguageComponent />
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

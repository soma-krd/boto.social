'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useT } from '@gitroom/react/translation/get.transation.service.client';

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
      { label: 'hi@boto.social', href: 'mailto:hi@boto.social', external: true },
    ],
  },
});

const socialLinks = [
  {
    label: 'Instagram',
    href: 'https://www.instagram.com/boto.social',
    icon: (
      <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
        <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
      </svg>
    ),
  },
  {
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/company/boto-social',
    icon: (
      <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
        <rect x="2" y="9" width="4" height="12"></rect>
        <circle cx="4" cy="4" r="2"></circle>
      </svg>
    ),
  },
  {
    label: 'Facebook',
    href: 'https://www.facebook.com/people/Boto-Social-media-manager/61585327966611/',
    icon: (
      <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
        <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
      </svg>
    ),
  },
  {
    label: 'Telegram',
    href: 'https://t.me/boto_social',
    icon: (
      <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
        <line x1="22" y1="2" x2="11" y2="13"></line>
        <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
      </svg>
    ),
  },
  {
    label: 'Youtube',
    href: 'https://www.youtube.com/@boto.social',
    icon: (
      <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
        <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z"></path>
        <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"></polygon>
      </svg>
    ),
  },
  {
    label: 'Tiktok',
    href: 'https://www.tiktok.com/@boto.social',
    icon: (
      <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
        <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5"></path>
      </svg>
    ),
  },
];

export function Footer() {
  const t = useT();
  const sitemapLinks = getSitemapLinks(t);

  return (
    <footer>
      {/* Dark CTA Section */}
      <div className="px-4 sm:px-6 lg:px-8 pb-8">
        <div className="max-w-7xl mx-auto bg-[#202124] rounded-3xl px-8 py-16 sm:px-16 sm:py-20 text-center relative overflow-hidden">
          {/* Subtle star dots decoration */}
          <div className="absolute inset-0 opacity-20" style={{
            backgroundImage: 'radial-gradient(circle, #4285f4 1px, transparent 1px)',
            backgroundSize: '40px 40px',
          }} />
          <div className="relative z-10">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-normal text-white mb-6 tracking-tight">
              {t('home_footer_cta_title', 'Start managing your social media today')}
            </h2>
            <p className="text-white/70 text-lg mb-8 max-w-2xl mx-auto">
              {t('home_footer_cta_subtitle', 'Join thousands of creators and businesses using Boto to grow their online presence.')}
            </p>
            <Link
              href="/auth/register"
              className="inline-flex items-center gap-2 px-7 py-3 rounded-full bg-white text-[#202124] text-base font-medium hover:bg-[#f1f3f4] transition-colors"
            >
              {t('home_hero_cta', 'Get Started Free')}
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </Link>
          </div>
        </div>
      </div>

      {/* Footer Links */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 pt-12 pb-12">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 lg:gap-12">
          {/* Brand Section */}
          <div className="col-span-2 md:col-span-4 lg:col-span-1 lg:max-w-xs">
            <p className="text-[#5f6368] text-sm leading-relaxed mb-4">
              {t('home_footer_description', 'AI-powered social media management and scheduling tool. Manage posts across 15+ platforms.')}
            </p>
          </div>

          {/* Sitemap Links */}
          {Object.values(sitemapLinks).map((section) => (
            <div key={section.title}>
              <h3 className="text-[#202124] font-medium text-sm mb-4 uppercase tracking-wider">
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
                        className="text-[#5f6368] hover:text-[#202124] transition-colors text-sm flex items-center gap-1"
                      >
                        {link.label}
                        <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                        </svg>
                      </a>
                    ) : (
                      <Link
                        href={link.href}
                        className="text-[#5f6368] hover:text-[#202124] transition-colors text-sm"
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
        <div className="mt-16 md:mt-20 flex justify-center">
          <Image
            src="/logo-text.svg"
            alt="boto"
            width={1000}
            height={300}
            className="w-full max-w-5xl h-auto opacity-10"
          />
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-black/5">
        <div className="max-w-7xl mx-auto px-6 md:px-12 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-[#5f6368] text-sm">
              {t('home_footer_copyright', '© {{year}} Boto Social. All rights reserved.', { year: new Date().getFullYear() })}
            </p>
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-4 border-e border-black/10 pe-6">
                {socialLinks.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#5f6368] hover:text-[#202124] transition-colors"
                    aria-label={social.label}
                  >
                    {social.icon}
                  </a>
                ))}
              </div>
              <Link
                href="/sitemap.xml"
                className="text-[#5f6368] hover:text-[#202124] transition-colors text-sm"
              >
                {t('home_footer_sitemap', 'Sitemap')}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

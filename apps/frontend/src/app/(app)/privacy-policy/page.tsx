import { Metadata } from 'next';
import { PrivacyPolicyClient } from './privacy-policy-client';

const siteUrl = process.env.FRONTEND_URL || 'https://boto.social';

export const metadata: Metadata = {
  title: 'Privacy Policy | Boto - Social Media Management',
  description: 'Learn how Boto protects your privacy and handles your personal information. Our privacy policy explains data collection, usage, security measures, and your rights.',
  keywords: ['privacy policy', 'data protection', 'GDPR', 'personal information', 'Boto privacy', 'social media privacy'],
  authors: [{ name: 'Boto' }],
  creator: 'Boto',
  publisher: 'Boto',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
  alternates: {
    canonical: `${siteUrl}/privacy-policy`,
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: `${siteUrl}/privacy-policy`,
    siteName: 'Boto',
    title: 'Privacy Policy | Boto',
    description: 'Learn how Boto protects your privacy and handles your personal information. Our commitment to data protection and transparency.',
    images: [
      {
        url: `${siteUrl}/logo.svg`,
        width: 1200,
        height: 630,
        alt: 'Boto Privacy Policy',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Privacy Policy | Boto',
    description: 'Learn how Boto protects your privacy and handles your personal information.',
    images: [`${siteUrl}/logo.svg`],
    creator: '@botosocial',
  },
};

export default function PrivacyPolicyPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: 'Privacy Policy',
    description: 'Boto Privacy Policy - How we collect, use, and protect your personal information.',
    url: `${siteUrl}/privacy-policy`,
    publisher: {
      '@type': 'Organization',
      name: 'Boto',
      logo: {
        '@type': 'ImageObject',
        url: `${siteUrl}/logo.svg`,
      },
    },
    dateModified: '2025-12-23',
    inLanguage: 'en-US',
    isPartOf: {
      '@type': 'WebSite',
      name: 'Boto',
      url: siteUrl,
    },
    breadcrumb: {
      '@type': 'BreadcrumbList',
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          name: 'Home',
          item: siteUrl,
        },
        {
          '@type': 'ListItem',
          position: 2,
          name: 'Privacy Policy',
          item: `${siteUrl}/privacy-policy`,
        },
      ],
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <PrivacyPolicyClient />
    </>
  );
}

import { Metadata } from 'next';
import { TermsOfServiceClient } from './terms-of-service-client';

const siteUrl = process.env.FRONTEND_URL || 'https://boto.social';

export const metadata: Metadata = {
  title: 'Terms of Service | Boto - Social Media Management',
  description: 'Read the Boto Terms of Service. Understand your rights and responsibilities when using our social media management platform.',
  keywords: ['terms of service', 'terms and conditions', 'user agreement', 'Boto terms', 'social media management terms'],
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
    canonical: `${siteUrl}/terms-of-service`,
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: `${siteUrl}/terms-of-service`,
    siteName: 'Boto',
    title: 'Terms of Service | Boto',
    description: 'Read the Boto Terms of Service. Understand your rights and responsibilities when using our platform.',
    images: [
      {
        url: `${siteUrl}/logo.svg`,
        width: 1200,
        height: 630,
        alt: 'Boto Terms of Service',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Terms of Service | Boto',
    description: 'Read the Boto Terms of Service. Understand your rights and responsibilities.',
    images: [`${siteUrl}/logo.svg`],
    creator: '@botosocial',
  },
};

export default function TermsOfServicePage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: 'Terms of Service',
    description: 'Boto Terms of Service - Terms and conditions for using the Boto social media management platform.',
    url: `${siteUrl}/terms-of-service`,
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
          name: 'Terms of Service',
          item: `${siteUrl}/terms-of-service`,
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
      <TermsOfServiceClient />
    </>
  );
}

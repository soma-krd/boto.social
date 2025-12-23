import { Metadata } from 'next';
import { HomePage } from '@gitroom/frontend/components/home/home-page';

const siteUrl = process.env.FRONTEND_URL || 'https://boto.social';

export const metadata: Metadata = {
  title: 'Boto - AI-Powered Social Media Management & Scheduling Tool',
  description: 'Boto is your agentic social media scheduling tool. Manage posts across Instagram, YouTube, LinkedIn, TikTok, X, and 15+ platforms. AI content generation, team collaboration, analytics, and cross-promotion marketplace.',
  keywords: [
    'social media management',
    'social media scheduling',
    'AI social media',
    'content scheduling',
    'social media automation',
    'Instagram scheduler',
    'TikTok scheduler',
    'LinkedIn scheduler',
    'YouTube scheduler',
    'X scheduler',
    'Twitter scheduler',
    'social media analytics',
    'team collaboration',
    'content calendar',
    'social media marketing',
    'cross-platform posting',
    'social media agency tools',
    'content creator tools',
    'AI content generation',
    'Boto',
  ],
  authors: [{ name: 'Boto' }],
  creator: 'Boto',
  publisher: 'Boto',
  applicationName: 'Boto',
  generator: 'Next.js',
  referrer: 'origin-when-cross-origin',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: siteUrl,
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: siteUrl,
    siteName: 'Boto',
    title: 'Boto - AI-Powered Social Media Management & Scheduling',
    description: 'Everything you need to manage social media posts, build an audience, capture leads, and grow your business faster with AI. Schedule across 15+ platforms.',
    images: [
      {
        url: `${siteUrl}/boto.svg`,
        width: 1200,
        height: 630,
        alt: 'Boto - Social Media Management Platform',
        type: 'image/jpeg',
      },
      {
        url: `${siteUrl}/logo.svg`,
        width: 512,
        height: 512,
        alt: 'Boto Logo',
        type: 'image/svg+xml',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@botosocial',
    creator: '@botosocial',
    title: 'Boto - AI-Powered Social Media Management & Scheduling',
    description: 'Everything you need to manage social media posts, build an audience, and grow your business faster with AI.',
    images: {
      url: `${siteUrl}/boto.svg`,
      alt: 'Boto - Social Media Management Platform',
    },
  },
  verification: {
    // Add your verification codes here when available
    // google: 'your-google-verification-code',
    // yandex: 'your-yandex-verification-code',
    // bing: 'your-bing-verification-code',
  },
  category: 'Technology',
  classification: 'Social Media Management Software',
};

export default function Home() {
  const organizationJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Boto',
    url: siteUrl,
    logo: {
      '@type': 'ImageObject',
      url: `${siteUrl}/logo.svg`,
      width: 512,
      height: 512,
    },
    sameAs: [
      'https://twitter.com/botosocial',
      // Add other social media URLs as needed
    ],
    description: 'AI-powered social media management and scheduling platform for creators, businesses, and agencies.',
  };

  const websiteJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Boto',
    url: siteUrl,
    description: 'AI-powered social media management and scheduling tool',
    publisher: {
      '@type': 'Organization',
      name: 'Boto',
      logo: {
        '@type': 'ImageObject',
        url: `${siteUrl}/logo.svg`,
      },
    },
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${siteUrl}/search?q={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
  };

  const softwareAppJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'Boto',
    applicationCategory: 'BusinessApplication',
    operatingSystem: 'Web',
    url: siteUrl,
    description: 'AI-powered social media management and scheduling tool for managing posts across Instagram, YouTube, LinkedIn, TikTok, X, and 15+ platforms.',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
      description: 'Free tier available',
    },
    featureList: [
      'Multi-platform social media scheduling',
      'AI-powered content generation',
      'Team collaboration tools',
      'Analytics and insights',
      'Cross-promotion marketplace',
      'Auto-posting and engagement automation',
    ],
    screenshot: `${siteUrl}/boto.svg`,
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.8',
      ratingCount: '150',
      bestRating: '5',
      worstRating: '1',
    },
  };

  const webPageJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: 'Boto - AI-Powered Social Media Management & Scheduling Tool',
    description: 'Everything you need to manage your social media posts, build an audience, capture leads, and grow your business faster with AI.',
    url: siteUrl,
    isPartOf: {
      '@type': 'WebSite',
      name: 'Boto',
      url: siteUrl,
    },
    about: {
      '@type': 'Thing',
      name: 'Social Media Management',
    },
    mainEntity: {
      '@type': 'SoftwareApplication',
      name: 'Boto',
    },
    speakable: {
      '@type': 'SpeakableSpecification',
      cssSelector: ['h1', 'h2', '.hero-description'],
    },
    datePublished: '2024-01-01',
    dateModified: '2025-12-23',
    inLanguage: 'en-US',
  };

  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'What social media platforms does Boto support?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Boto supports 15+ platforms including Instagram, YouTube, LinkedIn, Reddit, TikTok, Facebook, Pinterest, Threads, X (Twitter), Slack, Discord, Mastodon, Bluesky, Telegram, VK, Medium, Dev.to, and WordPress.',
        },
      },
      {
        '@type': 'Question',
        name: 'Does Boto have AI content generation?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes, Boto includes an AI agent that helps you generate engaging content for all your social media platforms, saving time while maintaining consistency across channels.',
        },
      },
      {
        '@type': 'Question',
        name: 'Can teams collaborate on Boto?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes, Boto supports team collaboration with different roles and permissions. All team members and clients can work together seamlessly on content.',
        },
      },
      {
        '@type': 'Question',
        name: 'Is Boto free to use?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Boto offers a free tier to get started. You can sign up and start scheduling your social media content right away.',
        },
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareAppJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <HomePage />
    </>
  );
}

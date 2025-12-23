import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = process.env.FRONTEND_URL || 'https://boto.social';
  const currentDate = new Date();
  
  return [
    // Home page - highest priority
    {
      url: siteUrl,
      lastModified: currentDate,
      changeFrequency: 'daily',
      priority: 1,
    },
    // Authentication pages
    {
      url: `${siteUrl}/auth`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: `${siteUrl}/auth/login`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: `${siteUrl}/auth/register`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    // Legal pages
    {
      url: `${siteUrl}/privacy-policy`,
      lastModified: new Date('2025-12-23'),
      changeFrequency: 'yearly',
      priority: 0.5,
    },
    {
      url: `${siteUrl}/terms-of-service`,
      lastModified: new Date('2025-12-23'),
      changeFrequency: 'yearly',
      priority: 0.5,
    },
  ];
}


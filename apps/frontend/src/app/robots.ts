import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  const siteUrl = process.env.FRONTEND_URL || 'https://boto.social';
  
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/', '/modal/', '/uploads/'],
      },
    ],
    sitemap: `${siteUrl}/sitemap.xml`,
  };
}


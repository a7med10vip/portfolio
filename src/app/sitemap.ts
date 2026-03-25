import type { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: 'https://ahmedali.online',
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 1.0,
      alternates: {
        languages: {
          ar: 'https://ahmedali.online/ar',
        },
      },
    },
    {
      url: 'https://ahmedali.online/ar',
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.9,
      alternates: {
        languages: {
          en: 'https://ahmedali.online',
        },
      },
    },
  ]
}

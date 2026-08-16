import type { MetadataRoute } from 'next'

import { ARTICLES, articleUrl } from '@/lib/articles'

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
    {
      /* The answer page for "who is Ahmed Ali" — the query this whole site
         wants to own, in search and in assistants alike. */
      url: 'https://ahmedali.online/who-is-ahmed-ali',
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: 'https://ahmedali.online/articles',
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: 'https://ahmedali.online/ar/articles',
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    /* Every piece in the registry, both languages, without a second list to
       keep in step. */
    ...ARTICLES.map((article) => ({
      url: articleUrl(article),
      lastModified: new Date(article.updated ?? article.published),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    })),
    {
      url: 'https://ahmedali.online/ar/blog/salla-vs-shopify-vs-zid',
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.8,
    },
  ]
}

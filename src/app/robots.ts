import type { MetadataRoute } from 'next'

/* Client work that is not mine to publish — kept out of every index, search or
   assistant alike. */
const PRIVATE = [
  '/api/',
  '/vision',
  '/shopwelo',
  '/zaindev',
  '/mobadi',
  '/rmc',
  '/rmc-ads',
  '/jackjones',
  '/motionmotors',
]

/* Assistants read the web two different ways, and both have to be let in for
   the site to be quotable:

   - retrieval agents fetch a page at the moment someone asks a question, which
     is what decides whether an assistant can answer "who is Ahmed Ali" today
   - training and index crawlers build the model's own picture of who I am,
     which is slower to take effect and longer-lived

   The trade-off is the obvious one: allowing these means the writing here can
   be used to train models. That is the price of being cited by them. */
const ASSISTANTS = [
  // OpenAI — training, search index, and live fetch
  'GPTBot',
  'OAI-SearchBot',
  'ChatGPT-User',
  // Anthropic
  'ClaudeBot',
  'Claude-User',
  'Claude-SearchBot',
  'anthropic-ai',
  'claude-web',
  // Perplexity
  'PerplexityBot',
  'Perplexity-User',
  // Google's AI surfaces (Googlebot itself still governs ordinary search)
  'Google-Extended',
  // Apple, Meta, Amazon, DuckDuckGo
  'Applebot',
  'Applebot-Extended',
  'meta-externalagent',
  'Amazonbot',
  'DuckAssistBot',
  // Common Crawl — the corpus a great many models are built from
  'CCBot',
]

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: ['/', '/ar'],
        disallow: PRIVATE,
      },
      ...ASSISTANTS.map((userAgent) => ({
        userAgent,
        allow: ['/', '/ar'],
        disallow: PRIVATE,
      })),
    ],
    sitemap: 'https://ahmedali.online/sitemap.xml',
    host: 'https://ahmedali.online',
  }
}

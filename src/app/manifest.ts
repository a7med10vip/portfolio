import type { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Ahmed Ali \u2014 Full-Stack Digital Strategist',
    short_name: 'Ahmed Ali',
    description:
      'Full-Stack Digital Strategist \u2014 performance marketing, product development, and AI integration across Egypt, Qatar, Saudi Arabia & UAE.',
    start_url: '/',
    display: 'standalone',
    background_color: '#0A0A0A',
    theme_color: '#4FFFB0',
    icons: [
      {
        src: '/favicon.ico',
        sizes: 'any',
        type: 'image/x-icon',
      },
    ],
  }
}

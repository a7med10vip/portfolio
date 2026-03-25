import type { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Ahmed Ali | Full-Stack Digital Strategist',
    short_name: 'Ahmed Ali',
    description:
      'Full-Stack Digital Strategist | performance marketing, product development, and AI integration across Egypt, Qatar, Saudi Arabia & UAE.',
    start_url: '/',
    display: 'standalone',
    background_color: '#0A0A0A',
    theme_color: '#4FFFB0',
    icons: [
      {
        src: '/favicon.png',
        sizes: '500x500',
        type: 'image/png',
      },
      {
        src: '/icon-192.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: '/icon-512.png',
        sizes: '512x512',
        type: 'image/png',
      },
    ],
  }
}

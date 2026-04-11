import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Language redirect on first visit (only for root path)
  if (pathname === '/') {
    const langCookie = request.cookies.get('preferred-lang')?.value
    if (!langCookie) {
      const acceptLang = request.headers.get('accept-language') || ''
      const isArabic = acceptLang.split(',').some(lang =>
        lang.trim().toLowerCase().startsWith('ar')
      )
      if (isArabic) {
        const url = request.nextUrl.clone()
        url.pathname = '/ar'
        const response = NextResponse.redirect(url)
        response.cookies.set('preferred-lang', 'ar', { path: '/', maxAge: 60 * 60 * 24 * 365 })
        return response
      }
    }
  }

  const response = NextResponse.next()

  // Set language cookie based on current path
  if (pathname === '/' || pathname === '/ar') {
    const lang = pathname === '/ar' ? 'ar' : 'en'
    response.cookies.set('preferred-lang', lang, { path: '/', maxAge: 60 * 60 * 24 * 365 })
  }

  // Security headers
  response.headers.set('X-Frame-Options', 'DENY')
  response.headers.set('X-Content-Type-Options', 'nosniff')
  response.headers.set('X-XSS-Protection', '1; mode=block')
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin')
  response.headers.set(
    'Permissions-Policy',
    'camera=(), microphone=(), geolocation=()'
  )
  response.headers.set(
    'Strict-Transport-Security',
    'max-age=31536000; includeSubDomains'
  )
  response.headers.set(
    'Content-Security-Policy',
    [
      "default-src 'self'",
      "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.googletagmanager.com https://www.google-analytics.com https://analytics.tiktok.com",
      "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
      "font-src 'self' https://fonts.gstatic.com data:",
      "img-src 'self' https://cdn.simpleicons.org https://*.githubusercontent.com https://www.googletagmanager.com https://www.google-analytics.com https://analytics.tiktok.com https://*.tiktok.com https://buluejioiybbphtzccbh.supabase.co data: blob:",
      "connect-src 'self' https://api.lanyard.rest wss://api.lanyard.rest https://fonts.googleapis.com https://fonts.gstatic.com https://www.googletagmanager.com https://www.google-analytics.com https://analytics.google.com https://region1.google-analytics.com https://buluejioiybbphtzccbh.supabase.co https://analytics.tiktok.com https://*.tiktok.com",
      "frame-src https://www.googletagmanager.com",
      "object-src 'none'",
      "base-uri 'self'",
      "form-action 'self'",
    ].join('; ')
  )

  return response
}

export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico, sitemap.xml, robots.txt (metadata files)
     */
    '/((?!_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt|manifest.webmanifest).*)',
  ],
}

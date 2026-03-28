import type { Metadata, Viewport } from "next";
import SmoothScroll from "@/components/SmoothScroll";
import ArabicTailProcessor from "@/components/ArabicTailProcessor";
import JsonLd from "@/components/JsonLd";
import { GoogleTagManager, GoogleTagManagerNoScript, GoogleAnalytics, TikTokPixel } from "@/components/GoogleTracking";

export const viewport: Viewport = {
  themeColor: "#4FFFB0",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  title: {
    default: "أحمد علي | استراتيجي رقمي شامل",
    template: "%s | أحمد علي",
  },
  description:
    "أحمد علي | استراتيجي رقمي شامل في القاهرة، مصر. خبير في تسويق الأداء، تطوير المواقع والتطبيقات، تحسين محركات البحث، ودمج الذكاء الاصطناعي لعملاء في منطقة الشرق الأوسط.",
  keywords: [
    "أحمد علي",
    "استراتيجي رقمي",
    "تسويق أداء",
    "تحسين محركات البحث",
    "تطوير مواقع",
    "تطوير تطبيقات",
    "ذكاء اصطناعي",
    "مصر",
    "قطر",
    "السعودية",
    "الإمارات",
  ],
  authors: [{ name: "أحمد علي", url: "https://ahmedali.online/ar" }],
  creator: "أحمد علي",
  publisher: "أحمد علي",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "ar_EG",
    url: "https://ahmedali.online/ar",
    siteName: "أحمد علي | استراتيجي رقمي شامل",
    title: "أحمد علي | استراتيجي رقمي شامل",
    description:
      "استراتيجي رقمي شامل | تسويق أداء، تطوير منتجات، ودمج ذكاء اصطناعي عبر مصر وقطر والسعودية والإمارات.",
    images: [
      {
        url: "https://ahmedali.online/ahmed.jpeg",
        width: 1200,
        height: 630,
        alt: "أحمد علي | استراتيجي رقمي شامل",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "أحمد علي | استراتيجي رقمي شامل",
    description:
      "استراتيجي رقمي شامل | تسويق أداء، تطوير منتجات، ودمج ذكاء اصطناعي عبر مصر وقطر والسعودية والإمارات.",
    images: ["https://ahmedali.online/ahmed.jpeg"],
  },
  alternates: {
    canonical: "https://ahmedali.online/ar",
    languages: {
      "en": "https://ahmedali.online",
      "ar": "https://ahmedali.online/ar",
    },
  },
  other: {
    "geo.region": "EG-C",
    "geo.placename": "Cairo",
    "geo.position": "30.0444;31.2357",
    "ICBM": "30.0444, 31.2357",
  },
};

export default function ArLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ar" dir="rtl">
      <head>
        <link rel="icon" href="/favicon.png" type="image/png" />
        <link rel="icon" href="/favicon-32x32.png" sizes="32x32" type="image/png" />
        <link rel="icon" href="/favicon-16x16.png" sizes="16x16" type="image/png" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <meta name="theme-color" content="#4FFFB0" />
        <meta name="theme-color" content="#4FFFB0" media="(prefers-color-scheme: light)" />
        <meta name="theme-color" content="#4FFFB0" media="(prefers-color-scheme: dark)" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="msapplication-TileColor" content="#4FFFB0" />
        <link rel="preconnect" href="https://cdn.simpleicons.org" />
        <link rel="dns-prefetch" href="https://cdn.simpleicons.org" />
        <JsonLd />
        <GoogleTagManager />
        <GoogleAnalytics />
        <TikTokPixel />
      </head>
      <body className="ar-rtl" style={{ fontFamily: "'Ahmed Sans', sans-serif", direction: "rtl" }}>
        <GoogleTagManagerNoScript />
        <SmoothScroll>
          <ArabicTailProcessor>{children}</ArabicTailProcessor>
        </SmoothScroll>
      </body>
    </html>
  );
}

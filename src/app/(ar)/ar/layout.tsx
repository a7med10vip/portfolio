import "@/app/globals.css";
import type { Metadata, Viewport } from "next";
import SmoothScroll from "@/components/SmoothScroll";
import ArabicTailProcessor from "@/components/ArabicTailProcessor";
import JsonLd from "@/components/JsonLd";
import { GoogleTagManager, GoogleTagManagerNoScript, GoogleAnalytics, TikTokPixel } from "@/components/GoogleTracking";
import RootChrome from "@/components/RootChrome";

export const viewport: Viewport = {
  themeColor: "#0F4D5A",
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
    "أحمد علي | استراتيجي رقمي شامل في جدة، السعودية. خبير في تسويق الأداء، تطوير المواقع والتطبيقات، تحسين محركات البحث، ودمج الذكاء الاصطناعي لعملاء في منطقة الشرق الأوسط.",
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
    locale: "ar_SA",
    url: "https://ahmedali.online/ar",
    siteName: "أحمد علي | استراتيجي رقمي شامل",
    title: "أحمد علي | استراتيجي رقمي شامل",
    description:
      "استراتيجي رقمي شامل | تسويق أداء، تطوير منتجات، ودمج ذكاء اصطناعي عبر مصر وقطر والسعودية والإمارات.",
    images: [
      {
        url: "https://ahmedali.online/myphoto-profile.png",
        width: 800,
        height: 800,
        alt: "أحمد علي | استراتيجي رقمي شامل",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "أحمد علي | استراتيجي رقمي شامل",
    description:
      "استراتيجي رقمي شامل | تسويق أداء، تطوير منتجات، ودمج ذكاء اصطناعي عبر مصر وقطر والسعودية والإمارات.",
    images: ["https://ahmedali.online/myphoto-profile.png"],
  },
  alternates: {
    canonical: "https://ahmedali.online/ar",
    languages: {
      "en": "https://ahmedali.online",
      "ar": "https://ahmedali.online/ar",
    },
  },
  other: {
    "geo.region": "SA-02",
    "geo.placename": "Jeddah",
    "geo.position": "21.4858;39.1925",
    "ICBM": "30.0444, 31.2357",
  },
};

export default function ArLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ar" dir="rtl">
      <head>
        {/* The SVG is served first so any browser that supports it scales the
            mark rather than upsampling a raster; the PNGs stay for the ones
            that do not. */}
        <link rel="icon" href="/brand/icon.svg" type="image/svg+xml" />
        <link rel="icon" href="/favicon.png" type="image/png" />
        <link rel="icon" href="/favicon-32x32.png" sizes="32x32" type="image/png" />
        <link rel="icon" href="/favicon-16x16.png" sizes="16x16" type="image/png" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="mask-icon" href="/brand/icon.svg" color="#0F4D5A" />
        <meta name="theme-color" content="#0F4D5A" />
        <meta name="theme-color" content="#0F4D5A" media="(prefers-color-scheme: light)" />
        <meta name="theme-color" content="#0F4D5A" media="(prefers-color-scheme: dark)" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="msapplication-TileColor" content="#0F4D5A" />
        <link rel="preconnect" href="https://cdn.simpleicons.org" />
        <link rel="dns-prefetch" href="https://cdn.simpleicons.org" />
        <JsonLd />
        <GoogleTagManager />
        <GoogleAnalytics />
        <TikTokPixel />
      </head>
      <body className="ar-rtl" style={{ fontFamily: "'Ahmed Sans', sans-serif", direction: "rtl" }} suppressHydrationWarning>
        <GoogleTagManagerNoScript />
        <SmoothScroll>
          <ArabicTailProcessor>{children}</ArabicTailProcessor>
        </SmoothScroll>
        <RootChrome />
      </body>
    </html>
  );
}

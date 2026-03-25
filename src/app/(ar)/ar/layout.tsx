import type { Metadata, Viewport } from "next";
import SmoothScroll from "@/components/SmoothScroll";
import ArabicTailProcessor from "@/components/ArabicTailProcessor";
import JsonLd from "@/components/JsonLd";
import { GoogleTagManager, GoogleTagManagerNoScript, GoogleAnalytics } from "@/components/GoogleTracking";

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
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://cdn.simpleicons.org" />
        <link rel="dns-prefetch" href="https://fonts.googleapis.com" />
        <link rel="dns-prefetch" href="https://fonts.gstatic.com" />
        <link rel="dns-prefetch" href="https://cdn.simpleicons.org" />
        <JsonLd />
        <GoogleTagManager />
        <GoogleAnalytics />
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

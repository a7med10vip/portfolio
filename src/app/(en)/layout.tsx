import "@/app/globals.css";
import type { Metadata, Viewport } from "next";
import { Inter, Bricolage_Grotesque, Instrument_Serif } from "next/font/google";
import SmoothScroll from "@/components/SmoothScroll";
import JsonLd from "@/components/JsonLd";
import { GoogleTagManager, GoogleTagManagerNoScript, GoogleAnalytics, TikTokPixel } from "@/components/GoogleTracking";
import RootChrome from "@/components/RootChrome";

const inter = Inter({ variable: "--font-inter", subsets: ["latin"], display: "swap" });

const bricolage = Bricolage_Grotesque({
  variable: "--font-bricolage",
  subsets: ["latin"],
  display: "swap",
  weight: ["200", "300", "400", "500", "600", "700", "800"],
});

const instrument = Instrument_Serif({
  variable: "--font-instrument",
  subsets: ["latin"],
  display: "swap",
  weight: "400",
  style: "italic",
});

export const viewport: Viewport = {
  themeColor: "#0F4D5A",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  title: {
    default: "Ahmed Ali | Full-Stack Digital Strategist",
    template: "%s | Ahmed Ali",
  },
  description:
    "Ahmed Ali is a Full-Stack Digital Strategist in Jeddah, Saudi Arabia | expert in performance marketing, web & app development, SEO, and AI integration for clients across the MENA region.",
  keywords: [
    "Ahmed Ali",
    "digital strategist",
    "performance marketing",
    "SEO expert",
    "web development",
    "Flutter developer",
    "AI integration",
    "full-stack developer",
    "Egypt",
    "Qatar",
    "Saudi Arabia",
    "UAE",
    "MENA",
    "Next.js",
    "React",
    "mobile app development",
  ],
  authors: [{ name: "Ahmed Ali", url: "https://ahmedali.online" }],
  creator: "Ahmed Ali",
  publisher: "Ahmed Ali",
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
    locale: "en_US",
    url: "https://ahmedali.online",
    siteName: "Ahmed Ali | Full-Stack Digital Strategist",
    title: "Ahmed Ali | Full-Stack Digital Strategist",
    description:
      "Full-Stack Digital Strategist | performance marketing, product development, and AI integration across Egypt, Qatar, Saudi Arabia & UAE.",
    images: [
      {
        url: "https://ahmedali.online/myphoto-profile.png",
        width: 800,
        height: 800,
        alt: "Ahmed Ali | Full-Stack Digital Strategist",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Ahmed Ali | Full-Stack Digital Strategist",
    description:
      "Full-Stack Digital Strategist | performance marketing, product development, and AI integration across Egypt, Qatar, Saudi Arabia & UAE.",
    images: ["https://ahmedali.online/myphoto-profile.png"],
  },
  alternates: {
    canonical: "https://ahmedali.online",
    languages: {
      "en": "https://ahmedali.online",
      "ar": "https://ahmedali.online/ar",
    },
  },
  verification: {
    google: "l5TuEErghNlb2N2rDWhDJJ1QgMUimz4p5eHmDfMu5ms",
  },
  other: {
    "geo.region": "SA-02",
    "geo.placename": "Jeddah",
    "geo.position": "21.4858;39.1925",
    "ICBM": "30.0444, 31.2357",
  },
};

export default function EnLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${bricolage.variable} ${instrument.variable}`}>
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
      <body className="antialiased" style={{ background: "#0A0A0A" }} suppressHydrationWarning>
        <GoogleTagManagerNoScript />
        <SmoothScroll>{children}</SmoothScroll>
        <RootChrome />
      </body>
    </html>
  );
}

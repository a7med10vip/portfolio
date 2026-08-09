import "@/app/globals.css";
import type { Metadata } from "next";
import { Bricolage_Grotesque, Instrument_Serif } from "next/font/google";
import SmoothScroll from "@/components/SmoothScroll";
import RootChrome from "@/components/RootChrome";

const bricolage = Bricolage_Grotesque({
  variable: "--font-bricolage",
  subsets: ["latin"],
  display: "swap",
  weight: ["200", "300", "400", "500", "600", "700", "800"],
});

const instrument = Instrument_Serif({
  variable: "--font-accent",
  subsets: ["latin"],
  display: "swap",
  weight: "400",
  style: "italic",
});

export const metadata: Metadata = {
  title: "Google Ads Strategy — Motion Motors × Soueast",
  description: "Google Business Profile Campaign Strategy · Jeddah · SAR 3,000/month",
  robots: { index: false, follow: false },
  icons: {
    icon: [
      { url: "/favicon.png", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
    ],
    apple: "/apple-touch-icon.png",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" dir="ltr" className={`${bricolage.variable} ${instrument.variable}`}>
      <head>
        <link rel="icon" href="/favicon.png" type="image/png" />
      </head>
      <body className="antialiased" style={{ margin: 0, fontFamily: "var(--font-bricolage), system-ui, sans-serif" }}>
        <SmoothScroll>{children}</SmoothScroll>
        <RootChrome />
      </body>
    </html>
  );
}

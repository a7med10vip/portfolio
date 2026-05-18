import { Bricolage_Grotesque, Instrument_Serif } from "next/font/google";
import SmoothScroll from "@/components/SmoothScroll";

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

export const metadata = {
  title: "Motion Motors — Website Structure & Build Plan | Ahmed Ali",
  description:
    "Information architecture, page templates, lead engine, finance calculator, after-sales hub, bilingual setup, tech stack, and phased build plan for the Motion Motors × Soueast public website. Prepared by Ahmed Ali.",
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

export default function MotionMotorsWebsiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" dir="ltr" className={`${bricolage.variable} ${instrument.variable}`}>
      <head>
        <link rel="icon" href="/favicon.png" type="image/png" />
      </head>
      <body className="antialiased" style={{ margin: 0, fontFamily: "var(--font-bricolage), system-ui, sans-serif" }}>
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}

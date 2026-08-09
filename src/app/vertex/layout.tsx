import "@/app/globals.css";
import type { Metadata } from "next";
import { Bricolage_Grotesque, Instrument_Serif, Bebas_Neue, Poppins, Tajawal } from "next/font/google";
import SmoothScroll from "@/components/SmoothScroll";
import RootChrome from "@/components/RootChrome";

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

const bebas = Bebas_Neue({
  variable: "--font-bebas",
  subsets: ["latin"],
  display: "swap",
  weight: "400",
});

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  display: "swap",
  weight: ["300", "400", "500", "600", "700"],
});

const tajawal = Tajawal({
  variable: "--font-tajawal",
  subsets: ["arabic", "latin"],
  display: "swap",
  weight: ["400", "500", "700"],
});

export const metadata: Metadata = {
  title: "Vertex Integra — Project Methodology & Site Plan | Ahmed Ali",
  description:
    "The methodology, site architecture, and build plan for Vertex Integra — a Saudi-based premium manufacturing & fit-out company. 25+ years, 150+ projects, 800K+ sqm delivered.",
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

export default function VertexLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      dir="ltr"
      className={`${bricolage.variable} ${instrument.variable} ${bebas.variable} ${poppins.variable} ${tajawal.variable}`}
    >
      <head>
        <link rel="icon" href="/favicon.png" type="image/png" />
      </head>
      <body
        className="antialiased"
        style={{
          margin: 0,
          fontFamily: "var(--font-bricolage), system-ui, sans-serif",
        }}
      >
        <SmoothScroll>{children}</SmoothScroll>
        <RootChrome />
      </body>
    </html>
  );
}

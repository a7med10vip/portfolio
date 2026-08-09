import "@/app/globals.css";
import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import RootChrome from "@/components/RootChrome";

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  display: "swap",
  weight: ["300", "400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "Bestune — Social Media Strategy",
  description: "Bestune — a focused social media strategy for the Saudi market. KSA · 2026",
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
    <html lang="en" dir="ltr" className={`${montserrat.variable} ${montserrat.className}`}>
      <head>
        <link rel="icon" href="/favicon.png" type="image/png" />
        <style>{`* { letter-spacing: 0 !important; } html, body { margin: 0; background: #fff !important; font-family: var(--font-montserrat), system-ui, sans-serif; } .heading { font-family: var(--font-montserrat), system-ui, sans-serif !important; color: inherit; }`}</style>
      </head>
      <body className="antialiased">
        {children}
        <RootChrome />
      </body>
    </html>
  );
}

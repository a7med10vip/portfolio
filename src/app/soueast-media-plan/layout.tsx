import "@/app/globals.css";
import type { Metadata } from "next";
import { Bricolage_Grotesque } from "next/font/google";
import RootChrome from "@/components/RootChrome";

const bricolage = Bricolage_Grotesque({
  variable: "--font-bricolage",
  subsets: ["latin"],
  display: "swap",
  weight: ["200", "300", "400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "New Media Execution Plan — Motion Motors × Soueast Jeddah",
  description: "Soueast New Media Strategy · Jeddah & Western Region · 2026",
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
    <html lang="en" dir="ltr" className={bricolage.variable}>
      <head>
        <link rel="icon" href="/favicon.png" type="image/png" />
        <style>{`* { letter-spacing: 0 !important; } .heading { font-family: 'Loubag', var(--font-bricolage), system-ui, sans-serif !important; color: inherit; }`}</style>
      </head>
      <body className="antialiased" style={{ margin: 0, fontFamily: "var(--font-bricolage), system-ui, sans-serif" }}>
        {children}
        <RootChrome />
      </body>
    </html>
  );
}

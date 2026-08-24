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
  title: "Delivery · Motion Motors × Soueast",
  description:
    "Four applications over one database, handed over. Motion Motors, Jeddah. Counted from the repository and the production database, 24 August 2026.",
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
        {/* The spin frames for the other three cars are pulled from the dealership's
            own storage the moment somebody picks a colour. Warming the connection
            here saves the DNS + TLS round trip at the point it would be felt. */}
        <link rel="preconnect" href="https://skwjfpvgtwcwvoywpzoz.supabase.co" crossOrigin="" />
        <link rel="preload" as="image" href="/soueast-delivery/spin/s09-mountain-green/01.webp" />
        <style>{`
          * { letter-spacing: 0 !important; }
          .heading { font-family: 'Loubag', var(--font-bricolage), system-ui, sans-serif !important; color: inherit; }
          html { scroll-behavior: auto; }
          body { background: #fff; margin: 0; font-family: var(--font-bricolage), system-ui, sans-serif; }
          ::selection { background: #f5802133; color: #0A0A0A; }
          ::-webkit-scrollbar { width: 10px; height: 10px; }
          ::-webkit-scrollbar-track { background: #fff; }
          ::-webkit-scrollbar-thumb { background: #f5802140; border-radius: 99px; }
          ::-webkit-scrollbar-thumb:hover { background: #f58021; }
        `}</style>
      </head>
      <body className="antialiased">
        {children}
        <RootChrome />
      </body>
    </html>
  );
}

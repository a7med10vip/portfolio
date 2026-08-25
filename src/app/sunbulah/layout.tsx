import "@/app/globals.css";
import type { Metadata } from "next";
import RootChrome from "@/components/RootChrome";

export const metadata: Metadata = {
  title: "تدقيق الحضور الرقمي · مجموعة السنبلة",
  description:
    "تدقيق مقاس لموقع مجموعة السنبلة، وتصور لصفحة رئيسية جديدة. قيس بتاريخ 24 أغسطس 2026.",
  robots: { index: false, follow: false },
  icons: {
    icon: [
      { url: "/favicon.png", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: "/apple-touch-icon.png",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ar" dir="rtl">
      <head>
        <link rel="icon" href="/favicon.png" type="image/png" />
        <style>{`
          * { letter-spacing: 0 !important; }
          html { scroll-behavior: auto; }
          body { background: #fff; margin: 0; color: #0A0A0A;
                 font-family: 'Ahmed Sans', system-ui, sans-serif; }
          /* خط ثمانية: العريض للعناوين، والسانس لكل ما عداه. */
          .heading { font-family: 'Ahmed Serif Display', Georgia, serif !important; font-weight: 500; color: inherit; }
          .body-serif { font-family: 'Ahmed Serif Text', Georgia, serif; }
          ::selection { background: #004D5A22; color: #0A0A0A; }
          ::-webkit-scrollbar { width: 10px; height: 10px; }
          ::-webkit-scrollbar-track { background: #fff; }
          ::-webkit-scrollbar-thumb { background: #004D5A40; border-radius: 99px; }
          ::-webkit-scrollbar-thumb:hover { background: #004D5A; }
          /* الأرقام والمسارات اللاتينية داخل نص عربي تحتاج اتجاهها الخاص. */
          .ltr { direction: ltr; unicode-bidi: isolate; display: inline-block; }
        `}</style>
      </head>
      <body className="antialiased ar-rtl">
        {children}
        <RootChrome />
      </body>
    </html>
  );
}

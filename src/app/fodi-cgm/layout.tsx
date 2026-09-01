import "@/app/globals.css";
import type { Metadata } from "next";
import RootChrome from "@/components/RootChrome";

export const metadata: Metadata = {
  title: "ربط أجهزة الجلوكوز المستمر · FODI",
  description: "تقرير تكامل أجهزة CGM مع FODI: المسارات المتاحة، والتأخير الفعلي لكل مزود، والبنية المقترحة.",
  robots: { index: false, follow: false },
  icons: { icon: [{ url: "/favicon.png", type: "image/png" }] },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ar" dir="rtl">
      <head>
        <link rel="icon" href="/favicon.png" type="image/png" />
        <style>{`
          * { letter-spacing: 0 !important; }
          html { scroll-behavior: auto; }
          body { background: #fff; margin: 0; color: #260D25;
                 font-family: 'Ahmed Sans', system-ui, sans-serif; }
          .heading, .ar-heading { font-family: 'Ahmed Serif Display', Georgia, serif !important; }
          ::selection { background: #FE6D2F33; color: #260D25; }
          ::-webkit-scrollbar { width: 10px; height: 10px; }
          ::-webkit-scrollbar-track { background: #fff; }
          ::-webkit-scrollbar-thumb { background: #3B143A40; border-radius: 99px; }
          ::-webkit-scrollbar-thumb:hover { background: #3B143A; }
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

import type { Metadata } from "next";
import SmoothScroll from "@/components/SmoothScroll";

export const metadata: Metadata = {
  title: "نَوِيت — منصة قصص إسلامية تفاعلية للأطفال | Ahmed Ali",
  description:
    "استراتيجية وخطة تطوير منصة نَوِيت — منصة قصص إسلامية تربوية للأطفال (6–10 سنوات) في السعودية. مكتبة فيديوهات + جلسات Live + Avatar إسلامي + شهادات + أنشطة.",
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

export default function NawaytLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ar" dir="rtl">
      <head>
        <link rel="icon" href="/favicon.png" type="image/png" />
      </head>
      <body className="antialiased" style={{ margin: 0 }}>
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}

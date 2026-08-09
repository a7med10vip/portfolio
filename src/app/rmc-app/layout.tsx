import "@/app/globals.css";
import RootChrome from "@/components/RootChrome";
export const metadata = {
  title: "عرض تطوير تطبيق مجمع الرقي العام الطبي | Ahmed Ali",
  description:
    "عرض متكامل لتطوير تطبيق موبايل (iOS + Android) لمجمع الرقي العام الطبي بمكة المكرمة: الحجز، بوابة المريض والتحاليل، متجر المحاليل، مساعد ذكاء اصطناعي، ولوحة إدارة — مع عرض السعر وخطة التنفيذ.",
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

export default function RMCAppLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ar" dir="rtl">
      <head>
        <link rel="icon" href="/favicon.png" type="image/png" />
      </head>
      <body className="antialiased m-0" suppressHydrationWarning>
        {children}
        <RootChrome />
      </body>
    </html>
  );
}

import "@/app/globals.css";
import RootChrome from "@/components/RootChrome";
export const metadata = {
  title: "تقرير أداء الحملات والظهور — مجمع الرقي العام الطبي | Ahmed Ali",
  description:
    "تقرير مفصّل لأداء حملات مجمع الرقي العام الطبي بمكة المكرمة عبر Snap و TikTok و Meta، إضافة إلى أداء الظهور في محركات البحث (SEO) خلال موسم عيد الأضحى 2026.",
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

export default function RMCReportLayout({ children }: { children: React.ReactNode }) {
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

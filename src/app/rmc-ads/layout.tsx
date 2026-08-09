import "@/app/globals.css";
import RootChrome from "@/components/RootChrome";
export const metadata = {
  title: "خطة الإعلانات المدفوعة — مجمع الرقي الطبي | Ahmed Ali",
  description: "خطة إعلانات مدفوعة لمدة 7 أيام قبل عيد الأضحى لمجمع الرقي العام الطبي بمكة المكرمة عبر TikTok و Meta و Google Ads.",
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

export default function RMCAdsLayout({ children }: { children: React.ReactNode }) {
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

export const metadata = {
  title: "خطة السيو والذكاء الاصطناعي — مجمع الرقي الطبي | Ahmed Ali",
  description: "خطة شاملة للسيو والظهور في الذكاء الاصطناعي والشات بوت لمجمع الرقي العام الطبي في مكة المكرمة.",
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

export default function RMCLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ar" dir="rtl">
      <head>
        <link rel="icon" href="/favicon.png" type="image/png" />
      </head>
      <body className="antialiased" style={{ margin: 0 }}>
        {children}
      </body>
    </html>
  );
}

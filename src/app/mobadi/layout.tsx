export const metadata = {
  title: "من الفكرة إلى الإبداع — MO BADI | Ahmed Ali",
  description: "المخطط التقني الكامل لمنصة MO BADI — بورتفوليو + منصة كورسات. نظام تصميم، قاعدة بيانات، مسارات المستخدم، وخطة تطوير.",
  robots: { index: false, follow: false },
  icons: {
    icon: [
      { url: "/favicon.png", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: "/apple-touch-icon.png",
  },
};

export default function MoBadiLayout({ children }: { children: React.ReactNode }) {
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

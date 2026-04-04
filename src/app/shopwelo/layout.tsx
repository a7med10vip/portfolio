export const metadata = {
  title: "عرض فني ومالي — متجر ويلو | Ahmed Ali",
  description: "عرض فني ومالي متكامل لتحسين وتطوير متجر ويلو الإلكتروني Shopwelo.com",
  robots: { index: false, follow: false },
};

export default function ShopweloLayout({ children }: { children: React.ReactNode }) {
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

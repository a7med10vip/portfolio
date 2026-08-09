import "@/app/globals.css";
import RootChrome from "@/components/RootChrome";
export const metadata = {
  title: "عرض فني — تحسين متجر Jack & Jones الرياض | Ahmed Ali",
  description: "عرض فني متكامل لتحسين البنية والسيو والسرعة والتجربة لمتجر Jack & Jones الرياض (jackjonesriyadh.com)",
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

export default function JackJonesLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ar" dir="rtl">
      <head>
        <link rel="icon" href="/favicon.png" type="image/png" />
      </head>
      <body className="antialiased" style={{ margin: 0 }}>
        {children}
        <RootChrome />
      </body>
    </html>
  );
}

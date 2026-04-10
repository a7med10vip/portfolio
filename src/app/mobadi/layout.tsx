import { Inter } from "next/font/google";

const inter = Inter({ variable: "--font-inter", subsets: ["latin"], display: "swap" });

export const metadata = {
  title: "MO BADI — Platform Architecture | Ahmed Ali",
  description: "Full architecture document for MO BADI portfolio & course platform — design system, tech stack, database schema, user flows, and development roadmap.",
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
    <html lang="en" className={inter.variable}>
      <head>
        <link rel="icon" href="/favicon.png" type="image/png" />
      </head>
      <body className="antialiased" style={{ margin: 0, fontFamily: "var(--font-inter), system-ui, sans-serif" }}>
        {children}
      </body>
    </html>
  );
}

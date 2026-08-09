import "@/app/globals.css";
import RootChrome from "@/components/RootChrome";
export const metadata = {
  title: "ClickUp — The Everything App for Work | Ahmed Ali",
  description:
    "Software to replace all software. Apps, AI, Projects, Chat, Docs and 95+ more — all in one place. 384% ROI. 92,400 hours saved. Trusted by 5M+ teams.",
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

export default function ClickUpLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" dir="ltr">
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

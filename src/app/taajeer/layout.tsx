import type { Metadata } from "next";
import "../globals.css";
import RootChrome from "@/components/RootChrome";

export const metadata: Metadata = {
  title: "Taajeer Automotive — Social Media Strategy & Creative Proposal | Emotion MENA",
  description:
    "A unified social strategy for three brands, one group: Bestune, 212 and Motor Souq. Research, approach, audience, strategy and channels.",
  robots: { index: false, follow: false },
  icons: { icon: [{ url: "/favicon.png", type: "image/png" }] },
};

export default function TaajeerLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" dir="ltr">
      <body style={{ margin: 0, fontFamily: "Calibri, sans-serif" }}>{children}<RootChrome /></body>
    </html>
  );
}

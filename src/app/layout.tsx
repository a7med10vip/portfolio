import "./globals.css";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/next";
import PageTracker from "@/components/tracking/PageTracker";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {children}
      <PageTracker />
      <SpeedInsights />
      <Analytics />
    </>
  );
}

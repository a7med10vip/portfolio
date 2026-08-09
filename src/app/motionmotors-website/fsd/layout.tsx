import { Bricolage_Grotesque, Instrument_Serif } from "next/font/google";
import SmoothScroll from "@/components/SmoothScroll";

const bricolage = Bricolage_Grotesque({
  variable: "--font-bricolage",
  subsets: ["latin"],
  display: "swap",
  weight: ["200", "300", "400", "500", "600", "700", "800"],
});

const instrument = Instrument_Serif({
  variable: "--font-accent",
  subsets: ["latin"],
  display: "swap",
  weight: "400",
  style: "italic",
});

export const metadata = {
  title: "Motion Motors — FSD · DMS, Owner Account & After-Sales | Ahmed Ali",
  description:
    "Functional Specification Document for the Motion Motors custom DMS — Owner Account, Service Booking, Warranty, Parts, Post-Purchase Automation, and Online Reservation. Prepared by Ahmed Ali.",
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

/* Nested under `motionmotors-website/layout.tsx`, which owns the <html>/<body>
   for this branch — so this one only contributes its own fonts and scroll. */
export default function MotionMotorsFSDLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className={`${bricolage.variable} ${instrument.variable} antialiased`}
      style={{ fontFamily: "var(--font-bricolage), system-ui, sans-serif" }}>
      <SmoothScroll>{children}</SmoothScroll>
    </div>
  );
}

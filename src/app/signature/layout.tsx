import "@/app/globals.css";
import type { Metadata } from "next";
import { Bricolage_Grotesque } from "next/font/google";

/* Deliberately lean: no smooth-scroll rig, no site chrome, one font family.
   This page is a tool someone opens to do one thing, so it should be up
   immediately rather than waiting on the rest of the site's furniture. */

const bricolage = Bricolage_Grotesque({
  variable: "--font-bricolage",
  subsets: ["latin"],
  display: "swap",
  weight: ["300", "400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "Email signature builder",
  description:
    "Build your email signature: pick your company, fill in your details, and copy the card straight into Gmail or Outlook.",
  robots: { index: false, follow: false },
};

export default function SignatureLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" dir="ltr" className={bricolage.variable}>
      <body
        className="antialiased"
        style={{ margin: 0, background: "#fff", fontFamily: "var(--font-bricolage), system-ui, sans-serif" }}
      >
        {children}
      </body>
    </html>
  );
}

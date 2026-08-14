import type { Metadata } from "next";

import SignatureTool from "./SignatureTool";

export const metadata: Metadata = {
  title: "Email signature builder — Emotion Group",
  description:
    "Build your Emotion Group email signature: fill in your name, title, phone and email, then copy the card straight into Gmail or Outlook.",
  robots: { index: false, follow: false },
};

const INK = "#04323A";
const TEAL = "#004D5A";
const MUTED = "#71717A";

export default function SignaturePage() {
  return (
    <main style={{ background: "#fff", minHeight: "100vh" }}>
      <div className="container" style={{ paddingTop: 72, paddingBottom: 96 }}>
        <div className="max-w-2xl mb-10">
          <span
            className="inline-block text-[11px] font-bold px-3 py-1.5 rounded-full mb-5"
            style={{ background: "#CFF7EE", color: INK, border: `1.5px solid ${TEAL}` }}
          >
            Emotion Group
          </span>
          <h1 className="heading text-3xl md:text-5xl mb-4" style={{ color: INK, lineHeight: 1.15 }}>
            Build your email signature
          </h1>
          <p className="text-base md:text-lg" style={{ color: MUTED, lineHeight: 1.7 }}>
            The same card the design team drew, with your details on it. Fill in four fields,
            copy it, and paste it into your mail settings — the phone, email and website lines
            stay clickable.
          </p>
        </div>

        <SignatureTool />
      </div>
    </main>
  );
}

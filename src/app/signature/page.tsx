import SignatureBuilder from "./SignatureBuilder";

const INK = "#04323A";
const TEAL = "#004D5A";
const MUTED = "#71717A";

export default function SignaturePage() {
  return (
    <main style={{ background: "#fff", minHeight: "100vh" }}>
      <div className="container" style={{ paddingTop: 72, paddingBottom: 96 }}>
        <div className="mb-10">
          <span
            className="inline-block text-[11px] font-bold px-3 py-1.5 rounded-full mb-5"
            style={{ background: "#CFF7EE", color: INK, border: `1.5px solid ${TEAL}` }}
          >
            Emotion Group · Vertex Integra
          </span>
          {/* The measure sits on the paragraph, not the heading — the heading needs
              the full width to hold one line, and only holds it once there is room. */}
          <h1
            className="heading text-3xl md:text-[42px] lg:text-5xl mb-4 md:whitespace-nowrap"
            style={{ color: INK, lineHeight: 1.15 }}
          >
            Build your email signature
          </h1>
          <p className="text-base md:text-lg max-w-2xl" style={{ color: MUTED, lineHeight: 1.7 }}>
            The same card the design team drew, with your details on it. Fill in four fields,
            copy it, and paste it into your mail settings — the phone, email and website lines
            stay clickable.
          </p>
        </div>

        <SignatureBuilder />
      </div>
    </main>
  );
}

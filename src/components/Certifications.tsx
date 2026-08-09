"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ExternalLink, CheckCircle, Clock, GraduationCap } from "lucide-react";
/* eslint-disable @next/next/no-img-element */

gsap.registerPlugin(ScrollTrigger);

/* Same named ramp as Services, How I Work, Projects, Stats and Experience. */
const INK = "#04323A";
const TEAL = "#004D5A";
const MUTED = "#4E717A";
const MINT = "#CFF7EE";
const WASH = "#F4FBF9";
/* Semantic, not decorative — this is the only non-palette hue on the card and
   it means one thing: not finished yet. */
const PENDING = "#B77500";

/* Declaring the union up front keeps the "in-progress" branch reachable now
   that every entry is completed — with `as const` on each literal, TypeScript
   narrowed `status` to just "completed" and rejected the comparison. `badge`
   being optional here is also what removes the two `as any` casts the card
   used to need to read it. */
type CertItem = {
  title: string;
  issuer: string;
  issuerLogo: string;
  status: "completed" | "in-progress";
  issued: string;
  expires: string | null;
  credentialId: string | null;
  credentialUrl: string | null;
  description: string;
  badge?: string;
};

const certifications: CertItem[] = [
  {
    title: "Google Analytics 4 (GA4) Certification",
    issuer: "Google Digital Academy (Skillshop)",
    issuerLogo: "/ext/google-analytics.png",
    status: "completed",
    issued: "Jan 2026",
    expires: "Jan 2027",
    credentialId: "173041626",
    credentialUrl: "https://skillshop.credential.net/6e74a492-3eaa-4c04-aa6b-0b43914de8c2#acc.KSvTF42P",
    description: "Certified in Google Analytics 4. Event-based tracking, reporting, audience building, and data-driven attribution.",
  },
  {
    title: "AI-Powered Shopping Ads Certification",
    issuer: "Google Digital Academy (Skillshop)",
    issuerLogo: "/ext/google.svg",
    status: "completed",
    issued: "Jul 2025",
    expires: "Jul 2026",
    credentialId: "156676960",
    credentialUrl: "https://skillshop.credential.net/5e70d36f-60e4-491f-a217-536b8fbb169d#acc.twOHon6z",
    description: "Certified in AI-powered Performance Max and Shopping campaigns. Feed optimization, bidding strategies, and automation.",
  },
  {
    title: "AI for Business Professionals",
    issuer: "HP LIFE",
    issuerLogo: "/ext/hp-logo.svg",
    status: "completed",
    issued: "Jan 2026",
    expires: null,
    credentialId: "9f360f1d-56e2-42aa-8947-6f6ebd2a0224",
    credentialUrl: "https://www.life-global.org/certificate/9f360f1d-56e2-42aa-8947-6f6ebd2a0224",
    badge: "Ambassador Badge Holder",
    description: "AI integration in business operations. Prompt engineering, AI tools evaluation, and strategic implementation for enterprises.",
  },
  {
    title: "Google Data Analytics Professional Certificate",
    issuer: "Google / Coursera",
    issuerLogo: "/ext/coursera.png",
    status: "completed",
    issued: "Mar 2026",
    expires: null,
    /* Left null deliberately — I don't have the real credential ID or
       Coursera verify link, and inventing either would put a fabricated
       record on the page. Send them over and the ID pill and the Verify
       button light up automatically. */
    credentialId: null,
    credentialUrl: null,
    description: "Professional certificate in data analytics. Data cleaning, SQL, R, Tableau, and data visualization.",
  },
];

export default function Certifications() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>(".cert-card").forEach((el) => {
        gsap.fromTo(el,
          { y: 40, opacity: 0, scale: 0.95 },
          {
            y: 0, opacity: 1, scale: 1, duration: 0.7, ease: "power3.out",
            scrollTrigger: { trigger: el, start: "top 88%" },
          }
        );
      });

      /* The progress-bar tween that used to sit here animated width from "0%"
         to "0%" — a 1.5s no-op with its own ScrollTrigger. */
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="certifications"
      className="relative overflow-hidden"
      style={{ background: "#fff", padding: "100px 24px" }}
    >
      <div className="max-w-6xl mx-auto relative">
        {/* Header */}
        <div className="text-center mb-16">
          <p className="script text-xl md:text-2xl mb-3" style={{ color: TEAL }}>Credentials</p>
          <h2 className="heading text-3xl md:text-5xl" style={{ color: INK }}>Certifications</h2>
        </div>

        {/* Cards grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {certifications.map((cert, i) => {
            const isInProgress = cert.status === "in-progress";
            const isMint = i % 2 !== 0;
            const bg = isMint ? MINT : WASH;
            const muted = isMint ? "rgba(4,50,58,0.70)" : MUTED;

            return (
              <div
                key={i}
                className={`cert-card opacity-0 rounded-[20px] p-7 md:p-8 flex flex-col justify-between ${i === certifications.length - 1 && certifications.length % 2 !== 0 ? "md:col-span-2 md:max-w-[calc(50%-12px)] md:mx-auto" : ""}`}
                style={{ background: bg, border: `2px solid ${TEAL}`, boxShadow: `5px 5px 0px 0px ${TEAL}`, minHeight: "320px" }}
              >
                {/* Top section */}
                <div>
                  {/* Issuer row */}
                  <div className="flex items-center justify-between mb-5">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: "#fff", border: `1.5px solid ${TEAL}` }}>
                        <img src={cert.issuerLogo} alt={cert.issuer} width={22} height={22} className="object-contain" />
                      </div>
                      <div>
                        <p className="text-xs font-bold" style={{ color: INK }}>{cert.issuer}</p>
                        {cert.expires && (
                          <p className="text-[10px]" style={{ color: muted }}>Valid until {cert.expires}</p>
                        )}
                      </div>
                    </div>

                    {/* Status. "Verified" is reserved for the certificates that
                        actually carry a credential link — the rest say
                        "Completed", which is the claim we can stand behind. */}
                    <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full" style={{ background: "#fff", border: `1.5px solid ${isInProgress ? PENDING : TEAL}` }}>
                      {isInProgress ? <Clock size={11} color={PENDING} /> : <CheckCircle size={11} color={TEAL} />}
                      <span className="text-[10px] font-bold" style={{ color: isInProgress ? PENDING : INK }}>
                        {isInProgress ? "In Progress" : cert.credentialUrl ? "Verified" : "Completed"}
                      </span>
                    </div>
                  </div>

                  {/* Title */}
                  <h3 className="heading text-xl md:text-2xl mb-3" style={{ color: INK, lineHeight: 1.35 }}>{cert.title}</h3>

                  {/* Badge if exists */}
                  {cert.badge && (
                    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full mb-3" style={{ background: "#fff", border: `1.5px solid ${TEAL}` }}>
                      <span className="text-sm">🏅</span>
                      <span className="text-[11px] font-bold" style={{ color: INK }}>{cert.badge}</span>
                    </div>
                  )}

                  {/* Description */}
                  <p className="text-sm leading-relaxed mb-4" style={{ color: muted }}>{cert.description}</p>

                  {/* Progress bar for in-progress */}
                  {isInProgress && (
                    <div className="mb-5">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="inline-block text-[10px] px-2.5 py-1 rounded-full font-semibold" style={{ background: "#fff", border: `1.5px solid ${PENDING}`, color: PENDING }}>6-month professional program</span>
                        <span className="inline-flex items-center gap-1.5 text-[11px] px-2.5 py-1 rounded-full font-semibold" style={{ background: "#fff", border: `1.5px solid ${TEAL}`, color: INK }}>
                          <GraduationCap size={11} /> Started {cert.issued}
                        </span>
                      </div>
                    </div>
                  )}

                  {/* Credential ID + Issued date. Both pills used to be tinted
                      with a per-certificate `color` — four issuer hues
                      (#E37400, #34A853, #0096D6, #4285F4) fighting each other
                      across four cards. The issuer logo already carries the
                      brand; the pills now match every other chip on the site. */}
                  {!isInProgress && <div className="flex items-center gap-2 flex-wrap mb-3">
                    {cert.credentialId && (
                      <span className="inline-block text-[10px] font-mono px-2.5 py-1 rounded-full" style={{ background: "#fff", border: `1.5px solid ${TEAL}`, color: INK }}>
                        ID: {cert.credentialId}
                      </span>
                    )}
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold" style={{ background: "#fff", border: `1.5px solid ${TEAL}`, color: INK }}>
                      <GraduationCap size={11} /> Issued {cert.issued}
                    </span>
                  </div>}
                </div>

                {/* Bottom CTA */}
                {cert.credentialUrl && (
                  <a
                    href={cert.credentialUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 h-10 px-6 rounded-full text-xs font-bold w-fit"
                    style={{
                      background: isMint ? "#fff" : MINT,
                      color: INK,
                      border: `2px solid ${TEAL}`,
                      boxShadow: `3px 3px 0px 0px ${TEAL}`,
                    }}
                  >
                    Verify Credential <ExternalLink size={12} />
                  </a>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

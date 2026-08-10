"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ExternalLink, CheckCircle, Clock, GraduationCap } from "lucide-react";

/* the section eyebrows now sit on a dark ground */
const MINT = "#CFF7EE";
/* eslint-disable @next/next/no-img-element */

gsap.registerPlugin(ScrollTrigger);

type Certification = {
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

const certifications: Certification[] = [
  {
    title: "شهادة تحليلات جوجل 4",
    issuer: "Google Digital Academy (Skillshop)",
    issuerLogo: "/ext/google-analytics.png",
    status: "completed",
    issued: "يناير 2026",
    expires: "يناير 2027",
    credentialId: "173041626",
    credentialUrl: "https://skillshop.credential.net/6e74a492-3eaa-4c04-aa6b-0b43914de8c2#acc.KSvTF42P",
    description: "معتمد في Google Analytics 4. التتبع المبني على الأحداث، التقارير، بناء الجماهير، والإسناد القائم على البيانات.",
  },
  {
    title: "شهادة إعلانات التسوق المدعومة بالذكاء الاصطناعي",
    issuer: "Google Digital Academy (Skillshop)",
    issuerLogo: "/ext/google.svg",
    status: "completed",
    issued: "يوليو 2025",
    expires: "يوليو 2026",
    credentialId: "156676960",
    credentialUrl: "https://skillshop.credential.net/5e70d36f-60e4-491f-a217-536b8fbb169d#acc.twOHon6z",
    description: "معتمد في حملات التسوق المدعومة بالذكاء الاصطناعي. تحسين الخلاصات، استراتيجيات المزايدة، والأتمتة.",
  },
  {
    title: "الذكاء الاصطناعي لمحترفي الأعمال",
    issuer: "HP LIFE",
    issuerLogo: "/ext/hp-logo.svg",
    status: "completed",
    issued: "يناير 2026",
    expires: null,
    credentialId: "9f360f1d-56e2-42aa-8947-6f6ebd2a0224",
    credentialUrl: "https://www.life-global.org/certificate/9f360f1d-56e2-42aa-8947-6f6ebd2a0224",
    badge: "حامل شارة السفير",
    description: "دمج الذكاء الاصطناعي في العمليات التجارية. هندسة الأوامر، تقييم أدوات الذكاء الاصطناعي، والتنفيذ الاستراتيجي للمؤسسات.",
  },
  {
    title: "الشهادة المهنية في تحليل البيانات من جوجل",
    issuer: "Google / Coursera",
    issuerLogo: "/ext/coursera.png",
    status: "completed",
    issued: "مارس 2026",
    expires: null,
    /* Left null deliberately — the real credential ID and Coursera verify link
       are not to hand, and inventing either would put a fabricated record on
       the page. */
    credentialId: null,
    credentialUrl: null,
    description: "شهادة مهنية في تحليل البيانات. تنظيف البيانات، SQL، R، Tableau، وتصور البيانات.",
  },
];

export default function CertificationsAr() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>(".cert-card-ar").forEach((el) => {
        gsap.fromTo(el,
          { y: 40, opacity: 0, scale: 0.95 },
          {
            y: 0, opacity: 1, scale: 1, duration: 0.7, ease: "power3.out",
            scrollTrigger: { trigger: el, start: "top 88%" },
          }
        );
      });
      /* The progress-bar tween that used to sit here animated width from "0%"
         to "0%" — a no-op with its own ScrollTrigger. */
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="certifications"
      className="relative overflow-hidden"
      style={{ background: "#0A0A0A", padding: "100px 24px" }}
    >
      <div className="max-w-6xl mx-auto relative">
        {/* Header */}
        <div className="text-center mb-16">
          <p className="ar-script text-xl md:text-2xl mb-3" style={{ color: MINT }}>الاعتمادات</p>
          <h2 className="ar-heading text-3xl md:text-4xl" style={{ color: "#fff" }}>الشهادات المهنية</h2>
        </div>

        {/* Cards grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {certifications.map((cert, i) => {
            const isInProgress = cert.status === "in-progress";
            const variant = i % 2 === 0 ? "white" : "green";
            const bg = variant === "white" ? "#F4FBF9" : "#CFF7EE";

            return (
              <div
                key={i}
                className={`cert-card-ar opacity-0 rounded-[24px] p-7 md:p-8 flex flex-col justify-between ${i === certifications.length - 1 && certifications.length % 2 !== 0 ? "md:col-span-2 md:max-w-[calc(50%-10px)] md:mx-auto" : ""}`}
                style={{ background: bg, border: "2px solid #004D5A", minHeight: "320px" }}
              >
                {/* Top section */}
                <div>
                  {/* Issuer row */}
                  <div className="flex items-center justify-between mb-5">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: "#fff", border: "1.5px solid #004D5A" }}>
                        <img src={cert.issuerLogo} alt={cert.issuer} width={22} height={22} className="object-contain" />
                      </div>
                      <div>
                        <p className="text-xs font-semibold" style={{ color: "#04323A" }}>{cert.issuer}</p>
                        {cert.expires && (
                          <p className="ar-body text-[10px]" style={{ color: "rgba(4,50,58,0.4)" }}>صالحة حتى {cert.expires}</p>
                        )}
                      </div>
                    </div>

                    {/* Status */}
                    <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full" style={{ background: "#fff", border: "1.5px solid #004D5A" }}>
                      {isInProgress ? <Clock size={11} color="#B77500" /> : <CheckCircle size={11} color="#04323A" />}
                      <span className="ar-body text-[10px] font-bold" style={{ color: isInProgress ? "#B77500" : "#04323A" }}>
                        {isInProgress ? "قيد التنفيذ" : cert.credentialUrl ? "موثّق" : "مكتملة"}
                      </span>
                    </div>
                  </div>

                  {/* Title */}
                  <h3 className="ar-heading text-xl md:text-2xl mb-3" style={{ color: "#04323A", lineHeight: 1.5 }}>{cert.title}</h3>

                  {/* Badge if exists */}
                  {cert.badge && (
                    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full mb-3" style={{ background: "rgba(4,50,58,0.08)", border: "1px solid rgba(4,50,58,0.1)" }}>
                      <span className="text-sm">🏅</span>
                      <span className="text-[11px] font-bold" style={{ color: "#04323A" }}>{cert.badge}</span>
                    </div>
                  )}

                  {/* Description */}
                  <p className="ar-body text-sm leading-relaxed mb-4" style={{ color: "rgba(4,50,58,0.6)" }}>{cert.description}</p>

                  {/* Progress bar for in-progress */}
                  {isInProgress && (
                    <div className="mb-5">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="ar-body inline-block text-[10px] px-2.5 py-1 rounded-full font-semibold" style={{ background: "#fff", border: "1.5px solid #B77500", color: "#B77500" }}>برنامج مهني لمدة 6 أشهر</span>
                        <span className="ar-body inline-flex items-center gap-1.5 text-[11px] px-2.5 py-1 rounded-full font-semibold" style={{ background: "#fff", border: "1.5px solid #004D5A", color: "#04323A" }}>
                          <GraduationCap size={11} /> بدأت {cert.issued}
                        </span>
                      </div>
                    </div>
                  )}

                  {/* Credential ID + Issued date */}
                  {!isInProgress && <div className="flex items-center gap-2 flex-wrap mb-3">
                    {cert.credentialId && (
                      <span className="inline-block text-[10px] font-mono px-2.5 py-1 rounded-full" style={{ background: variant === "white" ? `rgba(0,77,90,0.08)` : "#fff", border: variant === "white" ? `1px solid rgba(0,77,90,0.08)` : "1px solid #004D5A", color: "#04323A" }}>
                        ID: {cert.credentialId}
                      </span>
                    )}
                    <span className="ar-body inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-medium" style={{ background: variant === "green" ? "#fff" : `rgba(0,77,90,0.08)`, border: variant === "green" ? "1px solid #004D5A" : `1px solid rgba(0,77,90,0.08)`, color: "#04323A" }}>
                      <GraduationCap size={11} /> صدر {cert.issued}
                    </span>
                  </div>}
                </div>

                {/* Bottom CTA */}
                {cert.credentialUrl && (
                  <a
                    href={cert.credentialUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="ar-body inline-flex items-center gap-2 h-10 px-6 rounded-full text-xs font-bold w-fit"
                    style={{
                      background: variant === "white" ? "#CFF7EE" : "#fff",
                      border: "2px solid #04323A",

                    }}
                  >
                    تحقق من الشهادة <ExternalLink size={12} />
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

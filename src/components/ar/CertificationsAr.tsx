"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ExternalLink, CheckCircle, Clock, GraduationCap } from "lucide-react";
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
  color: string;
  description: string;
  badge?: string;
  progress?: number;
};

const certifications = [
  {
    title: "شهادة تحليلات جوجل 4",
    issuer: "Google Digital Academy (Skillshop)",
    issuerLogo: "/ext/google-analytics.png",
    status: "completed" as const,
    issued: "يناير 2026",
    expires: "يناير 2027",
    credentialId: "173041626",
    credentialUrl: "https://skillshop.credential.net/6e74a492-3eaa-4c04-aa6b-0b43914de8c2#acc.KSvTF42P",
    color: "#E37400",
    description: "معتمد في Google Analytics 4. التتبع المبني على الأحداث، التقارير، بناء الجماهير، والإسناد القائم على البيانات.",
  },
  {
    title: "شهادة إعلانات التسوق المدعومة بالذكاء الاصطناعي",
    issuer: "Google Digital Academy (Skillshop)",
    issuerLogo: "/ext/google.svg",
    status: "completed" as const,
    issued: "يوليو 2025",
    expires: "يوليو 2026",
    credentialId: "156676960",
    credentialUrl: "https://skillshop.credential.net/5e70d36f-60e4-491f-a217-536b8fbb169d#acc.twOHon6z",
    color: "#34A853",
    description: "معتمد في حملات التسوق المدعومة بالذكاء الاصطناعي. تحسين الخلاصات، استراتيجيات المزايدة، والأتمتة.",
  },
  {
    title: "الذكاء الاصطناعي لمحترفي الأعمال",
    issuer: "HP LIFE",
    issuerLogo: "/ext/hp-logo.svg",
    status: "completed" as const,
    issued: "يناير 2026",
    expires: null,
    credentialId: "9f360f1d-56e2-42aa-8947-6f6ebd2a0224",
    credentialUrl: "https://www.life-global.org/certificate/9f360f1d-56e2-42aa-8947-6f6ebd2a0224",
    color: "#0096D6",
    badge: "حامل شارة السفير",
    description: "دمج الذكاء الاصطناعي في العمليات التجارية. هندسة الأوامر، تقييم أدوات الذكاء الاصطناعي، والتنفيذ الاستراتيجي للمؤسسات.",
  },
  {
    title: "الشهادة المهنية في تحليل البيانات من جوجل",
    issuer: "Google / Coursera",
    issuerLogo: "/ext/coursera.png",
    status: "in-progress" as const,
    issued: "مارس 2026",
    expires: null,
    credentialId: null,
    credentialUrl: null,
    color: "#4285F4",
    progress: 0,
    description: "شهادة مهنية في تحليل البيانات. تنظيف البيانات، SQL، R، Tableau، وتصور البيانات. برنامج مهني لمدة 6 أشهر.",
  },
] satisfies Certification[];

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

      gsap.fromTo(".progress-fill-ar",
        { width: "0%" },
        {
          width: "0%", duration: 1.5, ease: "power2.out",
          scrollTrigger: { trigger: ".progress-fill-ar", start: "top 88%" },
        }
      );
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
          <p className="ar-script text-xl md:text-2xl mb-3" style={{ color: "#4FFFB0" }}>الاعتمادات</p>
          <h2 className="ar-heading text-3xl md:text-4xl" style={{ color: "#fff" }}>الشهادات المهنية</h2>
        </div>

        {/* Cards grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {certifications.map((cert, i) => {
            const isInProgress = cert.status === "in-progress";
            const variant = i % 2 === 0 ? "white" : "green";
            const bg = variant === "white" ? "#fff" : "#4FFFB0";

            return (
              <div
                key={i}
                className={`cert-card-ar opacity-0 rounded-[24px] p-7 md:p-8 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 ${i === certifications.length - 1 && certifications.length % 2 !== 0 ? "md:col-span-2 md:max-w-[calc(50%-10px)] md:mx-auto" : ""}`}
                style={{ background: bg, minHeight: "320px" }}
              >
                {/* Top section */}
                <div>
                  {/* Issuer row */}
                  <div className="flex items-center justify-between mb-5">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: "#fff", border: "1px solid #e0e0e0" }}>
                        <img src={cert.issuerLogo} alt={cert.issuer} width={22} height={22} className="object-contain" />
                      </div>
                      <div>
                        <p className="text-xs font-semibold" style={{ color: "#0A0A0A" }}>{cert.issuer}</p>
                        {cert.expires && (
                          <p className="ar-body text-[10px]" style={{ color: "rgba(0,0,0,0.4)" }}>صالحة حتى {cert.expires}</p>
                        )}
                      </div>
                    </div>

                    {/* Status */}
                    <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full" style={{ background: "#fff", border: "1px solid #e0e0e0" }}>
                      {isInProgress ? <Clock size={11} color="#CC8800" /> : <CheckCircle size={11} color="#0A0A0A" />}
                      <span className="ar-body text-[10px] font-bold" style={{ color: isInProgress ? "#CC8800" : "#0A0A0A" }}>
                        {isInProgress ? "قيد التنفيذ" : "موثّق"}
                      </span>
                    </div>
                  </div>

                  {/* Title */}
                  <h3 className="ar-heading text-xl md:text-2xl mb-3" style={{ color: "#0A0A0A", lineHeight: 1.5 }}>{cert.title}</h3>

                  {/* Badge if exists */}
                  {cert.badge && (
                    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full mb-3" style={{ background: "rgba(0,0,0,0.08)", border: "1px solid rgba(0,0,0,0.1)" }}>
                      <span className="text-sm">🏅</span>
                      <span className="text-[11px] font-bold" style={{ color: "#0A0A0A" }}>{cert.badge}</span>
                    </div>
                  )}

                  {/* Description */}
                  <p className="ar-body text-sm leading-relaxed mb-4" style={{ color: "rgba(0,0,0,0.6)" }}>{cert.description}</p>

                  {/* Progress bar for in-progress */}
                  {isInProgress && (
                    <div className="mb-5">
                      <div className="flex items-center justify-between mb-2">
                        <span className="ar-body text-[10px] font-bold" style={{ color: "#0A0A0A" }}>بداية مارس 2026</span>
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full" style={{ background: "#fff", border: "1px solid #e0e0e0", color: "#CC8800" }}>0%</span>
                      </div>
                      <div className="w-full h-2 rounded-full overflow-hidden" style={{ background: "rgba(0,0,0,0.1)" }}>
                        <div className="progress-fill-ar h-full rounded-full" style={{ width: "0%", background: "#CC8800" }} />
                      </div>
                      <div className="flex items-center gap-2 flex-wrap mt-3">
                        <span className="ar-body inline-block text-[10px] px-2.5 py-1 rounded-full font-medium" style={{ background: "#fff", border: "1px solid #e0e0e0", color: "#0A0A0A" }}>برنامج مهني لمدة 6 أشهر</span>
                        <span className="ar-body inline-flex items-center gap-1.5 text-[11px] px-2.5 py-1 rounded-full font-medium" style={{ background: "#fff", border: "1px solid #e0e0e0", color: "#0A0A0A" }}>
                          <GraduationCap size={11} /> صدر {cert.issued}
                        </span>
                      </div>
                    </div>
                  )}

                  {/* Credential ID + Issued date */}
                  {!isInProgress && <div className="flex items-center gap-2 flex-wrap mb-3">
                    {cert.credentialId && (
                      <span className="inline-block text-[10px] font-mono px-2.5 py-1 rounded-full" style={{ background: variant === "white" ? `${cert.color}12` : "#fff", border: variant === "white" ? `1px solid ${cert.color}30` : "1px solid #e0e0e0", color: variant === "white" ? cert.color : "#0A0A0A" }}>
                        ID: {cert.credentialId}
                      </span>
                    )}
                    <span className="ar-body inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-medium" style={{ background: variant === "green" ? "#fff" : `${cert.color}15`, border: variant === "green" ? "1px solid #e0e0e0" : `1px solid ${cert.color}30`, color: variant === "green" ? "#0A0A0A" : cert.color }}>
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
                    className="ar-body inline-flex items-center gap-2 h-10 px-6 rounded-full text-xs font-bold transition-all duration-200 hover:-translate-y-0.5 w-fit"
                    style={{
                      background: variant === "white" ? "#4FFFB0" : "#fff",
                      color: "#0A0A0A",
                      border: "2px solid #0A0A0A",
                      boxShadow: "3px 3px 0px 0px #0A0A0A",
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

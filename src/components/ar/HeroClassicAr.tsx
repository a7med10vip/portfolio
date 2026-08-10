"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ArrowLeft, Download } from "lucide-react";
import dynamic from "next/dynamic";
/* eslint-disable @next/next/no-img-element */

const Aurora = dynamic(() => import("../ui/Aurora"), { ssr: false });
const Antigravity = dynamic(() => import("../ui/Antigravity"), { ssr: false });

type LogoItem = { name: string; src: string; fill?: boolean; k?: number };

/* The platform marks that used to live as circular badges in the stage
   section. They stay in discs rather than being laid flat on the ground: the
   TikTok mark is 62% pure black and vanishes on it, and the Google and ChatGPT
   files carry no alpha, so flat they would read as white boxes. */
const logos: LogoItem[] = [
  { name: "Google", src: "/logos/google-logo.png", k: 0.62 },
  { name: "Google Cloud", src: "/logos/google-cloud.png", k: 0.62 },
  { name: "Google Analytics", src: "/ext/google-analytics.png", k: 0.52 },
  { name: "TikTok", src: "/logos/tiktok-logo.png", k: 0.6 },
  { name: "ChatGPT", src: "/logos/chatgpt.jpg", fill: true },
  { name: "Google Gemini", src: "/logos/gemini.png", k: 0.62 },
  { name: "React", src: "/logos/react-logo.png", k: 0.62 },
];

export default function HeroClassicAr() {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(".h-anim", { y: 30, opacity: 0 }, {
        y: 0, opacity: 1, duration: 0.8, ease: "power3.out", stagger: 0.12, delay: 0.3,
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={ref} id="top" className="min-h-screen flex items-center relative overflow-hidden" style={{ background: "#0A0A0A" }}>
      {/* Aurora - desktop only */}
      <div className="absolute inset-0 z-0 opacity-40 hidden md:block">
        <Aurora colorStops={["#004D5A", "#CFF7EE", "#004D5A"]} amplitude={1.0} blend={0.5} speed={1.0} />
      </div>

      {/* Antigravity - desktop only, reduced count */}
      <div className="absolute inset-0 z-[2] opacity-25 hidden md:block" style={{ pointerEvents: "auto" }}>
        <Antigravity count={150} magnetRadius={6} ringRadius={7} waveSpeed={0.4} waveAmplitude={1} particleSize={1.2} lerpSpeed={0.05} color="#CFF7EE" autoAnimate particleVariance={1} rotationSpeed={0} depthFactor={1} pulseSpeed={3} particleShape="capsule" fieldStrength={10} />
      </div>

      {/* Mobile: simple gradient background */}
      <div className="absolute inset-0 z-0 md:hidden" style={{ background: "radial-gradient(ellipse at 50% 30%, rgba(207,247,238,0.10) 0%, transparent 60%)" }} />

      <div className="relative z-10 w-full px-6 md:px-12 lg:px-20 pointer-events-none">
        <div className="max-w-6xl mx-auto text-center pt-32 pb-0">

          {/* Badge */}
          <div className="h-anim opacity-0 mb-7">
            <span className="ar-body no-tail inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-semibold" style={{ background: "#fff", color: "#0A0A0A", border: "2px solid #0A0A0A" }}>
              <span className="w-2 h-2 rounded-full inline-block" style={{ background: "#3FCF8E" }} />
              متاح للعمل
            </span>
          </div>

          {/* Headline */}
          <div className="h-anim opacity-0 mb-7">
            <h1 className="ar-heading text-3xl sm:text-4xl md:text-5xl lg:text-[56px]" style={{ color: "#fff", lineHeight: 1.4 }}>
              حين تُدار التفاصيل باحتراف
              <br />
              <span style={{ color: "#CFF7EE" }}>يصبح النمو</span> نتيجة طبيعية.
            </h1>
          </div>

          {/* Subtitle */}
          <p className="ar-body h-anim opacity-0 text-base md:text-lg leading-relaxed max-w-3xl mx-auto mb-10" style={{ color: "rgba(255,255,255,0.8)" }}>
            أصمّم وأدير منظومات نمو رقمية متكاملة، تجمع بين الأداء الإعلاني، تحسين الظهور في محركات البحث، هندسة التحويل، والأتمتة الذكية بهدف تحقيق نتائج قابلة للقياس ونمو مستدام يخدم أهدافك التجارية بدقة.
          </p>

          {/* CTAs */}
          <div className="h-anim opacity-0 flex flex-wrap justify-center gap-5 mb-10 pointer-events-auto">
            <a href="#projects" className="ar-body group relative inline-flex items-center gap-3 h-14 px-9 rounded-full text-base font-bold transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0" style={{ background: "#CFF7EE", color: "#0A0A0A", border: "2px solid #0A0A0A", boxShadow: "5px 5px 0px 0px #0A0A0A" }}>
              <ArrowLeft size={16} />
              استعرض أعمالي
            </a>
            <a href="/Ahmed-Ali-CV.pdf" download className="ar-body group relative inline-flex items-center gap-3 h-14 px-9 rounded-full text-base font-bold transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0" style={{ background: "#fff", color: "#0A0A0A", border: "2px solid #0A0A0A", boxShadow: "5px 5px 0px 0px #0A0A0A" }}>
              <Download size={16} />
              تحميل السيرة الذاتية
            </a>
          </div>

          {/* Trusted By */}
          <div className="h-anim opacity-0 mb-12">
            <div className="relative inline-flex items-center gap-2 px-5 py-2 rounded-full mb-5" style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.08)" }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87L18.18 22 12 18.27 5.82 22 7 14.14l-5-4.87 6.91-1.01L12 2z" fill="#CFF7EE"/></svg>
              <span className="ar-body text-xs font-semibold tracking-wide" style={{ color: "rgba(255,255,255,0.7)" }}>أعمل على</span>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87L18.18 22 12 18.27 5.82 22 7 14.14l-5-4.87 6.91-1.01L12 2z" fill="#CFF7EE"/></svg>
            </div>
            <div className="flex flex-wrap justify-center items-center gap-4 md:gap-5">
              {logos.map((logo) => (
                <span
                  key={logo.name}
                  title={logo.name}
                  className="flex items-center justify-center rounded-full overflow-hidden transition-transform duration-300 hover:-translate-y-1"
                  style={{ width: 56, height: 56, background: "#fff", border: "2px solid #0A0A0A" }}
                >
                  <img
                    src={logo.src}
                    alt={logo.name}
                    className="object-contain"
                    style={
                      logo.fill
                        ? { width: "100%", height: "100%", objectFit: "cover" }
                        : { width: `${56 * (logo.k ?? 0.55)}px`, height: `${56 * (logo.k ?? 0.55)}px` }
                    }
                  />
                </span>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

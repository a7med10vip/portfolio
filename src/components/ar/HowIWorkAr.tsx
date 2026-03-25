"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const steps = [
  {
    num: "01",
    title: "البحث أولاً",
    subtitle: "بيانات مش افتراضات",
    desc: "كل مشروع يبدأ بفهم السوق والجمهور والمشكلة الحقيقية. أحلل البيانات، أراجع الوضع الحالي، وأحدد الفرص الأعلى تأثيراً قبل ما أكتب سطر كود واحد أو أطلق أي إعلان.",
    highlights: ["تحليل السوق والمنافسين", "مراجعات تقنية", "خريطة الفرص"],
  },
  {
    num: "02",
    title: "تفكير منظومي",
    subtitle: "استراتيجية تلتقي بالتقنية",
    desc: "ما أشتغل بمعزل. التسويق والمنتج والتقنية منظومة واحدة متصلة. أصمم استراتيجيات كل جزء فيها، من نص الإعلان لقاعدة البيانات، يخدم نفس الهدف.",
    highlights: ["تخطيط متعدد التخصصات", "خرائط طريق بمؤشرات أداء", "بنية قابلة للتوسع"],
  },
  {
    num: "03",
    title: "أنفّذ وأطوّر",
    subtitle: "سرعة مع دقة",
    desc: "أؤمن بالإطلاق السريع والتحسين المستمر. سواء إطلاق منتج أو حملة أو بناء منصة كاملة، أتحرك بسرعة، أختبر الافتراضات بدري، وأحسّن بناءً على نتائج حقيقية.",
    highlights: ["تنفيذ على مراحل", "نماذج أولية سريعة", "تحديثات مستمرة"],
  },
  {
    num: "04",
    title: "أقيس كل شيء",
    subtitle: "قرارات مبنية على بيانات",
    desc: "ما في شيء يشتغل بدون تتبع. أركّب التحليلات من اليوم الأول، أبني داشبوردات تعرض اللي يهم، وأستخدم بيانات الأداء لتوجيه كل قرار وتحسين.",
    highlights: ["تحليلات شاملة", "تقارير ذكية", "تحسين مبني على البيانات"],
  },
];

export default function HowIWorkAr() {
  const sectionRef = useRef<HTMLElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".hiw-header-ar",
        { y: 32, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.7,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 78%",
            once: true,
          },
        }
      );

      if (lineRef.current) {
        gsap.fromTo(
          lineRef.current,
          { scaleY: 0 },
          {
            scaleY: 1,
            ease: "none",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 60%",
              end: "bottom 40%",
              scrub: 0.5,
            },
          }
        );
      }

      gsap.utils.toArray<HTMLElement>(".hiw-step-ar").forEach((el) => {
        gsap.fromTo(
          el,
          { y: 40, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: {
              trigger: el,
              start: "top 85%",
              once: true,
            },
          }
        );
      });

      gsap.utils.toArray<HTMLElement>(".hiw-num-ar").forEach((el) => {
        gsap.fromTo(
          el,
          { scale: 0.8, opacity: 0 },
          {
            scale: 1,
            opacity: 1,
            duration: 0.6,
            ease: "back.out(1.7)",
            scrollTrigger: {
              trigger: el,
              start: "top 85%",
              once: true,
            },
          }
        );
      });

      gsap.utils.toArray<HTMLElement>(".hiw-pills-ar").forEach((el) => {
        gsap.fromTo(
          el.children,
          { x: 20, opacity: 0 },
          {
            x: 0,
            opacity: 1,
            duration: 0.5,
            stagger: 0.08,
            ease: "power3.out",
            scrollTrigger: {
              trigger: el,
              start: "top 88%",
              once: true,
            },
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="how-i-work"
      className="relative overflow-hidden"
      style={{ background: "#0A0A0A", padding: "100px 24px" }}
      dir="rtl"
    >
      {/* Subtle dot grid background */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: "radial-gradient(circle, #fff 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />

      {/* Top glow */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] rounded-full opacity-[0.04]"
        style={{ background: "radial-gradient(circle, #4FFFB0 0%, transparent 70%)" }}
      />

      <div className="max-w-5xl mx-auto relative">
        {/* Header */}
        <div className="hiw-header-ar opacity-0 text-center mb-20">
          <p className="ar-script text-xl md:text-2xl mb-3" style={{ color: "#4FFFB0" }}>
            المنهجية
          </p>
          <h2 className="ar-heading text-3xl md:text-5xl" style={{ color: "#fff" }}>
            كيف أشتغل
          </h2>
        </div>

        {/* Steps container */}
        <div className="relative">
          {/* Vertical green line - background track */}
          <div
            className="hidden md:block absolute top-0 bottom-0 w-[2px]"
            style={{
              right: "156px",
              background: "rgba(79,255,176,0.06)",
            }}
          />
          {/* Vertical green line - animated fill */}
          <div
            ref={lineRef}
            className="hidden md:block absolute top-0 bottom-0 w-[2px] origin-top"
            style={{
              right: "156px",
              background: "linear-gradient(to bottom, #4FFFB0, rgba(79,255,176,0.15))",
            }}
          />

          {/* Steps */}
          <div className="flex flex-col">
            {steps.map((step, i) => (
              <div
                key={step.num}
                className="hiw-step-ar opacity-0 group"
              >
                <div
                  className="grid grid-cols-1 md:grid-cols-[160px_1fr] gap-6 md:gap-12 items-start py-12 md:py-16 relative"
                  style={{
                    borderBottom:
                      i < steps.length - 1
                        ? "1px solid rgba(255,255,255,0.06)"
                        : "none",
                  }}
                >
                  {/* Hover glow behind row */}
                  <div
                    className="absolute -inset-x-6 inset-y-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                    style={{ background: "radial-gradient(ellipse at 80% 50%, rgba(79,255,176,0.03), transparent 70%)" }}
                  />

                  {/* Right: Large number */}
                  <div className="relative z-10">
                    <div className="hiw-num-ar flex items-center gap-4 md:flex-col md:items-start md:gap-2">
                      <span
                        className="heading text-6xl md:text-[88px]"
                        style={{
                          background: "linear-gradient(180deg, #4FFFB0 0%, rgba(79,255,176,0.4) 100%)",
                          WebkitBackgroundClip: "text",
                          backgroundClip: "text",
                          WebkitTextFillColor: "transparent",
                          lineHeight: 1.3,
                        }}
                      >
                        {step.num}
                      </span>
                      {/* Green dot on the line with pulse */}
                      <div
                        className="hidden md:block absolute"
                        style={{
                          right: "150px",
                          top: "28px",
                        }}
                      >
                        <div
                          className="w-3 h-3 rounded-full relative"
                          style={{
                            background: "#4FFFB0",
                            boxShadow: "0 0 12px rgba(79,255,176,0.5)",
                          }}
                        />
                        <div
                          className="absolute inset-0 w-3 h-3 rounded-full animate-ping"
                          style={{
                            background: "#4FFFB0",
                            opacity: 0.2,
                            animationDuration: `${3 + i}s`,
                          }}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Left: Content */}
                  <div className="relative z-10">
                    <h3
                      className="ar-heading text-2xl md:text-4xl mb-2 transition-colors duration-300 group-hover:text-[#4FFFB0]"
                      style={{ color: "#fff" }}
                    >
                      {step.title}
                    </h3>
                    <p
                      className="ar-body text-xs font-semibold uppercase tracking-wider mb-5"
                      style={{ color: "rgba(79,255,176,0.6)" }}
                    >
                      {step.subtitle}
                    </p>
                    <p
                      className="ar-body text-sm md:text-base leading-relaxed mb-6 max-w-xl"
                      style={{ color: "rgba(255,255,255,0.55)" }}
                    >
                      {step.desc}
                    </p>

                    {/* Highlights as pills */}
                    <div className="hiw-pills-ar flex flex-wrap gap-2">
                      {step.highlights.map((h) => (
                        <span
                          key={h}
                          className="ar-body px-4 py-2 rounded-full text-[11px] font-bold transition-all duration-300 hover:bg-[rgba(79,255,176,0.15)] hover:border-[rgba(79,255,176,0.3)]"
                          style={{
                            background: "rgba(79,255,176,0.06)",
                            color: "#4FFFB0",
                            border: "1px solid rgba(79,255,176,0.12)",
                          }}
                        >
                          {h}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

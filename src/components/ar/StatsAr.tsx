"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Calendar, Users, Globe2, DollarSign } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const stats = [
  { value: 5, suffix: "+", label: "سنوات خبرة", prefix: "", icon: Calendar, description: "عبر 4 أسواق" },
  { value: 3000, suffix: "+", label: "حضور فعاليات", prefix: "", icon: Users, description: "في مؤتمرات حية" },
  { value: 4, suffix: "", label: "أسواق نشطة", prefix: "", icon: Globe2, description: "مصر · قطر · السعودية · الإمارات" },
  { value: 15, suffix: "K+", label: "ميزانية إعلانية", prefix: "$", icon: DollarSign, description: "إنفاق شهري" },
];

export default function StatsAr() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const counters = sectionRef.current?.querySelectorAll(".stat-num-ar");
      if (!counters) return;

      counters.forEach((el, i) => {
        const target = stats[i].value;
        const obj = { val: 0 };

        gsap.to(obj, {
          val: target,
          duration: 2.5,
          ease: "power2.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
          },
          onUpdate: () => {
            const display = target >= 100 ? Math.round(obj.val).toLocaleString() : Math.round(obj.val);
            el.textContent = `${stats[i].prefix}${display}${stats[i].suffix}`;
          },
        });
      });

      gsap.fromTo(
        ".stat-card-ar",
        { y: 60, opacity: 0, scale: 0.9 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.8,
          stagger: 0.12,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
          },
        }
      );

      gsap.fromTo(
        ".stat-ring-fill-ar",
        { strokeDashoffset: 251 },
        {
          strokeDashoffset: 50,
          duration: 2.5,
          stagger: 0.15,
          ease: "power2.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
          },
        }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden"
      style={{ background: "#0A0A0A", padding: "100px 24px" }}
    >
      {/* Background grid pattern */}
      <div className="absolute inset-0 opacity-[0.03]" style={{
        backgroundImage: "radial-gradient(circle, #fff 1px, transparent 1px)",
        backgroundSize: "40px 40px",
      }} />

      <div className="max-w-6xl mx-auto relative">
        {/* Section header */}
        <div className="text-center mb-16">
          <h2 className="ar-heading text-3xl md:text-4xl" style={{ color: "#fff" }}>أثر يُثبت بالأرقام</h2>
        </div>

        {/* Stats grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 md:gap-6">
          {stats.map(({ label, prefix, suffix, icon: Icon, description }, i) => (
            <div
              key={i}
              className="stat-card-ar opacity-0 relative group"
            >
              {/* Animated gradient border */}
              <div
                className="absolute -inset-[1px] rounded-[24px] overflow-hidden opacity-60 group-hover:opacity-100 transition-opacity duration-500"
              >
                <div
                  className="absolute inset-[-50%] w-[200%] h-[200%]"
                  style={{
                    background: "conic-gradient(from 0deg, #4FFFB0, #0A0A0A, #4FFFB0, #0A0A0A, #4FFFB0)",
                    animation: `spinBorderAr ${6 + i}s linear infinite`,
                    transformOrigin: "center center",
                  }}
                />
              </div>

              {/* Card content */}
              <div
                className="relative rounded-[24px] p-6 md:p-10 flex flex-col items-center text-center h-full overflow-hidden"
                style={{ background: "#111" }}
              >
                {/* Ring + Icon */}
                <div className="relative w-16 h-16 mb-8">
                  <svg className="absolute inset-0 w-full h-full -rotate-90" viewBox="0 0 88 88">
                    <circle cx="44" cy="44" r="40" fill="none" stroke="#1a1a1a" strokeWidth="3" />
                    <circle
                      className="stat-ring-fill-ar"
                      cx="44" cy="44" r="40"
                      fill="none"
                      stroke="#4FFFB0"
                      strokeWidth="3"
                      strokeLinecap="round"
                      strokeDasharray="251"
                      strokeDashoffset="251"
                    />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Icon size={22} style={{ color: "#4FFFB0" }} />
                  </div>
                </div>

                {/* Number */}
                <div
                  className="stat-num-ar ar-heading font-bold mb-3"
                  style={{
                    fontSize: "clamp(2rem, 4.5vw, 3rem)",
                    background: "linear-gradient(135deg, #fff 0%, #4FFFB0 100%)",
                    WebkitBackgroundClip: "text",
                    backgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    lineHeight: 1.6,
                    paddingTop: "0.2em",
                  }}
                >
                  {prefix}0{suffix}
                </div>

                {/* Label */}
                <p className="ar-body text-sm font-semibold mb-1" style={{ color: "#fff" }}>
                  {label}
                </p>

                {/* Description */}
                <p className="ar-body text-[11px]" style={{ color: "rgba(255,255,255,0.35)" }}>
                  {description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes spinBorderAr {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </section>
  );
}

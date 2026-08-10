"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FaCalendarDays, FaUsers, FaEarthAmericas, FaSackDollar } from "react-icons/fa6";

gsap.registerPlugin(ScrollTrigger);

/* Same named ramp as every section. */
const INK = "#04323A";
const MINT = "#CFF7EE";

/* Font Awesome solids rather than thin strokes — the filled marks hold their
   own against the 2px retro outline. */
const stats = [
  { value: 5,    suffix: "+",  prefix: "",  label: "سنوات خبرة",     description: "عبر 4 أسواق",                    Icon: FaCalendarDays },
  { value: 3000, suffix: "+",  prefix: "",  label: "حضور فعاليات",   description: "في مؤتمرات حية",                 Icon: FaUsers },
  { value: 4,    suffix: "",   prefix: "",  label: "أسواق نشطة",     description: "مصر · قطر · السعودية · الإمارات", Icon: FaEarthAmericas },
  { value: 15,   suffix: "K+", prefix: "$", label: "ميزانية إعلانية", description: "إنفاق شهري",                     Icon: FaSackDollar },
];

export default function StatsAr() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const counters = sectionRef.current?.querySelectorAll(".stat-num-ar");
      if (!counters) return;

      counters.forEach((el, i) => {
        const { value: target, prefix, suffix } = stats[i];
        const obj = { val: 0 };

        gsap.to(obj, {
          val: target,
          duration: 2.2,
          ease: "power2.out",
          scrollTrigger: { trigger: sectionRef.current, start: "top 80%", once: true },
          onUpdate: () => {
            el.textContent = `${prefix}${Math.round(obj.val).toLocaleString("en-US")}${suffix}`;
          },
        });
      });

      /* Decoration, not a measure — all four arcs land on the same offset. */
      gsap.fromTo(
        ".stat-ring-fill-ar",
        { strokeDashoffset: 251 },
        {
          strokeDashoffset: 50,
          duration: 2.4,
          stagger: 0.15,
          ease: "power2.out",
          scrollTrigger: { trigger: sectionRef.current, start: "top 80%", once: true },
        }
      );

      gsap.fromTo(
        ".stat-card-ar",
        { y: 46, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.7,
          stagger: 0.1,
          ease: "back.out(1.4)",
          scrollTrigger: { trigger: sectionRef.current, start: "top 80%", once: true },
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
      {/* The dot grid that used to sit here was white dots at 3% opacity on a
          near-white ground — it rendered as nothing. */}

      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: "radial-gradient(circle, #fff 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />

      <div className="max-w-6xl mx-auto relative">
        <div className="text-center mb-16">
          <p className="ar-script text-xl md:text-2xl mb-3" style={{ color: MINT }}>الأثر</p>
          <h2 className="ar-heading text-3xl md:text-4xl" style={{ color: "#fff" }}>أثر يُثبت بالأرقام</h2>
        </div>

        {/* Stamp cards: retro outline and hard shadow, alternating mint and
            wash. No progress rings — the old ones animated every card to the
            identical arc, implying a proportion these figures do not have. */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 md:gap-6">
          {stats.map(({ label, prefix, suffix, description, Icon }, i) => (
            <div key={label} className="stat-card-ar opacity-0 relative group">
              <div className="absolute -inset-[1px] rounded-[24px] overflow-hidden opacity-60 group-hover:opacity-100 transition-opacity duration-500">
                <div
                  className="absolute inset-[-50%] w-[200%] h-[200%]"
                  style={{
                    background: `conic-gradient(from 0deg, ${MINT}, #0A0A0A, ${MINT}, #0A0A0A, ${MINT})`,
                    animation: `spinBorder ${6 + i}s linear infinite`,
                    transformOrigin: "center center",
                  }}
                />
              </div>

              <div
                className="relative rounded-[24px] p-6 md:p-10 flex flex-col items-center text-center h-full overflow-hidden"
                style={{ background: "#111" }}
              >
                <div className="relative w-16 h-16 mb-8">
                  <svg className="absolute inset-0 w-full h-full -rotate-90" viewBox="0 0 88 88">
                    <circle cx="44" cy="44" r="40" fill="none" stroke="#1F1F1F" strokeWidth="3" />
                    <circle
                      className="stat-ring-fill-ar"
                      cx="44" cy="44" r="40"
                      fill="none"
                      stroke={MINT}
                      strokeWidth="3"
                      strokeLinecap="round"
                      strokeDasharray="251"
                      strokeDashoffset="251"
                    />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Icon size={22} style={{ color: MINT }} />
                  </div>
                </div>

                {/* The figure stays Latin-numeral and LTR: "$15K+" reverses
                    into nonsense when an RTL run gets hold of the prefix. */}
                <div
                  className="stat-num-ar heading font-bold mb-3"
                  dir="ltr"
                  style={{
                    fontSize: "clamp(2rem, 4.5vw, 3rem)",
                    backgroundImage: `linear-gradient(135deg, #fff 0%, ${MINT} 100%)`,
                    WebkitBackgroundClip: "text",
                    backgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    lineHeight: 1.6,
                    paddingTop: "0.2em",
                    fontVariantNumeric: "tabular-nums",
                  }}
                >
                  {prefix}0{suffix}
                </div>

                <p className="ar-body text-sm font-semibold mb-1" style={{ color: "#fff" }}>{label}</p>
                <p className="ar-body text-[11px]" style={{ color: "rgba(255,255,255,0.42)" }}>{description}</p>
              </div>
            </div>
          ))}
        </div>

        <style>{`@keyframes spinBorder { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }`}</style>
      </div>
    </section>
  );
}

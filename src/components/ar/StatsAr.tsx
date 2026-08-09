"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FaCalendarDays, FaUsers, FaEarthAmericas, FaSackDollar } from "react-icons/fa6";

gsap.registerPlugin(ScrollTrigger);

/* Same named ramp as every section. */
const INK = "#04323A";
const TEAL = "#004D5A";
const MUTED = "#4E717A";
const MINT = "#CFF7EE";
const WASH = "#F4FBF9";

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
      style={{ background: "#fff", padding: "100px 24px" }}
    >
      {/* The dot grid that used to sit here was white dots at 3% opacity on a
          near-white ground — it rendered as nothing. */}

      <div className="max-w-6xl mx-auto relative">
        <div className="text-center mb-16">
          <p className="ar-script text-xl md:text-2xl mb-3" style={{ color: TEAL }}>الأثر</p>
          <h2 className="ar-heading text-3xl md:text-4xl" style={{ color: INK }}>أثر يُثبت بالأرقام</h2>
        </div>

        {/* Stamp cards: retro outline and hard shadow, alternating mint and
            wash. No progress rings — the old ones animated every card to the
            identical arc, implying a proportion these figures do not have. */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 md:gap-6">
          {stats.map(({ label, prefix, suffix, description, Icon }, i) => (
            <div
              key={label}
              className="stat-card-ar opacity-0 rounded-[20px] p-6 md:p-8 flex flex-col items-center text-center"
              style={{
                background: i % 2 === 0 ? MINT : WASH,
                border: `2px solid ${TEAL}`,
                boxShadow: `5px 5px 0px 0px ${TEAL}`,
              }}
            >
              <div
                className="w-12 h-12 rounded-[13px] flex items-center justify-center mb-5"
                style={{ background: "#fff", border: `2px solid ${TEAL}` }}
              >
                <Icon size={19} style={{ color: TEAL }} />
              </div>

              {/* The figure stays Latin-numeral and LTR: "$15K+" reverses into
                  nonsense when an RTL run gets hold of the prefix. */}
              <div
                className="stat-num-ar heading"
                dir="ltr"
                style={{
                  color: INK,
                  fontSize: "clamp(1.9rem, 4vw, 2.7rem)",
                  lineHeight: 1.1,
                  letterSpacing: "-0.02em",
                  fontVariantNumeric: "tabular-nums",
                }}
              >
                {prefix}0{suffix}
              </div>

              <p className="ar-body text-sm font-bold mt-3" style={{ color: INK }}>
                {label}
              </p>
              <p className="ar-body text-[11px] mt-1" style={{ color: i % 2 === 0 ? "rgba(4,50,58,0.62)" : MUTED }}>
                {description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

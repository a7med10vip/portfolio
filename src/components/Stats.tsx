"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FaCalendarDays, FaUsers, FaEarthAmericas, FaSackDollar } from "react-icons/fa6";

gsap.registerPlugin(ScrollTrigger);

/* Same named ramp as Services, How I Work and Projects. */
const INK = "#04323A";
const TEAL = "#004D5A";
const MINT = "#CFF7EE";

/* Font Awesome solids rather than thin strokes — the filled marks hold their
   own against the 2px retro outline, where a hairline icon looked unrelated
   to the box around it. */
const stats = [
  { value: 5,    suffix: "+",  prefix: "",  label: "Years of Experience", description: "Across 4 markets",   Icon: FaCalendarDays },
  { value: 3000, suffix: "+",  prefix: "",  label: "Attendees Reached",   description: "At live events",     Icon: FaUsers },
  { value: 4,    suffix: "",   prefix: "",  label: "Countries Served",    description: "EG · QA · SA · UAE", Icon: FaEarthAmericas },
  { value: 15,   suffix: "K+", prefix: "$", label: "Ad Budget Managed",   description: "Monthly spend",      Icon: FaSackDollar },
];

export default function Stats() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const counters = sectionRef.current?.querySelectorAll(".stat-num");
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
            el.textContent = `${prefix}${Math.round(obj.val).toLocaleString()}${suffix}`;
          },
        });
      });

      /* The ring draws in with the counter. It is decoration, not a measure —
         all four arcs land on the same offset, so nothing here claims a
         proportion. */
      gsap.fromTo(
        ".stat-ring-fill",
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
        ".stat-card",
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
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: "radial-gradient(circle, #fff 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />

      {/* Dark on purpose. Every section between the marquee and the footer was
          white, so nothing on the page had priority — the figures are the one
          claim worth stopping on, and a dark band is what makes the reader
          stop. */}

      <div className="max-w-6xl mx-auto relative">
        <div className="text-center mb-16">
          <p className="script text-xl md:text-2xl mb-3" style={{ color: MINT }}>Impact</p>
          <h2 className="heading text-3xl md:text-4xl" style={{ color: "#fff" }}>By The Numbers</h2>
        </div>

        {/* On the dark ground the cards are outlines rather than fills: a mint
            hairline and a barely-there lift. The figure itself carries the
            colour. No progress rings — the old ones animated every card to the
            identical arc, which implied a proportion these figures do not
            have. Five years out of what? */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 md:gap-6">
          {stats.map(({ label, prefix, suffix, description, Icon }, i) => (
            <div key={label} className="stat-card opacity-0 relative group">
              {/* The conic sweep sits one pixel outside the card and is masked
                  by it, so what shows is a moving hairline rather than a glow. */}
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
                      className="stat-ring-fill"
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

                <div
                  className="stat-num heading font-bold mb-3"
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

                <p className="text-sm font-semibold mb-1" style={{ color: "#fff" }}>{label}</p>
                <p className="text-[11px]" style={{ color: "rgba(255,255,255,0.42)" }}>{description}</p>
              </div>
            </div>
          ))}
        </div>

        <style>{`@keyframes spinBorder { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }`}</style>
      </div>
    </section>
  );
}

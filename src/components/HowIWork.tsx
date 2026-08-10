"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/* One named ramp for the whole section. The previous version reached for
   rgba(0,77,90,…) at eight different alphas — 0.03, 0.05, 0.08, 0.12, 0.25,
   0.3, 0.5, 0.7 — which is why nothing lined up: three of those were so faint
   they rendered as nothing at all, and the rest were arbitrary. */
const INK = "#FFFFFF";    // step titles, on the dark ground
const TEAL = "#CFF7EE";   // numbers, rules, outlines, the timeline
const MUTED = "rgba(207,247,238,0.72)";  // body copy
const MINT = "#CFF7EE";   // bright chip fill
const WASH = "rgba(207,247,238,0.10)";   // the dim chip fill
const LINE = "rgba(207,247,238,0.16)"; // the one rule colour in the section

/* Shared with the Services chips — same angles, same retro treatment. */
const CHIP_TILTS = [-3, 2.2, -1.4, 3, -2.4];

const steps = [
  {
    num: "01",
    title: "Research First",
    subtitle: "Data over assumptions",
    desc: "Every project starts with understanding the market, the audience, and the real problem. I dig into data, audit what exists, and identify the highest-impact opportunities before writing a single line of code or launching a single ad.",
    highlights: ["Market & competitor analysis", "Technical audits", "Opportunity mapping"],
  },
  {
    num: "02",
    title: "Think in Systems",
    subtitle: "Strategy meets architecture",
    desc: "I don't work in silos. Marketing, product, and technology are one connected system. I design strategies where every piece, from the ad copy to the database schema, works together toward the same goal.",
    highlights: ["Cross-functional planning", "KPI-driven roadmaps", "Scalable architecture"],
  },
  {
    num: "03",
    title: "Ship & Iterate",
    subtitle: "Speed with precision",
    desc: "I believe in shipping fast and improving continuously. Whether it's a product launch, a campaign rollout, or a full platform build, I move with urgency, test assumptions early, and refine based on real results.",
    highlights: ["Agile sprints", "Rapid prototyping", "Continuous deployment"],
  },
  {
    num: "04",
    title: "Measure Everything",
    subtitle: "Decisions backed by data",
    desc: "Nothing runs without tracking. I set up proper analytics from day one, build dashboards that surface what matters, and use performance data to drive every optimization and strategic decision.",
    highlights: ["Full-funnel analytics", "Performance dashboards", "Data-driven optimization"],
  },
];

export default function HowIWork() {
  const sectionRef = useRef<HTMLElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".hiw-header",
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

      // Animate the green line growing
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

      // Each step row
      gsap.utils.toArray<HTMLElement>(".hiw-step").forEach((el) => {
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

      // Number scale in
      gsap.utils.toArray<HTMLElement>(".hiw-num").forEach((el) => {
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

      /* Chips slide in and land on their tilt. The rotation has to be part of
         the tween: GSAP writes the whole `transform`, so animating x alone
         would erase the inline rotate the chip was rendered with. */
      gsap.utils.toArray<HTMLElement>(".hiw-pills").forEach((el) => {
        gsap.utils.toArray<HTMLElement>(el.children as HTMLCollectionOf<HTMLElement>).forEach((chip, ci) => {
          const rest = Number(chip.dataset.tilt ?? 0);
          gsap.fromTo(
            chip,
            { x: -20, opacity: 0, rotate: 0 },
            {
              x: 0,
              opacity: 1,
              rotate: rest,
              duration: 0.5,
              delay: ci * 0.08,
              ease: "power3.out",
              scrollTrigger: { trigger: el, start: "top 88%", once: true },
            }
          );
        });
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
    >
      {/* The dot grid (white dots at 3%) and the top glow (mint at 4%) that
          used to sit here rendered as literally nothing — dropped rather than
          left in as decoration that never arrives. */}

      <div className="max-w-5xl mx-auto relative">
        {/* Header */}
        <div className="hiw-header opacity-0 text-center mb-20">
          <p className="script text-xl md:text-2xl mb-3" style={{ color: TEAL }}>
            Approach
          </p>
          <h2 className="heading text-3xl md:text-5xl" style={{ color: INK }}>
            How I Work
          </h2>
        </div>

        {/* Steps container */}
        <div className="relative">
          {/* Timeline track, then the fill that grows on scroll. Both are the
              same 2px the retro outlines use, so the rail reads as part of the
              same drawing rather than a hairline from another system. */}
          <div
            className="hidden md:block absolute top-0 bottom-0 w-[2px]"
            style={{ left: "156px", background: LINE }}
          />
          <div
            ref={lineRef}
            className="hidden md:block absolute top-0 bottom-0 w-[2px] origin-top"
            style={{ left: "156px", background: TEAL }}
          />

          {/* Steps */}
          <div className="flex flex-col">
            {steps.map((step, i) => (
              <div
                key={step.num}
                className="hiw-step opacity-0 group"
              >
                <div
                  className="grid grid-cols-1 md:grid-cols-[160px_1fr] gap-6 md:gap-12 items-start py-12 md:py-16 relative"
                  style={{
                    borderBottom: i < steps.length - 1 ? `1px solid ${LINE}` : "none",
                  }}
                >

                  {/* Left: Large number */}
                  <div className="relative z-10">
                    <div className="hiw-num flex items-center gap-4 md:flex-col md:items-start md:gap-2">
                      {/* Solid teal. The old gradient faded the digits to 25%
                          opacity at the baseline, which read as a rendering
                          fault rather than a effect. */}
                      <span
                        className="heading text-6xl md:text-[88px]"
                        style={{ color: TEAL, lineHeight: 1.3 }}
                      >
                        {step.num}
                      </span>
                      {/* Timeline marker: a mint disc with a 2px teal outline,
                          matching the retro chips. The previous marker was a
                          pale mint dot wearing a 12px teal glow — the neon the
                          rest of the site avoids. */}
                      <div
                        className="hidden md:block absolute"
                        style={{ left: "149px", top: "27px" }}
                      >
                        <div
                          className="w-3.5 h-3.5 rounded-full"
                          style={{ background: MINT, border: `2px solid ${TEAL}` }}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Right: Content */}
                  <div className="relative z-10">
                    <h3
                      className="heading text-2xl md:text-4xl mb-2 transition-colors duration-300 group-hover:text-[#CFF7EE]"
                      style={{ color: INK }}
                    >
                      {step.title}
                    </h3>
                    <p
                      className="text-xs font-semibold uppercase tracking-wider mb-5"
                      style={{ color: TEAL }}
                    >
                      {step.subtitle}
                    </p>
                    <p
                      className="text-sm md:text-base leading-relaxed mb-7 max-w-xl"
                      style={{ color: MUTED }}
                    >
                      {step.desc}
                    </p>

                    {/* Retro highlight chips — same outline, hard shadow and
                        tilt as the Services tool chips, so both sections read
                        as one system. Tilts cycle from a fixed list rather
                        than Math.random(), which would differ between the
                        server and client render and break hydration. */}
                    <div className="hiw-pills flex flex-wrap gap-3">
                      {step.highlights.map((h, hi) => (
                        <span
                          key={h}
                          className="hiw-chip px-4 py-2 rounded-full text-[11px] font-bold"
                          data-tilt={CHIP_TILTS[hi % CHIP_TILTS.length]}
                          style={{
                            background: hi % 2 === 0 ? MINT : WASH,
                            color: hi % 2 === 0 ? "#04323A" : MINT,
                            border: `1.5px solid ${TEAL}`,

                            transform: `rotate(${CHIP_TILTS[hi % CHIP_TILTS.length]}deg)`,
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

"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ArrowRight, Download } from "lucide-react";
import RotatingText from "./ui/RotatingText";
import dynamic from "next/dynamic";
/* eslint-disable @next/next/no-img-element */

const Aurora = dynamic(() => import("./ui/Aurora"), { ssr: false });
const Antigravity = dynamic(() => import("./ui/Antigravity"), { ssr: false });

type LogoItem = { name: string; src: string; h: number };

/* The client strip carried over from the stage section — Dunkin' and Geely in
   place of the CarTech, Saudia and Chelsea marks the opener used to show. */
const logos: LogoItem[] = [
  { name: "Ooredoo", src: "/logos/ooredoo.png", h: 30 },
  { name: "QNB", src: "/logos/qnb.png", h: 30 },
  { name: "Amazon", src: "/logos/amazon.svg", h: 28 },
  { name: "BinGhatti", src: "/logos/binghatti.png", h: 42 },
  { name: "Dunkin'", src: "/logos/dunkin.png", h: 30 },
  { name: "Geely", src: "/logos/geely.png", h: 46 },
];

export default function HeroClassic() {
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
            <span className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-semibold" style={{ background: "#fff", color: "#0A0A0A", border: "2px solid #0A0A0A" }}>
              <span className="w-2 h-2 rounded-full inline-block" style={{ background: "#3FCF8E" }} />
              Available for Work
            </span>
          </div>

          {/* Headline */}
          <div className="h-anim opacity-0 mb-7">
            <h1 className="heading text-4xl sm:text-5xl md:text-6xl lg:text-[64px]" style={{ color: "#fff" }}>
              I craft digital{" "}
              <span className="inline-block">
                <RotatingText
                  texts={["products", "strategies", "solutions", "growth"]}
                  mainClassName="inline-block text-[#CFF7EE]"
                  rotationInterval={2500}
                />
              </span>
              <br />
              that drive real growth.
            </h1>
          </div>

          {/* Subtitle */}
          <p className="h-anim opacity-0 text-lg md:text-xl leading-relaxed max-w-2xl mx-auto mb-10" style={{ color: "#fff" }}>
            Performance marketing, product development, and AI integration.
            <br />
            5+ years across Egypt, Qatar, Saudi Arabia &amp; UAE.
          </p>

          {/* CTAs */}
          <div className="h-anim opacity-0 flex flex-wrap justify-center gap-5 mb-10 pointer-events-auto">
            <a href="#projects" className="group relative inline-flex items-center gap-3 h-14 px-9 rounded-full text-base font-bold transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0" style={{ background: "#CFF7EE", color: "#0A0A0A", border: "2px solid #0A0A0A", boxShadow: "5px 5px 0px 0px #0A0A0A" }}>
              <ArrowRight size={16} />
              View My Work
            </a>
            <a href="/Ahmed-Ali-CV.pdf" download className="group relative inline-flex items-center gap-3 h-14 px-9 rounded-full text-base font-bold transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0" style={{ background: "#fff", color: "#0A0A0A", border: "2px solid #0A0A0A", boxShadow: "5px 5px 0px 0px #0A0A0A" }}>
              <Download size={16} />
              Download CV
            </a>
          </div>

          {/* Trusted By */}
          <div className="h-anim opacity-0 mb-12">
            <div className="relative inline-flex items-center gap-2 px-5 py-2 rounded-full mb-5" style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.08)" }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87L18.18 22 12 18.27 5.82 22 7 14.14l-5-4.87 6.91-1.01L12 2z" fill="#CFF7EE"/></svg>
              <span className="text-xs font-semibold tracking-wide uppercase" style={{ color: "rgba(255,255,255,0.7)" }}>Trusted by</span>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87L18.18 22 12 18.27 5.82 22 7 14.14l-5-4.87 6.91-1.01L12 2z" fill="#CFF7EE"/></svg>
            </div>
            <div className="flex flex-wrap justify-center items-center gap-x-10 gap-y-5">
              {logos.map((logo) => (
                <img
                  key={logo.name}
                  src={logo.src}
                  alt={logo.name}
                  className="object-contain transition-opacity duration-300 hover:opacity-100"
                  /* knocked to white: these are flat brand marks authored for a
                     light ground, and on #0A0A0A they read as nothing */
                  style={{ height: `${logo.h}px`, width: "auto", maxWidth: "130px", filter: "brightness(0) invert(1)", opacity: 0.72 }}
                />
              ))}
            </div>
          </div>


        </div>
      </div>
    </section>
  );
}

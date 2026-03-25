"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ArrowRight, Download } from "lucide-react";
import RotatingText from "./ui/RotatingText";
import dynamic from "next/dynamic";
/* eslint-disable @next/next/no-img-element */

const Aurora = dynamic(() => import("./ui/Aurora"), { ssr: false });
const Antigravity = dynamic(() => import("./ui/Antigravity"), { ssr: false });

const logos = [
  { name: "Ooredoo", src: "/logos/ooredoo.png" },
  { name: "QNB", src: "/logos/qnb.png" },
  { name: "Amazon", src: "/logos/amazon.svg" },
  { name: "BinGhatti", src: "/logos/binghatti.png" },
  { name: "CarTech", src: "/logos/cartech.png" },
  { name: "Saudia", src: "/ext/saudia.svg", size: "65px" },
  { name: "Chelsea", src: "/logos/chelsea.png", noFilter: true, size: "52px" },
];

export default function Hero() {
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
    <section ref={ref} className="min-h-screen flex items-center relative overflow-hidden" style={{ background: "#0A0A0A" }}>
      {/* Aurora - desktop only */}
      <div className="absolute inset-0 z-0 opacity-40 hidden md:block">
        <Aurora colorStops={["#5227FF", "#4FFFB0", "#5227FF"]} amplitude={1.0} blend={0.5} speed={1.0} />
      </div>

      {/* Antigravity - desktop only, reduced count */}
      <div className="absolute inset-0 z-[2] opacity-25 hidden md:block" style={{ pointerEvents: "auto" }}>
        <Antigravity count={150} magnetRadius={6} ringRadius={7} waveSpeed={0.4} waveAmplitude={1} particleSize={1.2} lerpSpeed={0.05} color="#4FFFB0" autoAnimate particleVariance={1} rotationSpeed={0} depthFactor={1} pulseSpeed={3} particleShape="capsule" fieldStrength={10} />
      </div>

      {/* Mobile: simple gradient background */}
      <div className="absolute inset-0 z-0 md:hidden" style={{ background: "radial-gradient(ellipse at 50% 30%, rgba(79,255,176,0.12) 0%, transparent 60%)" }} />

      <div className="relative z-10 w-full px-6 md:px-12 lg:px-20 pointer-events-none">
        <div className="max-w-6xl mx-auto text-center pt-32 pb-0">

          {/* Badge */}
          <div className="h-anim opacity-0 mb-7">
            <span className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-semibold" style={{ background: "#fff", color: "#0F0F0F", border: "1px solid rgba(255,255,255,0.15)" }}>
              <span className="w-2 h-2 rounded-full inline-block" style={{ background: "#22C55E", boxShadow: "0 0 8px #22C55E" }} />
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
                  mainClassName="inline-block overflow-hidden text-[#4FFFB0]"
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
            <a href="#projects" className="group relative inline-flex items-center gap-3 h-14 px-9 rounded-full text-base font-bold transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0" style={{ background: "#4FFFB0", color: "#0A0A0A", border: "2px solid #0A0A0A", boxShadow: "5px 5px 0px 0px #0A0A0A" }}>
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
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87L18.18 22 12 18.27 5.82 22 7 14.14l-5-4.87 6.91-1.01L12 2z" fill="#4FFFB0"/></svg>
              <span className="text-xs font-semibold tracking-wide uppercase" style={{ color: "rgba(255,255,255,0.7)" }}>Trusted by</span>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87L18.18 22 12 18.27 5.82 22 7 14.14l-5-4.87 6.91-1.01L12 2z" fill="#4FFFB0"/></svg>
            </div>
            <div className="flex flex-wrap justify-center items-center gap-x-10 gap-y-5">
              {logos.map((logo) => (
                <img
                  key={logo.name}
                  src={logo.src}
                  alt={logo.name}
                  className="hover:opacity-80 transition-opacity duration-300 object-contain"
                  style={{ height: (logo as any).size || "32px", width: "auto", maxWidth: "120px", filter: (logo as any).noFilter ? "none" : "brightness(0) invert(1)", opacity: 1 }}
                />
              ))}
            </div>
          </div>


        </div>
      </div>
    </section>
  );
}

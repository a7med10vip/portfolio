"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Star, MapPin, ArrowUpRight } from "lucide-react";
import { SiGoogleads, SiMeta, SiTiktok, SiSnapchat, SiInstagram, SiWordpress, SiFlutter, SiReact } from "react-icons/si";
/* eslint-disable @next/next/no-img-element */

gsap.registerPlugin(ScrollTrigger);

/* Flat filled pills: each capsule wears its brand colour solid, no glow and no
   drop shadow — a tinted wash read as washed out and a white capsule
   disappeared against the white section.
   `fg` is per-pill because Snapchat's light yellow is the one fill that needs
   dark type; every other brand carries white. */
const floatingPills = [
  { icon: SiGoogleads, label: "Google Ads", tint: "#34A853", fg: "#fff", top: "15%", left: "2%", rotate: -8 },
  { icon: SiMeta, label: "Meta Ads", tint: "#0081FB", fg: "#fff", top: "40%", left: "5%", rotate: 5 },
  { icon: SiTiktok, label: "TikTok", tint: "#111111", fg: "#fff", top: "62%", left: "1%", rotate: -3 },
  { icon: SiFlutter, label: "Flutter", tint: "#02569B", fg: "#fff", top: "80%", left: "8%", rotate: 7 },
  { icon: SiInstagram, label: "Instagram", tint: "#E4405F", fg: "#fff", top: "12%", right: "3%", rotate: 6 },
  { icon: SiSnapchat, label: "Snapchat", tint: "#FFFC00", fg: "#111111", top: "40%", right: "1%", rotate: -5 },
  { icon: SiWordpress, label: "WordPress", tint: "#21759B", fg: "#fff", top: "62%", right: "6%", rotate: 4 },
  /* React keeps its brand cyan but takes dark type: the Arabic build pairs
     #61DAFB with white, which is unreadable on a fill that light. */
  { icon: SiReact, label: "React", tint: "#61DAFB", fg: "#111111", top: "80%", right: "1%", rotate: -6 },
];

export default function AboutSection() {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(".about-anim", { y: 40, opacity: 0 }, {
        y: 0, opacity: 1, duration: 0.8, ease: "power3.out", stagger: 0.1,
        scrollTrigger: { trigger: ref.current, start: "top 75%" },
      });
      gsap.fromTo(".float-pill", { scale: 0, opacity: 0 }, {
        scale: 1, opacity: 1, duration: 0.6, ease: "back.out(1.7)", stagger: 0.1,
        scrollTrigger: { trigger: ref.current, start: "top 70%" },
      });
      document.querySelectorAll(".float-pill").forEach((el, i) => {
        gsap.to(el, {
          y: `random(-12, 12)`, x: `random(-6, 6)`,
          duration: `random(3, 5)`, ease: "sine.inOut", repeat: -1, yoyo: true, delay: i * 0.3,
        });
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={ref} id="about" className="relative overflow-hidden" style={{ background: "#0A0A0A", padding: "110px 0" }}>
      <div className="max-w-6xl mx-auto px-6 relative" style={{ minHeight: "650px" }}>

        {/* Floating pills */}
        {floatingPills.map((pill, i) => (
          <div key={i} className="float-pill absolute hidden lg:flex items-center gap-2 px-5 py-2.5 rounded-full cursor-default opacity-0"
            style={{ background: pill.tint, color: pill.fg, top: pill.top, left: pill.left, right: pill.right, /* the near-black tints (TikTok) sat invisible on the black ground; the hairline does nothing to the bright ones */ border: "1px solid rgba(255,255,255,0.16)", transform: `rotate(${pill.rotate}deg)`, zIndex: 5 } as React.CSSProperties}>
            <pill.icon size={18} />
            <span className="text-sm font-semibold">{pill.label}</span>
          </div>
        ))}

        {/* Center content */}
        <div className="relative z-10 flex flex-col items-center text-center">
          {/* Header */}
          <div className="about-anim opacity-0 mb-10">
            <p className="script text-xl md:text-2xl mb-3" style={{ color: "#CFF7EE" }}>About Me</p>
            <h2 className="heading text-3xl md:text-4xl" style={{ color: "#fff" }}>Full-Service Digital Solutions</h2>
          </div>

          {/* Card */}
          <div className="about-anim opacity-0 w-full max-w-[320px] rounded-[32px] overflow-hidden mb-10" style={{ background: "#fff", border: "2px solid #CFF7EE" }}>

            {/* Photo */}
            <div className="relative">
              <img src="/myphoto-profile.png" alt="Ahmed Ali" className="w-full h-[340px] object-cover" style={{ objectPosition: "center top" }} />
              <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(4,50,58,0.88) 0%, transparent 60%)" }} />
              {/* Available */}
              {/* chips and caption all sit on the dark half of the photo, so
                  they carry light type — the ink versions were invisible */}
              <div className="absolute top-4 left-4 flex items-center gap-1.5 px-3 py-1.5 rounded-full" style={{ background: "rgba(4,50,58,0.55)", backdropFilter: "blur(10px)" }}>
                <span className="w-2 h-2 rounded-full" style={{ background: "#5FDCC6" }} />
                <span className="text-[10px] font-bold" style={{ color: "#fff" }}>Available</span>
              </div>
              {/* Stars */}
              <div className="absolute top-4 right-4 flex items-center gap-0.5 px-2.5 py-1.5 rounded-full" style={{ background: "rgba(4,50,58,0.55)", backdropFilter: "blur(10px)" }}>
                {[1,2,3,4,5].map(i => <Star key={i} size={10} fill="#CFF7EE" style={{ color: "#CFF7EE" }} />)}
              </div>
              {/* Name on photo */}
              <div className="absolute bottom-4 left-5 right-5 text-center">
                <h3 className="heading text-xl" style={{ color: "#fff" }}>Ahmed Ali</h3>
                <p className="text-xs" style={{ color: "#CFF7EE" }}>Full-Stack Digital Strategist</p>
              </div>
            </div>

            {/* Info */}
            <div className="px-5 pb-5 pt-3">
              {/* Location */}
              <div className="flex items-center justify-center gap-1.5 mb-4">
                <MapPin size={12} style={{ color: "#3C6570" }} />
                <span className="text-xs" style={{ color: "#5B7B84" }}>Jeddah, Saudi Arabia</span>
              </div>
              {/* Mini stats */}
              <div className="flex items-center justify-between mb-4 px-1">
                {[{ v: "5+", l: "Years" }, { v: "50+", l: "Projects" }, { v: "4", l: "Countries" }].map((s, i, arr) => (
                  <div key={s.l} className="flex-1 text-center relative">
                    <p className="text-lg font-bold" style={{ color: "#04323A", fontFamily: "'TAN Headline'" }}>{s.v}</p>
                    <p className="text-[9px] font-medium uppercase tracking-wider" style={{ color: "rgba(4,50,58,0.55)" }}>{s.l}</p>
                    {i < arr.length - 1 && (
                      <div className="absolute right-0 top-1/2 -translate-y-1/2 h-8 w-px" style={{ background: "rgba(0,77,90,0.12)" }} />
                    )}
                  </div>
                ))}
              </div>
              {/* CTA */}
              <a href="#contact" className="flex items-center justify-center gap-2 w-full h-11 rounded-full text-sm font-bold transition-all duration-200 hover:-translate-y-0.5" style={{ background: "#CFF7EE", color: "#04323A", border: "2px solid #004D5A", boxShadow: "4px 4px 0px 0px #004D5A" }}>
                Let&apos;s Work Together <ArrowUpRight size={15} />
              </a>
            </div>
          </div>

          {/* Description */}
          <p className="about-anim opacity-0 text-base md:text-lg leading-relaxed max-w-lg" style={{ color: "#fff" }}>
            I build complete digital products, and I make them grow. From the first line of strategy to the last line of code, everything ships under one roof.
          </p>
        </div>
      </div>
    </section>
  );
}

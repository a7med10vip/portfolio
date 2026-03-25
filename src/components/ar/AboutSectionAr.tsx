"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Star, MapPin, ArrowUpRight } from "lucide-react";
import { SiGoogleads, SiMeta, SiTiktok, SiSnapchat, SiInstagram, SiWordpress, SiFlutter, SiReact } from "react-icons/si";
/* eslint-disable @next/next/no-img-element */

gsap.registerPlugin(ScrollTrigger);

const floatingPills = [
  { icon: SiGoogleads, label: "إعلانات جوجل", color: "#fff", bg: "#34A853", top: "15%", left: "2%", rotate: -8 },
  { icon: SiMeta, label: "إعلانات ميتا", color: "#fff", bg: "#0081FB", top: "40%", left: "5%", rotate: 5 },
  { icon: SiTiktok, label: "تيك توك", color: "#fff", bg: "#111", top: "62%", left: "1%", rotate: -3 },
  { icon: SiFlutter, label: "تطبيقات الجوال", color: "#fff", bg: "#02569B", top: "80%", left: "8%", rotate: 7 },
  { icon: SiInstagram, label: "إنستغرام", color: "#fff", bg: "#E4405F", top: "12%", right: "3%", rotate: 6 },
  { icon: SiSnapchat, label: "سناب شات", color: "#111", bg: "#FFFC00", top: "40%", right: "1%", rotate: -5 },
  { icon: SiWordpress, label: "إدارة المحتوى", color: "#fff", bg: "#21759B", top: "62%", right: "6%", rotate: 4 },
  { icon: SiReact, label: "تطوير الواجهات", color: "#fff", bg: "#61DAFB", top: "80%", right: "1%", rotate: -6 },
];

export default function AboutSectionAr() {
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
    <section ref={ref} id="about" className="relative overflow-hidden" style={{ background: "#0A0A0A", padding: "100px 0" }}>
      <div className="max-w-6xl mx-auto px-6 relative" style={{ minHeight: "650px" }}>

        {/* Floating pills */}
        {floatingPills.map((pill, i) => (
          <div key={i} className="float-pill absolute hidden lg:flex items-center gap-2 px-5 py-2.5 rounded-full cursor-default opacity-0"
            style={{ background: pill.bg, color: pill.color, top: pill.top, left: pill.left, right: pill.right, transform: `rotate(${pill.rotate}deg)`, boxShadow: "0 4px 20px rgba(0,0,0,0.3)", zIndex: 5 } as React.CSSProperties}>
            <pill.icon size={18} />
            <span className="text-sm font-semibold">{pill.label}</span>
          </div>
        ))}

        {/* Center content */}
        <div className="relative z-10 flex flex-col items-center text-center">
          {/* Header */}
          <div className="about-anim opacity-0 mb-10">
            <p className="ar-script text-xl md:text-2xl mb-3" style={{ color: "#4FFFB0" }}>نبذة عني</p>
            <h2 className="ar-heading text-3xl md:text-4xl" style={{ color: "#fff" }}>حلول رقميـــة شاملــة</h2>
          </div>

          {/* Card */}
          <div className="about-anim opacity-0 w-[320px] rounded-[32px] overflow-hidden mb-10" style={{ background: "#111", border: "1px solid rgba(79,255,176,0.1)", boxShadow: "0 0 80px rgba(79,255,176,0.04), 0 30px 60px rgba(0,0,0,0.4)" }}>

            {/* Photo */}
            <div className="relative">
              <img src="/ahmed.jpeg" alt="أحمد علي" className="w-full h-[300px] object-cover" />
              <div className="absolute inset-0" style={{ background: "linear-gradient(to top, #111 0%, transparent 60%)" }} />
              {/* Available */}
              <div className="absolute top-4 right-4 flex items-center gap-1.5 px-3 py-1.5 rounded-full" style={{ background: "rgba(0,0,0,0.5)", backdropFilter: "blur(10px)" }}>
                <span className="w-2 h-2 rounded-full" style={{ background: "#4FFFB0", boxShadow: "0 0 6px #4FFFB0" }} />
                <span className="ar-body text-[10px] font-bold" style={{ color: "#4FFFB0" }}>متاح</span>
              </div>
              {/* Stars */}
              <div className="absolute top-4 left-4 flex items-center gap-0.5 px-2.5 py-1.5 rounded-full" style={{ background: "rgba(0,0,0,0.5)", backdropFilter: "blur(10px)" }}>
                {[1,2,3,4,5].map(i => <Star key={i} size={10} fill="#4FFFB0" style={{ color: "#4FFFB0" }} />)}
              </div>
              {/* Name on photo */}
              <div className="absolute bottom-4 right-5 left-5 text-right">
                <h3 className="ar-heading text-xl" style={{ color: "#fff" }}>أحمد علي</h3>
                <p className="ar-body text-xs" style={{ color: "#4FFFB0" }}>استراتيجي رقمي شامل</p>
              </div>
            </div>

            {/* Info */}
            <div className="px-5 pb-5 pt-3">
              {/* Location */}
              <div className="flex items-center gap-1.5 mb-4">
                <MapPin size={12} style={{ color: "#555" }} />
                <span className="ar-body text-xs" style={{ color: "#888" }}>القاهرة، مصر</span>
              </div>
              {/* Mini stats */}
              <div className="flex items-center justify-between mb-4 px-1">
                {[{ v: "5+", l: "سنوات" }, { v: "50+", l: "مشروع" }, { v: "4", l: "دول" }].map((s, i, arr) => (
                  <div key={s.l} className="flex-1 text-center relative">
                    <p className="ar-heading text-lg font-bold" style={{ color: "#fff" }}>{s.v}</p>
                    <p className="ar-body text-[9px] font-medium uppercase tracking-wider" style={{ color: "rgba(255,255,255,0.4)" }}>{s.l}</p>
                    {i < arr.length - 1 && (
                      <div className="absolute left-0 top-1/2 -translate-y-1/2 h-8 w-px" style={{ background: "rgba(255,255,255,0.08)" }} />
                    )}
                  </div>
                ))}
              </div>
              {/* CTA */}
              <a href="#contact" className="ar-body flex items-center justify-center gap-2 w-full h-11 rounded-full text-sm font-bold transition-all duration-200 hover:-translate-y-0.5" style={{ background: "#4FFFB0", color: "#0A0A0A", border: "2px solid #0A0A0A", boxShadow: "4px 4px 0px 0px #0A0A0A" }}>
                لنعمل معاً <ArrowUpRight size={15} />
              </a>
            </div>
          </div>

          {/* Description */}
          <p className="ar-body about-anim opacity-0 text-base md:text-lg leading-relaxed max-w-lg" style={{ color: "rgba(255,255,255,0.7)" }}>
            أصمّم منظومات نمو رقمية متكاملة تجمع بين التسويق والتطوير والذكاء الاصطناعي من الاستراتيجية إلى الإطلاق، كل شيء يُدار تحت سقف واحد.
          </p>
        </div>
      </div>
    </section>
  );
}
